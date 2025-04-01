/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { getAboutContent } from "src/@mock-api/api/about-api";
import MiniLoader from "@fuse/core/MiniLoader";
import { ToastContainer } from "react-toastify";
import AdminShowContent from "../About/AdminShowContent";
import AdminDefineContent from "../About/AdminDefineContent";
import AdminAddImage from "../AdminAddImage";
import AdminDeleteImage from "../AdminDeleteImage";
import AdminUpdateData from "../AdminUpdateData";
import AdminShowTableData from "../AdminShowTableData";
import AdminShowSingleData from "../AdminShowSingleData";
import AdminCreateTableData from "../AdminCreateTableData";
import AdminDeleteTableData from "../AdminDeleteTableData";
import AdminEcosystemFilterData from "../Ecosystem/AdminEcosystemFilterData";
import FilterEcosystemTags from "../Ecosystem/FilterEcosystemTags";


const componentMap = {
    "ShowAbout": AdminShowContent,
    "ShowNews": AdminShowTableData,
    "CreateNews": AdminCreateTableData,
    "DeleteNews": AdminDeleteTableData,
    "ShowSingleNews": AdminShowSingleData,
    "DefineUpdateAbout": AdminDefineContent,
    "UpdateNews": AdminUpdateData,
    "AddImg": AdminAddImage,
    "DeleteImg": AdminDeleteImage,
    "EcosystemFilterCrud": AdminEcosystemFilterData,
    "EcosystemFilter": FilterEcosystemTags
}


const AdminPageStructure = ({
    getContentAPI,
    description,
    actions
}) => {
    // console.log(getContentAPI, description, actions)
    // const { toast } = useToast();
    const [reload, setReload] = useState(0);
    const [content, setContent] = useState(null);
    const [selectedAction, setSelectedAction] = useState(actions[0].value);

    useEffect(() => {
        const getAllContent = async () => {
            try {
                const responseData = await getContentAPI();
                if (responseData) {
                    setContent(responseData.data);
                } else {
                    setContent(null);
                }
            } catch (error) {
                setContent(null);
            }
        };

        getAllContent();
    }, [reload]);

    // console.log(content);
    const handleChange = (_, newValue) => {
        setSelectedAction(newValue);
    };

    const SelectedComponent = componentMap[selectedAction];
    const selectedActionObject = actions.find(action => action.value === selectedAction);

    // console.log(selectedActionObject)
    return (
        <div>
            <p className="mb-2">{description}</p>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={selectedAction}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {actions.map((action) => (
                        <Tab key={action.value} label={action.label} value={action.value} />
                    ))}
                </Tabs>
            </Box>
          

            <Box sx={{ mt: 2 }}>
                {content ? (
                    <SelectedComponent
                        data={content}
                        setReload={setReload}
                        id={content?.id}
                        {...selectedActionObject.props}
                        {...(selectedAction === "AddImg" ? { image: content.images ? content.images[0] : content.image } : {})}
                    />
                ) : (
                    <MiniLoader />
                )}
            </Box>

        </div>
    );
};

export default AdminPageStructure;
