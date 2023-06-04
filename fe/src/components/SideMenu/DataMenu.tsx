import {
  AdminPanelSettingsRounded,
  AssessmentRounded,
  CellWifiRounded,
  Dashboard,
  Face2Rounded,
  GroupsRounded,
  HouseRounded,
  MonetizationOnRounded
} from '@mui/icons-material'
import { BsFillDoorOpenFill } from 'react-icons/bs'

export const menus = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <Face2Rounded />,
    title: 'Manager ',
    path: '/manager',
    children: [
      {
        icon: <HouseRounded />,
        title: 'My house',
        path: '/manager/my-house'
      },
      {
        icon: <BsFillDoorOpenFill />,
        title: 'Room list',
        path: '/manager/room-list'
      },
      {
        icon: <CellWifiRounded />,
        title: 'Service',
        path: '/manager/service'
      },
      {
        icon: <MonetizationOnRounded />,
        title: 'Bill',
        path: '/manager/bill'
      },
      {
        icon: <GroupsRounded />,
        title: 'Tenant',
        path: '/manager/tenant'
      },
      {
        icon: <AssessmentRounded />,
        title: 'Report',
        path: '/manager/report'
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
        title: 'Manager list',
        path: '/admin/manager-list'
      },
      {
        icon: <MonetizationOnRounded />,
        title: 'Bill',
        path: '/admin/bill'
      },
      {
        icon: <AssessmentRounded />,
        title: 'Report',
        path: '/admin/report'
      }
    ]
  }
]
