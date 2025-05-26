import { TextField } from '@mui/material'
import React from 'react'

const FilterTextField = ({title, onChange, ...props}) => {
    return (
        <div>
            <h5 style={{textTransform:"capitalize"}}>{title}</h5>
            <TextField
                onChange={onChange}
                rows={6}
                fullWidth
                multiline
                {...props}
            />
        </div>
    )
}

export default FilterTextField