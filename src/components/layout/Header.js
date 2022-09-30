import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase/firebase-config";
import { Button } from "../button";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/category/demo-category",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .logo {
    display: block;
  }
  .logo-mobile {
    display: none;
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
  .menu {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-left: 40px;
    list-style: none;
  }
  .menu-link {
    font-weight: 600;
    color: ${(props) => props.theme.primary};
  }

  .search {
    margin-left: auto;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 30px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: 20px;
    color: #999;
  }
  .header-button {
    margin-left: 15px;
  }
  .header-auth strong {
    color: ${(props) => props.theme.primary};
  }

  .menu-content {
    display: none;
  }

  @media screen and (max-width: 1023.98px) {
    .logo,
    .menu,
    .search {
      display: none;
    }

    .search-moblie {
      margin-left: auto;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      width: 100%;
      max-width: 250px;
      display: flex;
      align-items: center;
      position: relative;
      margin-right: 20px;
    }
    .search-moblie-input {
      max-width: 150px;
      font-size: 14px;
    }
    .search-moblie-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      width: 20px;
      color: #999;
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
      height: 40px;
      font-size: 14px;
    }

    .header-avatar {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100rem;
      }
    }

    .logo-mobile {
      display: block;
      margin-right: auto;
      height: 45px;
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

    .menu-content {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 200px;
      height: 100%;
      background: white;
      z-index: 15;
      transform: translateX(-180%);
      animation-delay: 0.3s;
      transition: all 0.5s ease-in;
      animation: transform 0.5s ease-in;
      box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.4);
    }

    .menu-content ul {
      margin-top: 100px;
    }

    .menu-content ul li {
      padding: 10px;
    }

    .nav__input:checked ~ .menu-content {
      opacity: 1;
      transform: translateX(0);
    }

    .nav__input:checked ~ .label-moblie {
      position: fixed;
    }

    /* @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(-100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    } */
  }
`;

const Header = () => {
  const { userInfo } = useAuth();
  const [searchValues, setSearchValues] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(
    useEffect(() => {
      async function fetchPostsData() {
        const colRef = collection(db, "posts");
        onSnapshot(colRef, (snapshot) => {
          const results = [];
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPosts(results);
        });
      }
      fetchPostsData();
    }, []),
    []
  );

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let postIds = "";
      posts.forEach((post) => {
        if (post.title.toLowerCase().includes(searchValues.toLowerCase())) {
          // postIds.push({
          //   id: post.id,
          // });
          postIds = `${postIds},${post.id}`;
        }
      });
      if (postIds) {
        navigate(`/search/${postIds.slice(1)}`);
      } else {
        toast.error("The post is not exist!");
      }
    }
  };

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png 5x" alt="monkey-blogging" className="logo" />
          </NavLink>
          <input
            type="checkbox"
            hidden
            className="nav__input"
            id="nav-mobile-input"
          />
          <label htmlFor="nav-mobile-input" className="z-50 label-moblie">
            <img
              srcSet="/logo.png 5x"
              alt="monkey-blogging"
              className="logo-mobile"
            />
          </label>

          <label htmlFor="nav-mobile-input" className="overlay"></label>

          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="menu-content">
            <ul>
              {menuLinks.map((item) => (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
              <li>
                <div className="search-moblie">
                  <input
                    type="text"
                    className="search-moblie-input"
                    placeholder="Search posts..."
                    onChange={(e) => setSearchValues(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <span className="search-moblie-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
              onChange={(e) => setSearchValues(e.target.value)}
              onKeyDown={handleSearch}
            />
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              kind="primary"
              type="button"
              style={{ minWidth: "150px" }}
              height="56px"
              className="header-button login-btn"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
                kind="primary"
              >
                Dashboard
              </Button>
              <NavLink to="/profile" className="header-avatar">
                <img src={userInfo?.avatar} alt="" />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
