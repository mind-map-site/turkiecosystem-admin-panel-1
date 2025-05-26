import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardActions, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { handleResponseSuccess } from '@fuse/utils/response';

const AdminAddImage = ({ id, setReload, image, addImage, section }) => {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleChange = (e) => {
    setValue(e.target.value)
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        if (section === "logo") {
          const res = await addImage(formData);
          handleResponseSuccess(res, "image", setReload);
        } else {
          const res = await addImage(id || value, formData);
          handleResponseSuccess(res, "image", setReload);

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
          <Typography variant="body2">Your Current Image</Typography>
          {file ? (
            <img src={imageUrl} alt="Selected" style={{ width: "200px", height: "auto" }} />
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
