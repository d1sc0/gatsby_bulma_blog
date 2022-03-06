import * as React from 'react'
import '../styles.scss'
import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Not Found" />
      <div className="title">4oh4!</div>
      <p>uh-oh something has gone a little bit wrong!</p>
    </Layout>
  )
}

export default NotFoundPage
