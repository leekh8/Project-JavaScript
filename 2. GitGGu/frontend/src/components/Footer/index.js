import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { VscInfo, VscMail, VscGithubInverted } from "react-icons/vsc";
import Logo from "../Logo";

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  background: #f7f7f7;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  margin-right: 1.5rem;
  position: relative;

  @media (max-width: 992px) {
    margin-right: 1rem;
    height: 3.125rem;
  }
`;

const LogoTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
`;

const Title = styled.h1`
  font-family: "Inter";
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin: 0;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
`;

const IconBase = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: black;
  margin-right: 1.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
`;

const DesktopIcon = styled(IconBase)`
  @media (max-width: 992px) {
    display: block;
    margin-right: 0.75rem;
    margin-left: 0.25rem;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoTitleContainer>
        <Link to="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>
        <Title>GitGGu</Title>
      </LogoTitleContainer>
      <IconsWrapper>
        <Link to="/info">
          <DesktopIcon>
            <VscInfo />
          </DesktopIcon>
        </Link>
        <a href="mailto:amysun125@gmail.com">
          <DesktopIcon>
            <VscMail />
          </DesktopIcon>
        </a>
        <Link to="https://github.com/leekh8">
          <DesktopIcon>
            <VscGithubInverted />
          </DesktopIcon>
        </Link>
      </IconsWrapper>
    </FooterContainer>
  );
};
export default Footer;
