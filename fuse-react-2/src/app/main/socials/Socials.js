/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteSocialMedia, getSingleSocialMedia, getSocialMedia, postSocialMedia, putSocialMedia } from "src/@mock-api/api/socials-api";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { useSocialMediaForm } from "src/data/formikFieldData";

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

function SocialsPage(props) {
    const { t } = useTranslation("socialsPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("TITLE")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getSocialMedia} description={"Choose an action to perform on the Social Medias."} actions={
                        [
                            { label: "Admin Show table", value: "SimpleCrudData", props: { section: "social", singleGetApi: getSingleSocialMedia, deleteApi: deleteSocialMedia, updateApi: putSocialMedia, createApi: postSocialMedia, useDataForm: useSocialMediaForm } },
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default SocialsPage;
