import React from "react";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 15px 30px;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  display: block;
  width: 100%;
  height: ${(props) => props.height || "66px"};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(to right top, #1dc071, #a4d96c);
    `};
  :hover {
    opacity: 0.7;
  }
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media screen and (max-width: 1023.98px) {
    padding: 10px 20px;
    line-height: 1;
    border-radius: 8px;
    font-weight: 500;
    display: block;
    width: 100%;
    font-size: 14px;
    height: ${(props) => props.height || "40px"};
  }
`;

/**
 *
 * @param {string} type Type of button: button || submit
 * @returns
 */

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "secondary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} style={{ display: "inline-block" }}>
        <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};

export default Button;
