import { SnackbarProvider } from 'notistack'
import About from 'pages/about'
import HostList from 'pages/admin/HostList'
import HouseList from 'pages/admin/HouseList'
import Role from 'pages/admin/Role'
import Dashboard from 'pages/dashboard'
import Home from 'pages/home'
import Bill from 'pages/host/Bill'
import { RoomDetail } from 'pages/host/Room/RoomDetail'
import RoomList from 'pages/host/Room/RoomList'
import Service from 'pages/host/Service'
import Settings from 'pages/host/Setting'
import Tenant from 'pages/host/Tenant'
import Login from 'pages/login'
import Register from 'pages/register'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  NotificationProvider,
  ThemeProvider,
  getCookie,
  useAuthStore
} from './components'
import { PATH } from './constants/Paths'

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
        <NotificationProvider />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

function AuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.ABOUT} element={<About />} />

      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />

      <Route path={PATH.DASHBOARD} element={<Dashboard />} />

      <Route path={PATH.HOST.ROOM_LIST} element={<RoomList />} />
      <Route path={PATH.HOST.ROOM_DETAIL} element={<RoomDetail />} />
      <Route path={PATH.HOST.BILL} element={<Bill />} />
      <Route path={PATH.HOST.SERVICE} element={<Service />} />
      <Route path={PATH.HOST.TENANT} element={<Tenant />} />

      <Route path={PATH.ADMIN.HOUSE_LIST} element={<HouseList />} />
      <Route path={PATH.ADMIN.HOST_LIST} element={<HostList />} />
      <Route path={PATH.ADMIN.ROLE} element={<Role />} />

      <Route path={PATH.SETTINGS} element={<Settings />} />
    </Routes>
  )
}

function UnAuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.ABOUT} element={<About />} />
      <Route path={PATH.HOME} element={<Home />} />

      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
    </Routes>
  )
}

export default App
