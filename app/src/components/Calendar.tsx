import React, { useState, useEffect, Dispatch } from 'react'
import { Box } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin from "@fullcalendar/interaction"

const Calendar: React.FC<{
    menu: {[key: number]: {name: string, time: number, id: string}[]},
    ym: string,
    changeDate: Dispatch<Date>,
    selectDate: Dispatch<Date>
}> = React.memo(({ menu, ym, changeDate, selectDate }) => {
    const [events, setEvents] = useState<{title: string, date: string, color: string}[]>([])

    useEffect(() => {
        const tmp: {title: string, date: string, color: string}[] = []
        const ci: {[key: number]: string} = {1: '#95bfea', 2: '#d5d500', 3: '#ff8000', 4: '#9572b8'}
        const ct: {[key: number]: string} = {1: 'T07:00:00', 2: 'T12:00:00', 3: 'T16:00:00', 4: 'T20:00:00'}
        for(const day in menu) {
            for(const e of menu[day]) {
                tmp.push({title: e.name, date: ym + '-' + String(Number(day)+1).padStart(2, '0')+ct[e.time], color: ci[e.time]})
            }
        }
        setEvents(tmp)
    }, [menu, ym])

    return (
        <Box sx={{ width: '60%', mx: '25px', bgcolor: 'white', boxShadow: 2 }}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={allLocales}
                locale="ja"
                dateClick={(e) => selectDate(e.date)}
                datesSet={(e) => {
                    let next = e.start
                    next.setDate(e.start.getDate()+8)
                    next.setDate(1)
                    changeDate(next)
                }}
                events={events}
                displayEventTime={false}
            />
        </Box>
    )
})

export default Calendar