import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const TagTableSection = ({ title, items, type, onUpdate, onDelete }) => {
    return (
        <>
            <h4 className="font-bold text-2xl mt-12 my-2">{title}</h4>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: '170px' }}>Name</TableCell>
                                <TableCell align="center" style={{ minWidth: '170px' }}>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items?.map((item) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography fontWeight={600}>en:</Typography>
                                            <Typography>{item.name.en}</Typography>
                                            <Typography fontWeight={600}>ru:</Typography>
                                            <Typography>{item.name.ru}</Typography>
                                            <Typography fontWeight={600}>az:</Typography>
                                            <Typography>{item.name.az}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Button onClick={() => onUpdate(item.id, type)}>Update</Button>
                                            <Button onClick={() => onDelete(item.id, type)}>Delete</Button>
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

export default TagTableSection;
