import { Grid, Typography } from '@mui/material'
import houseRent from 'assets/json/house-rent.json'
import clsx from 'clsx'
import { Layout, LottieAnimation } from 'components'
import styles from './style.module.scss'

export default function About() {
  return (
    <Layout post>
      <Grid container className={styles.About}>
        <Grid item xs={4}>
          <LottieAnimation
            animationData={houseRent}
            margin="0px"
            width="100%"
          />
        </Grid>
        <Grid item xs={8} className={styles.Content}>
          <Typography className={clsx(styles.Title, styles.Display3)}>
            Why choose us ?
          </Typography>
          <Typography className={clsx(styles.Details, styles.Body1)}>
            The website for searching, renting, and managing rental rooms is a
            reliable and convenient online platform. It serves as a solution for
            finding, renting, and managing rental rooms. The website offers a
            user-friendly interface and various useful features.
          </Typography>
          <Typography className={clsx(styles.Details, styles.Body1)}>
            Administrators have complete control over managing houses, rental
            rooms, and user accounts. They can assign roles and permissions to
            house managers, ensuring efficient operations and effective property
            management.
          </Typography>
          <Typography className={clsx(styles.Details, styles.Body1)}>
            House managers benefit from dedicated tools and functionalities
            tailored to their needs. They can effortlessly handle room
            management tasks such as updating room details, monitoring
            occupancy, and managing payments and bills. This streamlines the
            rental process and ensures accurate billing for each room.
          </Typography>
          <Typography className={clsx(styles.Details, styles.Body1)}>
            Tenants enjoy a seamless and user-friendly experience on the
            website. They can easily search for available rooms, access detailed
            information about each room, and conveniently book their preferred
            accommodations online. This saves time and effort while providing a
            transparent and efficient renting process.
          </Typography>
          <Typography className={clsx(styles.Details, styles.Body1)}>
            With its user-friendly interface, the website for searching,
            renting, and managing rental rooms brings benefits to both house
            owners and tenants. It optimizes the process of finding and renting
            rooms while enhancing transparency and convenience in room
            management.
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}
