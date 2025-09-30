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

const CrudTable = ({ title, data = [], setUpdateId, setUpdateData, onDelete, setOpenU, isFullCrud, inputs }) => {
    function handleUpdate(itemId) {
        setUpdateId(itemId);
        setOpenU(true);
    }

    function handleUpdateData(updatedData_) {
        setUpdateData(updatedData_);
        setOpenU(true);
    }
    console.log(data);
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
                                {(data[0] && isFullCrud) ?
                                    Object.keys(data[0]).map(
                                        (key) =>
                                            key !== 'id' && (
                                                <TableCell key={key} align="center" className='capitalize font-bold'>
                                                    {key}
                                                </TableCell>
                                            )
                                    ) : <>
                                        {Object.keys(data).map(
                                            (key) => (
                                                <TableCell key={key} align="center" className='capitalize font-bold'>
                                                    {key}
                                                </TableCell>
                                            )
                                        )}
                                    </>}
                                <TableCell align="center" className='font-bold'>Operations</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {isFullCrud ? data.map((item) => (
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
                                            {
                                                isFullCrud &&
                                                <Button variant="outlined" color="error" onClick={() => onDelete(item.id)}>
                                                    Delete
                                                </Button>
                                            }
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                {
                                    Object.entries(data).map((item, index) => {
                                        console.log(item)
                                        return item[0] === "id" ? <TableCell>{index + 1}</TableCell> : <TableCell>{item[1]}</TableCell>
                                    })
                                }
                                <TableCell align="center">
                                    <Box display="flex" gap={1} justifyContent="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                const resData = inputs.reduce((acc, input) => {
                                                    acc[input.id] = data[input.id];
                                                    return acc;
                                                }, {});
                                                handleUpdateData(resData);
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default CrudTable;
