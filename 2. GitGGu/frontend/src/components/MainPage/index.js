import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darken } from "polished";

const ThemeColor = "#3498db";
const ShadowColor = "rgba(0, 0, 0, 0.3)";

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  background-color: #f7f7f7;
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 1.5rem 0;

    > p {
      margin-left: 1rem;
    }
  }
`;

const MainTitle = styled.h1`
  color: #333;
  font-size: 2.5em;
  font-family: "Pretendard Variable";
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    font-size: 2em;
    flex: 1 1 auto;
    margin: 1rem 1rem;
    max-width: 85%;
    height: auto;
  }
`;

const CommonBoxStyle = styled.div`
  max-width: calc(100% - 2rem);
  width: 90%;
  background-color: #ffffff;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0px 4px 10px ${ShadowColor};
  margin: 1.5em 0;
  text-align: center;

  @media (max-width: 992px) {
    padding: 1.2rem;
    margin: 1.2em 1rem;
  }
`;

const Description = styled(CommonBoxStyle)`
  font-size: 1.2em;
  font-family: "Pretendard Variable";
  color: #555;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.5;
  box-shadow: none;
  background-color: #f7f7f7;

  @media (max-width: 992px) {
    background-color: #f7f7f7;
    box-shadow: 0px 4px 10px ${ShadowColor};
    flex: 1 1 auto;
    margin: 1rem 1rem;
    max-width: 85%;
    height: auto;
  }
`;

const FeatureDivider = styled.div`
  width: 80px;
  height: 3px;
  background: ${ThemeColor};
  margin: 0.5rem auto;
`;

const HowItWorksSection = styled(CommonBoxStyle)`
  background-color: #f7f7f7;
  box-shadow: none;

  > h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }

  @media (max-width: 992px) {
    > div {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StepBox = styled.div`
  flex: 1;
  background: rgba(58, 119, 231, 0.3);
  margin: 1rem;
  padding: 1.8rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px ${ShadowColor};
  transition: all 0.3s ease;
  /* min-width: 20%; */
  display: flex;
  flex-direction: column;
  justify-content: top;
  height: 12em;

  h3 {
    margin-bottom: 1.2rem;
    font-size: 1.5em;
    font-weight: 600;
    color: ${ThemeColor};
    text-align: center;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
    color: #555;
    text-align: center;
  }

  @media (max-width: 992px) {
    flex: 1 1 auto;
    margin: 1rem 1rem;
    width: 85%;
    height: auto;
  }
`;

const StartButton = styled.button`
  background: ${ThemeColor};
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 4px 10px ${ShadowColor};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, ShadowColor)};
  }
`;

const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainTitle>Change Your Markdown!</MainTitle>
      <FeatureDivider />
      <Description>
        GitGGu automatically formats and styles your Markdown files to give your
        GitHub projects the wow factor they deserve.
      </Description>

      {/* <FeatureBox> */}
      <h2>Features</h2>
      <FeatureDivider />
      <p>
        Markdown Conversion: Convert your markdown files into styled HTML with a
        click of a button.
      </p>
      <p>
        Custom Styles: Apply custom styles to your markdown files for a unique
        appearance.
      </p>
      <p>Preview Mode: Preview your changes in real time before finalizing.</p>
      <p>
        Easy Sharing: Share your styled markdown files with others through a
        generated link.
      </p>
      {/* </FeatureBox> */}

      <HowItWorksSection>
        <h2>How it works?</h2>
        <FeatureDivider />
        <div>
          <StepBox>
            <h3>1. Upload</h3>
            <p>Start by uploading your Markdown file.</p>
          </StepBox>
          <StepBox>
            <h3>2. Customize</h3>
            <p>
              Choose from a variety of styles or customize your own to give your
              project a unique look.
            </p>
          </StepBox>
          <StepBox>
            <h3>3. Convert</h3>
            <p>
              Convert your Markdown file into a styled HTML page with a single
              click.
            </p>
          </StepBox>
          <StepBox>
            <h3>4. Share</h3>
            <p>
              Share your newly styled project with others through a generated
              link.
            </p>
          </StepBox>
        </div>
      </HowItWorksSection>
      <Link to="/editor">
        <StartButton>Get Started</StartButton>
      </Link>
    </MainPageWrapper>
  );
};

export default MainPage;
