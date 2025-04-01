/* eslint-disable prettier/prettier */
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MiniLoader from "@fuse/core/MiniLoader";

const AdminShowContent = ({ data }) => {
  const image = data?.images[0];

  return (
    <div className="mt-4">
      {data.id ? (
        <>
          <Card className="">
            <CardHeader>
              <h5 className="text-lg font-semibold">Content</h5>
              <p className="text-sm">
                Your content is available in three different languages.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  English
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    value={data?.content?.en}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Russian
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    value={data?.content?.ru}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Azerbaijani
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    value={data?.content?.az}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-10">
            <CardHeader>
              <h5 className="text-lg font-semibold">Image</h5>
              <p className="text-sm">
                This image will be displayed in the About tab.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Title
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    value={image?.href?.title}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Image URL
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    value={image?.href?.url}
                    InputProps={{ readOnly: true }}
                  />
                  {image?.href?.url ? (
                    <img
                      src={image?.href?.url}
                      alt="About Content"
                    />
                  ) : (
                    "There is no image"
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Public ID (for deleting image)
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    value={image?.href?.publicId}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Image Type
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    value={image?.href?.type}
                    InputProps={{ readOnly: true }}
                  />
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>

       
        </>
      ) : (
        <MiniLoader />
      )}
    </div>
  );
};

export default AdminShowContent;
