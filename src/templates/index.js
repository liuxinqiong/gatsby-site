import React from "react";
import Link, { navigateTo } from 'gatsby-link'
import {
    rhythm
} from "../utils/typography";
import g from "glamorous";
import { Pagination } from 'antd';

class Index extends React.Component {
    
    onChange = (page,pageSize) => {
        if(page == 1){
            navigateTo('/')
        } else {
            navigateTo(`/${page}`)
        }
    }

    render(){
        const { pathContext } = this.props;
        const {
            group,
            pathPrefix,
            first,
            last,
            index,
            pageCount,
            additionalContext
        } = pathContext
        // const posts = data.allMarkdownRemark;
        const posts = group;
        const total = additionalContext.total;
        return (
            <div>
                <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
                    Amazing Pandas Eating Things
                </g.H1>
                <h4>{posts.length} Posts</h4>
                {posts.map(({ node }) => (
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
                <Pagination current={index} total={total} pageSize={5} onChange={this.onChange}/>
            </div>
        ); 
    }
}

export default Index;

/*
export default function Template({
    pathContext,
    data, // this prop will be injected by the GraphQL query below.
}) {
    const {
        group,
        pathPrefix,
        first,
        last,
        index,
        pageCount,
        additionalContext
    } = pathContext
    // const posts = data.allMarkdownRemark;
    const posts = group;
    const total = additionalContext.total;
    return (
        <div>
            <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
                Amazing Pandas Eating Things
            </g.H1>
            <h4>{posts.length} Posts</h4>
            {posts.map(({ node }) => (
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
            <Pagination current={index} total={total} pageSize={5} onChange={onchange}/>
        </div>
    );
}
*/
// export const query = graphql `
//   query IndexQuery1($index:Int) {
//     allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }, 
//         limit: 5,
//         skip:  5
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           fields {
//             slug
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `;