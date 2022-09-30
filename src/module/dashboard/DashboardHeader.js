import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/auth-context";
import Sidebar from "./Sidebar";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .back-homepage,
  .sidebar,
  .logo-mobile {
    display: none;
  }

  @media screen and (max-width: 1023.98px) {
    .logo,
    .menu,
    .search {
      display: none;
    }

    .header-main {
      display: flex;
      align-items: center;
      justify-content: start;
    }

    .login-btn {
      margin-left: 50px !important;
    }

    .header-button,
    .header-auth {
      margin-left: auto;
    }
    .logo-mobile {
      display: block;
      max-width: 40px;
    }

    .overlay {
      display: block;
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      transform: translateX(-100%);
      transition: all 0.3s ease-in;
      animation: transform 0.3s ease-in;
      z-index: 10;
    }

    .nav__input:checked ~ .overlay {
      opacity: 1;
      transform: translateX(0);
    }

    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: 0;
      display: block;
      width: 250px;
      height: 100%;
      background: white;
      z-index: 15;
      transform: translateX(-180%);
      animation-delay: 0.3s;
      transition: all 0.5s ease-in;
      animation: transform 0.5s ease-in;
    }

    .menu-item:first-child {
      margin-top: 100px;
    }

    .nav__input:checked ~ .sidebar {
      opacity: 1;
      transform: translateX(0);
    }

    .nav__input:checked ~ .logo {
      display: flex;
      z-index: 50;
      background-color: aqua;
    }

    .nav__input:checked ~ .label-moblie {
      position: fixed;
    }

    .back-homepage {
      z-index: 20;
      position: fixed;
      left: 170px;
      display: block;
      opacity: 0;
      border-radius: 50%;
      padding: 10px;
      background-color: ${(props) => props.theme.primary};
      animation: opacity 0.3s ease-in;
      transition: all 0.3s ease-in;
    }

    .nav__input:checked ~ .back-homepage {
      opacity: 1;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>
      {/* Mobile UI */}
      <label htmlFor="nav-mobile-input" className="z-50 label-moblie">
        <img
          srcSet="/logo.png 2x"
          alt="monkey-blogging"
          className="logo-mobile"
        />
      </label>

      <input
        type="checkbox"
        hidden
        className="nav__input"
        id="nav-mobile-input"
      />

      <div className="back-homepage z-51">
        <NavLink to="/" className="homepage-btn z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </NavLink>
      </div>

      <label htmlFor="nav-mobile-input" className="overlay"></label>

      <Sidebar></Sidebar>

      {/* PC UI */}

      <div className="header-right">
        <Button
          to="/manage/add-post"
          className="header-button"
          height="52px"
          kind="primary"
        >
          Write new post
        </Button>
        <NavLink to="/profile" className="header-avatar">
          <img src={userInfo?.avatar} alt="" />
        </NavLink>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
