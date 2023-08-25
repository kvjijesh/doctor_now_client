import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({
  rows,
  columns,
  onViewButtonClick,
  onApproveButtonClick,
  onBlockButtonClick,
  onUserBlockButtonClick,
  userType,
  onEditButtonClick,
  onDeleteButtonClick,

}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: " 0 0 28px 4px rgb(149, 145, 145)",
        borderRadius: "0.8rem",
      }}
    >
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: "1.5rem" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ fontSize: "1.5rem" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize: "1.3rem" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {userType === "user" ? (
                      <TableCell>
                        {row.is_blocked ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>{
                              onUserBlockButtonClick(row._id, !row.is_blocked)
                              }
                            }
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              onUserBlockButtonClick(row._id, !row.is_blocked)
                            }
                          >
                            Block
                          </Button>
                        )}
                      </TableCell>
                    ) : userType === "department" ? (
                      <TableCell>
                        <>
                          <Button
                            color="success"
                            onClick={() => onEditButtonClick(row)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            color="error"
                            onClick={() => onDeleteButtonClick(row._id)}
                          >
                            {" "}
                            <DeleteIcon />
                          </Button>
                        </>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => onViewButtonClick(row)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
