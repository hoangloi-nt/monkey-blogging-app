import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  a {
    display: block;
  }
  background-color: #f3f3f3;
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }

  .link-category {
    white-space: nowrap;
    max-width: 108px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-category:hover span {
    display: inline-block;
    padding-left: 100%;
    animation: move 5s linear infinite;
  }

  @keyframes move {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "/",
  wrap = false,
}) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <NavLink
        to={`/category/${to}`}
        className={`${wrap ? "link-category" : ""}`}
      >
        <span>{children}</span>
      </NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
