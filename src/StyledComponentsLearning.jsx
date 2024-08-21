import styled, { css } from "styled-components";
import HeadingTest from "./ui/HeadingTest";
import GlobalStyles from "./styles/GlobalStyles";

// Styled Component本身就是一个React Component
// const 组件名 = styled.HTML_tag`...`
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: bold;
//   background-color: yellow;
// `;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(
    --border-radius-sm
  ); // var可以使用CSS变量，可以在导入Global Styles以后使用全局Style变量
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  margin: 20px;

  // & 表示选择当前的组件
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

// 内容是字符串模板，所以可以直接在里面写JS代码进行逻辑操作
const Input = styled.input`
  // 使用props来进行逻辑操作
  ${(props) =>
    props.type === "number" &&
    css`
      background-color: pink;
    `}
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

const StyledContainer = styled.div`
  background-color: red;
  padding: 20px;
`;

function StyledComponentsLearning() {
  return (
    <>
      {/* GlobalStyles放到最顶层，就可以导入全局styles */}
      <GlobalStyles />
      <StyledContainer>
        {/* as用来定义该组件的HTML tag，type是传入的props */}
        <HeadingTest as="h1" type="heading1">
          Hello World
        </HeadingTest>
        <HeadingTest as="h2" type="heading2">
          Check in and Check Out
        </HeadingTest>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <HeadingTest as="h3" type="heading3">
          Form
        </HeadingTest>
        <Input type="number" placeholder="Number of guests" />
      </StyledContainer>
    </>
  );
}

export default StyledComponentsLearning;

