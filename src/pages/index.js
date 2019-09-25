import React from "react"
import graphql from "graphql"
import { getUserLangKey } from "ptz-i18n"
import { withPrefix } from "gatsby-link"

class RedirectIndex extends React.PureComponent {
	constructor(args) {
		super(args)

		if (typeof window !== "undefined") {
			const homeUrl = withPrefix(`/${args.data.site.siteMetadata.languages.defaultLangKey}/`)
			window.___history.replace(homeUrl)
		}
	}

	render() {
		return (<div />)
	}
}

export default RedirectIndex

export const pageQuery = graphql`
  query IndexQuery {
    site{
      siteMetadata{
        languages {
          defaultLangKey
        }
      }
    }
  }
`
