import React, { useState, useEffect, useRef } from "react";
import Spinner from "../../components/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./userbookings.scss";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { toast } from "react-toastify";
import axios from "../../Servies/axiosInterceptor";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";

function UserBookings() {
  const userData = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const BOOKING_STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    CANCELLED: "cancelled",
  };

  const cancelBooking = async (id) => {
    try {
      await axios.patch(`/cancell-bookings/${id}`);
      const updatedBookings = bookings?.map((booking) =>
        booking._id === id ? { ...booking, status: BOOKING_STATUS.CANCELLED } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAppointmentList = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/admin/all-bookings`);
        const books = res.data;
        setBookings(books);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true)
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
      <Navbar />
      <div className="booking-container">
        <div className="booking-header"><h2>
          Booking Management</h2></div>
        <div className="main-booking">
          <div style={{ padding: "50px" }}>
            <div className="user-table">
              {isLoading ? (
                <Spinner loading={isLoading} />
              ) : (
                <TableContainer>
                  <Table ref={tableRef} id="myTable">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: "15px" }}>No</TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>User</TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>Doctor</TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>Time</TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>Status</TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings?.map((obj, index) => (
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
                            {obj.status}
                          </TableCell>
                          <TableCell>
                            {obj.status === "pending" ||obj.status === "confirmed" ? (
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
                                Cancel
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserBookings;
