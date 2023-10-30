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
  const { websites } = slide;
  const imageProperties = {
    smallWidth: 377,
    smallHeight: 212,
    mediumWidth: 400,
    mediumHeight: 225,
    largeWidth: 400,
    largeHeight: 225,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imageURL = extractImageFromStory(slide);
  const url = websites[arcSite].website_url;
  return (
    <div className="slide article-slide">
      <a href={url} target="_blank" rel="noreferrer">
        <Image
          {...imageProperties}
          href={url}
          url={imageURL !== null ? imageURL : targetFallbackImage}
          alt="slide-imagse"
          resizedImageOptions={
            imageURL !== null ? extractResizedParams(slide) : placeholderResizedImageOptions
          }
          fallbackImage={targetFallbackImage}
        />
      </a>
      <div className="article-slide-info">
        <Overline story={slide} className="overline" />
        <a href={url} target="_blank" rel="noreferrer">
          <Heading className="headline-text">{slide.headlines.basic}</Heading>
        </a>
        <div className="results-list--description-author-container">
          <a href={url} title={slide.headlines.basic}>
            <SecondaryFont as="p" className="description-text">
              {slide.subheadlines?.basic}
            </SecondaryFont>
          </a>
          <div className="results-list--author-date">
            <Byline content={slide} list font="Primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
