import { Image } from "@wpmedia/engine-theme-sdk";
import React from "react";

const SliderSlickItem = ({ slide, slideIndex, resizerURL, className, showText }) => {
  return (
    <div className={className}>
      <Image
        url={slide.url}
        alt={slide.alt_text}
        smallWidth={400}
        smallHeight={0}
        mediumWidth={600}
        mediumHeight={0}
        largeWidth={800}
        largeHeight={0}
        lightBoxWidth={1600}
        lightBoxHeight={0}
        resizedImageOptions={slide.resized_params}
        breakpoints={slide.breakpoints || {}}
        resizerURL={resizerURL}
        loading={slideIndex === 0 ? "eager" : "lazy"}
      />
      {showText && (
        <div className="caption">
          <p>{slide.caption}</p>
        </div>
      )}
    </div>
  );
};

export default SliderSlickItem;
