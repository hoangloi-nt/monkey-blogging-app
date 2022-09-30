import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "../firebase/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "module/post/PostItem";

const SearchPage = () => {
  const params = useParams();
  const postIds = params.slug.split(",");
  const [posts, setPosts] = useState([]);
  console.log("search");

  useEffect(() => {
    async function fetchPostsData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          if (postIds.includes(doc.id)) {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
        setPosts(results);
      });
    }
    fetchPostsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="pt-10"></div>
        <Heading>Search results:</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
          {/* {posts.length } */}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
