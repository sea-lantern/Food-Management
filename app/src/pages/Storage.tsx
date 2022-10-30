import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import HeaderBar from 'components/HeaderBar'
import Ingredient from 'components/Ingredient'
import Seasoning from 'components/Seasoning'

type foodT = {
    name: string,
    amount: number,
    term: string
}

const Storage: React.FC = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const [foods, setFoods] = useState<{1: foodT[], 2: foodT[]}>({1: [], 2: []})

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
                token: token
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/foods?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            const data = await res.json()

            setFoods(data?.foods)
        })()
    }, [navigate])

    return (
        <>
            <HeaderBar name="食材管理" jumpTo='/management' jumpToName='献立管理' badgeCount={0} />

            <Box sx={{mx: '25px', my: '50px', display: 'flex', height: '700px'}}>
                <Ingredient id={id} token={token} data={foods[1]}/>
                <Seasoning id={id} token={token} data={foods[2]}/>
            </Box>
        </>
    )
}

export default Storage