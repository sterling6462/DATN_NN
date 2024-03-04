import { faDongSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { People } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { BarChart, DoughnutChart, Layout } from 'components'
import { AreaChart } from 'components/Charts/AreaChart'
import { VerticalBarChart } from 'components/Charts/VerticalBarChart'
import {
  DASHBOARD_BILL,
  DASHBOARD_REVENUE,
  DASHBOARD_ROOM,
  DASHBOARD_USER
} from 'constants/ApiConstant'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import styles from './style.module.scss'

export default function Dashboard() {
  return (
    <Layout>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DoughnutChart
            baseURL={DASHBOARD_ROOM}
            id="dashboard-room"
            title="room"
            color={[
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ]}
            classNameIcon={styles.RoomIconHeader}
            icon={<BsFillDoorOpenFill />}
          />
        </Grid>
        <Grid item xs={6}>
          <AreaChart
            ticksPadding={10}
            id="dashboard-user"
            height={80}
            heightBonus={20}
            title="user"
            name="user"
            unitValue="person"
            baseURL={DASHBOARD_USER}
            color="#D2F7EE"
            borderColor="#2fdab1"
            classNameIcon={styles.UserIconHeader}
            icon={<People />}
          />
        </Grid>
        <Grid item xs={6}>
          <VerticalBarChart
            baseURL={DASHBOARD_BILL}
            id="dashboard-bill"
            title="Bill"
            classNameIcon={styles.BillIconHeader}
            icon={<FontAwesomeIcon icon={faDongSign} />}
          />
        </Grid>
        <Grid item xs={6}>
          <BarChart
            id="dashboard-revenue"
            height={80}
            heightBonus={20}
            title="revenue"
            name="revenue"
            unitValue=""
            baseURL={DASHBOARD_REVENUE}
            color="#9966ff"
            classNameIcon={styles.RevenueIconHeader}
            icon={<FontAwesomeIcon icon={faDongSign} />}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}
