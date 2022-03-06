import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import '../styles.scss'

const PostList = ({ data, location, pageContext }) => {
  const posts = data.allMdx.nodes
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/posts' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <Layout location={location}>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.slug

          return (
            <li key={post.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/posts/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.subtitle || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </Layout>
  )
}

export default PostList

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        slug
        id
        excerpt
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          subtitle
        }
      }
    }
  }
`
