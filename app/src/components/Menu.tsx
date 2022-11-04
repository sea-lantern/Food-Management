import React, { useState, useCallback, Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';

import MenuCard from 'components/MenuCard'
import NewMenuCard from 'components/NewMenuCard'

type materialT = {
    name: string,
    amount: number
}

const Menu: React.FC<{ id: string, token: string, menu: {name: string, time: number, id: string}[], day: string }> = ({ id, token, menu, day }) => {
    const navigate = useNavigate()

    const [openId, setOpenId] = useState<string>("")
    const [newMenu, setNewMenu] = useState<boolean>(false)

    const getMaterial = useCallback((menuid: string, setMaterial: Dispatch<materialT[]>) => {
        ;(async() => {
            const req = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                menuid: menuid
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/materials?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setMaterial(data?.materials)
        })()
    }, [navigate, id, token])

    return (
        <Box sx={{ width: '40%', mx: '25px', bgcolor: 'white', boxShadow: 2 }}>
            <Box sx={{display: 'flex', mx: '25px'}}>
                <Typography variant="h6" sx={{ mt: '20px', textAlign: 'center', textDecoration: 'underline' }} >
                {String(day)}日
                </Typography>
                
                <Box sx={{flexGrow: 1}}/>
                <IconButton sx={{ mt: '20px', bgcolor: 'white', boxShadow: 2, flexGrow:0, width: '30px', height: '30px' }} onClick={() => setNewMenu(true)}>
                    <AddIcon />
                </IconButton>
            </Box>

            {newMenu && <NewMenuCard />}
            
            <Box sx={{ overflow: 'auto' }}>
                {menu && menu.map(v => <MenuCard key={v.name} id={id} token={token} info={v} openF={v.id === openId} setOpenId={setOpenId} getMaterial={getMaterial} />)}
            </Box>

        </Box>
    )
}

export default Menu