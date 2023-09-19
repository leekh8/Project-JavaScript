import React, { useState } from "react";
import styled from "styled-components";
import { Home } from "../../assets/Home.svg";

import Logo from "../Logo";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 1280px;
  height: 100px;
  left: 0px;
  top: 0px;
  background: #f5f5f5;
  border: 1px solid #000000;
`;

const LogoContainer = styled.div`
  /* GitGGu */

  position: absolute;
  width: 225px;
  height: 40px;
  left: 213px;
  top: 30px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;

  color: #008080;
`;

const IconContainer = styled.div`
  /* 🦆 icon "home" */

  position: absolute;
  width: 80px;
  height: 80px;
  left: 640px;
  top: 10px;

  /* Vector */

  position: absolute;
  left: 50%;
  right: 43.75%;
  top: 0.5%;
  bottom: 95.5%;

  /* Vector */

  position: absolute;
  left: 50.73%;
  right: 44.48%;
  top: 1.06%;
  bottom: 96.17%;

  background: #000000;
`;

const Header = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((current) => {
      return current + 1;
    });
  };

  return (
    <HeaderContainer>
      <div>
        <Logo />
        <LogoContainer>
          <div>GitGGu</div>
        </LogoContainer>
        {/* <span>{count}회 클릭했음</span> */}
        {/* <button onClick={handleClick}>click</button> */}
        <IconContainer>
          <div>
            {/* 🦆 */}
            <img src={Home} alt="Home" />
          </div>
        </IconContainer>
      </div>
    </HeaderContainer>
  );
};

export default Header;
