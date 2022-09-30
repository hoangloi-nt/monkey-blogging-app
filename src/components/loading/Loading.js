import React from "react";
import styled from "styled-components";

const LoadingStyles = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border-radius: ${(props) => props.size};
    background-color: ${(props) => props.color};
    margin: 0 ${(props) => props.size};
    animation: dotLoading 1s forwards infinite linear;
  }

  > div:nth-child(2) {
    animation-delay: 0.1s;
  }

  > div:nth-child(3) {
    animation-delay: 0.2s;
  }

  > div:nth-child(4) {
    animation-delay: 0.3s;
  }

  @keyframes dotLoading {
    to {
      opacity: 0;
    }
  }
`;

const Loading = ({ size = "0.5rem", color = "white" }) => {
  return (
    <LoadingStyles size={size} color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingStyles>
  );
};

export default Loading;
