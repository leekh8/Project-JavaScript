import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { VscHome, VscEdit, VscMenu, VscPerson } from "react-icons/vsc";
import Logo from "../Logo";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
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

const SubTitle = styled.span`
  font-family: "Inter";
  font-size: 1.5rem;
  color: black;
  font-weight: 500;
  display: none;

  @media (min-width: 992px) {
    display: block;
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
    display: none;
  }
`;

const MobileIcon = styled(IconBase)`
  display: none;

  @media (max-width: 992px) {
    display: block;
    margin-right: 0.75rem;
    margin-left: 0.25rem;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: #f7f7f7;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  }
`;

const MobileMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: black;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }
`;

const MenuIconRotate = styled(MobileIcon)`
  transform: rotate(${(props) => (props.open ? "45deg" : "0deg")});
  transition: transform 0.3s ease;
`;

const FadeInMobileMenu = styled(MobileMenu)`
  z-index: auto;
  opacity: ${(props) => (props.open ? "1" : "0")};
  transform: translateY(${(props) => (props.open ? "0" : "-10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const OutsideClickHandler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: auto;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <LogoTitleContainer>
        <Link to="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>
        <Title>GitGGu</Title>
      </LogoTitleContainer>
      <SubTitle>Git Integrated Tool for Gorgeous UI Markdown</SubTitle>
      <IconsWrapper>
        <Link to="/">
          <DesktopIcon>
            <VscHome />
          </DesktopIcon>
        </Link>
        <Link to="/editor">
          <DesktopIcon>
            <VscEdit />
          </DesktopIcon>
        </Link>
        <Link to="/my">
          <DesktopIcon>
            <VscPerson />
          </DesktopIcon>
        </Link>
        <MenuIconRotate onClick={() => setMenuOpen(!menuOpen)} open={menuOpen}>
          <VscMenu />
        </MenuIconRotate>
        {menuOpen && (
          <>
            <OutsideClickHandler onClick={closeMenu} />
            <FadeInMobileMenu open={menuOpen}>
              <MobileMenuItem to="/" onClick={closeMenu}>
                <IconBase>
                  <VscHome />
                </IconBase>
                HOME
              </MobileMenuItem>
              <MobileMenuItem to="/editor" onClick={closeMenu}>
                <IconBase>
                  <VscEdit />
                </IconBase>
                EDITOR
              </MobileMenuItem>
              <MobileMenuItem to="/my" onClick={closeMenu}>
                <IconBase>
                  <VscPerson />
                </IconBase>
                MY
              </MobileMenuItem>
            </FadeInMobileMenu>
          </>
        )}
      </IconsWrapper>
    </HeaderContainer>
  );
};

export default Header;
