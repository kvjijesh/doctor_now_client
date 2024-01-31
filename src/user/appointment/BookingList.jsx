import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./bookinglist.scss";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { toast } from "react-toastify";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import DownloadButton from "../../components/Download";
import { useSocket } from "../../context/socketProvider";
import { useNavigate } from "react-router-dom";
import { appointmentData } from "../../features/user/appoinmentSlice";

function BookingList() {
  const userData = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket()
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const cancelBooking = async (id) => {
    try {
      await axios.patch(`/cancell-bookings/${id}`);
      const updatedBookings = bookings.map((booking) =>
        booking._id === id ? { ...booking, status: "cancelled" } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAppointmentList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/user-bookings/${userData?._id}`);
        const books = res.data;

        setBookings(books);
        setLoading(false);
      } catch (error) {
         console.log(error)
      }
    };
    getAppointmentList();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      initializeDataTable();
    }
  }, [bookings]);

  const initializeDataTable = () => {
    if (!$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({
        paging: true,
        lengthChange: false,
        searching: true,
        info: true,
        pageLength: 8,
      });
    }
  };

  const handleJoin = useCallback((roomId,email,obj) => {
    const room = roomId
    dispatch(appointmentData(obj))
    socket.emit("room:join", { email, room })
}, [dispatch, socket])

const handleJoinRoom = useCallback((data) => {
  const { room } = data
  navigate(`/user/call/${room}`)
}, [navigate])

useEffect(() => {
  socket.on('room:join', handleJoinRoom)
  return () => {
      socket.off('room:join', handleJoinRoom)
  }
}, [socket, handleJoinRoom])

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (<>
        <div className="list">
          <h2>Your Bookings</h2>
        </div>
        <div style={{ padding: "10px" , maxWidth:'120rem',marginLeft:'auto',marginRight:'auto'}}>
          <div className="table">
            <TableContainer>

              <Table ref={tableRef} id="myTable">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "15px" }}>No</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>User</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>Doctor</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>Time</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>Booked On</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>Status</TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((obj, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {obj.userId.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {obj.doctorId.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {obj.slot}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {obj.createdAt?.split("T")[0]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {obj.status}
                      </TableCell>
                      <TableCell>
                        {obj.status === "pending" ?(<Button onClick={() => {
                          cancelBooking(obj._id);
                        }} variant="contained" color="success">cancell</Button>):(null)}
                        {obj.status === "confirmed"  ? (<><Button onClick={() => {
                          cancelBooking(obj._id);
                        }} variant="contained" color="success">cancell</Button>
                        <Button sx={{m:1}} variant="contained" color="secondary" onClick={() => handleJoin(obj._id + obj.userId._id,obj.userId.email,obj)} >Join</Button></>) : (null)}
                        {obj.status === "cancelled" ? (<Button variant="contained" disabled>{obj.status}</Button>) : (null)}
                        {obj.status === "completed" ? (<DownloadButton data={obj} user={userData} />) : (null)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </TableContainer>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </>
      )}
    </>
  );
}

export default BookingList;
