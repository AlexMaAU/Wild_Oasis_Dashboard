import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    // css表示后面的代码是CSS代码，这样可以识别CSS的语法规则
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// React Component允许添加defaultProps
Row.defaultProps = {
  type: "vertical",
};

export default Row;

