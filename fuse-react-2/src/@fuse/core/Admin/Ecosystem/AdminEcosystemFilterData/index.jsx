import React, { useState, useEffect } from 'react'
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'
import { deleteTagCountry, deleteTagProfiles, getFilterData, getSingleTagCountry, getSingleTagIndustry, getTagProfile, postTagCountry, postTagIndustry, postTagProfiles, putTagProfiles } from 'src/@mock-api/api/ecosystem-api'

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

const AdminEcosystemFilterData = () => {
    // modal open for updated 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // modal open for created 
    const [openC, setOpenC] = React.useState(false);
    const handleOpenC = () => setOpenC(true);
    const handleCloseC = () => setOpenC(false);

    const [filterData, setFilterData] = useState(null)
    const [updatedData, setUpdatedData] = useState(null)
    const [createdData, setCreatedData] = useState(null)
    useEffect(() => {
        const getEcosystemFilterData = async () => {
            const res = await getFilterData();
            if (res.status === 200) {
                setFilterData(res.data.data);
            }
        }

        getEcosystemFilterData();
    }, [])
    console.log(filterData)


    const handleDelete = async (id, section) => {
        if (section === "profile") {
            const res = await deleteTagProfiles(id);
            if (res.data.success) {
                toast.success("Your Profile is deleted successfully");
            } else {
                toast.error("Failed to delete your Profile");
            }

        }
        if (section === "country") {
            const res = await deleteTagCountry(id);
            if (res.data.success) {
                toast.success("Your Country is deleted successfully");
            } else {
                toast.error("Failed to delete your Country");
            }

        }
    }

    const handleUpdate = async (id, section) => {

        if (section === "profile") {
            getTagProfile(id).then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    setUpdatedData({
                        id,
                        section,
                        profileValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your Profile")
            }).finally(() => {
                handleOpen();
            })
        }
        if (section === "country") {
            getSingleTagCountry(id).then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    setUpdatedData({
                        id,
                        section,
                        countryValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your Profile")
            }).finally(() => {
                handleOpen();
            })
        }
        if (section === "industry") {
            getSingleTagIndustry(id).then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    setUpdatedData({
                        id,
                        section,
                        industryValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your industry")
            }).finally(() => {
                handleOpen();
            })
        }
    }

    const handleCreate = async (section) => {
        setCreatedData({
            section, values: {
                en: "",
                az: "",
                ru: ""
            }
        });
        handleOpenC();

    }
    const handleSubmitCreate = async () => {
            const sendedData = {
                "name.en": createdData.values.en,
                "name.ru": createdData.values.ru,
                "name.az": createdData.values.az
        }
        if (createdData.section === "profile") {
            const res = await postTagProfiles(sendedData);
            if (res.data.status === 201) {
                toast.success("Your tag is created successfully");
            } else {
                toast.error("Failed to create your tag");
            }
        }
        if (createdData.section === "industry") {
            const res = await postTagIndustry(sendedData);
            if (res.data.status === 201) {
                toast.success("Your tag is created successfully");
            } else {
                toast.error("Failed to create your tag");
            }
        }
        if (createdData.section === "country") {
            const res = await postTagCountry(sendedData);
            if (res.data.status === 201) {
                toast.success("Your tag is created successfully");
            } else {
                toast.error("Failed to create your tag");
            }
        }
    
    }

    const handleSubmitUpdate = async () => {

        if (updatedData.section === "profile") {
            console.log(updatedData.profileValues, updatedData.profileValues.en)
            const sendedData = {
                "name.en": updatedData.profileValues.en,
                "name.ru": updatedData.profileValues.ru,
                "name.az": updatedData.profileValues.az
            }
            const res = await putTagProfiles(updatedData.id, sendedData);
            if (res.data.success) {
                toast.success("Your Profile is updated successfully");
            } else {
                toast.error("Failed to update your Profile");
            }
        }
        if (updatedData.section === "country") {
            // console.log(updatedData.profileValues, updatedData.profileValues.en)
            const sendedData = {
                "name.en": updatedData.countryValues.en,
                "name.ru": updatedData.countryValues.ru,
                "name.az": updatedData.countryValues.az
            }
            const res = await putTagProfiles(updatedData.id, sendedData);
            if (res.data.success) {
                toast.success("Your Country is updated successfully");
            } else {
                toast.error("Failed to update your Country");
            }
        }
        if (updatedData.section === "industry") {
            // console.log(updatedData.profileValues, updatedData.profileValues.en)
            const sendedData = {
                "name.en": updatedData.industryValues.en,
                "name.ru": updatedData.industryValues.ru,
                "name.az": updatedData.industryValues.az
            }
            const res = await putTagProfiles(updatedData.id, sendedData);
            if (res.data.success) {
                toast.success("Your Industry is updated successfully");
            } else {
                toast.error("Failed to update your Industry");
            }
        }
    }

    return (
        <div>

            <Button onClick={() => handleCreate("industry")}>Create Industry Tag</Button>
            <Button onClick={() => handleCreate("country")}>Create Country Tag</Button>
            <Button onClick={() => handleCreate("profile")}>Create Profile Tag</Button>

            <h4 className='font-bold text-2xl my-2'>Tag Profiles data</h4>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Operations
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filterData ? filterData?.profile.map(profile => {
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={"name"}>
                                        <TableCell align="center">
                                            <Box>
                                                <Typography fontWeight={600}>en:</Typography>
                                                <Typography>{profile?.name?.en} </Typography>
                                                <Typography fontWeight={600}>ru:</Typography>
                                                <Typography>{profile?.name.ru}</Typography>
                                                <Typography fontWeight={600}>az:</Typography>
                                                <Typography>{profile?.name.az}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <Button onClick={() => handleUpdate(profile.id, "profile")}>Update</Button>
                                                <Button onClick={() => handleDelete(profile.id, "profile")}>Delete</Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                }) : null
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


            <h4 className='font-bold text-2xl mt-12 my-2'>Tag Countries data</h4>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Operations
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filterData ? filterData?.country.map(country => {
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={"name"}>
                                        <TableCell align="center">
                                            <Box>
                                                <Typography fontWeight={600}>en:</Typography>
                                                <Typography>{country?.name?.en} </Typography>
                                                <Typography fontWeight={600}>ru:</Typography>
                                                <Typography>{country?.name.ru}</Typography>
                                                <Typography fontWeight={600}>az:</Typography>
                                                <Typography>{country?.name.az}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <Button onClick={() => handleUpdate(country.id, "country")}>Update</Button>
                                                <Button onClick={() => handleDelete(country.id, "country")}>Delete</Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                }) : null
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <h4 className='font-bold text-2xl mt-12 my-2'>Tag Industry data</h4>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    key={"name"}
                                    align="center"
                                    style={{ minWidth: "170px" }}
                                >
                                    Operations
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filterData ? filterData?.industry.map(industry => {
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={"name"}>
                                        <TableCell align="center">
                                            <Box>
                                                <Typography fontWeight={600}>en:</Typography>
                                                <Typography>{industry?.name?.en} </Typography>
                                                <Typography fontWeight={600}>ru:</Typography>
                                                <Typography>{industry?.name.ru}</Typography>
                                                <Typography fontWeight={600}>az:</Typography>
                                                <Typography>{industry?.name.az}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <Button onClick={() => handleUpdate(industry.id, "industry")}>Update</Button>
                                                <Button onClick={() => handleDelete(industry.id, "industry")}>Delete</Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                }) : null
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {updatedData && <Modal
                open={openC}
                onClose={handleCloseC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    updatedData?.section === "profile" ?
                        <Box sx={style}>
                            <h5>Tag Profile (in Azerbaijani)</h5>
                            <TextField
                                onChange={(e) => setUpdatedData((prev) => { return { ...prev, profileValues: { ...prev?.profileValues, az: e.target.value } } })}
                                multiline
                                rows={6}
                                fullWidth
                                value={updatedData?.profileValues?.az}
                            />
                            <h5>Tag Profile (in English)</h5>
                            <TextField
                                onChange={(e) => setUpdatedData((prev) => { return { ...prev, profileValues: { ...prev?.profileValues, en: e.target.value } } })}
                                multiline
                                rows={6}
                                fullWidth
                                value={updatedData?.profileValues?.en}
                            />
                            <h5>Tag Profile (in Russian)</h5>
                            <TextField
                                onChange={(e) => setUpdatedData((prev) => { return { ...prev, profileValues: { ...prev?.profileValues, ru: e.target.value } } })}
                                multiline
                                rows={6}
                                fullWidth
                                value={updatedData?.profileValues?.ru}
                            />
                            <Button onClick={handleSubmitUpdate}>
                                Submit
                            </Button>
                        </Box> : (updatedData && updatedData.section === "country") ?
                            <Box sx={style}>
                                <h5>Tag Country (in Azerbaijani)</h5>
                                <TextField
                                    onChange={(e) => setUpdatedData((prev) => { return { ...prev, countryValues: { ...prev?.countryValues, az: e.target.value } } })}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={updatedData?.countryValues?.az}
                                />
                                <h5>Tag Country (in English)</h5>
                                <TextField
                                    onChange={(e) => setUpdatedData((prev) => { return { ...prev, countryValues: { ...prev?.countryValues, en: e.target.value } } })}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={updatedData?.countryValues?.en}
                                />
                                <h5>Tag Country (in Russian)</h5>
                                <TextField
                                    onChange={(e) => setUpdatedData((prev) => { return { ...prev, countryValues: { ...prev?.countryValues, ru: e.target.value } } })}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={updatedData?.countryValues?.ru}
                                />
                                <Button onClick={handleSubmitUpdate}>
                                    Submit
                                </Button>
                            </Box> : updatedData?.section === "industry" ?
                                <Box sx={style}>
                                    <h5>Tag Industry (in Azerbaijani)</h5>
                                    <TextField
                                        onChange={(e) => setUpdatedData((prev) => { return { ...prev, industryValues: { ...prev?.industryValues, az: e.target.value } } })}
                                        multiline
                                        rows={6}
                                        fullWidth
                                        value={updatedData?.industryValues?.az}
                                    />
                                    <h5>Tag Industry (in English)</h5>
                                    <TextField
                                        onChange={(e) => setUpdatedData((prev) => { return { ...prev, industryValues: { ...prev?.industryValues, en: e.target.value } } })}
                                        multiline
                                        rows={6}
                                        fullWidth
                                        value={updatedData?.industryValues?.en}
                                    />
                                    <h5>Tag Industry (in Russian)</h5>
                                    <TextField
                                        onChange={(e) => setUpdatedData((prev) => { return { ...prev, industryValues: { ...prev?.industryValues, ru: e.target.value } } })}
                                        multiline
                                        rows={6}
                                        fullWidth
                                        value={updatedData?.industryValues?.ru}
                                    />
                                    <Button onClick={handleSubmitUpdate}>
                                        Submit
                                    </Button>
                                </Box> : null
                }

            </Modal>}


            {createdData && <Modal
                open={openC}
                onClose={handleCloseC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5>Tag Profile (in Azerbaijani)</h5>
                    <TextField
                        onChange={(e) => setCreatedData((prev) => { return { ...prev, values: { ...prev?.values, az: e.target.value } } })}
                        multiline
                        rows={6}
                        fullWidth
                        value={updatedData?.values?.az}
                    />
                    <h5>Tag Profile (in English)</h5>
                    <TextField
                        onChange={(e) => setCreatedData((prev) => { return { ...prev, values: { ...prev?.values, en: e.target.value } } })}
                        multiline
                        rows={6}
                        fullWidth
                        value={updatedData?.values?.en}
                    />
                    <h5>Tag Profile (in Russian)</h5>
                    <TextField
                        onChange={(e) => setCreatedData((prev) => { return { ...prev, values: { ...prev?.values, ru: e.target.value } } })}
                        multiline
                        rows={6}
                        fullWidth
                        value={updatedData?.values?.ru}
                    />
                    <Button onClick={handleSubmitCreate}>
                        Submit
                    </Button>
                </Box>

            </Modal>}

        </div>
    )
}

export default AdminEcosystemFilterData