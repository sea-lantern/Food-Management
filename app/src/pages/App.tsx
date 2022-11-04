import React, { useCallback, useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import HeaderBar from 'components/HeaderBar'
import Calendar from 'components/Calendar'
import Menu from 'components/Menu'

const App: React.FC = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const [year, setYear] = useState<number>(0)
    const [month, setMonth] = useState<number>(0)
    const [day, setDay] = useState<number>(0)

    const [menu, setMenu] = useState<{[key: number]: {name: string, time: number, id: string}[]}>({})

    useEffect(() => {
        const id = localStorage.getItem('id') || ''
        const token = localStorage.getItem('token') || ''

        if(id === '' || token === '') {
            navigate('/login')
            return
        }
        
        setId(id)
        setToken(token)

        const now = new Date()
        
        setYear(now.getFullYear())
        setMonth(now.getMonth() + 1)
        setDay(now.getDate())
    }, [navigate])

    const selectDate = useCallback((date: Date) => {
        setYear(date.getFullYear())
        setMonth(date.getMonth() + 1)
        setDay(date.getDate())
    }, [])

    const changeDate = useCallback((date: Date) => {
        setYear(date.getFullYear())
        setMonth(date.getMonth() + 1)
        setDay(date.getDate())
    }, [])

    useEffect(() => {
        if(!id || !token || !year || !month) return
        ;(async() => {
            const req = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                year: String(year),
                month: String(month)
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/menu?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setMenu(data?.menu)
        })()
    }, [navigate, id, token, year, month])

    return (
        <>
            <HeaderBar name='献立管理' jumpTo='/storage' jumpToName='食材管理' badgeCount={10} />

            <Box sx={{mx: '25px', my: '50px', display: 'flex' }}>
                <Calendar menu={menu} ym={String(year)+'-'+String(month).padStart(2, '0')} changeDate={changeDate} selectDate={selectDate} />
                {day && <Menu id={id} token={token} menu={menu[day-1]} day={String(day)} />}
            </Box>
        </>
    )
}

export default App