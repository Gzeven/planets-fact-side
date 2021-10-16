import { useState, useEffect } from "react";
import styled from "styled-components";

const Tabs = ({ children, currentColor }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [width, setWidth] = useState(window.innerWidth);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const MobileTabButtons = ["Overview", "Structure", "Surface"];
  const TabButtons = ["Overview", "Internal Structure", "Surface Geology"];

  return (
    <Wrapper>
      <div className="container">
        <ul className="tabs-buttons">
          {children.map((tab, index) => {
            const label = tab.props.label;

            return (
              <li
                key={label}
                style={
                  width >= 768 && label === activeTab
                    ? { background: currentColor }
                    : { background: "" }
                }
                className={tab.props.label === activeTab ? "active-tab" : ""}
                onClick={(e) => handleClick(e, label)}
              >
                <div className="number">0{index + 1}</div>
                <div
                  className="mobile"
                  style={
                    label === activeTab
                      ? { background: currentColor }
                      : { background: "" }
                  }
                ></div>
                <p href="#">
                  {width >= 768 ? TabButtons[index] : MobileTabButtons[index]}
                </p>
              </li>
            );
          })}
        </ul>

        {/*tabbed content*/}
        {children.map((one) => {
          if (one.props.label === activeTab)
            return (
              <div className="tabs-text " key={one.props.label}>
                {one.props.children[0]}
              </div>
            );
          return null;
        })}
        {/*tabbed images*/}
        {children.map((one) => {
          if (one.props.label === activeTab)
            return (
              <div
                className="tabs-image  bounce-in-left "
                key={one.props.label}
              >
                {one.props.children[1]}
              </div>
            );
          return null;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: grid;
    grid-auto-flow: row;
    grid-template-areas:
      "tabs-buttons"
      "tabs-image"
      "tabs-text";

    .tabs-buttons {
      grid-area: tabs-buttons;
      height: 3rem;
    }
    .tabs-text {
      grid-area: tabs-text;
      width: 87.2%;
      margin: 2rem auto 0;
    }

    .tabs-image {
      grid-area: tabs-image;
      position: relative;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    li {
      position: relative;
      background-color: transparent;
      margin: 0 1.5rem;
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;

      .number {
        display: none;
      }
      p {
        font-family: Spartan;
        font-weight: bold;
        font-size: 9px;
        line-height: 10px;
        text-align: center;
        letter-spacing: 1.92857px;
        text-transform: uppercase;
        color: var(--white);
        mix-blend-mode: normal;
        opacity: 0.5;
      }
      .mobile {
        width: 100%;
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  .planet-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    margin: 0 auto;
    object-fit: contain;
    height: 600px;

    img {
      max-width: 100%;
    }
    .inner-image {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10%;
      margin-left: auto;
      margin-right: auto;
      max-width: 9rem;
    }
  }

  .planet-info {
    h1 {
      margin-bottom: 1rem;
    }
    p:first-of-type {
      min-height: 110px;
    }
  }

  .planet-source {
    opacity: 0.5;
    margin: 2rem 0 1rem;
    a {
      color: var(--white);
      text-decoration: underline;
      font-weight: 800;
      margin: 0 0.3rem;
    }
    img {
      transition: 2s;
    }
  }

  .active-tab {
    p {
      opacity: 1;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 15rem;
      grid-template-areas:
        "tabs-image tabs-image"
        "tabs-text tabs-buttons";
      width: 91.1%;
      margin: 0 auto;

      .tabs-buttons {
        height: 100%;
      }

      .tabs-text {
        width: 100%;
        margin: auto 0;
      }
    }

    .planet-info {
      h1 {
        margin-bottom: 1.5rem;
        text-align: left;
      }
    }

    .planet-source {
      margin: 2rem 0 1rem;
      :hover,
      :focus {
        opacity: 1;
        img {
          transition: 2s;
          margin-left: 1rem;
          transform: rotate(90deg);
        }
      }
    }

    ul {
      flex-direction: column;
      justify-content: center;
      padding-left: 4rem;
      border-bottom: none;
      li {
        width: 100%;
        height: 2.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin: 0.5rem 0;
        :hover {
          background-color: var(--darkslategray);
          transition: 0.6s;
        }

        .number {
          display: flex;
          color: var(--white);
          opacity: 0.5;
          font-size: 0.563rem;
          margin: 0 1.25rem;
          letter-spacing: 3px;
        }
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.1rem;
          height: 100%;
          opacity: 1;
        }
      }
    }
  }
  @media screen and (min-width: 1281px) {
    .container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 25rem 1fr;
      grid-template-areas:
        "tabs-image tabs-image tabs-text tabs-text"
        "tabs-image tabs-image tabs-buttons tabs-buttons";
      width: 77%;
      margin-top: 8rem;
    }
    ul {
      padding-left: 0rem;
    }
    .planet-info,
    .tabs-buttons {
      margin-left: 14rem;
    }

    .planet-info {
      p:first-of-type {
        min-height: 200px;
      }
    }

    .planet-source {
      margin: 2rem 0 2.5rem;
    }

    .tabs-buttons {
      display: flex;
      justify-content: flex-start;
    }
  }
`;

export { Tabs };
