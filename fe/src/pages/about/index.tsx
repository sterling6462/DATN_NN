import { Grid, Typography } from '@mui/material'
import houseRent from 'assets/json/house-rent.json'
import clsx from 'clsx'
import { Layout, LottieAnimation } from 'components'
import styles from './style.module.scss'

export default function About() {
  return (
    <Layout post>
      <Grid container className={styles.About}>
        <Grid item xs={5}>
          <LottieAnimation
            animationData={houseRent}
            margin="0px"
            width="100%"
          />
        </Grid>
        <Grid item xs={7} className={styles.Content}>
          <Typography className={clsx(styles.Title, styles.Display3)}>
            Why choose us ?
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro atque
            in architecto beatae blanditiis ratione perferendis impedit
            consectetur et doloribus repellat sequi consequatur, culpa
            laboriosam. Praesentium ab corrupti inventore eaque.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus,
            quisquam dolorum! Ullam tempore dolores pariatur necessitatibus
            alias aut delectus omnis sapiente fugiat aliquid autem veritatis
            nihil, eius, sint consequuntur iusto.
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}
