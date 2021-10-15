import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Input, Button } from "../elements";
import { history } from "../redux/configuerStore";
import { userActions } from "../redux/modules/user";

import { MdLockOutline } from "react-icons/md";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [userId, setId] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const TextInput = (e, setState) => {
    setState(e.target.value);
  };

  const signup = () => {
    console.log(userId, password, confirmPassword);
    dispatch(userActions.signUpAPI(userId, password, confirmPassword));
  };

  return (
    <>
      <Wrap>
        {/* 헤드 : 아이콘 + SignUp텍스트*/}
        <div>
          <IconWrap>
            <MdLockOutline
              style={{ width: "28px", height: "28px", color: "#000" }}
            />
          </IconWrap>
          <SignInText>Sign Up</SignInText>
        </div>

        {/* 바디 : 인풋3개 */}
        <Body>
          <Input
            label=""
            placeholder="Id*"
            type="text"
            _onChange={(e) => TextInput(e, setId)}
            value={userId}
            // 이게 필요한 이유?
          />
          <Input
            label=""
            placeholder="Password*"
            type="password"
            _onChange={(e) => TextInput(e, setPwd)}
            value={password}
          />
          <Input
            label=""
            placeholder="Password Check*"
            type="password"
            _onChange={(e) => TextInput(e, setConfirmPassword)}
            value={confirmPassword}
          />
        </Body>

        {/* 푸터 : 버튼 2개 */}
        <div>
          <Button _onClick={signup}>Sign Up</Button>
          <UserExist
            onClick={() => {
              history.push("/signIn");
            }}
          >
            이미 회원이신가요? 로그인하러 가기
          </UserExist>
        </div>
      </Wrap>
    </>
  );
};
export default SignUp;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 600px;
  margin: auto;
  transform: translateY(5%);
  background-color: #f5df4d;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 5px #9e9e9e;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
  margin: auto;
`;

const SignInText = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0 20px 0px;
`;

const Body = styled.div`
  width: 90%;
`;

// const IdInput = styled.input`
//   box-sizing: border-box;
//   width: 190%;
//   height: 45px;
//   margin: 0 0 20px 0;
//   padding: 15px 10px;
//   border: 1px solid #939597;
//   border-radius: 5px;
//   font-size: 16px;
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
// `;
// const PWcheck = styled.button`
//   width: 50%;
//   height: 45px;
//   margin: 0 0 15px 0px;
//   padding: 12px 0px;
//   background-color: #000;
//   border: 1px solid #939597;
//   border-radius: 7px;
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;

//   color: #fff;
//   font-weight: 700;
//   font-size: 15px;

//   cursor: pointer;
// `;

// const PwInput = styled.input`
//   box-sizing: border-box;
//   width: 120%;
//   height: 45px;
//   margin-bottom: 20px;
//   padding: 15px 10px;
//   border: 1px solid #939597;
//   border-radius: 5px;
//   font-size: 16px;
// `;

const UserExist = styled.button`
  border: none;
  background-color: none;
  color: black;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;
  font-size: 15px;
`;
