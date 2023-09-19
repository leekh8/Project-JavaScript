import logo from "../../logo.png";
import styled from "styled-components";

const LogoImg = styled.img`
  position: absolute;
  width: 128px;
  height: 128px;
  left: 51px;
  top: -14px;
`;

const Logo = () => {
  return (
    <header>
      <LogoImg src={logo} alt="logo" />
    </header>
  );
};

export default Logo;
