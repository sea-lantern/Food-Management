import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';

import IngredientCard from 'components/IngredientCard'
import NewIngredientCard from 'components/NewIngredientCard'

type foodT = {
    name: string,
    amount: number,
    term: string
}

const Ingredient: React.FC<{ id: string, token: string, data: foodT[] }> = ({ id, token, data }) => {
    const navigate = useNavigate()

    const [food, setFood] = useState<foodT[]>([])
    const [newFlag, setNewFlag] = useState<boolean>(false)

    const addF = useCallback((name: string, amount: string) => {
        if(name === '' || amount === '') return

        setFood(prev => {
            prev.push({name: name, amount: Number(amount), term: 'unused'})
            return prev
        })

        ;(async() => {
            const req = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({type: 1, amount: amount})
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                name: name
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/foods?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }

            setNewFlag(false)
        })()
    }, [navigate, id, token])

    const updateF = useCallback((index: number, name: string, amount: string) => {
        setFood(prev => {
            let after = prev.concat()
            after[index].amount = Number(amount)
            return after
        })

        ;(async() => {
            const req = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({amount: amount})
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                name: name
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/foods?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }
        })()
    }, [navigate, id, token])

    const deleteF = useCallback((index: number, name: string) => {
        setFood(prev => {
            let after = prev.concat()
            after.splice(index, 1)
            return after
        })
        
        ;(async() => {
            const req = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }

            const query = new URLSearchParams({
                id: id,
                token: token,
                name: name
            })

            const res = await fetch(process.env.REACT_APP_SHOST + '/api/foods?' + query, req)

            if(!res.ok) {
                navigate('/login')
                return
            }
        })()
    }, [navigate, id, token])

    useEffect(() => setFood(data), [data])

    return (
        <Box sx={{ height: '80%', width: '50%', mx: '25px' }}>
            <Typography variant="h4" component="div" sx={{ mb: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                食材
                <IconButton sx={{ bgcolor: 'white', boxShadow: 2 }} onClick={() => setNewFlag(true)}>
                    <AddIcon />
                </IconButton>
            </Typography>

            <Box sx={{ height: '80%', bgcolor: 'white', mx: '20px', boxShadow: 2, overflow: 'auto' }}>
                {newFlag && <NewIngredientCard key={'NewIngredient'} addF={addF} setNewFlag={setNewFlag} />}
                {food.map((v, i) => <IngredientCard key={i} index={i} name={v.name} amount={v.amount} updateF={updateF} deleteF={deleteF} />)}
            </Box>
        </Box>
    )
}

export default Ingredient