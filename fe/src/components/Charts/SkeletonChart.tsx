import { Box, Grid, Skeleton } from '@mui/material'
import styles from './style.module.scss'

export const SkeletonChart = (props: {
  height: number
  heightBonus: number
}) => {
  const { height, heightBonus } = props
  const SkeletonHeight = height ? height + heightBonus : 240

  return (
    <Grid container spacing={2} className={styles.SkeletonRoot}>
      <Box className={styles.SkeletonTitle}>
        <Skeleton />
      </Box>
      <Box
        className={styles.SkeletonChart}
        sx={{ height: SkeletonHeight + 'px' }}
      >
        <Skeleton />
      </Box>
    </Grid>
  )
}
