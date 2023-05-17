import {
  Box,
  BoxProps,
  CssBaseline,
  Drawer,
  ThemeProvider,
  createTheme,
  styled
} from '@mui/material'
import { Footer, Navbar, SideMenu, useActionStore } from 'components'
import { ReactNode } from 'react'
import styles from './style.module.scss'

const drawerWidth = 260

type LayoutProps = {
  title?: string
  children?: ReactNode
}

export type NavbarProps = {
  post?: boolean
  username?: boolean
}

const theme = createTheme({ typography: { fontFamily: 'Poppins' } })
interface Props extends BoxProps {}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  height: '100%',
  overflowY: 'auto',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: `${drawerWidth}px`
  })
}))

export const Layout = (props: Props & LayoutProps & NavbarProps) => {
  const { dispatchAction } = useActionStore()
  const action = useActionStore((store) => store.action?.status)
  const mobileOpen = action === undefined ? true : action
  const drawer = <SideMenu />

  const { children, post } = props

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Navbar {...props} />
        {post ? (
          <>
            {children}
            <Footer />
          </>
        ) : (
          <>
            <Box component="nav">
              <Drawer
                variant="persistent"
                anchor="left"
                open={mobileOpen}
                className={styles.SideMenu}
                classes={{
                  paper: styles.Paper
                }}
                sx={{
                  width: drawerWidth,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth
                  }
                }}
              >
                {drawer}
              </Drawer>
            </Box>
            <Main open={mobileOpen}>{children}</Main>
          </>
        )}
      </Box>
    </ThemeProvider>
  )
}
