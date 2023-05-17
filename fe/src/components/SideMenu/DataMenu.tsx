import {
  CellWifiRounded,
  Dashboard,
  Face2Rounded,
  GroupsRounded,
  HouseRounded,
  MonetizationOnRounded,
  SettingsRounded
} from '@mui/icons-material'
import { BsFillDoorOpenFill } from 'react-icons/bs'

export const menus = [
  {
    icon: <Dashboard />,
    title: 'Home',
    path: '/'
  },
  {
    icon: <Face2Rounded />,
    title: 'Host ',
    path: '/host',
    children: [
      {
        icon: <HouseRounded />,
        title: 'My house',
        path: '/host/my-house'
      },
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
    icon: <SettingsRounded />,
    title: 'Settings',
    path: '/settings'
  }
]
