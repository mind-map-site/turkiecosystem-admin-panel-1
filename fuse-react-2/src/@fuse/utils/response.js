import { toast } from "react-toastify";

export function handleResponseSuccess(res, action, setReload) {
        if (res.data.success || res.status === 200 || res.status === 201) {
            setReload(prev => ++prev);
            toast.success(`${action} operation has done successfully`);
        }
         else {
            toast.error(`${action} operation was failed! `);
        }
    }