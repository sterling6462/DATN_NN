import { Grid, MenuItem as MUIMenuItem, Paper, Typography } from '@mui/material'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import clsx from 'clsx'
import {
  BaseChartProps,
  BaseChartState,
  DataDropdownSelect,
  DropdownContained,
  RevenueChartState,
  SkeletonChart,
  capitalizeFirstLetter,
  invokeRequest,
  onUpdateQuery
} from 'components'
import { useAPI } from 'hook'
import queryString from 'query-string'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import styles from './style.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const optionDate: Array<DataDropdownSelect> = [
  {
    key: 'year',
    value: 'year',
    label: 'Year'
  }
]

export const BarChart = (props: BaseChartProps) => {
  const {
    id,
    baseURL = '',
    title,
    color,
    classNameIcon,
    icon,
    name,
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

  const aggregatedData: Record<string, { trueCount: number }> = {}

  dataChart.forEach((item) => {
    const { status, date, revenue } = item as RevenueChartState
    const key = date || ''
    const previousData = aggregatedData[key] || { trueCount: 0 }
    const newData = {
      trueCount: status
        ? previousData.trueCount + (revenue || 0)
        : previousData.trueCount
    }
    aggregatedData[key] = newData
  })

  const labels: string[] = []
  const trueCounts: number[] = []

  Object.entries(aggregatedData).forEach(([date, data]) => {
    labels.push(date)
    trueCounts.push(data.trueCount)
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
          <Bar
            options={{
              responsive: true,
              interaction: { mode: 'index' as const, intersect: false },
              layout: {
                autoPadding: true
              },
              plugins: {
                legend: {
                  display: false,
                  position: 'top' as const
                }
              }
            }}
            data={{
              labels: labels,
              datasets: [
                {
                  label: title,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#00000000',
                  backgroundColor: color,
                  data: trueCounts
                }
              ]
            }}
          />
        </>
      )}
    </Paper>
  )
}
