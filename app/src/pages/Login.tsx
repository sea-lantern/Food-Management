import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import LoginBox from 'components/LoginBox'

const Login: React.FC = () => {
    const render = useMemo(() => (
        <>
            <Box sx={{mt: '30px'}}>
                <Typography variant='h5' sx={{ mb: '20px', textAlign: 'center'}}>
                    食材管理アプリケーション
                </Typography>
                <Typography variant='h2' sx={{ mb: '20px', textAlign: 'center', fontWeight: 'bold'}}>
                    Coro Food
                </Typography>
            </Box>
            
            <LoginBox />
        </>
    ), [])

    return render
}

export default Login