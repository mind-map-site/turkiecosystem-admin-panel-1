/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { getAboutContent } from "src/@mock-api/api/about-api";
import MiniLoader from "@fuse/core/MiniLoader";
import { ToastContainer } from "react-toastify";
import AdminShowContent from "../AdminShowContent";
import AdminDefineContent from "../AdminDefineContent";
import AdminAddImage from "../AdminAddImage";
import AdminDeleteImage from "../AdminDeleteImage";


const actions = [
    { label: "Show About Data", value: "show" },
    { label: "Define or Update Content", value: "define" },
    { label: "Add Image", value: "add" },
    { label: "Delete Image", value: "delete" },
];

const AdminPageStructure = () => {
    // const { toast } = useToast();
    const [reload, setReload] = useState(0);
    const [aboutContent, setAboutContent] = useState(null);
    const [selectedAction, setSelectedAction] = useState("show");

    useEffect(() => {
        const getAllAboutContent = async () => {
            try {
                const responseData = await getAboutContent();
                if (responseData.success) {
                    setAboutContent(responseData.data);
                } else {
                    setAboutContent(null);
                    // toast({
                    //     variant: "destructive",
                    //     title: "Something went wrong.",
                    //     description: "There was a problem with your request.",
                    // });
                }
            } catch (error) {
                // toast({
                //     variant: "destructive",
                //     title: "Something went wrong.",
                //     description: "There was a problem with your request." + error,
                // });
            }
        };

        getAllAboutContent();
    }, [reload]);
    
    console.log(aboutContent);
    const handleChange = (_, newValue) => {
        setSelectedAction(newValue);
    };

    return (
        <div>
            <p className="mb-2">Choose an action to perform on the About Page.</p>

            
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
            <ToastContainer position="bottom-left" className="absolute bottom-0 right-20 h-24"/>

            <Box sx={{ mt: 2 }}>
                {selectedAction === "show" && (aboutContent ? <AdminShowContent data={aboutContent} /> : <MiniLoader />)}
                {selectedAction === "define" && (aboutContent ? <AdminDefineContent data={aboutContent?.content} setReload={setReload} /> : <MiniLoader />)}
                {selectedAction === "add" && (aboutContent ? <AdminAddImage id={aboutContent?.id} image={aboutContent.images[0]} setReload={setReload} /> : <MiniLoader />)}
                {selectedAction === "delete" && (aboutContent ? <AdminDeleteImage id={aboutContent?.id} setReload={setReload} /> : <MiniLoader />)} 
                {/* 
                */}
            </Box>
        </div>
    );
};

export default AdminPageStructure;
