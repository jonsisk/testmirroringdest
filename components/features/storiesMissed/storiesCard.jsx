import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import getProperties from "fusion:properties";
import React from "react";
import { getMainSection } from "../../helpers/article.helper";

export const StoriesCard = ({
  slide,
  arcSite,
  targetFallbackImage,
  placeholderResizedImageOptions,
  showImage,
  globalContent,
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
  const url = websites && websites[arcSite] ? websites[arcSite].website_url : "#";

  const getMainSectionLink = (element) => {
    const primarySection = getMainSection(element, globalContent);

    if (!primarySection) return null;
    return (
      <a href={`${primarySection.path}/`} title={primarySection.name} className="overline">
        {primarySection.name}
      </a>
    );
  };

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
      {getMainSectionLink(slide)}
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
