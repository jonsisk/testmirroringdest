import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import SliderSlickItem from "./sliderSlickItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  nextArrow: (
    <div>
      <svg>
        <use xlinkHref="#icon-arrow-right"></use>
      </svg>
    </div>
  ),
  prevArrow: (
    <div>
      <svg>
        <use xlinkHref="#icon-arrow-left"></use>
      </svg>
    </div>
  ),
};
const NewGallery = ({ galleryElements, resizerURL }) => {
  const [swiper, setSwiper] = useState({
    image: null,
    selector: null,
  });
  const imageRef = useRef(null);
  const selectorRef = useRef(null);

  useEffect(() => {
    setSwiper({
      image: imageRef.current,
      selector: selectorRef.current,
    });
  }, []);
  return (
    <div className="container-img">
      <Slider {...settings} asNavFor={swiper.selector} ref={imageRef}>
        {galleryElements?.length > 0 &&
          galleryElements.map((slide, index) => (
            <SliderSlickItem
              key={index}
              className={"big-images"}
              slideIndex={index}
              slide={slide}
              resizerURL={resizerURL}
            />
          ))}
      </Slider>

      <Slider
        asNavFor={swiper.image}
        {...settings}
        ref={selectorRef}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {galleryElements?.length > 0 &&
          galleryElements.map((slide, index) => (
            <SliderSlickItem
              key={index}
              className={"small-images"}
              slideIndex={index}
              slide={slide}
              resizerURL={resizerURL}
            />
          ))}
      </Slider>
    </div>
  );
};
export default NewGallery;
