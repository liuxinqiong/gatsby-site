import React from 'react'
import Link from 'gatsby-link'
import PostLink from '../components/post-link'

// const IndexPage = ({
//   data: {
//     allMarkdownRemark: {
//       edges
//     }
//   }
// }) => {
//   const Posts = edges
//     .filter(edge => !!edge.node.frontmatter.date)
//     .map(edge => <PostLink key={edge.node.id} post={edge.node} />);
//   return <div>{Posts}</div>
// }

export default () => <div style={{ color: `tomato` }}>
    <h1>Hello Gatsby!</h1>
    <p>what a world</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
    <h1>Amazing Pandas Eating Things</h1>
    <div>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="Group of pandas eating bamboo"
      />
    </div>
    <div>
      <Link to="/page-2/">Link</Link>
    </div>
    <div>
      <Link to="/counter/">Counter</Link>
    </div>
    <div>
      <Link to="/index2/">index2</Link>
    </div>
    <div>
      <Link to="/about-css-modules/">about-css-modules</Link>
    </div>
  </div>;

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             tags
//           }
//         }
//       }
//     }
//   }
// `;