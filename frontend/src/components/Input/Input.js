import React from "react";
import classes from "./input.module.css";
import InputContainer from "../InputContainer/InputContainer";

function Input(
  {
    label,
    type,
    defaultValue,
    onChange,
    onBlur,
    name,
    error,
    readOnly,
    defaultChecked,
    fontSize,
    fontWeight,
    color,
  },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case "required":
        return "This Field Is Required";
      case "minLength":
        return "Field Is Too Short";
      default:
        return "*";
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        defaultChecked={defaultChecked}
        fontSize = {fontSize}
        fontWeight = {fontWeight}
        color = {color}
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
