import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { data } from "../data";
import { Tabs, Navbar } from "./index";
import { SourceLink } from "../assets";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function Planet() {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([0]);
  const [value, setValue] = useState(0);

  const currentColor = planets[value].color;

  const fetchPlanets = async () => {
    setPlanets(data);
    setLoading(false);
  };

  const changePlanet = (planet) => {
    setValue(planet);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }

  const {
    name,
    geology,
    structure,
    images,
    overview,
    rotation,
    revolution,
    radius,
    temperature,
  } = planets[value];

  return (
    <Wrapper>
      <Navbar changePlanet={changePlanet}></Navbar>

      <SwitchTransition value={value}>
        <CSSTransition
          key={value}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <Tabs currentColor={currentColor} className="focus-in-expand-fwd">
            <div label="Overview">
              <div className="planet-info   ">
                <h1>{name}</h1>

                <p className="focus-in-expand-fwd">{overview.content}</p>
                <p className="planet-source">
                  Source :
                  <a href={overview.source} target="_blank" rel="noreferrer">
                    Wikipedia
                  </a>
                  <img src={SourceLink} alt="" />
                </p>
              </div>
              <div className="planet-image ">
                <img src={images.planet} alt="" />
              </div>
            </div>

            <div label="Structure">
              <div className="planet-info">
                <h1>{name}</h1>
                <p className="focus-in-expand-fwd">{structure.content}</p>
                <p className="planet-source">
                  Source :
                  <a href={structure.source} target="_blank" rel="noreferrer">
                    Wikipedia
                  </a>
                  <img src={SourceLink} alt="" />
                </p>
              </div>
              <div className="planet-image ">
                <img src={images.internal} alt="" />
              </div>
            </div>

            <div label="Surface">
              <div className="planet-info">
                <h1>{name}</h1>
                <p className="focus-in-expand-fwd">{geology.content}</p>
                <p className="planet-source">
                  Source :
                  <a href={geology.source} target="_blank" rel="noreferrer">
                    Wikipedia
                  </a>
                  <img src={SourceLink} alt="" />
                </p>
              </div>
              <div className="planet-image ">
                <img src={images.planet} alt="" />
                <img className="inner-image" src={images.geology} alt="" />
              </div>
            </div>
          </Tabs>
        </CSSTransition>
      </SwitchTransition>

      <div className="planet-data">
        <div className="data-item">
          <h4>Rotation Time</h4>
          <SwitchTransition value={value}>
            <CSSTransition
              key={value}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <h2>{rotation}</h2>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="data-item">
          <h4>Revolution Time</h4>
          <SwitchTransition value={value}>
            <CSSTransition
              key={value}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <h2>{revolution}</h2>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="data-item">
          <h4>Radius</h4>
          <SwitchTransition value={value}>
            <CSSTransition
              key={value}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <h2>{radius}</h2>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="data-item">
          <h4>Average Temp.</h4>
          <SwitchTransition value={value}>
            <CSSTransition
              key={value}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <h2>{temperature}</h2>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;

  .fade-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms, transform 500ms;
  }

  @keyframes slide {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-1532px, 0, 0);
    }
  }

  .planet-data {
    display: flex;
    flex-direction: column;
    width: 91.1%;
    margin: 0 auto;
    padding-bottom: 3rem;

    h4 {
      font-weight: normal;
    }

    .data-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 0.5rem;
    }
  }
  @media screen and (min-width: 768px) {
    .planet-data {
      flex-direction: row;
      justify-content: space-between;
      gap: 0.688rem;
      padding: 1.5rem 0;

      .data-item {
        flex-direction: column;
        align-items: flex-start;
        height: 5.5rem;
        width: 100%;
        h4 {
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  @media screen and (min-width: 1281px) {
    .planet-data {
      width: 77%;
      gap: 1.875rem;
      .data-item {
        height: 8rem;
      }
    }
  }
`;

export default Planet;
