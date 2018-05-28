module.exports = {
  pathPrefix: `/gatsby-site`,
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
  ],
}