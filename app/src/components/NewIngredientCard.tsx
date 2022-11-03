import React, { Dispatch, useRef } from 'react'
import { Card, CardContent, Stack, styled, IconButton, TextField, Box } from '@mui/material'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DeleteIcon from '@mui/icons-material/Delete'

const Pb0Card = styled(CardContent)({
    '&: last-child': {
        'paddingBottom': '16px'
    }
})

const NewIngredientCard: React.FC<{
    addF: (name: string, amount: string) => void,
    setNewFlag: Dispatch<boolean>
}> = ({ addF, setNewFlag }) => {
    const nameRef = useRef<HTMLInputElement>()
    const amountRef = useRef<HTMLInputElement>()

    return (
        <Card sx={{ borderRadius: "20px", boxShadow: 0, m: '10px', bgcolor: '#dcf8f8', pb: 0 }}>
            <Pb0Card sx={{ pb: 0 }}>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ display: 'flex' }}>
                    <IconButton sx={{my: 'auto', width: '40px', height: '40px'}} onClick={() => addF(nameRef.current?.value || '', amountRef.current?.value || '')}>
                        <CheckBoxIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField
                            variant="standard"
                            placeholder="名前"
                            inputRef={nameRef}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <TextField
                            type="number"
                            sx={{ width: '50px' }}
                            variant="standard"
                            placeholder="個数"
                            inputRef={amountRef}
                        />
                    </Box>
                    <IconButton sx={{my: 'auto', width: '40px', height: '40px'}} onClick={() => setNewFlag(false)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Pb0Card>
        </Card>
    )
}

export default NewIngredientCard