import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { toast } from 'react-toastify';
import { postTagCountry, postTagIndustry, postTagProfiles } from 'src/@mock-api/api/ecosystem-api';
import FilterTextField from '../FilterTextField';

const CreateModal = ({ open, setOpen, setReload, createdData, setCreatedData, sectionName }) => {
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


    function handleResponseTag(sendedData_) {
        let postFunction = null;
        if (createdData.section === "profile") {
            postFunction =  postTagProfiles(sendedData_);
        }
        if (createdData.section === "industry") {
            postFunction = postTagIndustry(sendedData_);
        }
        if (createdData.section === "country") {
            postFunction = postTagCountry(sendedData_);
        }
        return postFunction;
    }

    function handleResponseCodes(res) {
        if (res.data.status === 201 || res.data.status === 200) {
            setReload(prev => ++prev);
            toast.success(`Your ${sectionName} is created successfully`);
        } else {
            toast.error(`Failed to create your ${sectionName}`);
        }
    }

    const handleSubmitCreate = async () => {
        const sendedData = {
            "name.en": createdData.values.en,
            "name.ru": createdData.values.ru,
            "name.az": createdData.values.az
        }

        const res = await handleResponseTag(sendedData);
        handleResponseCodes(res);
    }

    const handleOnChange = async (e, lang) => {
        if (sectionName === "tag" && lang) {
            setCreatedData((prev) => { return { ...prev, values: { ...prev?.values, [lang]: e.target.value } } })
        }
    }

    return (
        <>
            {createdData && <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={`modal-modal-${sectionName}`}
                aria-describedby={`modal-modal-${sectionName}`}
            >
                <Box sx={style}>
                    <FilterTextField title={`${sectionName} ${createdData.section} ${sectionName === "tag" ? "(in English)" : ""}`}
                        value={createdData?.values?.en}
                        onChange={(e) => handleOnChange(e, "en")}
                    />
                    {sectionName === "tag" &&
                        <>
                            <FilterTextField title={`${sectionName} ${createdData.section} (in Russian)`}
                                value={createdData?.values?.ru}
                                onChange={(e) => handleOnChange(e, "ru")}
                            />
                            <FilterTextField title={`${sectionName} ${createdData.section} (in Azerbajani)`}
                                value={createdData?.values?.az}
                                onChange={(e) => handleOnChange(e, "az")}
                            />
                        </>
                    }
                    <Button onClick={handleSubmitCreate}>
                        Submit
                    </Button>
                </Box>

            </Modal>
            }
        </>
    )
}


export default CreateModal