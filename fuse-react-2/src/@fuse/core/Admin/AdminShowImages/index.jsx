import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Avatar,
  Box,
  Typography
} from '@mui/material';

const AdminShowImages = ({data, section, setReload}) => {
    console.log(data, section);
  return (
    <>
  <Typography variant="body2" color={"error"}>The images should be in approximately 800 x 400 resolution.</Typography>
 <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {item.images.map((img, idx) => (
                    <Box key={idx} display="flex" alignItems="center" gap={1}>
                      <Avatar
                        variant="square"
                        src={img.href.url}
                        alt={img.href.title || `image-${idx}`}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Box>
                        <Typography variant="body2">{img.href.title}</Typography>
                        <Typography variant="caption">PublicId: {img.href.publicId}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
          </>
    )
}

export default AdminShowImages