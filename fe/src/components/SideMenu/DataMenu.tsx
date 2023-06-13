import {
  AdminPanelSettingsRounded,
  CellWifiRounded,
  Dashboard,
  Face2Rounded,
  GroupsRounded,
  HouseRounded,
  MonetizationOnRounded,
  Person
} from '@mui/icons-material'
import { PATH } from 'constants/Paths'
import { BsFillDoorOpenFill } from 'react-icons/bs'

export const AdminMenus = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    path: PATH.DASHBOARD
  },
  {
    icon: <AdminPanelSettingsRounded />,
    title: 'Admin ',
    path: '/admin',
    children: [
      {
        icon: <HouseRounded />,
        title: 'My houses',
        path: PATH.ADMIN.HOUSE_LIST
      },
      {
        icon: <GroupsRounded />,
        title: 'Manager list',
        path: PATH.ADMIN.MANAGER_LIST
      },
      {
        icon: <MonetizationOnRounded />,
        title: 'Bill',
        path: PATH.ADMIN.BILL
      }
    ]
  },
  {
    icon: <Person />,
    title: 'Profile',
    path: PATH.PROFILE
  }
]

export const ManagerMenus = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    path: PATH.DASHBOARD
  },
  {
    icon: <Face2Rounded />,
    title: 'Manager ',
    path: '/manager',
    children: [
      {
        icon: <HouseRounded />,
        title: 'My house',
        path: PATH.MANAGER.MY_HOUSE
      },
      {
        icon: <BsFillDoorOpenFill />,
        title: 'Room list',
        path: PATH.MANAGER.ROOM_LIST
      },
      {
        icon: <CellWifiRounded />,
        title: 'Service',
        path: PATH.MANAGER.SERVICE
      },
      {
        icon: <MonetizationOnRounded />,
        title: 'Bill',
        path: PATH.MANAGER.BILL
      },
      {
        icon: <GroupsRounded />,
        title: 'Tenant',
        path: PATH.MANAGER.TENANT
      }
    ]
  },
  {
    icon: <Person />,
    title: 'Profile',
    path: PATH.PROFILE
  }
]
