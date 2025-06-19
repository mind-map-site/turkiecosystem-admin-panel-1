/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { deleteEcosystemContent, deleteEcosystemImage, getEcosystemContent, getSingleEcosystemById, sendEcosystemContent, sendEcosystemImage, updateEcosystemContent } from "src/@mock-api/api/ecosystem-api";
import { ecosystemCreateFormInputs, ecosystemFormInitialValues, newsCreateFormInputs, useEcosystemFormValidation } from "src/data/formikFieldData";
import { useEffect, useState } from "react";


const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
}));



  function AboutPage(props) {
    const { t } = useTranslation("ecosystemPage");
 const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [reload, setReload] = useState({})
    
    useEffect(() => {

        const getAllContent = async () => {
            try {
                const responseData = await getEcosystemContent(page);
                if (responseData) {
                    setContent(responseData.data.data);
                    setPagination(responseData.data.pagination);
                } else {
                    setContent([]);

                }
            } catch (error) {
                setContent([]);

            }
        };

        getAllContent();
    }, [reload, page]);
    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("TITLE")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getEcosystemContent} description={"Choose an action to perform on the Ecosystems Page."} actions={
                        [
                            { label: "Show Ecosystems", value: "ShowNews", props: { getAllData: getEcosystemContent, section: "ecosystem", data: content, pagination: pagination } },
                            { label: "Show Single Ecosystem", value: "ShowSingleNews", props: { getSingleData: getSingleEcosystemById, section:"ecosystem" } },
                            { label: "Update Ecosystem", value: "UpdateNews", props: { updateData: updateEcosystemContent, inputs: ecosystemCreateFormInputs, useValidation: useEcosystemFormValidation, initialValues: ecosystemFormInitialValues, section: "ecosystem" } },
                            { label: "Create Ecosystem", value: "CreateNews", props: { createData: sendEcosystemContent, inputs: ecosystemCreateFormInputs, useValidation: useEcosystemFormValidation, initialValues: ecosystemFormInitialValues, section: "ecosystem" } },
                            { label: "Delete Ecosystem", value: "DeleteNews", props: { deleteData: deleteEcosystemContent } },
                            { label: "Add Image", value: "AddImg", props: { addImage: sendEcosystemImage, section: "ecosystem" } },
                            { label: "Delete Image", value: "DeleteImg", props: { deleteImage: deleteEcosystemImage } },
                            { label: "Ecosystem Filter Data", value: "EcosystemFilterCrud" },
                            { label: "Ecosystem Filter Search", value: "EcosystemFilter" }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default AboutPage;
