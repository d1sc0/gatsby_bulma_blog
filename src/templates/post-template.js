import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const PostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.subtitle || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/posts/${previous.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/posts/${next.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        subtitle
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      slug
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      slug
      frontmatter {
        title
      }
    }
  }
`
