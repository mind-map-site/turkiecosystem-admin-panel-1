import React from 'react';
import { TextField } from '@mui/material';

export default function TextareaFormikField({ name, formik, rows = 6, ...props }) {
  return (
    <div>
      <TextField
        multiline
        fullWidth
        minRows={rows}
        {...props}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </div>
  );
}
