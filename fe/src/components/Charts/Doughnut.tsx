import { Grid, Paper, Typography } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import clsx from 'clsx'
import { capitalizeFirstLetter, onUpdateQuery } from 'components'
import { useAPI } from 'hook'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BaseChartProps, BaseChartState, SkeletonChart } from '.'
import styles from './style.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

const labelsRoom = ['Room available', 'Room in', 'Room full']

export function DoughnutChart(props: Partial<BaseChartProps>) {
  const { baseURL, title, color, classNameIcon, icon } = props
  const [dataChart, setDataChart] = useState<BaseChartState[]>([
    {
      count: 0,
      date: '',
      status: true
    }
  ])

  useAPI({
    baseURL: onUpdateQuery(baseURL),
    onSuccess: (res) => setDataChart(res)
    // timeReload: 5000
  })

  return (
    <Paper className={clsx(styles.ChartRoot)}>
      {!dataChart?.length ? (
        <SkeletonChart height={50} heightBonus={7} />
      ) : (
        <>
          <Grid className={styles.Header} container>
            <Grid>
              <Typography
                variant="caption"
                className={clsx(styles.Subhead1, styles.Title)}
              >
                {capitalizeFirstLetter(title || '')}
              </Typography>
            </Grid>
            <Grid className={styles.ExtraHeader}>
              <Grid className={clsx(styles.Icon, classNameIcon)}>{icon}</Grid>
            </Grid>
          </Grid>
          <Doughnut
            options={{
              responsive: true,
              aspectRatio: 1.9,
              interaction: { mode: 'index' as const, intersect: false },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  align: 'center',
                  labels: {
                    usePointStyle: true
                  }
                }
              },
              layout: {
                autoPadding: true
              }
            }}
            data={{
              labels: labelsRoom,
              datasets: [
                {
                  label: title,
                  backgroundColor: color,
                  data: dataChart.map((data) => data.count)
                }
              ]
            }}
          />
        </>
      )}
    </Paper>
  )
}
