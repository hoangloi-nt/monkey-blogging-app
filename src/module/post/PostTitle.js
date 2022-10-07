import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.25px;
  a {
    display: block;
  }
  font-family: "Montserrat", sans-serif;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
      @media screen and (max-width: 1023.98px) {
        font-size: 14px;
      }
    `};

  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
      @media screen and (max-width: 1023.98px) {
        font-size: 16px;
      }
    `};

  .post-title-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink to={to} className="post-title-content" title={children}>
        {children}
      </NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
