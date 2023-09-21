import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Overline, Byline, Heading, SecondaryFont } from "@wpmedia/shared-styles";
import getProperties from "fusion:properties";
import React from "react";

export const SlideCard = ({
  slide,
  arcSite,
  targetFallbackImage,
  placeholderResizedImageOptions,
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
  console.log(slide, "slide");
  const imageURL = extractImageFromStory(slide);

  return (
    <div className="slide article-slide">
      <Image
        {...imageProperties}
        url={imageURL !== null ? imageURL : targetFallbackImage}
        alt="slide-imagse"
        resizedImageOptions={
          imageURL !== null ? extractResizedParams(slide) : placeholderResizedImageOptions
        }
        fallbackImage={targetFallbackImage}
      />
      <div className="article-slide-info">
        <Overline story={slide} className="overline" />
        <a href={slide.canonical_url} target="_blank" rel="noreferrer">
          <Heading className="headline-text">{slide.headlines.basic}</Heading>
        </a>
        <div className="results-list--description-author-container">
          <SecondaryFont as="p" className="description-text">
            {slide.description.basic}
          </SecondaryFont>
          <div className="results-list--author-date">
            <Byline content={slide} list font="Primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
