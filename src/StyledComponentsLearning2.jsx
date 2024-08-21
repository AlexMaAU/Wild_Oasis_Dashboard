// styled with styled-components
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Button from "./ui/Button";

const StyledApp = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

function App() {
  return (
    <>
      {/* GlobalStyles放到最顶层，就可以导入全局styles */}
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1" type="heading1">
              The Wild Oasis
            </Heading>
            <div>
              <Heading as="h2" type="heading2">
                Check in and Check Out
              </Heading>
              <Button>Check In</Button>
              <Button variation="secondary" size="small">
                Check Out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3" type="heading3">
              Form
            </Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;

