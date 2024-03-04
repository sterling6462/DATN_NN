import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { ReactNode } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface BaseChartState {
  count?: number
  date?: string
  status?: boolean
}

export interface RevenueChartState {
  revenue?: number
  date?: string
  status?: boolean
}

export type DataDropdownSelect = {
  key: string
  value: any
  label: string
}

export interface BaseChartProps {
  icon?: JSX.Element
  unitValue?: string
  name?: string
  title?: string
  height: number
  heightBonus: number
  color?: string | string[]
  borderColor?: string | string[]
  baseURL?: string
  ticksPadding?: number
  className?: string
  classNameIcon?: string
  children?: ReactNode
  dataChart?: BaseChartState[] | RevenueChartState[]
  //dropdown
  select?: boolean
  labelDropdown?: string
  id: string
}

export * from './BarChart'
export * from './Doughnut'
export * from './SkeletonChart'
