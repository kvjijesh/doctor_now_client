import React, { useState, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

function BookingList() {
  const userData = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const cancelBooking = async (id) => {
    try {
      await axios.patch(`/cancell-bookings/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedBookings = bookings.map((booking) =>
        booking._id === id ? { ...booking, status: "Cancelled" } : booking
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
        toast.error(`${error?.response.data.message}`);
      }
    };
    getAppointmentList();
  }, [userData?._id]);

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

  return (
    <>
      <Header />
      {loading ? (
              <Spinner />
            ) : (<>
      <div className="list">
        <h2>Your Bookings</h2>
      </div>
      <div style={{ padding: "50px" }}>
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
                        {obj.status === "Pending" ||
                        obj.status === "confirmed" ? (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "orangered",
                              width: "100px",
                              fontSize: "12px",
                            }}
                            onClick={() => {
                              cancelBooking(obj._id);
                            }}
                          >
                            Cancell
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disabled
                            sx={{ width: "100px", fontSize: "12px" }}
                          >
                            {obj.status}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

          </TableContainer>
        </div>
      </div>
      <footer>
      <Footer/>
      </footer>
      </>
       )}
    </>
  );
}

export default BookingList;
