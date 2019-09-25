import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Helmet from "react-helmet"

class ArticlePost extends Component {
	render() {
		const {
			title,
			createdAt,
			featuredImage,
			content,
		} = this.props.data.contentfulBlog
		const homepage = this.props.data.allContentfulHomepage.edges[0].node
		const menuItems = this.props.data.allContentfulMenu.edges

		// some built in seo features

		return (
			<div className="page-content">
				<Helmet
					title={`${title} | OnBoard`}
					meta={[
						{ name: "og:type", content: "article" },
						{ name: "og:title", content: title },
						{ name: "og:image", content: featuredImage.sizes.src && featuredImage.sizes.src.substring(2) },
						{
							name: "og:description",
							content: content.childMarkdownRemark.excerpt,
						},
						{ name: "og:locale", content: this.props.pathContext.langKey },
					]}
				/>

				<Nav
					lang={this.props.pathContext.langKey}
					menuItems={menuItems}
					menuType="top"
				/>

				<div className="featured-image-box-full">
					<div className="site-width title-holder">
						<span>
							<h1>{title}</h1>
							<span className="date">{createdAt}</span>
						</span>
					</div>
					<div className="img gradient">
						<Img sizes={featuredImage.sizes} />
					</div>
				</div>

				<div className="site-width">
					<div
						dangerouslySetInnerHTML={{
							__html: content.childMarkdownRemark.html,
						}}
					/>
				</div>
				<Footer data={homepage} menuItems={menuItems} menuType="top" />
			</div>
		)
	}
}

ArticlePost.PropTypes = {
	data: PropTypes.object.isRequired,
}

export default ArticlePost

export const pageQuery = graphql`
  query ArticlePostQuery($slug: String!, $langKey: String!) {
    contentfulBlog(slug: { eq: $slug }, node_locale: { eq: $langKey }) {
      title
      createdAt(formatString: "DD.MM.YYYY")
      featuredImage {
        sizes(maxWidth: 2000) {
          ...GatsbyContentfulSizes
        }
      }
      content {
        childMarkdownRemark {
          html
          excerpt
        }
      }
    }
    allContentfulHomepage(filter: { node_locale: { eq: $langKey } }) {
      edges {
        node {
          id
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
    allContentfulMenu(filter: { node_locale: { eq: $langKey } }) {
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
            ... on ContentfulTextLink {
              id
              link
              text
            }
          }
        }
      }
    }
  }
`
