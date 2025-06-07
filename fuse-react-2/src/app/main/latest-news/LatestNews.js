/* eslint-disable prettier/prettier */
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { deleteLatestNews, getLatestNews, getSingleLatestNews, postLatestNews, putLatestNews } from "src/@mock-api/api/latest-news";
import { useLatestNewsForm } from "src/data/formikFieldData";
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

function LatestNewsPage(props) {
    const { t } = useTranslation("latestNewsPage");

    return (
        <Root
            header={
                <div className="p-24">
                    <h4>{t("LATESTNEWS")}</h4>
                </div>
            }
            content={
                <div className="p-24">
                    <AdminPageStructure getContentAPI={getLatestNews} description={"Choose an action to perform on the Latest News Page."} actions={
                        [
                            { label: "Admin Show table", value: "SimpleCrudData", props: { section: "latest News", singleGetApi: getSingleLatestNews, deleteApi: deleteLatestNews, updateApi: putLatestNews, createApi: postLatestNews, useDataForm: useLatestNewsForm } },
                        ]
                    } />
                </div>
            }
            scroll="content"
        />
    );
}

export default LatestNewsPage;
