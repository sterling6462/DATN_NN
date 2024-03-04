import { Person, Phone } from '@mui/icons-material'
import { Avatar, Chip, Grid, Skeleton, Typography } from '@mui/material'
import clsx from 'clsx'
import { UserInfo, stringToColor } from 'components'
import { useAPI } from 'hook'
import { useState } from 'react'
import styles from './style.module.scss'

type Props = {
  baseURL?: string
  titleCard?: string
}

type Data = {
  page: number
  total: number
  data: UserInfo[]
}

const CardUserItem = (props: UserInfo & { srcAvatar?: string }) => {
  const { firstName, lastName, username, phone, createdAt, srcAvatar } = props

  return (
    <Grid item className={styles.UserItem}>
      <Grid className={styles.LeftContainer}>
        <Avatar
          sx={{ backgroundColor: stringToColor(username) }}
          className={styles.Avatar}
        >
          {username.charAt(0)}
        </Avatar>
      </Grid>
      <Grid className={styles.RightContainer}>
        <Typography className={clsx(styles.Subhead1, styles.FullName)}>
          {firstName} {lastName}
        </Typography>
        <Grid className={styles.ExtraInfo}>
          <Person className={styles.Icon} />
          <Typography className={clsx(styles.Body2, styles.Text)}>
            {username}
          </Typography>
        </Grid>
        <Grid className={styles.ExtraInfo}>
          <Phone className={styles.Icon} />
          <Typography className={clsx(styles.Body2, styles.Text)}>
            {phone}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const CardUserRent = (props: Props) => {
  const { baseURL = '', titleCard } = props
  const [data, setData] = useState<Data>()

  useAPI({
    baseURL: baseURL,
    onSuccess(data) {
      setData(data)
    }
  })
  console.log(data)

  if (data?.data.length === 0) {
    return (
      <>
        <Skeleton></Skeleton>
      </>
    )
  }

  return (
    <Grid className={styles.Container}>
      <Grid className={styles.Header}>
        <Typography
          component={'span'}
          className={clsx(styles.Headline6, styles.Title)}
        >
          {titleCard}
        </Typography>
        <Chip
          label={data?.data.length}
          className={styles.Chip}
          classes={{ root: styles.ChipRoot, label: styles.ChipLabel }}
        />
      </Grid>
      <Grid container className={styles.Content}>
        {data?.data.map((item, index) => (
          <CardUserItem {...item} />
        ))}
      </Grid>
    </Grid>
  )
}
