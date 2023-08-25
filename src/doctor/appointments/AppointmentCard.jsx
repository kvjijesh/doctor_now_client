import React, { useState } from "react";
import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, Icon, InputLabel, MenuItem, Modal, Select, TextField, Typography, } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const AppointmentCard = ({ appointment }) => {
  const [appointmentStatus, setAppointmentStatus] = useState(appointment.status);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [medicines, setMedicines] = useState([{ medicine: "", frequency: "" }])
  const handleClick = () => {
    setIsModalOpen(true)

  }
  const handleCreate = async () => {

  }
  const handleAddMedicine = () => {

    setMedicines([...medicines, { medicine: "", frequency: "" }]);
  };
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleConfirmClick = async (e) => {
    e.preventDefault();

    if (appointmentStatus === "completed") {
      return;
    }

    const newStatus = appointmentStatus === "confirmed" ? "completed" : "confirmed";
    setAppointmentStatus(newStatus);

    const res = await axios.put(`/doctor/update-status/${appointment._id}`, {
      status: newStatus,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dtoken")}`,
      },
    });

  };
  const handleClose = () => {
    setIsModalOpen(false)
  }

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
                : appointmentStatus === "Pending"
                  ? "Confirm"
                  : appointmentStatus === "cancelled"
                    ? "Cancelled" : "Completed"}
            </Button>
            {appointmentStatus === 'confirmed' ? (<Button variant="contained" color='secondary'>Call</Button>) : (null)}
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
                <Box component="form" noValidatesx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        fullWidth
                        id="appointmentId"
                        label="Appointment Id"
                        name="appointmentId"
                        value={appointment?.appointment_id}
                        autoComplete="appointmentId"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        required
                        fullWidth
                        id="findings"
                        label="Findings"
                        name="findings"
                        autoComplete="findings"

                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="standard"
                        fullWidth
                        name="medicine"
                        required
                        id="medicine"
                        label="Medicine"
                        autoFocus
                      />
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
                        >
                          <MenuItem value="daily">Once Daily</MenuItem>
                          <MenuItem value="daily">Twice Daily</MenuItem>
                          <MenuItem value="weekly">Three Times a day</MenuItem>
                          <MenuItem value="daily">Once Daily Before food</MenuItem>
                          <MenuItem value="daily">Twice Daily Before food</MenuItem>
                          <MenuItem value="weekly">Three Times a day Before food</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid Grid item xs={12} sm={4} >
                    <Button sx={{p:1.8}}

                      color="primary"
                      onClick={handleAddMedicine}

                    >

                        <AddCircleIcon />


                    </Button>
                  </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="standard"
                        required
                        fullWidth
                        id="advice"
                        label="Advice"
                        name="advice"
                        autoComplete="advice"
                      />
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
