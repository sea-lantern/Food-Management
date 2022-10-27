import React from 'react'
import { Box, Typography } from '@mui/material'

import IngredientCard from 'components/IngredientCard'

const Ingredient: React.FC = () => {
    return (
        <Box sx={{ height: '80%', width: '50%', mx: '25px' }}>
            <Typography variant="h4" component="div" sx={{ mb: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                食材
            </Typography>

            <Box sx={{ height: '80%', bgcolor: 'white', mx: '20px', boxShadow: 2, overflow: 'auto' }}>
                <IngredientCard name='test' initAmount={3} term='2022/10/1' />
            </Box>
        </Box>
    )
}

export default Ingredient