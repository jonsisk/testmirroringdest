import {
  Image,
  MediaItem,
  Conditional,
  Link,
  imageANSToImageSrc,
  formatURL,
  getImageFromANS,
  Overline,
} from "@wpmedia/arc-themes-components";
//import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { useEditableContent } from "fusion:content";
import { useComponentContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import React from "react";
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
        <div className="notice-list-container">
          <div className={`PageListH-items-item `}>
            <div className="PagePromo">
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
              <Overline story={element} className="overline" />
              <div className="PagePromo-content">
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
                        showBorder={true}
                        websiteDomain={getWebsiteDomain(arcSite)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  )
);

export default ResultItem;
