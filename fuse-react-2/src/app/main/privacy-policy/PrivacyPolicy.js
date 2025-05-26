/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import AdminPageStructure from "@fuse/core/Admin/AdminPageStructure";
import { getPrivacyPolicyContent, putPrivacyPolicyContent } from "src/@mock-api/api/privacy-policy-api";

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

function PrivacyPolicyPage(props) {
    const { t } = useTranslation("privacyPolicyPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("TITLE")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getPrivacyPolicyContent} description={"This page shows exact content of Privacy Policy, you can update and modify this content as you want"} actions={
                        [
                            { label: "Privacy Policy Content", value: "PrivacyPolicy", props: { updateApi: putPrivacyPolicyContent} },

                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default PrivacyPolicyPage;
