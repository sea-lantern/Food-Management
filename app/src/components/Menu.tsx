import React from 'react'
import { Box, Typography } from '@mui/material'

import MenuCard from 'components/MenuCard'

const Menu: React.FC<{ menu: {name: string, time: number, id: string}[], day: string }> = ({ menu, day }) => {
    return (
        <Box sx={{ width: '40%', mx: '25px', bgcolor: 'white', boxShadow: 2 }}>
            <Typography variant='h6' sx={{ mt: '20px', textAlign: 'center', textDecoration: 'underline' }}>
                {String(day)}日
            </Typography>
            
            <Box sx={{ overflow: 'auto' }}>
                {menu && menu.map(v => <MenuCard key={v.name} info={v} />)}
            </Box>

        </Box>
    )
}

export default Menu