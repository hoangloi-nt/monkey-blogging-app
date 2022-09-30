import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";
import { v4 } from "uuid";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 2px 6px 24px 2px;
    border-radius: 10px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("status", "==", 1));
    onSnapshot(queries, (snapshot) => {
      let result = [];
      snapshot.forEach((item) =>
        result.push({
          id: item.id,
          ...item.data(),
        })
      );

      result.sort(function (a, b) {
        return (
          new Date(b.createdAt.seconds * 1000) -
          new Date(a.createdAt.seconds * 1000)
        );
      });

      result = result.slice(0, 4);
      setPosts(result);
    });
  }, []);
  if (posts.length <= 0) return null;
  const [first, ...others] = posts;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Latest posts</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {others.length > 0 &&
              others.map((item) => (
                <PostNewestItem key={v4()} data={item}></PostNewestItem>
              ))}
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
