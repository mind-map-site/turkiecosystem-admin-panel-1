/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
// import { deleteSocialMedia, getSingleSocialMedia, getSocialMedia, postSocialMedia, putSocialMedia } from "src/@mock-api/api/adverts-api";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { useSocialMediaForm } from "src/data/formikFieldData";
import { deleteAdvert, getAdverts, sendAdverts } from "src/@mock-api/api/adverts-api";

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

function AdvertsPage(props) {
    const { t } = useTranslation("advertsPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("TITLE")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure section={"multi"} getContentAPI={getAdverts} description={"Choose an action to perform on the Adverts."} actions={
                        [
                            { label: "Show Adverts",  value: "ShowImages" , section:"multi"},
                            { label: "Add Image",  value: "AddImg", props: { addImage: sendAdverts, section:"multi" } },
                            { label: "Delete Image", value: "DeleteImg", props: { deleteImage: deleteAdvert } }
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default AdvertsPage;
