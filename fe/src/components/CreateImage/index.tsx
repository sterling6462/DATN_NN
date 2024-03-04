import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { PrimaryButton, capitalizeFirstLetter } from 'components'
import domToImage from 'dom-to-image'
import saveAs from 'file-saver'
import { useRef, useState } from 'react'
import styles from './style.module.scss'

type ImageContentProps = {
  role: string
  username: string
  password: string
  zoom?: boolean
  classes?: { title?: string; textLabel?: string; text?: string }
}

const ImageContent = (props: ImageContentProps) => {
  const { role, username, password, zoom, classes } = props

  return (
    <div className={styles.DivContainer}>
      <Typography
        className={clsx(styles.Title, zoom ? styles.Headline2 : classes?.title)}
      >
        New {capitalizeFirstLetter(role)} account
      </Typography>
      <Grid container className={styles.GridContainer}>
        <Grid item className={styles.Label}>
          <Typography
            className={clsx(
              zoom ? styles.Headline4 : classes?.textLabel,
              styles.TextLabel
            )}
          >
            Username:
          </Typography>
          <Typography
            className={clsx(
              zoom ? styles.Headline4 : classes?.textLabel,
              styles.TextLabel
            )}
          >
            Password:
          </Typography>
        </Grid>
        <Grid item className={styles.Value}>
          <Typography
            className={clsx(
              zoom ? styles.Headline4 : classes?.text,
              styles.Text
            )}
          >
            {username}
          </Typography>
          <Typography
            className={clsx(
              zoom ? styles.Headline4 : classes?.text,
              styles.Text
            )}
          >
            {password}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

type CreateImageProps = {
  className?: string
  username?: string
  password?: string
  role?: string
}

export const CreateImage = (props: CreateImageProps) => {
  const { className, username = '', password = '', role = '' } = props
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(false)

  const handleDownloadImage = () => {
    const imageContainer = imageContainerRef.current

    if (imageContainer) {
      domToImage
        .toPng(imageContainer, {
          bgcolor: '#ffffff',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2rem'
          }
        })
        .then((dataUrl) => {
          saveAs(dataUrl, 'image.png')
        })
        .catch((error) => {
          console.error('Error generating image:', error)
        })
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ImageContainer}>
        <div ref={imageContainerRef} id="image-container">
          <ImageContent
            username={username}
            password={password}
            role={role}
            zoom={zoom}
            classes={{
              title: styles.Headline5,
              textLabel: styles.Headline6,
              text: styles.Headline6
            }}
          />
        </div>
      </div>

      <PrimaryButton variant="contained" onClick={handleDownloadImage}>
        Download
      </PrimaryButton>
    </div>
  )
}
