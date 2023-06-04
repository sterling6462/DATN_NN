import clsx from 'clsx'
import { CardHome, Layout, ListView } from 'components'
import { LIST_HOUSE } from 'constants/ApiConstant'
import styles from './style.module.scss'

export default function Home() {
  return (
    <Layout post>
      {/* <SearchOptionsHome /> */}
      <div className={clsx(styles.main, 'container', 'section')}>
        <h3 data-aos="fade-right" className={styles.title}>
          Recently viewed Houses
        </h3>

        <ListView
          id="home"
          baseURL={LIST_HOUSE}
          cardTemplate={CardHome}
          listViewClasses={{
            listContainer: styles.ListContainer,
            listContent: styles.ListContent
          }}
        />
      </div>
    </Layout>
  )
}
