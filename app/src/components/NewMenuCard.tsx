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

const NewMenuCard: React.FC<{
}> = ({}) => {
    const ct: {[key: number]: string} = {1: '朝食', 2: '昼食', 3: '夕食', 4: '夜食'}
    const ci: {[key: number]: string} = {1: '#95bfea', 2: '#d5d500', 3: '#ff8000', 4: '#9572b8'}

    const [material, setMaterial] = useState<materialT[]>([])

    return (
        <Card sx={{ m: '10px', boxShadow: 2, bgcolor: 'white', pb: 0 }}>
            <Box border={1} >
                <Pb0Card sx={{ pb: 0, color: 'black' }}>
                </Pb0Card>
            </Box>  
        </Card>
    )
}

export default NewMenuCard