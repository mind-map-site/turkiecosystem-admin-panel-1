/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteIncentiveContent, deleteIncentiveImage, getIncentiveContent, getSingleIncentiveById, sendIncentiveContent, sendIncentiveImage, updateIncentiveContent } from "src/@mock-api/api/incentives-api";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { newsCreateFormInputs, newsFormInitialValues, useNewsFormValidation } from "src/data/formikFieldData";
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

function IncentivesPage(props) {
    const { t } = useTranslation("incentivesPage");
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [reload, setReload] = useState({})


    useEffect(() => {

        const getAllContent = async () => {
            try {
                const responseData = await getIncentiveContent(page);
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
                    <h4>{t("INCENTIVES")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getIncentiveContent} description={"Choose an action to perform on the Incentives Page."} actions={
                        [
                            { label: "Show Incentives", value: "ShowNews", props: { getAllData: getIncentiveContent, data: content, pagination: pagination } },
                            { label: "Show Single Incentive", value: "ShowSingleNews", props: { getSingleData: getSingleIncentiveById } },
                            { label: "Update Incentive", value: "UpdateNews", props: { updateData: updateIncentiveContent, inputs: newsCreateFormInputs, useValidation: useNewsFormValidation, initialValues: newsFormInitialValues, section: "incentive" } },
                            { label: "Create Incentive", value: "CreateNews", props: { createData: sendIncentiveContent, inputs: newsCreateFormInputs, useValidation: useNewsFormValidation, initialValues: newsFormInitialValues, section: "incentive" } },
                            { label: "Delete Incentive", value: "DeleteNews", props: { deleteData: deleteIncentiveContent } },
                            { label: "Add Image", value: "AddImg", props: { addImage: sendIncentiveImage, section: "incentive" } },
                            { label: "Delete Image", value: "DeleteImg", props: { deleteImage: deleteIncentiveImage } }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default IncentivesPage;
