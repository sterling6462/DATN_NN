import { Grid, Paper, Typography } from '@mui/material'
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
  RevenueChartState,
  SkeletonChart,
  capitalizeFirstLetter,
  onUpdateQuery,
  useListViewStore
} from 'components'
import { useAPI } from 'hook'
import queryString from 'query-string'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import styles from './style.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dropdownItem: Array<DataDropdownSelect> = [
  {
    key: 'month',
    value: 'month',
    label: 'Month'
  },
  {
    key: 'year',
    value: 'year',
    label: 'Year'
  }
]

export const VerticalBarChart = (props: Partial<BaseChartProps>) => {
  const { id = '', baseURL, title, classNameIcon, icon, ...rest } = props
  // Tạo một đối tượng Map để lưu trữ tổng số lượng các cột theo nhãn date và giá trị status
  const searchParams = queryString.parse(window.location.search)
  const onQuery = useListViewStore((store) => store.onQuery)
  const [dataChart, setDataChart] = useState<
    BaseChartState[] | RevenueChartState[]
  >([{ count: 0 }] || [{ revenue: 0 }])
  const [timeRange, setTimeRange] = useState()

  useAPI({
    baseURL: onUpdateQuery(baseURL, { select: timeRange }),
    onSuccess: (res) => setDataChart(res)
    // timeReload: 5000
  })

  const key = dropdownItem[0]?.key
  const valueIndex = dropdownItem.findIndex((d: any) => {
    if (d.value) return d?.value === searchParams[d?.key]
  })
  const handleChange = (item: DataDropdownSelect) => {
    const { value } = item
    onQuery(id, { select: value }, baseURL)
  }

  const aggregatedData: Record<
    string,
    { trueCount: number; falseCount: number }
  > = {}

  dataChart.forEach((item) => {
    const { count, status, date } = item as BaseChartState

    const key = date || ''
    const previousData = aggregatedData[key] || { trueCount: 0, falseCount: 0 }
    const newData = {
      trueCount: status
        ? previousData.trueCount + (count || 0)
        : previousData.trueCount,
      falseCount: !status
        ? previousData.falseCount + (count || 0)
        : previousData.falseCount
    }
    aggregatedData[key] = newData
  })

  const labels: string[] = []
  const trueCounts: number[] = []
  const falseCounts: number[] = []

  Object.entries(aggregatedData).forEach(([date, data]) => {
    labels.push(date)
    trueCounts.push(data.trueCount)
    falseCounts.push(data.falseCount)
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
          <Bar
            options={{
              responsive: true,
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
                  label: 'Unpaid',
                  borderWidth: 1,
                  borderRadius: 5,
                  data: falseCounts,
                  backgroundColor: 'rgba(255, 206, 86, 1)',
                  borderColor: '#00000000'
                },
                {
                  label: 'Paid',
                  borderWidth: 1,
                  borderRadius: 5,
                  data: trueCounts,
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: '#00000000'
                }
              ]
            }}
          />
        </>
      )}
    </Paper>
  )
}
