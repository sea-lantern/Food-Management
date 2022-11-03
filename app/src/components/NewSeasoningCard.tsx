import React, { Dispatch, useCallback, useRef, useState } from 'react'
import { Card, CardContent, Slider, Typography, Stack, styled, IconButton, Box, TextField } from '@mui/material'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
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

const NewSeasoningCard: React.FC<{
    addF: (name: string, amount: string, term: string) => void,
    setNewFlag: Dispatch<boolean>
}> = ({ addF, setNewFlag }) => {
    const nameRef = useRef<HTMLInputElement>()
    const termRef = useRef<HTMLInputElement>()

    const [vamount, setVamount] = useState<number>(100)

    const sliderC = useCallback((event: any, value: number | number[]) => {
        typeof value === 'number' && setVamount(value)
    }, [])

    return (
        <Card sx={{ borderRadius: "20px", boxShadow: 0, backgroundColor: '#dcf8f8', m: '10px', pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton sx={{my: 'auto', width: '40px', height: '40px'}} onClick={() => addF(nameRef.current?.value || '', String(vamount), termRef.current?.value.replaceAll('-', '/') || '')}>
                        <CheckBoxIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack spacing={2} direction="row" alignItems="center" sx={{ display: 'flex' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextField
                                    variant="standard"
                                    placeholder="名前"
                                    inputRef={nameRef}
                                />
                            </Box>
                            <Typography sx={{ fontSize: 14, flexGrow: 0 }} >
                                {vamount}%
                            </Typography>
                            <TextField
                                id="margin-none"
                                sx={{ flexGrow: 0, height: '50px' }}
                                type="date"
                                label="消費期限"
                                inputRef={termRef}
                                defaultValue="2000-01-01"
                            />
                        </Stack>
                        <CssSlider value={vamount} aria-label="Default" valueLabelDisplay="auto" onChange={sliderC} />
                    </Box>
                    <IconButton sx={{my: 'auto', width: '40px', height: '40px'}} onClick={() => setNewFlag(false)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Pb0Card>
        </Card>
    )
}

export default NewSeasoningCard