import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AdminDeleteTableData = ({deleteData, setReload }) => {
    const [newsId, setNewsId] = useState("")
    const [error, setError] = useState("")

    const handleDeleteData = async () => {
        if (!newsId) {
            setError("Please enter your news Id which you want to delete");
        }
        try {
            const res = await deleteData(newsId);
            if (res.status == 200) {
                setError("")
                setReload((prev) => ++prev);
                toast.success("News is deleted successfully");
            } else {
                toast.error("failed to delete news Id");
            }
        } catch {
            toast.error("Someting went wrong with your request");
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
                {error && <p className='text-sm mt-1 text-red-600'>{error}</p>}
                <Button type="submit" variant='contained' onClick={handleDeleteData}>Submit</Button>
            </Stack>
        </div>
    )
}

export default AdminDeleteTableData