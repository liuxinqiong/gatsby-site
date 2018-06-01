import React from 'react'
import Link from 'gatsby-link'
import PostLink from '../components/post-link'
import { rhythm } from "../utils/typography";
import g from "glamorous";

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

export default ({data}) => <div style={{ color: `tomato` }}>
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
      <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
        Amazing Pandas Eating Things
      </g.H1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug} style={{textDecoration:'none',color:'inherit'}}>
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.frontmatter.title}{" "}
              <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
            </g.H3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
    <div>
      <Link to="/page-2/">Link</Link><br/>
      <Link to="/counter/">Counter</Link><br/>
      <Link to="/index2/">index2</Link><br/>
      <Link to="/about-css-modules/">about-css-modules</Link><br/>
      <Link to="/my-files/">my-files</Link><br/>
      <Link to="/tags/">tags</Link><br/>      
    </div>
  </div>;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;