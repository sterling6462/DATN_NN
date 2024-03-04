import { Grid } from '@mui/material'
import notFound from 'assets/json/404.json'

import { Layout, LottieAnimation, PrimaryButton } from 'components'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Layout post>
      <Grid container className={styles.NotFound}>
        <Grid item xs={5}>
          <LottieAnimation animationData={notFound} margin="0px" width="100%" />
        </Grid>
        <PrimaryButton onClick={() => navigate('/')}>Home</PrimaryButton>
      </Grid>
    </Layout>
  )
}
