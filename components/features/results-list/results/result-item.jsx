import ArticleDate from "@wpmedia/date-block";
import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Byline, Heading, SecondaryFont, Overline } from "@wpmedia/shared-styles";
import React from "react";

const ResultItem = React.memo(
  React.forwardRef(
    (
      {
        arcSite,
        element,
        imageProperties,
        targetFallbackImage,
        placeholderResizedImageOptions,
        showByline,
        showDate,
        showDescription,
        showHeadline,
        showImage,
        showItemOverline,
      },
      ref
    ) => {
      const {
        description: { basic: descriptionText } = {},
        display_date: displayDate,
        headlines: { basic: headlineText } = {},
        websites,
      } = element;

      console.log(element);

      const imageURL = extractImageFromStory(element);
      const url = websites[arcSite].website_url;
      //const urlSectionName = websites[arcSite].website_section.name;
      const websiteNames = url.split("-");
      const websiteName =
        websiteNames[1].charAt(0).toUpperCase() +
        websiteNames[1].slice(1) +
        " " +
        websiteNames[2].charAt(0).toUpperCase() +
        websiteNames[2].slice(1);

      return (
        <div className={`list-item ${!showImage ? "no-image" : ""}`} ref={ref}>
          {showImage ? (
            <div className="results-list--image-container">
              <a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
                <Image
                  {...imageProperties}
                  url={imageURL !== null ? imageURL : targetFallbackImage}
                  alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
                  resizedImageOptions={
                    imageURL !== null
                      ? extractResizedParams(element)
                      : placeholderResizedImageOptions
                  }
                />
              </a>
            </div>
          ) : null}
          {showItemOverline || showHeadline ? (
            <div className="results-list--headline-container">
              {showItemOverline &&
              websiteNames[1] !== arcSite /* Object.keys(websites).length < 1*/ ? (
                <Overline story={element} />
              ) : null}
              {showItemOverline && websiteNames[1] === arcSite ? (
                <a
                  href={url}
                  title={headlineText}
                  className="primary-font__PrimaryFontStyles-sc-o56yd5-0 gNHfUP overline overline--link"
                >
                  {"FROM " + websiteName}
                </a>
              ) : null}
              {showHeadline ? (
                <a href={url} title={headlineText}>
                  <Heading className="headline-text">{headlineText}</Heading>
                </a>
              ) : null}
            </div>
          ) : null}
          {showDescription || showDate || showByline ? (
            <div className="results-list--description-author-container">
              {showDescription && descriptionText ? (
                <a href={url} title={headlineText}>
                  <SecondaryFont as="p" className="description-text">
                    {descriptionText}
                  </SecondaryFont>
                </a>
              ) : null}
              {showDate || showByline ? (
                <div className="results-list--author-date">
                  {showByline ? (
                    <Byline content={element} list separator={showDate} font="Primary" />
                  ) : null}
                  {showDate ? <ArticleDate classNames="story-date" date={displayDate} /> : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      );
    }
  )
);

export default ResultItem;
