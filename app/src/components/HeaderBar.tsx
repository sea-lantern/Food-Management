import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem, Typography, Badge, Button } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const settings = ['Profile', 'Logout']

const Header: React.FC<{ name: string, jumpTo: string, jumpToName: string, badgeCount: number }> = ({ name, jumpTo, jumpToName, badgeCount }) => {
    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }, [])

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    const handleFoodStrageButton = useCallback(() => {
        navigate(jumpTo)
    }, [navigate])

    return (
        <AppBar position="static" sx={{ bgcolor: "#2bd52b" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Coro Food : {name}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ flexGrow: 0 }}>
                    <Badge badgeContent={badgeCount} color='error' sx={{ mx: '20px' }}>
                        <Button sx={{ color: '#ffffff' }} onClick={handleFoodStrageButton}>
                            {jumpToName}
                        </Button>
                    </Badge>
                    
                    <IconButton
                        color="inherit"
                        sx={{ p: 0 }}
                        onClick={handleOpenUserMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header