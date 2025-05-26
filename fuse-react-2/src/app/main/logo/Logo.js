/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteAboutImage, getAboutContent, sendAboutImage } from "src/@mock-api/api/about-api";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { getLogo, postLogo } from "src/@mock-api/api/logo-api";

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
                    <AdminPageStructure getContentAPI={getLogo} description={"Choose an action to define website logo."} actions={
                        [
                            { label: "Show Logo", value: "Logo", props: {  } },
                            { label: "Update Image", value: "AddImg", props: { addImage: postLogo, section:"logo" } },
                            // { label: "Delete Image", value: "DeleteImg", props: { deleteImage:deleteAboutImage} }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default AboutPage;
