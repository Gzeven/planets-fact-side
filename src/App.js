import { Planet } from "./components";
import styled from "styled-components";
import { Stars } from "./assets";

function App() {
  return (
    <Wrapper>
      <div className="color-change-3x">
        <div className="background "></div>
        <Planet />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url(${Stars}) repeat-x;
    animation: animatedBackground 50s linear infinite;
  }
  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1281px) {
  }
`;

export default App;
