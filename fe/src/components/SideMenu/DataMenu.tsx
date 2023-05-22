import {
  AdminPanelSettingsRounded,
  CellWifiRounded,
  Dashboard,
  Face2Rounded,
  GroupsRounded,
  HouseRounded,
  MonetizationOnRounded,
  SettingsRounded
} from '@mui/icons-material'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { FaUserCog } from 'react-icons/fa'

export const menus = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <Face2Rounded />,
    title: 'Host ',
    path: '/host',
    children: [
      {
        icon: <BsFillDoorOpenFill />,
        title: 'Room list',
        path: '/host/room-list'
      },
      {
        icon: <GroupsRounded />,
        title: 'Tenant',
        path: '/host/tenant'
      },
      {
        icon: <CellWifiRounded />,
        title: 'Service',
        path: '/host/service'
      },
      {
        icon: <MonetizationOnRounded />,
        title: 'Bill',
        path: '/host/bill'
      }
    ]
  },
  {
    icon: <AdminPanelSettingsRounded />,
    title: 'Admin ',
    path: '/admin',
    children: [
      {
        icon: <HouseRounded />,
        title: 'My houses',
        path: '/admin/house-list'
      },
      {
        icon: <GroupsRounded />,
        title: 'Host list',
        path: '/admin/host-list'
      },
      {
        icon: <FaUserCog />,
        title: 'Role',
        path: '/admin/role'
      }
    ]
  },
  {
    icon: <SettingsRounded />,
    title: 'Settings',
    path: '/settings'
  }
]
