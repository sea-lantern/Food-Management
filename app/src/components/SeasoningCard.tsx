import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, Slider, Typography, Stack, styled, IconButton, Box, TextField } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'paddingBottom': 0
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

const SeasoningCard: React.FC<{
    index: number,
    name: string,
    amount: number,
    term: string,
    updateF: (index: number, name: string, amount: number, term: string) => void,
    deleteF: (index: number, name: string) => void
}> = React.memo(({ index, name, amount, term, updateF, deleteF }) => {
    const [vamount, setVamount] = useState<number>(0)
    const [vterm, setVterm] = useState<string>('2000-01-01')

    const sliderC = useCallback((event: any, value: number | number[]) => {
        typeof value === 'number' && setVamount(value)
    }, [])

    const sliderCU = (event: any, value: number | number[]) => {
        typeof value === 'number' && updateF(index, name, value, vterm)
    }

    const termCU = (event: any) => {
        setVterm(event.target.value)
        updateF(index, name, vamount, event.target.value)
    }

    const color = amount < 20 ? '#ffd5d5' : '#dcf8f8'

    useEffect(() => {
        setVamount(amount)
        setVterm(term)
    }, [amount, term])

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
                                {vamount}%
                            </Typography>
                            <TextField
                                sx={{ flexGrow: 0, height: '50px' }}
                                type="date"
                                label="消費期限"
                                defaultValue={term.replaceAll('/', '-')}
                                onChange={termCU}
                            />
                        </Stack>
                        <CssSlider value={vamount} aria-label="Default" valueLabelDisplay="auto" onChange={sliderC} onChangeCommitted={sliderCU} />
                    </Box>
                    <IconButton sx={{my: 'auto', width: '40px', height: '40px'}} onClick={() => deleteF(index, name)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Pb0Card>
        </Card>
    )
})

export default SeasoningCard