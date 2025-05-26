import React, { useState, useEffect } from 'react'
import { Button} from '@mui/material'
import { toast } from 'react-toastify'
import { deleteTagCountry, deleteTagIndustry, deleteTagProfiles, getFilterData, getSingleTagCountry, getSingleTagIndustry, getTagProfile, postTagCountry, postTagIndustry, postTagProfiles, putTagCountry, putTagIndustry, putTagProfiles } from 'src/@mock-api/api/ecosystem-api'
import CreateModal from 'app/shared-components/CreateModal'
import UpdateModal from 'app/shared-components/UpdateModal'
import TagTableSection from 'app/shared-components/TagTableSection'

const AdminEcosystemFilterData = () => {
    const [reload, setReload] = useState(0);

    // modal open for updated 
    const [openU, setOpenU] = React.useState(false);
    const [updatedData, setUpdatedData] = useState(null)

    // modal open for created 
    const [openC, setOpenC] = React.useState(false);
    const [createdData, setCreatedData] = useState(null)

    const [filterData, setFilterData] = useState(null)

    const handleCreate = async (section) => {
        setCreatedData({
            section, values: {
                en: "",
                az: "",
                ru: ""
            }
        });
        setOpenC(true);
    }

    useEffect(() => {
        const getEcosystemFilterData = async () => {
            const res = await getFilterData();
            if (res.status === 200) {
                setFilterData(res.data.data);
            }
        }

        getEcosystemFilterData();
    }, [reload])

    const handleDelete = async (id, section) => {
        if (section === "profile") {
            const res = await deleteTagProfiles(id);
            if (res.data.success) {
                toast.success("Your Profile is deleted successfully");
                setReload(prev => ++prev);
            } else {
                toast.error("Failed to delete your Profile");
            }

        }
        if (section === "country") {
            const res = await deleteTagCountry(id);
            if (res.data.success) {
                setReload(prev => ++prev);
                toast.success("Your Country is deleted successfully");
            } else {
                toast.error("Failed to delete your Country");
            }

        }

        if (section === "industry") {
            const res = await deleteTagIndustry(id);
            if (res.data.success) {
                setReload(prev => ++prev);
                toast.success("Your Industry is deleted successfully");
            } else {
                toast.error("Failed to delete your Industry");
            }

        }
    }

    const handleUpdate = async (id, section) => {
        if (section === "profile") {
            getTagProfile(id).then(({ data }) => {
                if (data.success) {
                    setUpdatedData({
                        id,
                        section,
                        profileValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your Profile")
            }).finally(() => {
                setOpenU(true);
            })
        }
        if (section === "country") {
            getSingleTagCountry(id).then(({ data }) => {
                if (data.success) {
                    setUpdatedData({
                        id,
                        section,
                        countryValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your Profile")
            }).finally(() => {
                setOpenU(true);
            })
        }
        if (section === "industry") {
            getSingleTagIndustry(id).then(({ data }) => {
                if (data.success) {
                    setUpdatedData({
                        id,
                        section,
                        industryValues: data?.data.name
                    })
                }
            }).catch(() => {
                toast.error("Failed to get your industry")
            }).finally(() => {
                setOpenU(true);
            })
        }
    }

    return (
        <div>
            <Button onClick={() => handleCreate("industry")}>Create Industry Tag</Button>
            <Button onClick={() => handleCreate("country")}>Create Country Tag</Button>
            <Button onClick={() => handleCreate("profile")}>Create Profile Tag</Button>

            <TagTableSection
                title="Tag Profiles data"
                items={filterData?.profile || ''}
                type="profile"
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            <TagTableSection
                title="Tag Countries data"
                items={filterData?.country || ''}
                type="country"
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            <TagTableSection
                title="Tag Industry data"
                items={filterData?.industry || ''}
                type="industry"
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            {/* //create modal logic  */}
            <CreateModal open={openC} setOpen={setOpenC} setReload={setReload} sectionName={"tag"} createdData={createdData} setCreatedData={setCreatedData} />

            {/* UPDATE modal logic */}
            <UpdateModal open={openU} setOpen={setOpenU} setReload={setReload} sectionName={"tag"} updatedData={updatedData} setUpdatedData={setUpdatedData} />
        </div>
    )
}

export default AdminEcosystemFilterData