import React, { Dispatch, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Stack, TextField, IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

type materialT = {
    name: string,
    amount: number
}

const MaterialBox: React.FC<{
    id: string,
    token: string,
    name: string,
    amount: number,
    menuid: string,
    setMaterial: Dispatch<materialT[]>
}> = ({ id, token, name, amount, menuid, setMaterial }) => {
    const navigate = useNavigate()

    const amountRef = useRef<HTMLInputElement>()

    useEffect(() => {
        if(amountRef.current) amountRef.current.value = String(amount)
    }, [amount, amountRef])

    const updateF = useCallback((amount: number) => {
        ;(async() => {
            const req = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({amount: amount})
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                menuid: menuid,
                name: name
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/materials?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setMaterial(data?.materials)
        })()
    }, [navigate, id, token, name, menuid, setMaterial])

    const deleteF = useCallback(() => {
        ;(async() => {
            const req = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                menuid: menuid,
                name: name
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/materials?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setMaterial(data?.materials)
        })()
    }, [navigate, id, token, name, menuid, setMaterial])


    return (
        <Stack spacing={2} direction="row" alignItems="center" sx={{ display: 'flex', ml: '20px' }}>
            <Typography sx={{ fontSize: 14, flexGrow: 1 }} >
                {name}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
                <TextField
                    id={name}
                    type="number"
                    sx={{ width: '50px' }}
                    variant="standard"
                    inputRef={amountRef}
                    onChange={e => updateF(Number(e.target.value))}
                />
            </Box>
            <IconButton sx={{width: '40px', height: '40px'}} onClick={deleteF}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    )
}

export default MaterialBox