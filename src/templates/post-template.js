import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const PostTemplate = ({ data }) => {
  const post = data.mdx
  const { previous, next } = data

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="title">{post.frontmatter.title}</div>
      <div className="block">
        <h1 className="is-size-2"></h1>
        <small className="is-size-7">{post.frontmatter.date}</small>
        <div className="content">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
      <Bio />
      <nav>
        <ul>
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
        description
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
