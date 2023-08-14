import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./addslot.scss";
import Header from "../../components/header/Header";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { doctorLoginSucces } from "../../features/doctor/doctorSlice";
import { toast } from "react-toastify";


const AddSlot = () => {
  const userType = "doctor";
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
  ];
  const doctorData = useSelector((state) => state.doctor.doctor);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [addedDates, setAddedDates] = useState(doctorData?.availableSlots);
  const today = new Date();
  const minSelectableDate = new Date(today);
  const maxSelectableDate = new Date(today);
  minSelectableDate.setDate(today.getDate());
  maxSelectableDate.setDate(today.getDate() + 10);

  const handleAdd = async () => {
    if (selectedDate) {
      const dateTimeString = `${selectedDate.toDateString()} ${selectedTime}`;
      try {
        const response = await axios.post("/doctor/add-slots", {
          doctorId: doctorData?._id,
          selectedDate: dateTimeString,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("dtoken")}`,
          },
        });
        if (response.status === 200) {
          dispatch(doctorLoginSucces(response.data));
          setAddedDates([...addedDates, dateTimeString ]);
          setSelectedDate(null);
        }
      } catch (error) {
        toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
      }
    }
  };

  const handleDelete = async (index) => {
    try {
      const slotToDelete = addedDates[index];
      const response = await axios.delete("/doctor/delete-slot", {
        data: {
          doctorId: doctorData?._id,
          slotToDelete,
        },
      });

      if (response.status === 200) {
        dispatch(doctorLoginSucces(response.data));
        const updatedDates = addedDates.filter((_, i) => i !== index);
        setAddedDates(updatedDates);
      }

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Header userType={userType} />
      <div className="addslot-container">
        <form className="form-container1">
          <h2>ADD YOUR AVAILABLE SLOTS</h2>
          <div className="form-inputs">
            <DatePicker
              className="date-picker"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select Date"
              minDate={minSelectableDate}
              maxDate={maxSelectableDate}
            />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {timeSlots.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className="added-dates">
            <h3>ADDED SLOTS</h3>
            <ul>
              {addedDates.map((slot, index) => (
                <li key={index}>
                  {slot}
                  <button type="button" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSlot;
