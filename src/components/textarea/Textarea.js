import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const TextareaStyles = styled.textarea`
  font-size: 14px;
  width: 100%;
  padding: 15px 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.2s linear;
  background-color: ${(props) => props.theme.grayLight};
  resize: none;
  min-height: 200px;

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

const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles
      id={name}
      type={type}
      {...field}
      {...props}
    ></TextareaStyles>
  );
};

export default Textarea;
