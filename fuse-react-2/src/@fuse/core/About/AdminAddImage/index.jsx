import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardActions, Typography } from '@mui/material';
import { sendAboutImage } from 'src/@mock-api/api/about-api';
import { toast } from 'react-toastify';

const AdminAddImage = ({ id, setReload, image }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await sendAboutImage(id, formData);
        if (res.status === 201) {
          toast.success('Image uploaded successfully');
          setReload((prev) => prev + 1);
        } else {
          toast.error('Failed to upload image');
        }
      } catch {
        toast.error('Failed to upload image. There was a problem with your request.');
      }
    }
  };

  return (
    <form>
      <Card className="space-y-4">
        <CardHeader>
          <Typography variant="h6">Picture</Typography>
          <Typography variant="body2" color="textSecondary">
            You can upload your image for about tab.
          </Typography>
        </CardHeader>
        <CardContent className="space-y-2">
          <Typography variant="body2">New Picture</Typography>
          <input
            id="picture"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </CardContent>
        <CardContent className="space-y-2">
          <Typography variant="body2">Your Current Image</Typography>
          {image ? (
            <img src={image.href.url} alt="about" />
          ) : (
            <Typography variant="body2">There is no image</Typography>
          )}
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

export default AdminAddImage;
