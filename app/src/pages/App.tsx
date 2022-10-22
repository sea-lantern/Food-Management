import React, { useEffect, useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'

const App: React.FC = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [name, setName] = useState<string>('')

    useEffect(() => {
        const id = localStorage.getItem('id') || ''
        const token = localStorage.getItem('token') || ''

        if(id === '' || token === '') {
            navigate('/login')
            return
        }

        setId(id)
        setToken(token)

        ;(async() => {
            const req = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/account?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setName(data?.name)
        })()
    }, [navigate])

    return (
        <div>
            <p>Hello, {name}</p>
            <p>ID, {id}</p>
            <p>TOKEN, {token}</p>

            <div><Link to="/">ルート</Link></div>
            <div><Link to="/login">ログイン</Link></div>
            <div><Link to="/register">アカウント作成</Link></div>
            <div><Link to="/management">管理</Link></div>
        </div>
    )
}

export default App