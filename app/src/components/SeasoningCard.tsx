import React, { useCallback, useState, useEffect } from 'react'
import { Card, CardContent, Slider, Typography, Stack, styled, IconButton, Box } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

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

const SeasoningCard: React.FC<{ name: string, initAmount: number, term: string }> = ({ name, initAmount, term }) => {
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
        <Card sx={{ borderRadius: "20px", boxShadow: 0, backgroundColor: color,  m: '10px', pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
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
                    </Box>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Pb0Card>
        </Card>
    )
}

export default SeasoningCard