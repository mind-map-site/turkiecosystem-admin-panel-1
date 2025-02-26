import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { deleteAboutImage } from 'src/@mock-api/api/about-api';
import { toast } from 'react-toastify';

const AdminDeleteImage = ({ id, setReload, deleteImage }) => {
  const [ids, setIds] = useState({publicId:"", entryId:""});

  const handleClickSubmit = async () => {
    try {
      const res = await deleteImage(id || ids.entryId, ids.publicId);
      if (res.status === 200) {
        toast.success('Image deleted successfully');
        setReload((prev) => prev + 1);
      } else {
        toast.error('Failed to delete image');
        setIds('');
      }
    } catch {
      toast.error('Failed to delete image. There was a problem with your request.');
      setIds('');
    }
  };

  return (
    <form>
      <Card className="space-y-4">
        <CardHeader>
          <Typography variant="h6">Picture</Typography>
          <Typography variant="body2" color="textSecondary">
            You can delete the image by entering the public ID for the news tab.
          </Typography>
        </CardHeader>
        <CardContent className="space-y-2">
          {!id && 
          <>
         <Typography variant="body2" className='mt-2'>Id</Typography>
          <TextField
            id="id"
            type="text"
            name="id"
            placeholder="Enter id of single news you want to delete"
            value={ids.entryId}
            onChange={(e) => setIds((prev) => ({ ...prev, entryId: e.target.value }))}
            fullWidth
            />
          </>
          }
          <Typography variant="body2" className='mt-2'>Public Id</Typography>
          <TextField
            id="publicId"
            type="text"
            name="publicId"
            placeholder="Enter public id of image you want to delete"
            value={ids.publicId}
            onChange={(e) => setIds((prev) => ({ ...prev, publicId: e.target.value }))}
            fullWidth
            />
            
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSubmit}
            className="w-full"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AdminDeleteImage;
