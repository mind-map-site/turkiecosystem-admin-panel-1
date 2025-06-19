import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { ContentCopyOutlined } from '@mui/icons-material';
import copyToClipboard from '@fuse/utils/copyContent';

const baseColumns = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 170, align: 'right' },
    { id: 'image', label: 'Image', minWidth: 170, align: 'right' },
    { id: 'time', label: 'Time', minWidth: 170, align: 'right' },
    { id: 'view', label: 'View', minWidth: 170, align: 'right' },
];

export default function AdminShowTableData({ data, section = "", pagination, setTablePage }) {
    const [tableData, setTableData] = React.useState(data || []);
    const [tablePagination, setTablePagination] = React.useState(pagination || []);
    const [page, setPage] = React.useState(pagination.currentPage - 1);
    const [rowsPerPage, setRowsPerPage] = React.useState(pagination.itemsPerPage);
    const [loading, setLoading] = React.useState(false);

    const getColumns = (_section) => {
        if (_section === 'ecosystem') {
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

    React.useEffect(() => {
        setPage(+(pagination.currentPage - 1));
        // setRowsPerPage(pagination.itemsPerPage);
    }, [pagination]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage);
        setTablePage(newPage + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        const newSize = +event.target.value;
        setRowsPerPage(newSize);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.7)', zIndex: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth }} align={column.align || 'left'}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow hover key={row.id}>
                                {columns.map(column => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align="center">
                                            {column.id === 'title' || column.id === 'description' ? (
                                                <Box>
                                                    <Typography fontWeight={600}>en:</Typography>
                                                    <Typography>{value?.en}</Typography>
                                                    <Typography fontWeight={600}>ru:</Typography>
                                                    {/* <Typography>{value?.ru}</Typography>
                          <Typography fontWeight={600}>az:</Typography>
                          <Typography>{value?.az}</Typography> */}
                                                </Box>
                                            ) : column.id.startsWith('tagIndustry') ? (
                                                <Box>
                                                    {value && value.map((item, index) => (
                                                        <>
                                                            <Typography fontWeight={600}>en:</Typography>
                                                            <Typography>{item?.name?.en}</Typography>
                                                            {/* <Typography fontWeight={600}>ru:</Typography>
                                <Typography>{item?.name?.ru}</Typography>
                                <Typography fontWeight={600}>az:</Typography>
                                <Typography>{item?.name?.az}</Typography> */}
                                                        </>

                                                    ))}
                                                </Box>

                                            ) : column.id.startsWith('tag') ?

                                                (
                                                    <Box>
                                                        <Typography fontWeight={600}>salamn:</Typography>
                                                        <Typography>{value?.name?.en}</Typography>
                                                        {/* <Typography fontWeight={600}>ru:</Typography>
                          <Typography>{value?.name?.ru}</Typography>
                          <Typography fontWeight={600}>az:</Typography>
                          <Typography>{value?.name?.az}</Typography> */}
                                                    </Box>
                                                )
                                                : column.id === 'image' ? (
                                                    <Box>
                                                        <Typography fontWeight={600}>publicId:</Typography>
                                                        <Typography>
                                                            {value?.href?.publicId}{' '}
                                                            {value?.href?.publicId && (
                                                                <IconButton onClick={() => copyToClipboard(value.href.publicId)}>
                                                                    <ContentCopyOutlined sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                            )}
                                                        </Typography>
                                                        <Typography fontWeight={600}>url:</Typography>
                                                        <Typography>{value?.href?.url}</Typography>
                                                        {value?.href?.url && (
                                                            <img
                                                                src={value.href.url}
                                                                alt="current"
                                                                style={{ width: 200, height: 'auto', display: 'block', margin: 'auto' }}
                                                            />
                                                        )}
                                                    </Box>
                                                ) : column.id === 'id' ? (
                                                    <Typography>
                                                        {value}{' '}
                                                        <IconButton onClick={() => copyToClipboard(value)}>
                                                            <ContentCopyOutlined sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                    </Typography>
                                                ) : (
                                                    value
                                                )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={pagination?.totalItems || 0}
                rowsPerPage={6}
                page={+page || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[0]}
            />
        </Paper>
    );
}
