'use client'

import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { setDoc, collection, getDoc, query, getDocs, doc, deleteDoc } from 'firebase/firestore';

import { Box, Modal, Stack, TextField, Typography, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [results, setResults] = useState([])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  

  const updateInventory = async () => {
        try {
        console.log("fetching inventory")
        const snap = query(collection(firestore, "inventory"))
        console.log("1")
        const docs = await getDocs(snap)
        console.log("2")
        const inventoryList = []
        docs.forEach((doc) => {
          inventoryList.push({ name: doc.id, ...doc.data() })
        })
        setInventory(inventoryList)
      } catch {
        console.error("error fetching from inventory")
      }
      
    
  }

  const filteredItems = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    } else {
      await setDoc(docRef, {count: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  

  return <div>
    
    <AppBar position="static" style={{backgroundColor: '#831843'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div></div>
          <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <p
            className="font-sans"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'ui-sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            PantryPro<br></br>
          </p>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 4,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                className="font-sans"
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              
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
      </Container>
    </AppBar>

    
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}>
    
   
      
    <Box border="1px solid #333"
          height="550px">
      <Box 
      width="800px"
      height="100px"
      bgcolor="#F9A8D4"
      display="flex"
      alignItems="center"
      justifyContent="center"
      >
      <h1 className="font-sans" style={{fontSize: "40px"}}>PantryPro</h1>
      </Box>
      
      <Box display="flex"
      alignItems="center"
      justifyContent="center"
      marginBottom="10px"
      marginTop="10px" >
        
            <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginRight: "13px"}}
        >
          
          <InputBase
            
            placeholder="Search For Item"
            inputProps={{ 'aria-label': 'Search for item' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx = {{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
              fontSize: '16px', // Change the font size, 
              ml: 1, flex: 1
            }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          
          
        </Paper>
        <Button variant="outlined" justifyContent="center" onClick={handleOpen} sx = {{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
              fontSize: '16px', // Change the font size
            }}>Add New Item</Button>
        
        <Modal open={open} onClose={handleClose}>
      <Box position="absolute" 
           top="50%"
           left="50%" 
           width={300}
           height={200}
           
           bgcolor="white"
           border="2px solid #000"
           boxShadow={24}
           p={4}
           display="flex"
           flexDirection="column"
           gap={3}
           sx = {{
            transform: "translate(-50%, -50%)"
           }}
           >
            
           <p variant="h6" sx = {{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
              fontSize: '16px', // Change the font size
              
            }}>Add Item</p>
           <Stack width="100%" height="300px"direction="row" spacing={2} >
              <TextField variant="outlined"
                         fullWidth value={itemName}
                         onChange={(e) => {setItemName(e.target.value)}}>
                      
              </TextField>
              <Button variant="outlined"
                      onClick={() => {
                        addItem(itemName)
                        setItemName('')
                        handleClose()
                      }} sx = {{
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
                        fontSize: '16px', // Change the font size
                      }}>Add Item</Button>

           </Stack>
           
      </Box>
    </Modal>
      </Box>
    <Stack width="800px" height="350px" spacing={2} overflow="auto"> 
      {filteredItems.map(({name, count}) => (
        <Box
          key={name}
          width="100%"
          minHeight="100px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#FBCFE8"
          padding={5}
        >
          <p
            className="font-sans"
            variant="h3"
            color="#333"
            textAlign="center"
            style={{fontSize: "28px"}}
          >
            {name}
          </p>
          <p
            className="font-sans"
            variant="h3"
            color="#333"
            textAlign="center"
            style={{fontSize: "28px"}}
          >
            {count}
          </p>
          <Box justifyContent="space-between">
          <Button
            variant="contained"
            onClick={() => removeItem(name)}
            style={{ marginRight: '8px' }}  // Add margin here
            
            sx = {{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
              fontSize: '16px', // Change the font size
            }}
          >
            Remove
          </Button>
          <Button variant="contained" onClick={() => addItem(name)} sx = {{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Change the font family
              fontSize: '16px', // Change the font size
            }}>
            Add
          </Button>
          </Box>
          
        </Box>
      ))} 
    </Stack>
    </Box>
    
  </Box>
  </div>

  ;
}
