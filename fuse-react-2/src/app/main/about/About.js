/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteAboutImage, getAboutContent, sendAboutImage } from "src/@mock-api/api/about-api";
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

function AboutPage(props) {
    const { t } = useTranslation("aboutPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("TITLE")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getAboutContent} description={"Choose an action to perform on the About Page."} actions={
                        [
                            { label: "Show About Data", value: "ShowAbout" },
                            { label: "Define or Update Content", value: "DefineUpdateAbout" },
                            { label: "Add Image", value: "AddImg", props: { addImage: sendAboutImage } },
                            { label: "Delete Image", value: "DeleteImg", props: { deleteImage:deleteAboutImage} }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default AboutPage;
