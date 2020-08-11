import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const ProjectSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;  
  flex-direction: column;

  .title {
    margin: 15px 0 15px;
    font-size: xx-large;
    color: white;
    text-align: center;
    font-weight: 600;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: top;


  .CardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .Card {
      /* border: 3px dashed white; */
      width: 250px;
      margin: 0 1rem 1rem;
      max-height: 350px;
      max-width: 300px;
      border-radius: 20px;
      text-align: left;
      padding: 20px;
      background-color: #2a2e35;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.38);

      transition: transform 0.5s ease-out;

      .ProjTitle {
        color: white;
        margin-bottom: 0;
      }
      .Date,
      .Excerpt {
        color: white;
      }

      .UnderlineMagical {
          background-image: linear-gradient(120deg, #e52f6e 0%, #fe8702 100%);
          background-repeat: no-repeat;
          background-size: 100% 0.2em;
          background-position: 0 88%;
          transition: background-size 0.25s ease-in;
      }
    }

  @media screen and (min-width: 800px) {
    .Card {
      margin: 0 1rem 1rem;
    }
    .Card:hover {
      transform: translateY(-2%);
      transition: transform 0.5s ease-out;
      .UnderlineMagical {
        background-size: 100% 80%;
      }
    }
  }

  @media screen and (max-width: 1080px) {
    .CardContainer {
      .Card:hover {
        .UnderlineMagical {
          background-size: 100% 80%;
        }
      }
    }
  }
`;

export default function Projects() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/.*projects/" } }
          limit: 4
          sort: { fields: frontmatter___date }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date
                tags
              }
              excerpt(format: PLAIN)
            }
          }
        }
      }
    `
  )

  return (
    <ProjectSection>
      <div className="title">
        Recent Projects
      </div>
      <FlexContainer>
        <div className="CardContainer">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link to={node.fields.slug} style={{ textDecoration: "none" }}>
              <div className="Card">
                <h3 className="ProjTitle">
                  <span className="UnderlineMagical">
                    {node.frontmatter.title}
                  </span>
                </h3>
                <p className="Date">
                  <span className="UnderlineMagical">
                    {node.frontmatter.date}
                  </span>
                </p>
                <p className="Excerpt">{node.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </FlexContainer>
    </ProjectSection>
  )
}
