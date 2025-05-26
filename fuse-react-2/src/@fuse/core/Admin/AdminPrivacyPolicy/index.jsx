import React, { useState } from 'react';
import SafeHTMLContent from 'app/shared-components/SafeHTMLContent';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import styles from "./style.module.css"

const AdminPrivacyPolicy = ({ data, setReload, updateApi }) => {
    const [update, setUpdate] = useState(false);
    const [value, setValue] = useState(data.html);

    const handleSubmit = async () => {
        try {
            const res = await updateApi(value);
            if (res.status === 200) {
                toast.success("Privacy Policy is updated successfully");
                setReload((prev) => prev + 1);
                setUpdate(false);
            } else {
                toast.error("Failed to update Privacy Policy");
            }
        } catch {
            toast.error("Failed to update Privacy Policy. There was a problem with your request.");
        }
    }

    return (
        <div>
            <div className={styles.privacyPolicyContentWrapper}>
                <SafeHTMLContent html={data.html} />
            </div>
            <Button sx={{ marginTop: "1rem" }} variant="contained" color="secondary" onClick={() => setUpdate(true)} >
                Update
            </Button>
            {
                update &&
                <Box mt={2}>
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    <Button sx={{ marginTop: "1rem" }} variant="contained" color="secondary" onClick={handleSubmit} >
                        Submit
                    </Button>
                </Box>
            }
        </div>
    )
}

export default AdminPrivacyPolicy