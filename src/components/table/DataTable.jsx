import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 100 },
//   { id: 'specialisation', label: 'Specialisation', minWidth: 170 },
//   {
//     id: 'email',
//     label: 'Email',
//     minWidth: 170,
//   },
//   {
//     id: 'isVerified',
//     label: 'Status',
//     minWidth: 100,

//   },
//   {
//     id: 'registrtionNumber',
//     label: 'Registrtion Number',
//     minWidth: 100,
//     format: (value) => value.value.toLocaleString('en-US'),
//   },
//   {
//     id: 'actions',
//     label: 'Actions',
//     minWidth: 150,
//     align: 'right',
//     format: (value) => (

//       <Button variant="contained" color={value.is_blocked ? 'secondary' : 'primary'}>
//         {value.is_blocked ? 'Unblock' : 'Block'}
//       </Button>
//     ),
//   },
// ];


export default function DataTable({rows,columns}) {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: '1.5rem' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                            console.log();
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize: '1.3rem' }}
                        >

                          {column.format && typeof value === 'number'

                            ? column.format(value)
                            : column.id === 'actions'
                            ? column.format({ is_blocked: value })
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
