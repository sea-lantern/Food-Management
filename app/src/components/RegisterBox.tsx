import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react'
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

const RegisterBox: React.FC = () => {
    const navigate = useNavigate()

    const [messages, setMessages] = useState<string[]>([])

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const pass1Ref = useRef<HTMLInputElement>(null)
    const pass2Ref = useRef<HTMLInputElement>(null)

    const registerF = useCallback(async () => {
        const name = (nameRef.current && nameRef.current.value) || ''
        const email = (emailRef.current && emailRef.current.value) || ''
        const pass1 = (pass1Ref.current && pass1Ref.current.value) || ''
        const pass2 = (pass2Ref.current && pass2Ref.current.value) || ''

        setMessages([])
        let error = false

        if(name === '' || email === '' || pass1 === '' || pass2 === '') {
            setMessages(m => [...m, '入力されていない項目があります。'])
            error = true
        }

        if(pass1 !== pass2) {
            setMessages(m => [...m, 'パスワードが一致していません。'])
            error = true
        }

        if(error) {
            if(pass1Ref.current) pass1Ref.current.value = ''
            if(pass2Ref.current) pass2Ref.current.value = ''
            return
        }

        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, pass: md5(pass1), name: name})
        }

        const res = await fetch(process.env.REACT_APP_SHOST + '/api/account', req)
        
        const data = await res.json()

        if(!res.ok) {
            setMessages([data?.message])
            if(pass1Ref.current) pass1Ref.current.value = ''
            if(pass2Ref.current) pass2Ref.current.value = ''
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
                    アカウント名
                </Typography>
                <CssTextField
                    fullWidth
                    id="cfname"
                    placeholder="name"
                    variant="outlined"
                    inputRef={nameRef}
                />
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
                    id="cfpass1"
                    type="password"
                    placeholder="password"
                    variant="outlined"
                    autoComplete="current-password"
                    inputRef={pass1Ref}
                />
                <Typography variant='h6' sx={{ mt: '20px' }}>
                    パスワードの確認
                </Typography>
                <CssTextField
                    fullWidth
                    id="cfpass2"
                    type="password"
                    placeholder="password"
                    variant="outlined"
                    autoComplete="current-password"
                    inputRef={pass2Ref}
                />
            </form>
            <Box sx={{ mt: '30px', textAlign: 'right' }}>
                <CssButton sx={{width: '150px'}} variant="contained" onClick={registerF}>
                    <Typography variant='h6'>
                        登録
                    </Typography>
                </CssButton>
            </Box>

            <Box sx={{mt: '50px'}}>
                <Link to="/login">ログインはこちら</Link>
            </Box>
        </>
    ), [registerF])

    return (
        <Box sx={{ m: '0 auto', p: '30px 50px', width: '35%', boxShadow: 2, bgcolor: '#FFFFFF'}}>
            {messages.map((message, i) => 
                <InputErrorMessage key={i} message={message} />
            )}
            {content}
        </Box>
    )
}

export default RegisterBox