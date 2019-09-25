import React, { Component } from "react"
import PropTypes from "prop-types"
import Nav from "../../components/Navigation"
import Footer from "../../components/Footer"
import Link from "gatsby-link"

class ThankYou extends Component {
	render() {
		const homepage = this.props.data.allContentfulHomepage.edges[0].node
		const menuItems = this.props.data.allContentfulMenu.edges

		return (
			<div className="page-content">
				<Navigation lang="en" menuItems={menuItems} menuType="top" />

				<div className="site-width">
					<h1>Thank you for your message.</h1>
					<p>
            We will be in touch within three business days.{" "}
						<Link to={"/en"}>&laquo; Back home.</Link>
					</p>
				</div>
				<Footer data={homepage} menuItems={menuItems} menuType="top" />
			</div>
		)
	}
}

ThankYou.PropTypes = {
	data: PropTypes.object.isRequired,
}

export default ThanksYou

export const thanksQuery = graphql`
  query ThanksQuery {
    allContentfulHomepage(filter: { node_locale: { eq: "en" } }) {
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
    allContentfulMenu(filter: { node_locale: { eq: "en" } }) {
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
