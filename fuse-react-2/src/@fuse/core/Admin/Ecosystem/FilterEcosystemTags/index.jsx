import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { filterEcosystem, getFilterData } from 'src/@mock-api/api/ecosystem-api';
import { ecosystemTagsFormInputs, ecosystemTagsInitialValues, useEcosystemTagsFormValidation } from 'src/data/formikFieldData';
import useFormikForm from 'src/hooks/use-formik-form';
import MiniLoader from '@fuse/core/MiniLoader';
import { toast } from 'react-toastify';
import AdminShowTableData from '../../AdminShowTableData';

const FilterEcosystemTags = () => {
    const [filterData, setFilterData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validations = useEcosystemTagsFormValidation();
    const formik = useFormikForm(ecosystemTagsInitialValues, validations, onSubmit);

    async function onSubmit(values) {
        setIsLoading(true);
        // console.log(values);
        const res = await filterEcosystem(values.tagCountry, values.tagProfile, values.tagIndustry);
        if (res.data.success) {
            toast.success("Successfully filtered");
            setFilteredData(res.data.data);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        const getEcosystemFilterData = async () => {
            const res = await getFilterData();
            if (res.status === 200) {
                setFilterData(res.data.data);
            } else {
                setFilterData([]);
            }
        }
        getEcosystemFilterData();
    }, [])

    return (
        <>
            <div>Filter Ecosystem Tags</div>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className='flex gap-3 justify-between items-center'>
                    {
                        filterData && ecosystemTagsFormInputs.map(input => {
                            return <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{input.title}</InputLabel>
                                <Select
                                    name={input.name}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values[input.name]}
                                    label={input.title}
                                    onChange={formik.handleChange}
                                >
                                    {filterData[input.id].map(tag => {
                                        return <MenuItem value={tag?.id}>{tag?.name?.en}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        })
                    }
                </div>

                <div className='mt-10'>
                    {
                        (!isLoading && filteredData)? <AdminShowTableData data={filteredData} section="ecosystem" />
                            :  (!isLoading && !filteredData) ?  null : <MiniLoader />
                    }
                </div>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </>
    )
}

export default FilterEcosystemTags