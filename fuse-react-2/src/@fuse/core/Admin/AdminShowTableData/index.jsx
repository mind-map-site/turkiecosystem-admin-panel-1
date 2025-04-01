import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, IconButton, Typography } from '@mui/material';
import { ContentCopyOutlined } from '@mui/icons-material';
import copyToClipboard from '@fuse/utils/copyContent';

const baseColumns = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'image',
        label: 'Image',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'view',
        label: 'View',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];


export default function AdminShowTableData({ setReload, data, section =" " }) {
    const getColumns = (section) => {
        if (section === 'ecosystem') {
            return [
                ...baseColumns,
                { id: 'tagCountry', label: 'Tag Country', minWidth: 170, align: 'right' },
                { id: 'tagProfile', label: 'Tag Profile', minWidth: 170, align: 'right' },
                { id: 'tagIndustry', label: 'Tag Industry', minWidth: 170, align: 'right' },
            ];
        }
        return baseColumns;
    };
    const columns = getColumns(section);

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
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    // align="center"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {column.id === 'title' || column.id === 'description'  ?
                                                        <Box>
                                                            <Typography fontWeight={600}>en:</Typography>
                                                            <Typography>{row[column.id]?.en} </Typography>
                                                            <Typography fontWeight={600}>ru:</Typography>
                                                            <Typography>{row[column.id]?.ru}</Typography>
                                                            <Typography fontWeight={600}>az:</Typography>
                                                            <Typography>{row[column.id]?.az}</Typography>
                                                        </Box>
                                                        :
                                                        column.id.startsWith("tag") ? 
                                                            <Box>
                                                                <Typography fontWeight={600}>en:</Typography>
                                                                <Typography>{row[column.id]?.name.en} </Typography>
                                                                <Typography fontWeight={600}>ru:</Typography>
                                                                <Typography>{row[column.id]?.name.ru}</Typography>
                                                                <Typography fontWeight={600}>az:</Typography>
                                                                <Typography>{row[column.id]?.name.az}</Typography>
                                                            </Box> :
                                                            
                                                        column.id === "image" ?

                                                            <Box>
                                                                <Typography fontWeight={600}>publicId:</Typography>
                                                                <Typography>{row[column.id]?.href?.publicId} {row[column.id]?.href?.publicId &&
                                                                    <IconButton onClick={() => copyToClipboard(row[column.id]?.href?.publicId)}><ContentCopyOutlined sx={{ fontSize: 16 }} /></IconButton>
                                                                }</Typography>
                                                                <Typography fontWeight={600}>url:</Typography>
                                                                <Typography>{row[column.id]?.href?.url} </Typography>
                                                                <Typography fontWeight={600}>image:</Typography>
                                                                {row[column.id]?.href?.url && <img style={{ width: "200px", height: "auto", display: "block", marginInline: "auto" }} src={row[column.id]?.href?.url} alt="current" />}

                                                            </Box>
                                                            : column.id === "id" ?
                                                                <Typography >{value} <IconButton onClick={() => copyToClipboard(value)}><ContentCopyOutlined sx={{ fontSize: 16 }} /></IconButton></Typography>
                                                                : value
                                                    }
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
