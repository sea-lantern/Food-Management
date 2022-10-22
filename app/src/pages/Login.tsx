import React, { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login: React.FC = () => {
    const navigate = useNavigate()

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
        
        if(!res.ok) return

        const data = await res.json()

        localStorage.setItem('id', data?.id)
        localStorage.setItem('token', data?.token)

        navigate('/management')
    }, [navigate])

    useEffect(() => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
    }, [])

    return (
        <div>
            <p>ログイン</p>
            <form>
                <>メールアドレス</>
                <div><TextField id="cfmail" placeholder="yamada-tarou@sample.com" variant="outlined" autoComplete="username" inputRef={emailRef}/></div>
                <>パスワード</>
                <div><TextField id="cfpass" type="password" placeholder="password" variant="outlined" autoComplete="current-password" inputRef={passRef}/></div>
            </form>
            <Button variant="contained" onClick={loginF}>ログイン</Button>


            <div><Link to="/">ルート</Link></div>
            <div><Link to="/login">ログイン</Link></div>
            <div><Link to="/register">アカウント作成</Link></div>
            <div><Link to="/management">管理</Link></div>
        </div>
    )
}

export default Login