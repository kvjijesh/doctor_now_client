import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Button, Modal } from "@mui/material";
import AddDepartment from "./AddDepartment";
import "./departmentpage.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const DepartmentPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dept, setDept] = useState([]);
  const userType = "department";
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleEdit = async () => {
    toast.success("i am clicked");
  };
  const columns = [
    { id: "name", label: "Department", minWidth: 100 },
    { id: "image", label: "Image", minWidth: 170 },
  ];

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await axios.get("/admin/departments");
        setDept(response.data);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchDept();
  }, []);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post("/admin/add-department", formData);
      if(response.status===201)
      toast.success(`${response.message}`);
    } catch (error) {}
  };
  const handleAdd = () => {
    setIsModalOpen(true);
  };


  const handleDelete = async (raw) => {
    try {
      const res = await axios.delete(`/admin/delete-department/${raw}`);
      if (res.status === 200) {
        toast.success("Deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(`${error.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    
  };

  return (
    <>
      <div className="sample-container">
        <Sidebar />
        <div className="dept-card">
          <DataTable
            columns={columns}
            rows={dept}
            userType={userType}
            onEditButtonClick={handleEdit}
            onDeleteButtonClick={handleDelete}
          />
          <div className="dept-button">
            <Button variant="contained" color="success" onClick={handleAdd}>
              ADD NEW
            </Button>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div className="modal-container">
          <div className="modal-content">
            <h2>Add a speciality</h2>
            <br />
            <form onSubmit={handleCreate}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* <TextField type="text" label="Name" variant="outlined" name="name" placeholder="Name"  /> */}
              <TextField  label="Name" fullWidth type="standard" variant="outlined" name="name" onChange={(event) => setName(event.target.value)} />
              <TextField type="file"  variant="outlined" name="image" onChange={handleImageChange }/>
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
  );
};

export default DepartmentPage;
