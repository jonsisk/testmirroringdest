import {
  Image,
  imageANSToImageSrc,
  Overline,
  Heading,
  getImageFromANS,
} from "@wpmedia/arc-themes-components";
//import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
//import { Overline, Byline, Heading, SecondaryFont } from "@wpmedia/shared-styles";

import getProperties from "fusion:properties";
import React from "react";
import Byline from "../../base/byline/byline.component";

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
  //const imageURL = extractImageFromStory(slide);
  const imageURL = imageANSToImageSrc(getImageFromANS(element)) || null;
  const url = websites[arcSite].website_url;
  return (
    <div className="slide article-slide">
      <a href={url}>
        <Image
          {...imageProperties}
          href={url}
          url={imageURL !== null ? imageURL : targetFallbackImage}
          alt="slide-imagse"
          resizedImageOptions={placeholderResizedImageOptions}
          fallbackImage={targetFallbackImage}
        />
      </a>
      <div className="article-slide-info">
        <Overline story={slide} className="overline" />
        <a href={url}>
          <Heading className="headline-text">{slide.headlines.basic}</Heading>
        </a>
        <div className="results-list--description-author-container">
          <a href={url} title={slide.headlines.basic}>
            {slide.subheadlines?.basic}
          </a>
          <div className="results-list--author-date">
            <Byline content={slide} list font="Primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
