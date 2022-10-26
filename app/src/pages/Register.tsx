import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material'

import RegisterBox from 'components/RegisterBox'

const Register: React.FC = () => {
    const render = useMemo(() => (
        <>
            <Box sx={{mt: '30px'}}>
                <Typography variant='h4' sx={{ mb: '20px', textAlign: 'center', fontWeight: 'bold'}}>
                    Coro Food
                </Typography>
                <Typography variant='h4' sx={{ mb: '20px', textAlign: 'center'}}>
                    アカウント作成
                </Typography>
            </Box>

            <RegisterBox />
        </>
    ), [])

    return render
}

export default Register