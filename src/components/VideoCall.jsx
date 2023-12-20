import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../context/socketProvider';
import { Box, Button, Grid, Typography } from '@mui/material';
import peer from '../Servies/peer';
import { useNavigate } from 'react-router-dom'
import axios from '../Servies/axiosInterceptor'
import { useDispatch, useSelector } from 'react-redux';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import CallIcon from '@mui/icons-material/Call';

export const VideoCall = ({ value }) => {


    const socket = useSocket()
    const navigate = useNavigate();
    const remoteRef = useRef()
    const id = useSelector(state => state.consult.consult._id)

    const [remoteSocketId, setRemoteSocketId] = useState();
    const [myStream, setMyStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState()
    const [callActive, setCallActive] = useState(false)
    const [muted, setMuted] = useState(true)
    const [accepted, setAccepted] = useState(false)

    const handleUserJoined = useCallback(({ email, id }) => {
        setRemoteSocketId(id)
    }, [])
    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        return () => {
            socket.off("user:joined", handleUserJoined)
        }
    }, [socket, handleUserJoined])

    const handleCallUser = useCallback(async () => {

        if (callActive) {
            myStream?.getTracks().forEach((track) => track.stop());
            setMyStream(null);
            socket.emit('call:end', { to: remoteSocketId })
            setCallActive(false)
            setRemoteStream('')
            if (value === 'doctor') {
                await axios.patch(`/doctor/endAppointment/${id}`).then(res => {
                    toast.success(`${res.data.message}`, { position: toast.POSITION.TOP_CENTER })
                })
            }
            socket.emit('socket:disconnect', { socketId: remoteSocketId });
            if (value === 'doctor') {
                navigate('/appointments')
            } else if (value === "user") {
                navigate('/feedback')
            }

        } else {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            const offer = await peer.getOffer()
            socket.emit('user:call', { to: remoteSocketId, offer })
            setMyStream(stream)
            setCallActive(true)
        }
    }, [id, callActive, myStream, navigate, remoteSocketId, socket, value])

    const handleIncomingCall = useCallback(async ({ from, offer }) => {

        setRemoteSocketId(from)
        setCallActive(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

            setMyStream(stream)
            const ans = await peer.getAnswer(offer)
            socket.emit('call:accepted', { to: from, ans })

        } catch (error) {
            console.log(error);
        }

    }, [socket])

    const sendStreams = useCallback(() => {
        setAccepted(true)
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
        setCallActive(true)
    }, [myStream]);

    const handleCallAccepted = useCallback(
        async ({ ans }) => {
            await peer.setLocalDescription(ans);
            setCallActive(true)
            sendStreams()
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer()
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
    }, [remoteSocketId, socket])

    const handleNegoIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer)

        socket.emit('peer:nego:done', { to: from, ans })
    }, [socket])


    const handleNegoFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans)
    }, [])

    const handleMute = useCallback(() => {
        setMuted(!muted)
    }, [muted])

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
        }
    }, [handleNegoNeeded])


    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams
            setRemoteStream(remoteStream[0])
        })
    }, [])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined)
        socket.on('incoming:call', handleIncomingCall)
        socket.on('call:accepted', handleCallAccepted)
        socket.on('peer:nego:needed', handleNegoIncoming)
        socket.on('peer:nego:final', handleNegoFinal)



        return () => {
            socket.off('user:joined', handleUserJoined)
            socket.off('incoming:call', handleIncomingCall)
            socket.off('call:accepted', handleCallAccepted)
            socket.off('peer:nego:needed', handleNegoIncoming)
            socket.off('peer:nego:final', handleNegoFinal)

        }
    }, [socket, handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted])

    return (
        <>

            <Box height={'100vh'} sx={{ flexGrow: 1 }} >
                <Grid container direction={'column'} justifyContent={'center'}  >
                    <Grid display={'flex'} justifyContent={'center'} mt={5}>
                        <Typography variant='h3'>Consultation</Typography>
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'} mt={2} >
                        {
                            value === 'user' ? (!remoteSocketId && 'Please wait till the call arrives') : (
                                !callActive && <Typography variant='h5'>{remoteSocketId ? 'Patient online' : 'No one in room'}</Typography>)
                        }
                    </Grid>
                    <Grid display={'flex'} flexDirection={'column'} mt={2}>
                        <Grid textAlign={'center'}>
                            <Typography>Ongoing Consultation</Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} gap={5} flexWrap={'wrap'}>
                            {
                                myStream && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted width={'400px'} height={'400px'} />

                            }
                            {
                                remoteStream && <ReactPlayer style={{ backgroundColor: 'black' }} ref={remoteRef} url={remoteStream} playing muted={muted} width={'400px'} height={'400px'} />
                            }
                        </Grid>
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'} gap={5} mt={5}>

                        {callActive && remoteSocketId && <Button onClick={handleCallUser}  ><CallEndIcon sx={{ color: 'red' }} size='large' /> </Button>}
                        {
                            myStream && <>
                                <Button onClick={handleMute}>{muted ? <MicOffIcon /> : <MicIcon />}</Button>
                            </>
                        }
                        {value === 'user' && myStream && <><Button sx={{ display: accepted ? "none" : "block" }} onClick={sendStreams}><CallIcon /></Button></>}
                        {
                            !callActive ? (value === 'doctor' && (remoteSocketId && <Button variant='contained' color='success' onClick={handleCallUser}>Call</Button>)) : ''
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
