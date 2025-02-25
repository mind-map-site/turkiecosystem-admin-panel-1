import React from 'react'
import { toast } from 'react-toastify';
import useFormikForm from 'src/hooks/use-formik-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Box,
    Button,
} from '@mui/material';

const AdminCreateTableData = ({ setReload, createData, initialValues, useValidation, inputs, section }) => {
    const validation = useValidation();
    const formik = useFormikForm(initialValues, validation, onSubmit);

    function onSubmit(values) {
        // console.log(values);
        let formData = {}
        if (section === "news") {
            formData = {
                'description.en': values.descEn,
                'description.az': values.descAz,
                'description.ru': values.descRu,
                'title.en': values.titleEn,
                'title.az': values.titleAz,
                'title.ru': values.titleRu,
                'content.en': "This is unused content",
                'content.az': "This is unused content",
                'content.ru': "This is unused content"
            };
        }

        createData(formData)
            .then((res) => {
                setReload((prev) => prev + 1);
                if (res.data.success && res.data.status === 201) {
                    toast.success('Content has been updated successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    console.log(res);
                    toast.error('Something went wrong');
                }
            })
            .catch((err) => {
                toast.error('There was a problem with your request: ');
            });
    }


    return (
        <div>
            {section === "news" &&
                <Box my={2}>
                    You will create just title and description, image will be add with another tab.
                </Box>
            }


            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {
                    inputs.map(({ title, description, type, isLang, id, name }, i) => {
                        return <div key={i}>
                            <Box className="p-2 mb-4">
                                <h5 className="text-lg font-semibold">{title}</h5>
                                <p className="text-sm">
                                    {description}
                                </p>
                            </Box>

                            {isLang &&
                                <Card className="mt-2">
                                    <CardContent className="space-y-2">
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                English
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField
                                                    multiline
                                                    rows={6}
                                                    fullWidth
                                                    id={id + "En"}
                                                    name={name + "En"}
                                                    value={formik.values[name + "En"]}
                                                    onChange={formik.handleChange}
                                                    // error={formik.touched[name] && Boolean(formik.errors[name])}
                                                    // helperText={formik.touched[name] && formik.errors[name]}
                                                />
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                Russian
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField
                                                    id={id + 'Ru'}
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                    name={name + "Ru"}
                                                    value={formik.values[name + "Ru"]}
                                                    onChange={formik.handleChange}
                                                    // error={formik.touched[name] && Boolean(formik.errors[name])}
                                                    // helperText={formik.touched[name] && formik.errors[name]}
                                                />
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                Azerbaijani
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                    id={id + "Az"}
                                                    name={name + "Az"}
                                                    value={formik.values[name + "Az"]}
                                                    onChange={formik.handleChange}
                                                    // error={formik.touched[name] && Boolean(formik.errors[name])}
                                                    // helperText={formik.touched[name] && formik.errors[name]}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            }

                        </div>
                    })
                }
               <CardActions className="p-4">
                       <Button type="submit" variant="contained" color="primary">
                         Submit
                       </Button>
                     </CardActions>
            </form>
        </div>
    )
}

export default AdminCreateTableData