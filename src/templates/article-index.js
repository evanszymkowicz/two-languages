import React, { Component } from "react"
import ArticlePostList from "../components/ArticlePostList"
import ArticlePostListNav from "../components/ArticlePostListNav"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

const IndexPage = ({ data, pathContext }) => {
	const { group, index, pageCount, pathPrefix } = pathContext
	const lang = pathPrefix.substr(0, 2)
	const blogPosts = group.filter(item => item.node.node_locale === lang)
	const homepage = data.allContentfulHomepage.edges.filter(
		item => item.node.node_locale === lang
	)[0].node

	const menu = data.allContentfulMenu.edges.filter(
		item => item.node.node_locale === lang
	)

	return (
		<div>
			<Navigation lang={lang} menuItems={menu} menuType="top" />
			<ArticlePostList posts={blogPosts} lang={lang} />
			<ArticlePostListNav lang={lang} index={index} pageCount={pageCount} />
			<Footer data={homepage} menuItems={menu} menuType="top" />
		</div>
	)
}
export default IndexPage

export const indexPageQuery = graphql`
  query indexPageQuery {
    allContentfulMenu {
      edges {
        node {
          id
          type
          node_locale
          items {
            ... on ContentfulPage {
              id
              link: slug
              text: title
              node_locale
            }
            ... on ContentfulImageLink {
              id
              link
              text
              node_locale
            }
            ... on ContentfulTextLink {
              id
              link
              text
              node_locale
            }
          }
        }
      }
    }
    allContentfulHomepage {
      edges {
        node {
          node_locale
          footerContacts {
            childMarkdownRemark {
              html
            }
          }
          footerSocialLinks {
            id
            text
            link
            type
          }
        }
      }
    }
  }
`
