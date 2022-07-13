import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'

import Header from '@/components/layouts/Header'
import Menu from '@/components/layouts/Menu'
import { DrawerHeader } from '@/constants/index'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={() => setOpen(true)} />
      <Menu open={open} handleDrawerClose={() => setOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
