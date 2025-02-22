import React from 'react';
import { TextField } from '@mui/material';

export default function FormikField({ name, formik, type = 'text', ...props }) {
  return (
    <div>
      <TextField
        fullWidth
        type={type}
        {...props}
        name={name}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </div>
  );
}
