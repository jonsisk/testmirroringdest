import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Heading, SecondaryFont, Overline } from "@wpmedia/shared-styles";
import getProperties from "fusion:properties";
import React from "react";

export const StoriesCard = ({
  slide,
  arcSite,
  targetFallbackImage,
  placeholderResizedImageOptions,
  showImage,
}) => {
  const { primaryLogoAlt, breakpoints, resizerURL } = getProperties(arcSite);
  const imageProperties = {
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imageURL = extractImageFromStory(slide);
  const { websites } = slide;
  const url = websites[arcSite].website_url;
  return (
    <div className="slide article-slide">
      {showImage && (
        <Image
          {...imageProperties}
          url={imageURL !== null ? imageURL : targetFallbackImage}
          alt="slide-imagse"
          resizedImageOptions={
            imageURL !== null ? extractResizedParams(slide) : placeholderResizedImageOptions
          }
          fallbackImage={targetFallbackImage}
        />
      )}
      <Overline story={slide} className="overline" />
      <div
        className="article-slide-info"
        style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}
      >
        <a href={url}>
          <h2>{slide.headlines.basic}</h2>
        </a>
      </div>
    </div>
  );
};
