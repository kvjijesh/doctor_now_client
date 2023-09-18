// import React, { useCallback, useMemo, useState } from "react";
// import { MaterialReactTable } from "material-react-table";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   MenuItem,
//   Stack,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";
// // import { data, states } from './makeData';

// const AddDepartment = () => {
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [tableData, setTableData] = useState("jijsh");
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleCreateNewRow = (values) => {
//     tableData.push(values);
//     setTableData([...tableData]);
//   };

//   const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
//     if (!Object.keys(validationErrors).length) {
//       tableData[row.index] = values;
//       //send/receive api updates here, then refetch or update local table data for re-render
//       setTableData([...tableData]);
//       exitEditingMode(); //required to exit editing mode and close modal
//     }
//   };

//   const handleCancelRowEdits = () => {
//     setValidationErrors({});
//   };

//   const handleDeleteRow = useCallback(
//     (row) => {
//       if (
//         !window.confirm(
//           `Are you sure you want to delete ${row.getValue("firstName")}`
//         )
//       ) {
//         return;
//       }
//       //send api delete request here, then refetch or update local table data for re-render
//       tableData?.splice(row.index, 1);
//       setTableData([...tableData]);
//     },
//     [tableData]
//   );

//   const getCommonEditTextFieldProps = useCallback(
//     (cell) => {
//       return {
//         error: !!validationErrors[cell.id],
//         helperText: validationErrors[cell.id],
//         onBlur: (event) => {
//           const isValid =
//             cell.column.id === "email"
//               ? validateEmail(event.target.value)
//               : cell.column.id === "age"
//               ? validateAge(+event.target.value)
//               : validateRequired(event.target.value);
//           if (!isValid) {
//             //set validation error for cell if invalid
//             setValidationErrors({
//               ...validationErrors,
//               [cell.id]: `${cell.column.columnDef.header} is required`,
//             });
//           } else {
//             //remove validation error for cell if valid
//             delete validationErrors[cell.id];
//             setValidationErrors({
//               ...validationErrors,
//             });
//           }
//         },
//       };
//     },
//     [validationErrors]
//   );

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "id",
//         header: "ID",
//         enableColumnOrdering: false,
//         enableEditing: false, //disable editing on this column
//         enableSorting: false,
//         size: 80,
//       },
//       {
//         accessorKey: "specialisation",
//         header: "Specialisation",
//         size: 140,
//         muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
//           ...getCommonEditTextFieldProps(cell),
//         }),
//       },

//       {
//         accessorKey: "image",
//         header: "Image",
//         muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
//           ...getCommonEditTextFieldProps(cell),
//           type: "file",
//           accept: "image/*",
//         }),
//       },
//     ],
//     [getCommonEditTextFieldProps]
//   );

//   return (
//     <>
//       <MaterialReactTable
//         displayColumnDefOptions={{
//           "mrt-row-actions": {
//             muiTableHeadCellProps: {
//               align: "center",
//             },
//             size: 140,
//           },
//         }}
//         columns={columns}
//         data={tableData}
//         editingMode="modal"
//         enableColumnOrdering
//         enableEditing
//         onEditingRowSave={handleSaveRowEdits}
//         onEditingRowCancel={handleCancelRowEdits}
//         renderRowActions={({ row, table }) => (
//           <Box sx={{ display: "flex", gap: "1rem" }}>
//             <Tooltip arrow placement="left" title="Edit">
//               <IconButton onClick={() => table.setEditingRow(row)}>
//                 <Edit />
//               </IconButton>
//             </Tooltip>
//             <Tooltip arrow placement="right" title="Delete">
//               <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//                 <Delete />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         )}
//         renderTopToolbarCustomActions={() => (
//           <Button
//             color="secondary"
//             onClick={() => setCreateModalOpen(true)}
//             variant="contained"
//           >
//             Add New
//           </Button>
//         )}
//       />
//       <CreateNewAccountModal
//         columns={columns}
//         open={createModalOpen}
//         onClose={() => setCreateModalOpen(false)}
//         onSubmit={handleCreateNewRow}
//       />
//     </>
//   );
// };

// //example of creating a mui dialog modal for creating new rows
// export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
//   const [values, setValues] = useState(() =>
//     columns.reduce((acc, column) => {
//       acc[column.accessorKey ?? ""] = "";
//       return acc;
//     }, {})
//   );

//   const handleSubmit = () => {
//     //put your validation logic here
//     onSubmit(values);
//     onClose();
//   };

//   return (
//     <Dialog open={open}>
//       <DialogTitle textAlign="center">Add Department</DialogTitle>
//       <DialogContent>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <Stack
//             sx={{
//               width: "100%",
//               minWidth: { xs: "300px", sm: "360px", md: "400px", lg: "460px" },
//               gap: "1.5rem",
//               fontSize: "1000px",
//             }}
//           >
//             {columns.map((column) => (
//               <TextField
//                 key={column.accessorKey}
//                 fullWidth
//                 label={column.header}
//                 name={column.accessorKey}
//                 onChange={(e) => {
//                   if (column.accessorKey === "image") {
//                     setValues({
//                       ...values,
//                       [e.target.name]: e.target.files[0],
//                     });
//                   } else {
//                     setValues({ ...values, [e.target.name]: e.target.value });
//                   }
//                 }}
//                 inputProps={{
//                   ...(column.accessorKey === "image" && { type: "file" }),
//                 }}
//               />
//             ))}
//           </Stack>
//         </form>
//       </DialogContent>
//       <DialogActions sx={{ p: "1.25rem" }}>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button color="secondary" onClick={handleSubmit} variant="contained">
//           Add New
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// const validateAge = (age) => age >= 18 && age <= 50;

// export default AddDepartment;

import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import AddDepartment from "./AddDepartment";
import "./departmentpage.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../navbar/Navbar";
import Spinner from "../../components/Spinner";
const DepartmentPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dept, setDept] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true);
        const response = await axios.get("/admin/departments");
        setDept(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
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
      if (response.status === 201)
      console.log(response)
       toast.success(`${response.data.message}`,{position:toast.POSITION.TOP_CENTER});
    } catch (error) {

      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
    }
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
      toast.error(`${error.data?.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
        <div className="dept-container">
          <Navbar/>
          <div className="dept-heading">
            <h2>Department Management</h2>
          </div>
          <div className="data-card">
            {isLoading?(<Spinner/>):(<DataTable
            columns={columns}
            rows={dept}
            userType={userType}
            onEditButtonClick={handleEdit}
            onDeleteButtonClick={handleDelete}
          />)}

          </div>
          <div className="dept-button">
            <Button variant="contained" color="success" onClick={handleAdd}>
              ADD NEW
            </Button>
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
                {/* <TextField type="text" label="Name" variant="outlined" name="name" placeholder="Name"  /> */}
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

  );
};

export default DepartmentPage;
