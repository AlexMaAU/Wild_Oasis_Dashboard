import styled, { css } from "styled-components";

const HeadingTest = styled.div`
  ${(props) =>
    props.type === "heading1" &&
    css`
      font-size: 20px;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "heading2" &&
    css`
      font-size: 18px;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "heading3" &&
    css`
      font-size: 14px;
      font-weight: 600;
    `}
    
  background-color: yellow;
  line-height: 1.4;
`;

export default HeadingTest;

