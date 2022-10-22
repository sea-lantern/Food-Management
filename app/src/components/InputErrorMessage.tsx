import React from 'react'
import { Typography } from '@mui/material'

import ReportIcon from '@mui/icons-material/Report';

const InputErrorMessage: React.FC<{message: string}> = ({message}) => {
    return (
        <Typography sx={{color: '#ff0000'}}>
            <ReportIcon />
            {message}
        </Typography>
    )
}

export default InputErrorMessage