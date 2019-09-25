require("dotenv").config()
const languages = require("./src/data/languages")

module.exports = {
	siteMetadata: {
		title: "two-languages",
		languages,
	},
	plugins: [
		{
			resolve: "gatsby-source-contentful",
			options: {
				spaceId: process.env.REACT_APP_API_SPACE || "",
				accessToken: process.env.REACT_APP_ACCESS_TOKEN || "",
			},
		},
		{
			resolve: "gatsby-plugin-i18n",
			options: {
				langKeyForNull: "any",
				langKeyDefault: languages.defaultLangKey,
				useLangKeyLayout: false
			}
		},
		"gatsby-plugin-react-helmet",
		"gatsby-transformer-remark"
	],
}
