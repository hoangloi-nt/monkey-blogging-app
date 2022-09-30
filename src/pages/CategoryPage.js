import { Pagination } from "components/pagination";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import { db } from "../firebase/firebase-config";
import PostCategory from "../module/post/PostCategory";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
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
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    async function fetchCategoriesData() {
      const docRef = query(
        collection(db, "categories"),
        where("status", "==", 1)
      );
      const querySnapshot = await getDocs(docRef);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    fetchCategoriesData();
  }, []);

  // if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-5 lg:pt-10"></div>
        <Heading>Category</Heading>
        <div className="flex flex-wrap items-center justify-start gap-3 mb-10 lg:gap-5">
          {categories.length > 0 &&
            categories.map((category) => (
              <PostCategory
                key={category.id}
                className={`transition-all ${
                  category.slug === params.slug
                    ? "!bg-primary !text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
                to={category?.slug}
              >
                {category?.name}
              </PostCategory>
            ))}
        </div>
        {/* <div className="grid-layout grid-layout--primary">
          {posts.length > 0 &&
            posts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))
            }
        </div> */}
        {posts.length > 0 && <Pagination items={posts}></Pagination>}
        {posts.length <= 0 && (
          <div>Sorry! There is nothing in this category.</div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
