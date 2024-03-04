import { SnackbarProvider } from 'notistack'
import NotFound from 'pages/404'
import About from 'pages/about'
import BillDetailAdmin from 'pages/admin/Bill/BillDetailAdmin'
import BillListAdmin from 'pages/admin/Bill/BillListAdmin'
import { HouseDetailAdmin } from 'pages/admin/HouseList/HouseDetailAdmin'
import HouseList from 'pages/admin/HouseList/HouseList'
import ProfileAdmin from 'pages/admin/Profile'
import RoomAdmin from 'pages/admin/Room/RoomAdmin'
import UserDetail from 'pages/admin/User/UserDetail'
import UserList from 'pages/admin/User/UserList'
import Dashboard from 'pages/dashboard'
import Home from 'pages/home'
import HouseDetail from 'pages/home/HouseDetail'
import Login from 'pages/login'
import BillDetailManager from 'pages/manager/Bill/BillDetailManager'
import BillListManager from 'pages/manager/Bill/BillListManager'
import MyHouse from 'pages/manager/MyHouse'
import { RoomDetail } from 'pages/manager/Room/RoomDetail'
import RoomManager from 'pages/manager/Room/RoomManager'
import Service from 'pages/manager/Service'
import TenantDetail from 'pages/manager/Tenant/TenantDetail'
import TenantList from 'pages/manager/Tenant/TenantList'
import BillDetailMember from 'pages/member/Bill/BillDetailMember'
import BillListMember from 'pages/member/Bill/BillListMember'
import { RoomDetailMember } from 'pages/member/Room/RoomDetailMember'
import ServiceMember from 'pages/member/Service'
import Profile from 'pages/profile'
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
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />

      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.HOME + '/:id'} element={<HouseDetail />} />
      <Route path={PATH.ABOUT} element={<About />} />
      <Route path={PATH.DASHBOARD} element={<Dashboard />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.NOTFOUND} element={<NotFound />} />

      {/* Admin */}
      <Route path={PATH.ADMIN.HOUSE_LIST} element={<HouseList />} />
      <Route
        path={PATH.ADMIN.HOUSE_LIST + '/:id'}
        element={<HouseDetailAdmin />}
      />
      <Route path={PATH.ADMIN.ROOM_LIST} element={<RoomAdmin />} />
      <Route path={PATH.ADMIN.ROOM_LIST + '/:id'} element={<RoomDetail />} />
      <Route path={PATH.ADMIN.USER_LIST} element={<UserList />} />
      <Route path={PATH.ADMIN.USER_LIST + '/:id'} element={<UserDetail />} />
      <Route path={PATH.ADMIN.BILL} element={<BillListAdmin />} />
      <Route path={PATH.ADMIN.BILL + '/:id'} element={<BillDetailAdmin />} />
      <Route path={PATH.ADMIN.PROFILE} element={<ProfileAdmin />} />

      {/* Manager */}
      <Route path={PATH.MANAGER.MY_HOUSE} element={<MyHouse />} />
      <Route path={PATH.MANAGER.ROOM_LIST} element={<RoomManager />} />
      <Route path={PATH.MANAGER.ROOM_LIST + '/:id'} element={<RoomDetail />} />
      <Route path={PATH.MANAGER.SERVICE} element={<Service />} />
      <Route path={PATH.MANAGER.BILL} element={<BillListManager />} />
      <Route
        path={PATH.MANAGER.BILL + '/:id'}
        element={<BillDetailManager />}
      />
      <Route path={PATH.MANAGER.TENANT} element={<TenantList />} />
      <Route path={PATH.MANAGER.TENANT + '/:id'} element={<TenantDetail />} />

      {/* Member */}
      <Route path={PATH.MEMBER.MY_HOUSE} element={<MyHouse />} />
      <Route path={PATH.MEMBER.ROOM_DETAIL} element={<RoomDetailMember />} />
      <Route path={PATH.MEMBER.SERVICE} element={<ServiceMember />} />
      <Route path={PATH.MEMBER.BILL} element={<BillListMember />} />
      <Route path={PATH.MEMBER.BILL + '/:id'} element={<BillDetailMember />} />
    </Routes>
  )
}

function UnAuthorizedRoutes() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.ABOUT} element={<About />} />
      <Route path={PATH.NOTFOUND} element={<NotFound />} />

      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route
        path="*"
        element={
          <Navigate
            to={PATH.HOME}
            replace
            state={{ from: window.location.pathname }}
          />
        }
      />
    </Routes>
  )
}

export default App
