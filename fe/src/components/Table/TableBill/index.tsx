import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import clsx from 'clsx'
import { BillDetailData, currencyFormat } from 'components'
import styles from './style.module.scss'
export * from './TableBillLoading'

interface TableBillProps {
  data?: BillDetailData
  className?: string
}
interface TableBillRowProps {
  label: string
  detail?: string
  price: number
}
export const TableBillRow = (props: TableBillRowProps) => {
  const { label, detail, price } = props
  return (
    <TableRow className={styles.TableBillRow}>
      <TableCell
        className={clsx(styles.Body2, styles.TableCell)}
        classes={{ root: styles.TableCell }}
        width={'30%'}
      >
        {label}
      </TableCell>
      <TableCell
        className={clsx(styles.Body2, styles.TableCell)}
        classes={{ root: styles.TableCell }}
        width={'40%'}
      >
        {detail}
      </TableCell>
      <TableCell
        className={clsx(styles.Body2, styles.TableCellPrice)}
        classes={{ root: styles.TableCell }}
        align="right"
        width={'30%'}
      >
        {currencyFormat(price)}
      </TableCell>
    </TableRow>
  )
}

export const TableBill = (props: TableBillProps) => {
  const { data, className } = props

  return (
    <Grid container className={clsx(styles.TableBill, className)}>
      <Table>
        <TableHead className={clsx(styles.Subhead1, styles.TableHeadBill)}>
          <TableRow className={styles.TableRowHead}>
            <TableCell className={styles.TableCellHead}>Receipts</TableCell>
            <TableCell className={styles.TableCellHead}>Details</TableCell>
            <TableCell className={styles.TableCellHead} align="right">
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableBillRow label="Room rent" price={data?.roomBill || 0} />
          <TableBillRow
            label="Electricity bill"
            price={data?.electricityBill || 0}
          />
          <TableBillRow label="Water bill" price={data?.waterBill || 0} />
          <TableBillRow label="Wifi bill" price={data?.wifiBill || 0} />
          <TableBillRow
            label="Other bill"
            price={data?.otherBill || 0}
            detail="fee fix house"
          />

          <TableRow>
            <TableCell
              colSpan={2}
              align="right"
              className={clsx(styles.Headline6, styles.TableRowTotal)}
            >
              Total
            </TableCell>
            <TableCell
              className={clsx(styles.Headline6, styles.TableRowTotal)}
              align="right"
            >
              {currencyFormat(data?.total || 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid className={styles.ExtraHeader}></Grid>
    </Grid>
  )
}
