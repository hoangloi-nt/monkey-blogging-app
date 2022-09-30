import styled from "styled-components";
import React from "react";
import PostItem from "module/post/PostItem";
import Heading from "components/layout/Heading";
import { useState } from "react";
import { useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const HomeAllPostsStyles = styled.div`
  @media screen and (max-width: 1023.98px) {
    .grid-layout {
      position: relative;
    }
    .swiper {
      position: unset;
    }
  }
`;

const HomeAllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = query(collection(db, "posts"), where("status", "==", 1));
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
  }, []);

  return (
    <HomeAllPostsStyles className="home-block">
      <div className="container">
        <Heading>All posts</Heading>
        <div className="grid-layout">
          <Swiper
            grabCursor={true}
            spaceBetween={30}
            slidesPerView={"auto"}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="max-w-[300px] h-auto">
                <PostItem data={post}></PostItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </HomeAllPostsStyles>
  );
};

export default HomeAllPosts;
