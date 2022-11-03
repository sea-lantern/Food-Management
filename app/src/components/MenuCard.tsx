import React from 'react'
import { Card, CardContent, styled } from '@mui/material'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'paddingBottom': '16px'
    }
})

const MenuCard: React.FC<{ info: {name: string, time: number, id: string} }> = ({ info }) => {
    const ci: {[key: number]: string} = {1: '#95bfea', 2: '#d5d500', 3: '#ff8000', 4: '#9572b8'}
    
    return (
        <Card sx={{ borderRadius: "20px", boxShadow: 0, m: '10px', bgcolor: ci[info.time], pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                {info.name}
            </Pb0Card>
        </Card>
    )
}

export default MenuCard