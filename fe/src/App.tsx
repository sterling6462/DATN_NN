import { SnackbarProvider } from 'notistack'
import About from 'pages/about'
import BillDetailAdmin from 'pages/admin/Bill/BillDetail'
import BillListAdmin from 'pages/admin/Bill/BillList'
import { HouseDetail } from 'pages/admin/HouseList/HouseDetail'
import HouseList from 'pages/admin/HouseList/HouseList'
import ManagerDetail from 'pages/admin/Manager/ManagerDetail'
import ManagerList from 'pages/admin/Manager/ManagerList'
import AdminReport from 'pages/admin/Report'
import Dashboard from 'pages/dashboard'
import Home from 'pages/home'
import Login from 'pages/login'
import BillDetailManager from 'pages/manager/Bill/BillDetail'
import BillListManager from 'pages/manager/Bill/BillList'
import MyHouse from 'pages/manager/MyHouse'
import ManagerReport from 'pages/manager/Report'
import { RoomDetail } from 'pages/manager/Room/RoomDetail'
import RoomList from 'pages/manager/Room/RoomList'
import Service from 'pages/manager/Service'
import Tenant from 'pages/manager/Tenant'
import Register from 'pages/register'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  NotificationProvider,
  ThemeProvider,
  getCookie,
  useAuthStore,
  useHouseStore
} from './components'
import { PATH } from './constants/Paths'

function App() {
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined)
  const setAuth = useAuthStore((store) => store.setAuth)
  const { auth } = useAuthStore()
  const { setHouseInfo } = useHouseStore()

  useEffect(() => {
    const accessToken = getCookie('access')
    try {
      const decodeToken = JSON.parse(atob(accessToken?.split('.')[1]))
      setAuth(decodeToken)
      setHouseInfo(decodeToken?.houseId)
    } catch (e) {}

    const hasAccess = Boolean(accessToken)
    setIsLogged(hasAccess)
  }, [])

  if (isLogged === undefined) return <></>

  return (
    <ThemeProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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

      {/* Manager */}
      <Route path={PATH.MANAGER.MY_HOUSE} element={<MyHouse />} />
      <Route path={PATH.MANAGER.ROOM_LIST} element={<RoomList />} />
      <Route path={PATH.MANAGER.ROOM_LIST + '/:id'} element={<RoomDetail />} />
      <Route path={PATH.MANAGER.SERVICE} element={<Service />} />
      <Route path={PATH.MANAGER.BILL} element={<BillListManager />} />
      <Route
        path={PATH.MANAGER.BILL + '/:id'}
        element={<BillDetailManager />}
      />
      <Route path={PATH.MANAGER.TENANT} element={<Tenant />} />
      <Route path={PATH.MANAGER.REPORT} element={<ManagerReport />} />

      {/* Admin */}
      <Route path={PATH.ADMIN.HOUSE_LIST} element={<HouseList />} />
      <Route path={PATH.ADMIN.HOUSE_LIST + '/:id'} element={<HouseDetail />} />
      <Route path={PATH.ADMIN.MANAGER_LIST} element={<ManagerList />} />
      <Route
        path={PATH.ADMIN.MANAGER_LIST + '/:id'}
        element={<ManagerDetail />}
      />
      <Route path={PATH.ADMIN.BILL} element={<BillListAdmin />} />
      <Route path={PATH.ADMIN.BILL + '/:id'} element={<BillDetailAdmin />} />
      <Route path={PATH.ADMIN.REPORT} element={<AdminReport />} />
    </Routes>
  )
}

function UnAuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.ABOUT} element={<About />} />

      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route
        path="*"
        element={
          <Navigate
            to={PATH.LOGIN}
            replace
            state={{ from: window.location.pathname }}
          />
        }
      />
    </Routes>
  )
}

export default App
