import React, { useCallback, useEffect, useState } from "react";
import { Box, Button,  Container,  FormControl,  Grid,  InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik'
import { validatePrescription } from "../../helper/formik";
import { toast } from "react-toastify";
import { useSocket } from "../../context/socketProvider";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setConsult } from "../../features/consult/consultSlice";
const AppointmentCard = ({ appointment }) => {
  const dispatch=useDispatch()

  const initialValues = {
    findings: '',
    advice: '',
    id: appointment._id
  }
  const [appointmentStatus, setAppointmentStatus] = useState(appointment.status);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [medicines, setMedicines] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState({
    medicine: "",
    frequency: "",
  });
  const navigate = useNavigate()
  const socket = useSocket()

  const handleAddMedicine = () => {
    if (currentMedicine.medicine && currentMedicine.frequency) {
      setMedicines([...medicines, currentMedicine]);
      setCurrentMedicine({ medicine: "", frequency: "" });
    }
  };


  const handleClick = () => {
    setIsModalOpen(true)
  }


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: validatePrescription,
    onSubmit: async (values, action) => {
      const prescriptionData = {
        ...values,
        medicines: medicines,
      };

      await axios.put(`/doctor/generate-prescription`, prescriptionData)
        .then((response) => {
          if (response.status === 200) setIsModalOpen(false);
          toast.success(`${response.data.message}`, { position: toast.POSITION.TOP_CENTER });
        });
    }
  });



  const handleConfirmClick = async (e) => {
    e.preventDefault();

    if (appointmentStatus === "completed") {
      return;
    }

    const newStatus = appointmentStatus === "confirmed" ? "completed" : "confirmed";
    setAppointmentStatus(newStatus);

    await axios.put(`/doctor/update-status/${appointment._id}`, {
      status: newStatus,
    }).then((res)=>{
      toast.success(`${res.data.message}`,{position:toast.POSITION.TOP_CENTER})
    })

  };
  const handleClose = () => {
    setIsModalOpen(false)
  }
  const email = appointment.doctorId.email;
  const handleCall = useCallback((appointment,room) => {
    socket.emit("room:join", { email, room })
    dispatch(setConsult(appointment))
  },
    [dispatch,email,socket]
  )
  const handleJoinRoom = useCallback((data) => {
    const { room } = data
    navigate(`/doctor/call/${room}`)
  }, [navigate])
  useEffect(() => {
    socket.on('room:join', handleJoinRoom)
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket, handleJoinRoom])

  return (
    <>
      <div className="appoinment-container">
        <div className="appointment-card">
          <div className="appointment-card-body">
            <p>{appointment.appointment_id}</p>
            <p>{appointment.userId.name}</p>
            <p>{appointment.userId.mobile}</p>
            <p>{appointment.slot}</p>
            <p>{appointmentStatus}</p>


            <Button sx={{ fontSize: '12px' }}
              variant="contained"
              color={appointmentStatus === "confirmed" ? "success" : "secondary"}
              onClick={handleConfirmClick}
              disabled={appointmentStatus === "completed" || appointmentStatus === "cancelled"}
            >
              {appointmentStatus === "confirmed"
                ? "Mark as Completed"
                : appointmentStatus === "pending"
                  ? "confirm"
                  : appointmentStatus === "cancelled"
                    ? "cancelled" : "completed"}
            </Button>
            {appointmentStatus === 'confirmed' ? (<Button onClick={() => handleCall(appointment,appointment._id + appointment.userId._id)} variant="contained" color='secondary'>Call</Button>) : (null)}
            {appointmentStatus === 'completed' ? (<Button variant="contained" color='secondary' onClick={handleClick}>Prescription</Button>) : (null)}

          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} sx={{ width: "100vw" }}>
        <div className="modal-container">
          <div className="modal-content">
            <Typography variant="h3" align="center">Create Prescription</Typography>


            <Container component="main" maxWidth="xs">

              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        fullWidth
                        id="appointmentId"
                        label="Appointment Id"
                        name="appointmentId"
                        value={appointment.appointment_id}
                        autoComplete="appointmentId"
                        disabled

                        onBlur={handleBlur}
                      />

                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        fullWidth
                        id="findings"
                        label="Findings"
                        name="findings"
                        autoComplete="findings"
                        value={values.findings}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.findings && errors.findings ? (<Typography sx={{ color: 'red' }}>{errors.findings}</Typography>) : null}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="standard"
                        fullWidth
                        name="medicine"
                        id="medicine"
                        label="Medicine"
                        autoComplete="medicine"
                        value={currentMedicine.medicine}
                        onChange={(e) =>
                          setCurrentMedicine({
                            ...currentMedicine,
                            medicine: e.target.value,
                          })
                        }
                        onBlur={handleBlur}
                      />
                      {touched.medicine && errors.medicine ? (<Typography sx={{ color: 'red' }}>{errors.medicine}</Typography>) : null}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="frequency-label">Frequency</InputLabel>
                        <Select
                          labelId="frequency-label"
                          id="frequency"
                          label="Frequency"
                          name="frequency"
                          autoComplete="frequency"
                          value={currentMedicine.frequency}
                          onChange={(e) =>
                            setCurrentMedicine({
                              ...currentMedicine,
                              frequency: e.target.value,
                            })
                          }
                          onBlur={handleBlur}
                        >
                          <MenuItem value="Once Daily">Once Daily</MenuItem>
                          <MenuItem value="Twice Daily">Twice Daily</MenuItem>
                          <MenuItem value="Three Times a day">Three Times a day</MenuItem>
                          <MenuItem value="Once Daily Before food">Once Daily Before food</MenuItem>
                          <MenuItem value="Twice Daily Before food">Twice Daily Before food</MenuItem>
                          <MenuItem value="Three Times a day Before food">Three Times a day Before food</MenuItem>
                        </Select>
                      </FormControl>
                      {touched.frequency && errors.frequency ? (<Typography sx={{ color: 'red' }}>{errors.frequency}</Typography>) : null}
                    </Grid>
                    <Grid Grid item xs={12} sm={4} >
                      <Button sx={{ p: 1.8 }}

                        color="primary"
                        onClick={handleAddMedicine}

                      >
                        <AddCircleIcon />
                      </Button>
                    </Grid>
                    {medicines.map((medicine, index) => (
                      <div key={index}>
                        <Typography sx={{ fontSize: '15px', ml: 2 }}>{`Medicine: ${medicine.medicine}, Frequency: ${medicine.frequency}`}</Typography>
                      </div>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        fullWidth
                        id="advice"
                        label="Advice"
                        name="advice"
                        value={values.advice}
                        autoComplete="advice"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.advice && errors.advice ? (<Typography sx={{ color: 'red' }}>{errors.advice}</Typography>) : null}
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    GENERATE
                  </Button>
                </Box>
              </Box>
            </Container>
            <div className="modal-buttons">
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </div>
      </Modal >

    </>
  );
};

export default AppointmentCard;
