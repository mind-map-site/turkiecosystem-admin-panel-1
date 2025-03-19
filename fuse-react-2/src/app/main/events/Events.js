/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteEventsContent, deleteEventsImage, getEventsContent, getSingleEventsById, sendEventsContent, sendEventsImage, updateEventsContent } from "src/@mock-api/api/events-api";
import { newsCreateFormInputs, newsFormInitialValues, useNewsFormValidation } from "src/data/formikFieldData";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";

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

function EventsPage(props) {
    const { t } = useTranslation("eventsPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("EVENTS")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getEventsContent} description={"Choose an action to perform on the Events Page."} actions={
                        [
                            { label: "Show Events", value: "ShowNews", props:{getAllData:getEventsContent } },
                            { label: "Show Single Events", value: "ShowSingleNews", props: { getSingleData: getSingleEventsById } },
                            { label: "Update Events", value: "UpdateNews", props: { updateData: updateEventsContent, inputs: newsCreateFormInputs, useValidation: useNewsFormValidation, initialValues: newsFormInitialValues, section: "events"} },
                            { label: "Create Events", value: "CreateNews", props: { createData: sendEventsContent, inputs: newsCreateFormInputs, useValidation: useNewsFormValidation, initialValues: newsFormInitialValues, section:"events" } },
                            { label: "Delete Events", value: "DeleteNews", props:{deleteData: deleteEventsContent}},
                            { label: "Add Image", value: "AddImg", props:{ addImage: sendEventsImage, section:"events" } },
                            { label: "Delete Image", value: "DeleteImg", props: {deleteImage:deleteEventsImage} }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default EventsPage;
