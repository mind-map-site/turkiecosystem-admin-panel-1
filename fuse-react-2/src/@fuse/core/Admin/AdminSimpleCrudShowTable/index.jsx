import handleResponseSuccess from '@fuse/utils/response';
import { Button } from '@mui/material';
import CreateSimpleModal from 'app/shared-components/CreateSimpleModal';
import CrudTable from 'app/shared-components/CrudTable';
import UpdateSimpleModal from 'app/shared-components/UpdateSimpleModal';
import React, { useState } from 'react';

const AdminSimpleCrudShowTable = ({ data, setReload, section, singleGetApi, createApi, deleteApi, updateApi, useDataForm, isFullCrud = true }) => {
      const { inputs } = useDataForm();
      
    // create modal
    const [openC, setOpenC] = useState(false);

    // update modal 
    const [updateData, setUpdateData] = useState(null); // for not full cruds
    const [updateId, setUpdateId] = useState(null);
    const [openU, setOpenU] = useState(false);

    const handleUpdate = async (id, data_) => {
        const res = await updateApi(id, data_);
        handleResponseSuccess(res, "update", setReload)
    };

    const handleDelete = async (id) => {
        const res = await deleteApi(id, data);
        handleResponseSuccess(res, "delete", setReload)
    };

    const handleCreate = async (data_) => {
        const res = await createApi(data_);
        handleResponseSuccess(res, "create", setReload)
    }


    return (
        <div>
            <Button variant="outlined" onClick={() => setOpenC(true)}>Create {section}</Button>

            <CrudTable
                title={`${section} Data`}
                data={data}
                type=""
                setReload={setReload}
                setUpdateId={setUpdateId}
                 setUpdateData={ setUpdateData}
                onDelete={handleDelete}
                setOpenU={setOpenU}
                isFullCrud={isFullCrud}
                inputs={inputs}
            />
            {/* create simple modal logic  */}
            {openC && <CreateSimpleModal open={openC} setOpen={setOpenC} handleCreate={handleCreate} useDataForm={useDataForm} />}
            {openU && <UpdateSimpleModal open={openU} setOpen={setOpenU} updateId={updateId} updateData={updateData} handleUpdate={handleUpdate} useDataForm={useDataForm} singleGetApi={singleGetApi} isFullCrud={isFullCrud} />}
        </div>
    );
};

export default AdminSimpleCrudShowTable;
