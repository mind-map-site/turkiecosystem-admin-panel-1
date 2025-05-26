import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { toast } from 'react-toastify';
import { putTagCountry, putTagIndustry, putTagProfiles } from 'src/@mock-api/api/ecosystem-api';
import FilterTextField from '../FilterTextField';

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

const UpdateModal = ({ open, setOpen, setReload, updatedData, setUpdatedData, sectionName }) => {

    function handleResponseCodes(res) {
        if (res.data.success) {
            setReload(prev => ++prev);
            toast.success(`Your ${sectionName} is updated successfully`);
        } else {
            toast.error(`Failed to update your ${sectionName}`);
        }
    }

    function handleApiTag(id) {
        let putFunction = null;
        if (updatedData.section === "profile") {
            const sendedData = {
                "name.en": updatedData.profileValues.en,
                "name.ru": updatedData.profileValues.ru,
                "name.az": updatedData.profileValues.az
            }
            putFunction = putTagProfiles(id, sendedData);
        }
        if (updatedData.section === "industry") {
            const sendedData = {
                "name.en": updatedData.countryValues.en,
                "name.ru": updatedData.countryValues.ru,
                "name.az": updatedData.countryValues.az
            }
            putFunction = putTagCountry(id, sendedData);
        }
        if (updatedData.section === "country") {
            const sendedData = {
                "name.en": updatedData.industryValues.en,
                "name.ru": updatedData.industryValues.ru,
                "name.az": updatedData.industryValues.az
            }
            putFunction = putTagCountry(id, sendedData);
        }
        return putFunction;
    }

    const handleSubmitUpdate = async () => {
        const res = await handleApiTag(updatedData.id);
        handleResponseCodes(res);
    }

    const handleOnChange = (e, lang, subSection) => {
        if (sectionName === "tag" && lang && subSection) {
            setUpdatedData((prev) => ({
                ...prev,
                [`${subSection}Values`]: {
                    ...prev?.[`${subSection}Values`],
                    [lang]: e.target.value,
                },
            }));
        }
    };

    const renderInputs = () => {
        const section = updatedData?.section;
        const values = updatedData?.[`${section}Values`] || {};
        if (!section) return null;

        return (
            <Box sx={style}>
                <FilterTextField
                    title={`${sectionName} ${section} (in English)`}
                    value={values.en || ""}
                    onChange={(e) => handleOnChange(e, "en", section)}
                />
                {sectionName === "tag" && (
                    <>
                        <FilterTextField
                            title={`${sectionName} ${section} (in Russian)`}
                            value={values.ru || ""}
                            onChange={(e) => handleOnChange(e, "ru", section)}
                        />
                        <FilterTextField
                            title={`${sectionName} ${section} (in Azerbaijani)`}
                            value={values.az || ""}
                            onChange={(e) => handleOnChange(e, "az", section)}
                        />
                    </>
                )}
                <Button onClick={handleSubmitUpdate}>Submit</Button>
            </Box>
        );
    };

    return (
        <div>
            {updatedData?.section && <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {renderInputs()}
            </Modal>}

        </div>
    )
}

export default UpdateModal