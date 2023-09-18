import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './departmentpage.scss'
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import Spinner from '../../components/Spinner'
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { toast } from "react-toastify";
import axios from "../../Servies/axiosInterceptor";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationModal from '../../components/ConfirmationModal'
import Axios from 'axios'

const DepartmentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [dept, setDept] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false)
  const openModal = () => { setConfirmModal(true) }
  const closeModal = () => { setConfirmModal(false) }
  const handleAdd = () => {
    setIsModalOpen(true);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image);
    formData.append("upload_preset", "dsavfcph");
    formData.append("cloud_name", "dw6hpsoj9");

    try {
      const imageRes = await Axios.post("https://api.cloudinary.com/v1_1/dw6hpsoj9/image/upload",
        formData)
      if (imageRes) {

        let image=imageRes.data.secure_url
        try {
          const response = await axios.post("/admin/add-department", {name,image});
          if (response.status === 201) {

            setDept([...dept, response.data.newSpeciality]);
            toast.success(`${response.data.message}`, { position: toast.POSITION.TOP_CENTER });
            setIsModalOpen(false);
          }
        } catch (error) {
          console.log(error);

        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const getDepartmentList = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/admin/departments`);
        setDept(res.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(`${error.response}`);
      }
    };
    getDepartmentList();
  }, []);

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
  useEffect(() => {
    if (dept.length > 0) {
      initializeDataTable();
    }
  }, [dept]);
  const handleDelete = async (raw) => {
    try {
      const res = await axios.delete(`/admin/delete-department/${raw}`);
      if (res.status === 200) {
        setDept([...res.data.department])
        toast.success("Deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(`${error.data?.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="dept-container">
        <Navbar />
        <div className="dept-heading">
          <h2>Department Management</h2>
        </div>
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
                      <TableCell sx={{ fontSize: "15px" }}>Department Name</TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>Image</TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dept?.map((obj, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "15px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>
                          {obj.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "15px" }}>
                          <img src={obj?.image} alt={obj.name} style={{ width: "50px" }} />
                        </TableCell>
                        <TableCell>
                          <Button onClick={openModal}><DeleteIcon /></Button>
                          <ConfirmationModal open={confirmModal} onClose={closeModal} onConfirm={() => { handleDelete(obj._id) }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
        <div className="dept-button">
          <Button variant='contained' color='success' onClick={handleAdd}>Add</Button>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div className="modal-container">
          <div className="modal-content">
            <h2>Add a speciality</h2>
            <br />
            <form onSubmit={handleCreate}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <TextField
                  label="Name"
                  fullWidth
                  type="standard"
                  variant="outlined"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  type="file"
                  variant="outlined"
                  name="image"
                  onChange={handleImageChange}
                />
                <Button onClick={handleCreate}>Submit</Button>
              </Box>
            </form>

            <div className="modal-buttons">
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
};

export default DepartmentPage