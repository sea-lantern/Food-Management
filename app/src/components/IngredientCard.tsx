import React, { useCallback, useState, useEffect } from 'react'
import { Card, CardContent, Slider, Typography, Stack, styled, IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'padding-bottom': '16px'
    }
})

const IngredientCard: React.FC<{ name: string, initAmount: number, term: string }> = ({ name, initAmount, term }) => {
    const [amount, setAmount] = useState<number>(0)
    const [color, setColor] = useState<string>('#dcf8f8')

    const handlePlusAmount = () => {
        setAmount(prev => {
            if (prev + 1 < 0) setColor('#ffd5d5')
            else setColor('#dcf8f8')
            return prev + 1
        })
    }

    const handleMinusAmount = () => {
        setAmount(prev => {
            if (prev - 1 < 0) setColor('#ffd5d5')
            else setColor('#dcf8f8')
            return prev - 1
        })
    }

    useEffect(() => {
        if (initAmount < 0) setColor('#ffd5d5')
        else setColor('#dcf8f8')
        setAmount(initAmount)
    }, [])

    return (
        <Card sx={{ borderRadius: "20px", boxShadow: 0, m: '10px', bgcolor: color, pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 14, flexGrow: 1 }} >
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, flexGrow: 0 }} >
                        <IconButton onClick={handleMinusAmount}>
                            <RemoveIcon />
                        </IconButton>
                        {amount}
                        <IconButton onClick={handlePlusAmount}>
                            <AddIcon />
                        </IconButton>
                    </Typography>
                    <Typography sx={{ fontSize: 14, flexGrow: 0 }} >
                        {term}
                    </Typography>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Pb0Card>
        </Card>
    )
}

export default IngredientCard