import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Accordion, AccordionSummary, AccordionDetails,
    Stack,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MiniLoader from "@fuse/core/MiniLoader";
import { Box } from '@mui/system';

const AdminShowSingleData = ({ getSingleData, data }) => {
    const [singleData, setSingleData] = useState(null)
    const [newsId, setNewsId] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleGetSingleData = async () => {
        setLoading(true);
        try {
            const res = await getSingleData(newsId);
            if (res.success) {
                setSingleData(res.data)
                // console.log(res.data);
            } else {
                setSingleData(null)
            }
        } catch {
            setSingleData(null);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="mt-4">
            <Stack flexDirection={"row"} justifyContent="center" alignItems="center" gap={4}>
                <TextField
                    label="News Id"
                    name="newsId"
                    value={newsId}
                    onChange={(e) => setNewsId(e.target.value)}
                />
                <Button type="submit" variant='contained' onClick={handleGetSingleData}>Submit</Button>
            </Stack>

            {loading ? <MiniLoader /> :
                <>
                    <Box className="p-2">
                        <h5 className="text-lg font-semibold">Title</h5>
                        <p className="text-sm">
                            Your title is available in three different languages.
                        </p>
                    </Box>

                    <Card className="">
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
                                        value={singleData?.title?.en}
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
                                        value={singleData?.title.ru}
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
                                        value={singleData?.title.az}
                                        InputProps={{ readOnly: true }}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Box className="p-2">
                        <h5 className="text-lg font-semibold">Description</h5>
                        <p className="text-sm">
                            Your description is available in three different languages.
                        </p>
                    </Box>

                    <Card className="">
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
                                        value={singleData?.description?.en}
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
                                        value={singleData?.description.ru}
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
                                        value={singleData?.description.az}
                                        InputProps={{ readOnly: true }}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>


                    <Box className="p-2">
                        <h5 className="text-lg font-semibold">View Count</h5>
                        <p className="text-sm">
                            View Count for your news data
                        </p>
                    </Box>

                    <Card className="">
                        <CardContent className="space-y-2">
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    View Count
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        multiline
                                        rows={6}
                                        fullWidth
                                        value={singleData?.view}
                                        InputProps={{ readOnly: true }}
                                    />
                                </AccordionDetails>
                            </Accordion>


                        </CardContent>
                    </Card>


                    <Box className="p-2">
                        <h5 className="text-lg font-semibold">Date</h5>
                        <p className="text-sm">
                            Created Date for your news
                        </p>
                    </Box>

                    <Card className="">
                        <CardContent className="space-y-2">
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    Date
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        multiline
                                        rows={6}
                                        fullWidth
                                        value={singleData?.time}
                                        InputProps={{ readOnly: true }}
                                    />
                                </AccordionDetails>
                            </Accordion>


                        </CardContent>
                    </Card>

                    <Box>


                        <h5 className="text-lg font-semibold">Image</h5>
                        <p className="text-sm">
                            This image will be displayed in the About tab.
                        </p>
                    </Box>

                    {singleData &&
                        <Card className="mt-10">

                            <CardContent className="space-y-2">
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        Title
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            value={singleData?.image?.href?.title}
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
                                            value={singleData?.image?.href?.url}
                                            InputProps={{ readOnly: true }}
                                        />
                                        {singleData?.image?.href?.url ? (
                                            <img
                                                src={singleData?.image?.href?.url}
                                                alt="News Content"
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
                                            value={singleData?.image?.href?.publicId}
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
                                            value={singleData?.image?.href?.type}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    }
                </>
            }


        </div>
    )
}

export default AdminShowSingleData