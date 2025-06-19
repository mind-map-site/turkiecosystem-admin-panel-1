import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardActions, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import handleResponseSuccess from '@fuse/utils/response';

const AdminAddImage = ({ id, setReload, image, addImage, section }) => {
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setImageUrls(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) return;

    try {
      if (section === "multi") {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`images`, file); 
        });
        const res = await addImage(formData);
        handleResponseSuccess(res, "images", setReload);
      } else {
        const formData = new FormData();
        formData.append('image', files[0]);
        const res = section === "logo"
          ? await addImage(formData)
          : await addImage(id || value, formData);
        handleResponseSuccess(res, "image", setReload);
      }
    } catch {
      toast.error('Failed to upload image(s). There was a problem with your request.');
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
          {
            !id &&
            <>
              <Typography variant="body2">Enter {section} Id </Typography>
              <TextField
                onChange={handleChange}
                value={value}
                id='image_id'
                name='image_id'
              />
            </>
          }

          <Typography variant="body2" className='mt-2'>New Picture</Typography>
          <input
            id="picture"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </CardContent>

        <CardContent className="space-y-2">
          <Typography variant="body2">Your Current Image{section === 'multi' ? 's' : ''}</Typography>
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Selected ${idx + 1}`}
                style={{ width: "200px", height: "auto", marginBottom: 8 }}
              />
            ))
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
