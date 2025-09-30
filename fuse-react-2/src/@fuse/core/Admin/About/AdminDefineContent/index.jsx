import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAboutContentValidation } from "src/data/formikFieldData";
import useFormikForm from "src/hooks/use-formik-form";
import { sendAboutContent } from "src/@mock-api/api/about-api";
import { toast } from "react-toastify";
import FormikField from "@fuse/core/FormikField";

const AdminDefineContent = ({ data, setReload }) => {
  const aboutContentValidation = useAboutContentValidation();


  const aboutContentInitialValues = {
    contentEn: data.content.en,
    contentRu: data.ru,
    contentAz: data.az,
    contactLink: data.contactLink,
  };

  const formik = useFormikForm(
    aboutContentInitialValues,
    aboutContentValidation,
    onSubmit
  );

  function onSubmit({ contentEn, contentAz, contentRu, contactLink }) {
    const values = {
      "content.en": contentEn,
      "content.ru": contentRu,
      "content.az": contentAz,
      contactLink,
    };

    sendAboutContent(values)
      .then((res) => {
        setReload((prev) => prev + 1);

        if (res.data.success && res.status === 200) {
          toast.success("Content has been updated successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("There was a problem with your request: ");
      });
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Card className="px-4">
        <h2 style={{ fontWeight: 600, marginTop: "1rem" }}>Contact Link</h2>
        <FormikField
          fullWidth
          formik={formik}
          id="contactLink"
          name="contactLink"
          placeholder="Add contact Link"
        />
        <h2 style={{ fontWeight: 600, marginTop: "1rem" }}>About Content</h2>
        <CardHeader>
          <Typography variant="h6">Content</Typography>
          <Typography variant="body2" color="text.secondary">
            You can update or create content
          </Typography>
        </CardHeader>
        <CardContent className="space-y-1">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              English
            </AccordionSummary>
            <AccordionDetails>
              <FormikField
                fullWidth
                multiline
                rows={6}
                formik={formik}
                id="contentEn"
                name="contentEn"
                placeholder="Add Content in English"
              />
            </AccordionDetails>
          </Accordion>
          {/* 
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Russian</AccordionSummary>
            <AccordionDetails>
              <FormikField
                fullWidth
                multiline
                rows={6}
                formik={formik}
                id="contentRu"
                name="contentRu"
                placeholder="Add Content in Russian"
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Azerbaijani</AccordionSummary>
            <AccordionDetails>
              <FormikField
                fullWidth
                multiline
                rows={6}
                formik={formik}
                id="contentAz"
                name="contentAz"
                placeholder="Add Content in Azerbaijani"
              />
            </AccordionDetails>
          </Accordion> */}
        </CardContent>
        <CardActions className="p-4">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AdminDefineContent;
