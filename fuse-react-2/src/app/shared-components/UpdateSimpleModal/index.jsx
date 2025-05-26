import { Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, {useEffect} from 'react'
import useFormikForm from 'src/hooks/use-formik-form';

const UpdateSimpleModal = ({ open, setOpen, singleGetApi, updateId, handleUpdate, useDataForm }) => {
    console.log(open);
    const { validation, initialValues, inputs } = useDataForm();
    const formik = useFormikForm(initialValues, validation, onSubmit);

    async function onSubmit(values) {
        handleUpdate(updateId, values);
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    useEffect(() => {
        if (open) {
            const getSingleData = async ()=>{
                const res = await singleGetApi(updateId);
                console.log(res);
                if (res.success) {
                    const formikValues = {
                        type: res.data.type,
                        url: res.data.url
                    }
                    formik.setValues(formikValues);
                }
            }
            getSingleData();
        }
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    {inputs.map(({ title, description, type, id, name, options }) => {
                        return <>
                            <Box className="p-2 mb-4">
                                <h5 className="text-lg font-semibold">{title}</h5>
                                <p className="text-sm">
                                    {description}
                                </p>
                            </Box>

                            {
                                type === "select" ? (
                                    <FormControl fullWidth>
                                        <InputLabel id={`${name}-label`}>{title}</InputLabel>
                                        <Select
                                            labelId={`${name}-label`}
                                            id={name}
                                            name={name}
                                            value={formik.values[name]}
                                            onChange={formik.handleChange}
                                            error={formik.touched[name] && Boolean(formik.errors[name])}
                                        >
                                            {options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        multiline
                                        rows={6}
                                        fullWidth
                                        id={id}
                                        name={name}
                                        value={formik.values[name]}
                                        onChange={formik.handleChange}
                                        error={formik.touched[name] && Boolean(formik.errors[name])}
                                        helperText={formik.touched[name] && formik.errors[name]}
                                    />
                                )
                            }

                        </>

                    })}
                    <Button className='mt-8' type='submit' variant="outlined" color="success" >Submit</Button>
                </form>
            </Box>
        </Modal>
    )
}

export default UpdateSimpleModal