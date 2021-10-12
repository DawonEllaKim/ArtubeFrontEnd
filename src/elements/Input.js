import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        {is_submit ? (
          <ElTextarea
            rows={10}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          ></ElTextarea>
        ) : (
          <ElTextarea
            rows={10}
            placeholder={placeholder}
            value={value}
            onChange={_onChange}
          ></ElTextarea>
        )}
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
  is_submit: false,
  onSubmit: () => {},
};

const ElTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 4px;
  border: 1px solid #212121;
`;

const ElInput = styled.input`
  box-sizing: border-box;
  width: 90%;
  height: 45px;
  margin-bottom: 20px;
  padding: 15px 10px;
  border: 1px solid #939597;
  border-radius: 5px;
  font-size: 16px;
`;

export default Input;
