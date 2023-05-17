import { SnackbarProvider } from 'notistack'
import Home from 'pages/home'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider, getCookie, useAuthStore } from './components'
import { PATH } from './constants/Paths'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined)
  const setAuth = useAuthStore((store) => store.setAuth)

  useEffect(() => {
    const accessToken = getCookie('access')
    try {
      const decodeToken = JSON.parse(atob(accessToken?.split('.')[1]))
      setAuth(decodeToken)
    } catch (e) {}

    const hasAccess = Boolean(accessToken)
    setIsLogged(hasAccess)
  }, [setAuth])

  if (isLogged === undefined) return <></>

  return (
    <ThemeProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        maxSnack={3}
      >
        <BrowserRouter>
          {isLogged ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

function AuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
    </Routes>
  )
}

function UnAuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
    </Routes>
  )
}

export default App
