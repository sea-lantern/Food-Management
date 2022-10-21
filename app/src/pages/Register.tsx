import React, { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Register: React.FC = () => {
    const navigate = useNavigate()

    const nameRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()
    const pass1Ref = useRef<HTMLInputElement>()
    const pass2Ref = useRef<HTMLInputElement>()

    const registerF = useCallback(async () => {
        const name = (nameRef.current && nameRef.current.value) || ''
        const email = (emailRef.current && emailRef.current.value) || ''
        const pass1 = (pass1Ref.current && pass1Ref.current.value) || ''
        const pass2 = (pass2Ref.current && pass2Ref.current.value) || ''

        if(name === '' || email === '' || pass1 === '' || pass2 === '') return
        if(pass1 !== pass2) return

        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, pass: md5(pass1), name: name})
        }

        const res = await fetch('http://localhost:8000/api/account', req)

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
            <p>新規作成</p>
            <form>
                <>名前</>
                <div><TextField id="cfname" placeholder="your name" variant="outlined" inputRef={nameRef}/></div>
                <>メールアドレス</>
                <div><TextField id="cfmail" placeholder="yamada-tarou@sample.com" variant="outlined" autoComplete="username" inputRef={emailRef}/></div>
                <>パスワード</>
                <div><TextField id="cfpass1" type="password" placeholder="password" variant="outlined" autoComplete="current-password" inputRef={pass1Ref}/></div>
                <>パスワード確認</>
                <div><TextField id="cfpass2" type="password" placeholder="password" variant="outlined" autoComplete="current-password" inputRef={pass2Ref}/></div>
            </form>
            <Button variant="contained" onClick={registerF}>新規作成</Button>


            <div><Link to="/">ルート</Link></div>
            <div><Link to="/login">ログイン</Link></div>
            <div><Link to="/register">アカウント作成</Link></div>
            <div><Link to="/management">管理</Link></div>
        </div>
    )
}

export default Register