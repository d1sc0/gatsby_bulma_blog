import * as React from 'react'
// import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const ContactPage = () => {
  return (
    <Layout pageTitle="Contact">
      <Seo description="How to get in touch with us" title="Contact" />
      <p>The contact page content</p>
    </Layout>
  )
}

export default ContactPage
