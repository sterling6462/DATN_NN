import img from 'assets/img/img.jpg'
import clsx from 'clsx'
import { CardHome, Layout } from 'components'
import styles from './style.module.scss'

const Data = [
  {
    id: 1,
    imgSrc: img,
    descTitle: 'A.101',
    location: 'Da Nang',
    roomAvailable: 5,
    fees: '3.000.000đ',
    descriptions:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro possimus architecto, ipsum voluptates rerum odit officia, labore illo fugiat neque similique tempore esse sed alias vel exercitationem aut cupiditate.'
  },
  {
    id: 2,
    imgSrc: img,
    descTitle: 'A.102',
    location: 'Da Nang',
    roomAvailable: 5,
    fees: '3.000.000đ',
    descriptions:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro possimus architecto, ipsum voluptates rerum odit officia, labore illo fugiat neque similique tempore esse sed alias vel exercitationem aut cupiditate.'
  },
  {
    id: 3,
    imgSrc: img,
    descTitle: 'A.103',
    location: 'Da Nang',
    roomAvailable: 5,
    fees: '3.000.000đ',
    descriptions:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro possimus architecto, ipsum voluptates rerum odit officia, labore illo fugiat neque similique tempore esse sed alias vel exercitationem aut cupiditate.'
  },
  {
    id: 4,
    imgSrc: img,
    descTitle: 'A.104',
    location: 'Da Nang',
    roomAvailable: 5,
    fees: '3.000.000đ',
    descriptions:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro possimus architecto, ipsum voluptates rerum odit officia, labore illo fugiat neque similique tempore esse sed alias vel exercitationem aut cupiditate.'
  },
  {
    id: 5,
    imgSrc: img,
    descTitle: 'A.105',
    location: 'Da Nang',
    roomAvailable: 5,
    fees: '3.000.000đ',
    descriptions:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro possimus architecto, ipsum voluptates rerum odit officia, labore illo fugiat neque similique tempore esse sed alias vel exercitationem aut cupiditate.'
  }
]

export default function Home() {
  return (
    <Layout post>
      {/* <SearchOptionsHome /> */}
      <section className={clsx(styles.main, 'container', 'section')}>
        <h3 data-aos="fade-right" className={styles.title}>
          Recently viewed rooms
        </h3>

        <div className={clsx(styles.secContent, styles.grid)}>
          {Data.map((item, index) => {
            return <CardHome {...item} />
          })}
        </div>
      </section>
    </Layout>
  )
}
