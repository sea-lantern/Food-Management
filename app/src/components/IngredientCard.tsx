import React, { useEffect, useRef } from 'react'
import { Card, CardContent, Typography, Stack, styled, IconButton, TextField, Box } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'paddingBottom': '16px'
    }
})

const IngredientCard: React.FC<{
    index: number,
    name: string,
    amount: number,
    updateF: (index: number, name: string, amount: string) => void,
    deleteF: (index: number, name: string) => void
}> = React.memo(({ index, name, amount, updateF, deleteF }) => {
    const amountRef = useRef<HTMLInputElement>()

    const color = amount < 0 ? '#ffd5d5' : '#dcf8f8'

    useEffect(() => {
        if(amountRef.current) amountRef.current.value = String(amount)
    }, [amount, amountRef])

    return (
        <Card sx={{ borderRadius: "20px", boxShadow: 0, m: '10px', bgcolor: color, pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ display: 'flex' }}>
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
                            onChange={e => updateF(index, name, e.target.value)}
                        />
                    </Box>
                    <IconButton onClick={() => deleteF(index, name)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Pb0Card>
        </Card>
    )
})

export default IngredientCard