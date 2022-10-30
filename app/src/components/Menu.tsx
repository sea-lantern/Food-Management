import React from 'react'
import { Box } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Menu: React.FC<{ id: string, token: string }> = ({ id, token }) => {
    return (
        <Box sx={{ width: '40%', mx: '25px', bgcolor: 'white', boxShadow: 2 }}>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth"/>
        </Box>
    )
}

export default Menu