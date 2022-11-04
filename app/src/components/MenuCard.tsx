import React, { Dispatch, useEffect, useState } from 'react'
import { Card, CardContent, styled, Box, Typography } from '@mui/material'

import MaterialBox from 'components/MaterialBox'

type materialT = {
    name: string,
    amount: number
}

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'paddingBottom': '16px'
    }
})

const MenuCard: React.FC<{
    id: string,
    token: string,
    info: {name: string, time: number, id: string},
    openF: boolean,
    setOpenId: Dispatch<string>,
    getMaterial: (menuid: string, setMaterial: Dispatch<materialT[]>) => void
}> = ({ id, token, info, openF, setOpenId, getMaterial }) => {
    const ct: {[key: number]: string} = {1: '朝食', 2: '昼食', 3: '夕食', 4: '夜食'}
    const ci: {[key: number]: string} = {1: '#95bfea', 2: '#d5d500', 3: '#ff8000', 4: '#9572b8'}

    const [material, setMaterial] = useState<materialT[]>([])

    useEffect(() => {
        if(!openF) return
        getMaterial(info.id, setMaterial)
    }, [openF, info, getMaterial])
    
    return (
        <Card sx={{ m: '10px', boxShadow: 2, bgcolor: 'white', pb: 0 }} onClick={() => setOpenId(info.id)}>
            <Box border={1} color={ci[info.time]}>
                <Pb0Card sx={{ pb: 0, color: 'black' }}>
                    <Typography sx={{ fontSize: 14 }} >
                        {ct[info.time]}
                    </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }} >
                        {info.name}
                    </Typography>
                    <Box borderBottom={1} borderTop={1} color={ci[info.time]} />
                    {openF && material.length !== 0 && material.map((v, i) => <MaterialBox key={i} id={id} token={token} name={v.name} amount={v.amount} menuid={info.id} setMaterial={setMaterial} />)}
                </Pb0Card>
            </Box>  
        </Card>
    )
}

export default MenuCard