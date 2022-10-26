import React, { useCallback, useState, useEffect } from 'react'
import { Card, CardContent, Slider, Typography, Stack, styled } from '@mui/material'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'padding-bottom': 0
    }
})

const CssSlider = styled(Slider)({
    color: '#2bd52b',
    '& .MuiSlider-thumb': {
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        }
    },
    '& .MuiSlider-valueLabel': {
        display: 'none',
    }
})

const IngredientCard: React.FC<{ name: string, initAmount: number, term: string }> = ({ name, initAmount, term }) => {
    const [amount, setAmount] = useState<number | number[]>(0)
    const [color, setColor] = useState<string>('#dcf8f8')

    const handleSliderChange = useCallback((event: Event, newValue: number | number[]) => {
        if (newValue < 20) setColor('#ffd5d5')
        else setColor('#dcf8f8')
        setAmount(newValue)
    }, [])

    useEffect(() => {
        if (initAmount < 20) setColor('#ffd5d5')
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
                        {amount}%
                    </Typography>
                    <Typography sx={{ fontSize: 14, flexGrow: 0 }} >
                        {term}
                    </Typography>
                </Stack>
                <CssSlider value={amount} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} />
            </Pb0Card>
        </Card>
    )
}

export default IngredientCard