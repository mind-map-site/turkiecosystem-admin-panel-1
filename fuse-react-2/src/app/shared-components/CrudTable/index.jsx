import React from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

const CrudTable = ({ title, data = [], setUpdateId, onDelete, setOpenU }) => {
    function handleUpdate(itemId) {
        setUpdateId(itemId);
        setOpenU(true);
    }
    return (
        <>
            <Typography variant="h5" fontWeight="bold" my={2}>
                {title}
            </Typography>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="crud table">
                        <TableHead>
                            <TableRow>
                                {data[0] &&
                                    Object.keys(data[0]).map(
                                        (key) =>
                                            key !== 'id' && (
                                                <TableCell key={key} align="center" className='capitalize font-bold'>
                                                    {key}
                                                </TableCell>
                                            )
                                    )}
                                <TableCell align="center" className='font-bold'>Operations</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((item) => (
                                <TableRow hover key={item.id}>
                                    {Object.keys(item).map(
                                        (key) =>
                                            key !== 'id' && (
                                                <TableCell key={key} align="center">
                                                    {key === "url" ? <a href={item[key]} target="_blank" rel="noreferrer">{item[key]}</a>
                                                        : item[key]
                                                    }
                                                </TableCell>
                                            )
                                    )}
                                    <TableCell align="center">
                                        <Box display="flex" gap={1} justifyContent="center">
                                            <Button variant="outlined" color="primary" onClick={() => handleUpdate(item.id)}>
                                                Update
                                            </Button>
                                            <Button variant="outlined" color="error" onClick={() => onDelete(item.id)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default CrudTable;
