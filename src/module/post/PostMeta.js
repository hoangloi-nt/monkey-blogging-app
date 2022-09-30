import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post-time {
  }
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }

  .post-author-wrap {
    white-space: nowrap;
    width: 69px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-author-wrap:hover .post-author {
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

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  to = "/",
  wrap = false,
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className} mt-auto`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink
        to={`/author/${to}`}
        className={`${wrap ? "post-author-wrap" : ""}`}
      >
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
