import {
  Image,
  MediaItem,
  Conditional,
  Link,
  imageANSToImageSrc,
  formatURL,
  getImageFromANS,
} from "@wpmedia/arc-themes-components";
import { useEditableContent } from "fusion:content";
import { useComponentContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import React from "react";
import { getMainSection } from "../../helpers/article.helper";
import { getWebsiteDomain } from "../../helpers/site.helper";
import Byline from "../byline/byline.component";

const ResultItem = React.memo(
  React.forwardRef(
    ({
      arcSite,
      element,
      imageProperties,
      imagePropertiesFeatured,
      targetFallbackImage,
      placeholderResizedImageOptions,
      showByline,
      showDate,
      showDescription,
      showHeadline,
      showImage,
      showItemOverline,
      showFeatured,
      globalContent,
    }) => {
      const {
        description: { basic: descriptionText } = {},
        subheadlines: { basic: basicSubheadlines } = {},
        headlines: { basic: basicHeadline, web: feedHeadline, print: feedSubheadlines } = {},
        websites,
        subtype,
      } = element;

      if (!websites) return null;

      const headlineText = feedHeadline || basicHeadline;
      const subheadlines = feedSubheadlines || basicSubheadlines;

      //const imageURL = extractImageFromStory(element);
      const imageURL = imageANSToImageSrc(getImageFromANS(element)) || null;
      const url = websites[arcSite].website_url;

      const getMainSectionLink = (element) => {
        const primarySection = getMainSection(element, globalContent);

        if (!primarySection) return null;

        return (
          <a href={`${primarySection.path}/`} title={primarySection.name} className="eyebrow">
            {primarySection.name}
          </a>
        );
      };

      const { searchableField } = useEditableContent();
      const { registerSuccessEvent } = useComponentContext();
      const auth = getImageFromANS(element)?.auth || {};
      const {
        dateLocalization: { language, timeZone, dateTimeFormat } = {
          language: "en",
          timeZone: "GMT",
          dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
        },
        resizerURL,
      } = getProperties(arcSite);

      return (
        <>
          <div
            className={`PageListH-items-item ${
              subtype === "standard" || subtype === undefined || subtype === "" || !showFeatured
                ? ""
                : "featured"
            }`}
          >
            <div
              className={`PagePromo-${
                subtype === "standard" || subtype === undefined || subtype === "" || !showFeatured
                  ? "standard"
                  : subtype
              }`}
            >
              <div className="PagePromo-media">
                {showImage ? (
                  <MediaItem
                    {...searchableField("imageOverrideURL")}
                    suppressContentEditableWarning
                  >
                    <Conditional
                      component={Link}
                      condition={url}
                      href={formatURL(url)}
                      onClick={registerSuccessEvent}
                      assistiveHidden
                    >
                      <Image
                        src={imageURL !== null ? imageURL : targetFallbackImage}
                        alt={headlineText}
                        resizedOptions={{ auth: auth[RESIZER_TOKEN_VERSION], smart: true }}
                        resizerURL={resizerURL}
                        sizes={[
                          {
                            isDefault: true,
                            sourceSizeValue: "100px",
                          },
                          {
                            sourceSizeValue: "500px",
                            mediaCondition: "(min-width: 48rem)",
                          },
                        ]}
                        responsiveImages={[100, 500]}
                        width={500}
                        height={333}
                      />
                    </Conditional>
                  </MediaItem>
                ) : null}
              </div>

              <div className="PagePromo-content">
                {showItemOverline ? (
                  <div className="PagePromo-category">
                    {showItemOverline && getMainSectionLink(element)}
                  </div>
                ) : null}

                <div className="PagePromo-title">
                  {showHeadline ? (
                    <a href={url} title={headlineText}>
                      {headlineText}
                    </a>
                  ) : null}
                </div>

                <div className="PagePromo-description">
                  {showDescription && subheadlines ? (
                    <p>{subheadlines}</p>
                  ) : showDescription && descriptionText ? (
                    <p>{descriptionText}</p>
                  ) : null}
                </div>

                <div className="PagePromo-byline">
                  {showByline ? (
                    <div className="PagePromo-author">
                      <Byline
                        element={element}
                        showTime={false}
                        showDate={showDate}
                        websiteDomain={getWebsiteDomain(arcSite)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  )
);

export default ResultItem;
