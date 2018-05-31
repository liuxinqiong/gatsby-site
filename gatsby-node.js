/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const _ = require('lodash')
const {
    createFilePath
} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({
    node,
    getNode,
    boundActionCreators
}) => {
    const {
        createNodeField
    } = boundActionCreators
    if (node.internal.type === 'MarkdownRemark') {
        // 通过节点的父亲得到路径
        // const fileNode = getNode(node.parent)
        // console.log(`\n`, fileNode.relativePath);
        const slug = createFilePath({
            node,
            getNode,
            basePath: `pages`
        })
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

exports.createPages = ({
    graphql,
    boundActionCreators
}) => {
    const {
        createPage
    } = boundActionCreators
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
    const tagTemplate = path.resolve("src/templates/tags.js");
    return new Promise((resolve, reject) => {
        graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
            if (result.errors) {
                return Promise.reject(result.errors);
            }
            const posts = result.data.allMarkdownRemark.edges;
            posts.forEach(({
                node
            }) => {
                createPage({
                    path: node.fields.slug,
                    component: blogPostTemplate,
                    context: {
                        // Data passed to context is available in page queries as GraphQL variables.
                        slug: node.fields.slug,
                    },
                })
            })
            let tags = []
            _.each(posts, edge => {
                if (_.get(edge, "node.frontmatter.tags")) {
                    tags = tags.concat(edge.node.frontmatter.tags)
                }
            })
            // Eliminate duplicate tags
            tags = _.uniq(tags);
            // Make tag pages
            tags.forEach(tag => {
                createPage({
                    path: `/tags/${_.kebabCase(tag)}/`,
                    component: tagTemplate,
                    context: {
                        tag,
                    },
                });
            });
            resolve()
        })
    })
};