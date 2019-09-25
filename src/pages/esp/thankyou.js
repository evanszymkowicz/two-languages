import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"

class ThankYouEsp extends Component {
	render() {
		const homepage = this.props.data.allContentfulHomepage.edges[0].node
		const menuItems = this.props.data.allContentfulMenu.edges

		return (
			<div className="page-content">
				<Navigation lang="sk" menuItems={menuItems} menuType="top" />

				<div className="site-width">
					<h1>Gracias por tu mensaje</h1>
					<p>
            Estaremos en contacto dentro de tres días hábiles.{" "}
						<Link to={"/sk"}>&laquo; de vuelta a casa</Link>
					</p>
				</div>
				<Footer data={homepage} menuItems={menuItems} menuType="top" />
			</div>
		)
	}
}

ThankYouEsp.PropTypes = {
	data: PropTypes.object.isRequired,
}

export default ThankYouEsp

export const ThankYouEspQuery = graphql`
  query ThankYouEspQuery {
    allContentfulHomepage(filter: { node_locale: { eq: "sk" } }) {
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
    allContentfulMenu(filter: { node_locale: { eq: "esp" } }) {
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
  }
`
