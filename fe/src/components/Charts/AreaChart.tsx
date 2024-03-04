import { Grid, MenuItem as MUIMenuItem, Paper, Typography } from '@mui/material'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import clsx from 'clsx'
import {
  BaseChartProps,
  BaseChartState,
  DataDropdownSelect,
  DropdownContained,
  SkeletonChart,
  capitalizeFirstLetter,
  invokeRequest,
  onUpdateQuery
} from 'components'
import { useAPI } from 'hook'
import queryString from 'query-string'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import styles from './style.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)
const optionDate: Array<DataDropdownSelect> = [
  {
    key: 'month',
    value: 'month',
    label: 'Month'
  }
]

export const AreaChart = (props: BaseChartProps) => {
  const {
    id,
    baseURL = '',
    title,
    color,
    borderColor,
    classNameIcon,
    icon,
    name,
    ticksPadding,
    ...rest
  } = props
  const searchParams = queryString.parse(window.location.search)
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
  })

  const key = optionDate[0]?.key
  const valueIndex = optionDate.findIndex((d: any) => {
    if (d.value) return d?.value === searchParams[d?.key]
  })

  const handleChange = async (item: DataDropdownSelect, baseURL: string) => {
    const { value } = item
    invokeRequest({
      baseURL: onUpdateQuery(baseURL.split('?').pop(), {
        name: name,
        select: value
      }),
      onSuccess(data) {
        setDataChart(data)
      }
    })
  }

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
              <DropdownContained
                className={styles.Dropdown}
                defaultValue={valueIndex >= 0 ? valueIndex + 1 : 0}
              >
                <MUIMenuItem
                  value={0}
                  onClick={() =>
                    handleChange(
                      {
                        key,
                        value: undefined
                      } as DataDropdownSelect,
                      baseURL
                    )
                  }
                  className={styles.ItemDropdown}
                >
                  <div className={styles.DefaultSelected}>Select</div>
                </MUIMenuItem>
                {optionDate.map((item, index) => {
                  return (
                    <MUIMenuItem
                      value={index + 1}
                      className={styles.ItemDropdown}
                      onClick={() => handleChange(item, baseURL)}
                    >
                      {item.label}
                    </MUIMenuItem>
                  )
                })}
              </DropdownContained>
              <Grid className={clsx(styles.Icon, classNameIcon)}>{icon}</Grid>
            </Grid>
          </Grid>
          <Line
            options={{
              responsive: true,
              layout: {
                autoPadding: true
              },
              plugins: {
                title: { display: false },
                legend: { display: false, position: 'top' as const }
              },
              elements: {
                point: {
                  radius: 3
                },
                line: { borderWidth: 1.5, tension: 0.4 }
              },
              scales: {
                y: {
                  type: 'linear' as const,
                  display: true,
                  position: 'left' as const,
                  beginAtZero: true,
                  ticks: {
                    autoSkip: true,
                    precision: 0
                  }
                }
              }
            }}
            data={{
              labels: dataChart.map((data) => data.date),
              datasets: [
                {
                  label: title,
                  backgroundColor: color,
                  borderColor: borderColor,
                  data: dataChart.map((data) => data.count),
                  fill: true
                }
              ]
            }}
          />
        </>
      )}
    </Paper>
  )
}
