import React, { useState, useRef, useEffect } from "react";
import { Chevron } from "../assets/index";
import { data } from "../data";
import styled from "styled-components";

const Navbar = ({ changePlanet }) => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainterRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainterRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainterRef.current.style.height = "0px";
    }
  }, [showLinks]);

  const closeMenu = () => {
    setShowLinks(false);
  };

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <h1>The Planets</h1>
          <div
            className={showLinks ? "change menu-bars" : "menu-bars"}
            onClick={() => setShowLinks(!showLinks)}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>

        <div className="links-container" ref={linksContainterRef}>
          <ul className="links" ref={linksRef}>
            {data.map((planet, index) => {
              const { name, color } = planet;
              return (
                <li
                  onClick={() => {
                    closeMenu();
                    changePlanet(index);
                  }}
                  key={name}
                >
                  {" "}
                  <div className="circle " style={{ background: color }}></div>
                  <h4>
                    <div className="hover" style={{ background: color }}></div>
                    {name}
                  </h4>
                  <figure>
                    <img src={Chevron} alt="chevron right" />
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
        {showLinks && <div className="overlay"></div>}
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.25rem;
    padding: 0 1.5rem;
    position: relative;
    z-index: 100;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    h1 {
      font-size: 1.75rem;
      line-height: 36px;
      letter-spacing: -1.05px;
    }
    .menu-bars {
      top: 1rem;
      right: 2rem;
      z-index: 10;
      display: inline;
      cursor: pointer;
      .bar1,
      .bar2,
      .bar3 {
        width: 24px;
        height: 3px;
        background-color: var(--white);
        margin: 4px 0;
        transition: var(--transition);
        cursor: pointer;
      }
    }
    /* Rotate first bar */
    .change .bar1 {
      transform: rotate(-45deg) translate(-2px, 8px);
      opacity: 0.25;
    }

    /* Fade out the second bar */
    .change .bar2 {
      opacity: 0;
    }

    /* Rotate last bar */
    .change .bar3 {
      transform: rotate(45deg) translate(-2px, -8px);
      opacity: 0.25;
    }
  }
  .links-container {
    height: 0;
    overflow: hidden;
    transition: var(--transition);
    width: 100%;
    position: absolute;
    z-index: 90;
  }
  .links {
    padding: 1.5rem;
    background-color: var(--black);

    li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%;
      padding: 1.25rem 0;
      cursor: pointer;

      :last-of-type {
        border-bottom: none;
      }
      .circle {
        height: 20px;
        width: 20px;
        border-radius: 50%;
      }
      img {
        height: 8px;
        width: 8px;
      }
      h4 {
        font-family: Spartan;
        font-size: 0.938rem;
        line-height: 25px;
        letter-spacing: 1.36364px;
        text-transform: uppercase;
        opacity: 1;
        flex-grow: 1;
        text-align: left;
        margin-left: 1.5rem;
        .hover {
          width: 100%;
          height: 4px;
          position: absolute;
          top: 0;
          display: none;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
    opacity: 0.8;
    transition: var(--transition);
    background-color: var(--black);
    z-index: 2;
  }

  @media screen and (min-width: 768px) {
    .nav-center {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-header {
      justify-content: center;
      height: 6.25rem;
      border-bottom: none;

      .menu-bars {
        display: none;
      }
    }

    .links-container {
      position: relative;
      height: auto !important;
      background-color: transparent;
      width: 91.1%;
      margin: 0 auto;
    }
    .links {
      padding: 0;
      background-color: transparent;
      display: flex;

      li {
        border-bottom: none;
        position: relative;
        padding: 1.75rem 0;
        opacity: 0.5;
        :hover {
          opacity: 1;
        }
        .circle,
        img {
          display: none;
        }

        h4 {
          font-size: 0.688rem;
          margin-left: 0;
          text-align: center;
          position: relative;
        }
      }
    }
  }
  @media screen and (min-width: 1281px) {
    .nav-center {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 0 1.5rem;
    }
    .nav-header {
      justify-content: flex-start;
      height: 5rem;
      width: 100%;
      padding: 0;
    }

    .links {
      padding: 0;
      background-color: transparent;
      display: flex;

      li {
        border-bottom: none;
        padding: 0;
        margin: 0 auto;
        width: fit-content;
        height: fit-content;
        position: relative;

        h4 {
          padding-top: 2rem;
          opacity: 0.75;
        }
        :hover {
          .hover {
            display: flex;
          }
          h4 {
            opacity: 1;
          }
        }
      }
    }
  }
`;

export default Navbar;
