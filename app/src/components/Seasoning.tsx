import React from 'react'
import { Box, Typography } from '@mui/material'

import SeasoningCard from 'components/SeasoningCard'

const Seasoning: React.FC = () => {
    return (
        <Box sx={{ height: '80%', width: '50%', mx: '25px' }}>
            <Typography variant="h4" component="div" sx={{ mb: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                調味料
            </Typography>

            <Box sx={{ height: '80%', bgcolor: 'white', mx: '20px', boxShadow: 2, overflow: 'auto' }}>
                <SeasoningCard name='test' initAmount={55} term='2022/10/1' />
            </Box>
        </Box>
    )
}

export default Seasoning