import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import useFormikForm from 'src/hooks/use-formik-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Card,
    CardContent,
    CardActions,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { getFilterData } from 'src/@mock-api/api/ecosystem-api';

const AdminCreateTableData = ({ setReload, createData, initialValues, useValidation, inputs, section }) => {
    const validation = useValidation();
    const formik = useFormikForm(initialValues, validation, onSubmit);
    const [filterData, setFilterData] = useState(null);

    useEffect(() => {
        if (section === "ecosystem") {
            const getEcosystemFilterData = async () => {
                const res = await getFilterData();
                if (res.status === 200) {
                    setFilterData(res.data.data);
                }
            }

            getEcosystemFilterData();
            
        }
    }, [])
    

    function onSubmit(values) {
        console.log(values);
        let formData = {}
        if (section !== "ecosystem") {
            formData = {
                'description.en': values.descriptionEn,
                'description.az': values.descriptionAz,
                'description.ru': values.descriptionRu,
                'title.en': values.titleEn,
                'title.az': values.titleAz,
                'title.ru': values.titleRu,
            };
            if (section === "news") {
                formData['content.en'] = "This is unused content";
                formData['content.az'] = "This is unused content";
                formData['content.ru'] = "This is unused content";
            }
        } else {
            console.log(values);
            formData = {
                'description.en': values.descriptionEn,
                'description.az': values.descriptionAz,
                'description.ru': values.descriptionRu,
                'title.en': values.titleEn,
                'title.az': values.titleAz,
                'title.ru': values.titleRu,
                "tagIndustry": values.tagIndustry,
                "tagProfile": values.tagProfile,
                'tagCountry': values.tagCountry
            }
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
                    // console.log(res);
                    toast.error('Something went wrong');
                }
            })
            .catch((err) => {
                toast.error('There was a problem with your request: ');
            });
    }


    return (
        <div>
            {section !== "ecosystem" &&
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

                            {(type === "text" && isLang) ?
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
                                                    id={`${id}En`}
                                                    name={`${name}En`}
                                                    value={formik.values[`${name}En`]}
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
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                    id={`${id}Ru`}
                                                    name={`${name}Ru`}
                                                    value={formik.values[`${name}Ru`]}
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
                                                    id={`${id}Az`}
                                                    name={`${name}Az`}
                                                    value={formik.values[`${name}Az`]}
                                                    onChange={formik.handleChange}
                                                // error={formik.touched[name] && Boolean(formik.errors[name])}
                                                // helperText={formik.touched[name] && formik.errors[name]}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                    </CardContent>
                                </Card> :
                                (type === "select" && filterData ) ?
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                                        <Select
                                            name={name}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values[name]}
                                            label={title}
                                            onChange={formik.handleChange}
                                        >
                                            {filterData[id].map(tag => {
                                                return <MenuItem value={tag?.id}>{tag?.name?.en}</MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                    : null
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