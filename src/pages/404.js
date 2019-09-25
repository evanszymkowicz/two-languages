import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Not found" />
		<h1>Error! Page not found.</h1>
		<p>This page does not exist. Please go back.</p>
	</Layout>
)

export default NotFoundPage
