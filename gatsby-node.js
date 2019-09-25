const path = require("path")
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ graphql, boundActionCreators }) => {

	const { createPage } = boundActionCreators
	return new Promise (( resolve, reject ) => {

		const pageTemplate = path.resolve("src/templates/page.js")
		const articlePostTemplate = path.resolve("src/templates/article-post.js")

		graphql(`
      {
        allContentfulPost {
          edges {
            node {
              id
              slug
              node_locale
            }
          }
        }
      }
    `)
			.then(result => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPost.edges.forEach(edge => {
					createPage({
						path: `/${edge.node.node_locale}/${edge.node.slug}/`,
						component: pageTemplate,
						context: {
							slug: edge.node.slug,
							id: edge.node.id,
							langKey: edge.node.node_locale,
						},
					})
				})
				return
			})
			.then(() => {
				graphql(`
          {
            allContentfulPost {
              edges {
                node {
                  id
                  title
                  slug
                  node_locale
                  createdAt(formatString: "DD.MM.YYYY")
                  featuredImage {
                    resolutions(width: 255) {
                      width
                      height
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                    }
                  }
                  content {
                    childMarkdownRemark {
                      excerpt
                    }
                  }
                }
              }
            }
          }
        `).then(result => {
					if (result.errors) {
						reject(result.errors)
					}

					createPaginatedPages ({
						edges: result.data.allContentfularticle.edges, createPage,
						pageTemplate: "src/templates/article-index.js",
						pageLength: 20,
						pathPrefix: "esp/article",
						buildPath: (index, pathPrefix) =>
							index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`,
					})

					createPaginatedPages({
						edges: result.data.allContentfularticle.edges,
						createPage,
						pageTemplate: "src/templates/article-index.js",
						pageLength: 20,
						pathPrefix: "en/article",
						buildPath: (index, pathPrefix) =>
							index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`,
					})

					result.data.allContentfularticle.edges.forEach(edge => {
						createPage({
							path: `/${edge.node.node_locale}/article/${edge.node.slug}/`,
							component: articlePostTemplate,
							context: {
								slug: edge.node.slug,
								title: edge.node.title,
								langKey: edge.node.node_locale,
							},
						})
					})
					return
				})
			})

		resolve()
	})
}
