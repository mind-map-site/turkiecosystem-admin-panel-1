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

const AdminDeleteImage = ({ id, setReload }) => {
  const [publicId, setPublicId] = useState('');

  const handleClickSubmit = async () => {
    try {
      const res = await deleteAboutImage(id, publicId);
      if (res.status === 200) {
        toast.success('Image deleted successfully');
        setReload((prev) => prev + 1);
      } else {
        toast.error('Failed to delete image');
        setPublicId('');
      }
    } catch {
      toast('Failed to delete image. There was a problem with your request.');
      setPublicId('');
    }
  };

  return (
    <form>
      <Card className="space-y-4">
        <CardHeader>
          <Typography variant="h6">Picture</Typography>
          <Typography variant="body2" color="textSecondary">
            You can delete the image by entering the public ID for the about tab.
          </Typography>
        </CardHeader>
        <CardContent className="space-y-2">
          <Typography variant="body2">Public Id</Typography>
          <TextField
            id="picture"
            type="text"
            name="publicId"
            placeholder="Enter public id of image you want to delete"
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
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
