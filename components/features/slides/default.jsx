import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper";
import { Pagination } from "swiper/modules";
//import { Swiper, SwiperSlide } from "swiper/swiper-react.mjs";
// Import Swiper styles
import "./styles.scss";
//import "swiper/css";
//import "swiper/css/pagination";
// import function to register Swiper custom elements
//import { register } from "swiper/element/bundle";
// register Swiper custom elements
//register();º

// import required modules

const SwipperCivic = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

SwipperCivic.label = "Swipper - Civic";

export default SwipperCivic;
