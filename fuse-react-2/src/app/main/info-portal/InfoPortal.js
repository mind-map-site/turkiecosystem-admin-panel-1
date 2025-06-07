/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { getInfoPortal, putInfoPortal } from "src/@mock-api/api/info-portal";
import { useInfoPortalForm } from "src/data/formikFieldData";
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

function InfoPortalPage(props) {
    const { t } = useTranslation("infoPortalPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("INFOPORTAL")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getInfoPortal} description={"Choose an action to perform on the Info Portal Page."} actions={
                        [
                            { label: "Admin Show table", value: "SimpleCrudData", props: { section: "Information Portal", singleGetApi: "", deleteApi: "", updateApi: putInfoPortal, createApi: "", useDataForm: useInfoPortalForm, isFullCrud:false } },
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default InfoPortalPage;
