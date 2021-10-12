import React from "react";
import styled from "styled-components";
import { IoHomeSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import ArtubeLogo3 from "../Image/ArtubeLogo3.png";

const Header = () => {
  return (
    <>
      <Wrap>
        <Box style={{ width: "935px" }}>
          <IoHomeSharp
            style={{ width: "26px", height: "26px", cursor: "pointer" }}
          />
          {/* IoHomeOutline */}
          <Logo src={ArtubeLogo3} style={{ cursor: "pointer" }} />
          <IoPersonOutline
            style={{
              width: "23px",
              height: "23px",
              border: "1.8px solid #000",
              borderRadius: "50%",
              padding: "2px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Wrap>
    </>
  );
};

export default Header;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  background-color: #f5df4d;
  border-bottom: 1px solid #9e9e9e;
  z-index: 100;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 935px;
  height: 54px;
  margin: auto;
  padding: 0 40px;
`;

const Logo = styled.img`
  height: 80%;
`;
