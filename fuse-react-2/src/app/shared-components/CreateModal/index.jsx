import { Button, Modal, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { toast } from 'react-toastify';
import { postTagCountry, postTagIndustry, postTagProfiles } from 'src/@mock-api/api/ecosystem-api';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterTextField from '../FilterTextField';

const CreateModal = ({ open, setOpen, setReload, createdData, setCreatedData, sectionName }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    const isIndustry = createdData?.section === "industry";

    const handleOnChange = (index, lang, value) => {
        const updatedValues = [...createdData.values];
        updatedValues[index][lang] = value;
        setCreatedData(prev => ({ ...prev, values: updatedValues }));
    };

    const addField = () => {
        setCreatedData(prev => ({
            ...prev,
            values: [...prev.values, { en: "", az: "", ru: "" }]
        }));
    };

    const removeField = (index) => {
        const updated = [...createdData.values];
        updated.splice(index, 1);
        setCreatedData(prev => ({ ...prev, values: updated }));
    };

  const handleSubmitCreate = async () => {
    
    try {
        if (createdData.section === "industry") {
            
            const sendedArray = createdData.values.map(item => ({
                "name.en": item.en,
                "name.ru": item.ru,
                "name.az": item.az
            }));

            const res = await postTagIndustry(sendedArray); // 👈 one request with array
            if (res.data?.status === 200 || res.data?.status === 201) {
                toast.success(`Your ${sectionName}(s) created successfully`);
                setReload(prev => ++prev);
                setOpen(false);
            } else {
                toast.error(`Failed to create your ${sectionName}(s)`);
            }
        } else {
            
            // for profile & country: send single object
            const sendedData = {
                "name.en": createdData.values[0].en,
                "name.ru": createdData.values[0].ru,
                "name.az": createdData.values[0].az
            };
                console.log("it is my sended data",sendedData);

            let res = null;
            if (createdData.section === "profile") {
                res = await postTagProfiles(sendedData);
            }
            if (createdData.section === "country") {
                res = await postTagCountry(sendedData);
            }

            if (res?.data?.status === 200 || res?.data?.status === 201) {
                toast.success(`Your ${sectionName} created successfully`);
                setReload(prev => ++prev);
                setOpen(false);
            } else {
                toast.error(`Failed to create your ${sectionName}`);
            }
        }
    } catch (err) {
        console.error(err);
        toast.error(`Error occurred while creating ${sectionName}(s)`);
    }
};


    return (
        <>
            {createdData && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby={`modal-modal-${sectionName}`}
                    aria-describedby={`modal-modal-${sectionName}`}
                >
                    <Box sx={style}>
                        {createdData.values.map((val, index) => (
                            <Box key={index} mb={2} display="flex" gap={1} flexDirection="column">
                                <FilterTextField
                                    title={`Name (English)`}
                                    value={val.en}
                                    onChange={(e) => handleOnChange(index, "en", e.target.value)}
                                />
                                <FilterTextField
                                    title={`Name (Russian)`}
                                    value={val.ru}
                                    onChange={(e) => handleOnChange(index, "ru", e.target.value)}
                                />
                                <FilterTextField
                                    title={`Name (Azerbaijani)`}
                                    value={val.az}
                                    onChange={(e) => handleOnChange(index, "az", e.target.value)}
                                />

                                {isIndustry && createdData.values.length > 1 && (
                                    <IconButton onClick={() => removeField(index)} sx={{ alignSelf: 'flex-end' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}

                        {isIndustry && (
                            <Button onClick={addField} sx={{ mb: 2 }}>
                                + Add More Industry Tag
                            </Button>
                        )}

                        <Button onClick={handleSubmitCreate} variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default CreateModal;
