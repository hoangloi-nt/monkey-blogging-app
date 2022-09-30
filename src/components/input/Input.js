import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputStyles = styled.input`
  font-size: 14px;
  width: 100%;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.2s linear;
  background-color: ${(props) => props.theme.grayLight};

  :focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }

  ::-webkit-input-placeholder {
    color: #84878b;
  }
  ::-moz-input-placeholder {
    color: #84878b;
  }
`;

/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles id={name} type={type} {...field} {...props}></InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
};

export default Input;
