import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'
import { Box, Typography, Button, TextField, styled } from '@mui/material'

import InputErrorMessage from 'components/InputErrorMessage'

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#2bd52b',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2bd52b'
        }
    }
})

const CssButton = styled(Button)({
    boxShadow: 'none',
    backgroundColor: '#2bd52b',
    '&:hover': {
      backgroundColor: '#2bd52b'
    }
})

const LoginBox: React.FC = () => {
    const navigate = useNavigate()

    const [messages, setMessages] = useState<string[]>([])

    const emailRef = useRef<HTMLInputElement>()
    const passRef = useRef<HTMLInputElement>()

    const loginF = useCallback(async () => {
        const email = (emailRef.current && emailRef.current.value) || ''
        const pass = (passRef.current && passRef.current.value) || ''

        if(email === '' || pass === '') return

        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, pass: md5(pass)})
        }

        const res = await fetch(process.env.REACT_APP_SHOST + '/api/login', req)
        
        const data = await res.json()

        if(!res.ok) {
            setMessages([data?.message])
            if(passRef.current) passRef.current.value = ''
            return
        }

        localStorage.setItem('id', data?.id)
        localStorage.setItem('token', data?.token)

        navigate('/management')
    }, [navigate])

    useEffect(() => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
    }, [])

    const content = useMemo(() => (
        <>
            <form>
                <Typography variant='h6' sx={{ mt: '20px' }}>
                    メールアドレス
                </Typography>
                <CssTextField
                    fullWidth
                    id="cfmail"
                    placeholder="sample@sample.com"
                    variant="outlined"
                    autoComplete="username"
                    inputRef={emailRef}
                />
                <Typography variant='h6' sx={{ mt: '20px' }}>
                    パスワード
                </Typography>
                <CssTextField
                    fullWidth
                    id="cfpass"
                    type="password"
                    placeholder="password"
                    variant="outlined"
                    autoComplete="current-password"
                    inputRef={passRef}
                />
            </form>
            <Box sx={{ mt: '30px', textAlign: 'right' }}>
                <CssButton sx={{width: '150px'}} variant="contained" onClick={loginF}>
                    <Typography variant='h6'>
                        ログイン
                    </Typography>
                </CssButton>
            </Box>

            <Box sx={{mt: '50px'}}>
                <Link to="/register" style={{ color: '#2bd52b' }}>アカウントの作成はこちら</Link>
            </Box>
        </>
    ), [loginF])

    return (
        <Box sx={{ m: '0 auto', p: '30px 50px', width: '35%', boxShadow: 2, bgcolor: '#FFFFFF'}}>
            {messages.map((message, i) => 
                <InputErrorMessage key={i} message={message} />
            )}
            {content}
        </Box>
    )
}

export default LoginBox