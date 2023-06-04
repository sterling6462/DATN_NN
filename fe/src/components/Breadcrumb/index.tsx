import {
  Breadcrumbs,
  LinkProps,
  BreadcrumbsProps as MUIBreadcrumbsProps
} from '@mui/material'
import clsx from 'clsx'
import { capitalizeFirstLetter } from 'components/util'
import { Link as MUILink } from 'react-router-dom'
import styles from './style.module.scss'

type CustomLinkProps = {
  href: string
  text: string
}

type BreadcrumbsProps = MUIBreadcrumbsProps & {
  pathnames: string[]
}

export const Link = (props: LinkProps & CustomLinkProps) => {
  const { text, href, className, ...rest } = props
  return (
    <MUILink className={clsx(styles.Link, styles.Body2, className)} to={href}>
      {capitalizeFirstLetter(text)}
    </MUILink>
  )
}

export const BreadcrumbsNavigation = (props: BreadcrumbsProps) => {
  const { className, classes, pathnames, ...rest } = props
  const pathName = pathnames.slice(1)

  return (
    <Breadcrumbs
      {...rest}
      className={clsx(styles.Breadcrumbs, className)}
      classes={{ li: styles.BreadcrumbsLi, ...classes }}
    >
      <Link href="" text={pathnames[0]} />

      {pathName.map((name, index) => {
        const routeTo = `/${pathnames[0]}/${pathName
          .slice(0, index + 1)
          .join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Link key={name + index} href={''} text={name.replace('-', ' ')} />
        ) : (
          <Link
            key={name + index}
            text={name.replace('-', ' ')}
            href={`${routeTo}`}
          />
        )
      })}
    </Breadcrumbs>
  )
}
