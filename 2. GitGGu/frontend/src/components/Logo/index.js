import logo from "../../assets/logo.svg";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 4rem;
  height: auto;

  &:hover {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 992px) {
    width: 2.5rem;
  }
`;

const Logo = () => {
  return <LogoImg src={logo} alt="logo" />;
};

export default Logo;
