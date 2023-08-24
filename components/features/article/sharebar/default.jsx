import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";

/**
 * Shows 3 share buttons for FB,Twitter & Republish
 */
const ShareBarFeature = () => {
  const { globalContent, arcSite, outputType } = useFusionContext();
  const { websiteDomain, facebookAppId } = getProperties(arcSite);

  const encodedArticleUrl = encodeURIComponent(`${websiteDomain}${globalContent?.canonical_url}`);

  return (
    <div className="share-bar">
      <ul>
        <li>
          {outputType === "amp" ? (
            <amp-social-share
              class="ActionLink i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined amp-social-share-facebook i-amphtml-built i-amphtml-layout"
              type="facebook"
              data-param-app_id={facebookAppId}
              width="30px"
              height="30px"
              i-amphtml-layout="fixed"
              style={{ width: "30px", height: "30px" }}
              role="button"
              tabindex="0"
              aria-label="Share by facebook"
            >
              <span>Facebook</span>
            </amp-social-share>
          ) : (
            <a
              href={`https://www.facebook.com/dialog/share?app_id=${facebookAppId}&display=popup&href=${encodedArticleUrl}`}
              target="_blank"
              rel="noreferrer"
              className="facebook-share-button"
            >
              <svg>
                <use xlinkHref="#icon-facebook"></use>
              </svg>
            </a>
          )}
        </li>
        <li>
          {outputType === "amp" ? (
            <amp-social-share
              class="ActionLink i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined amp-social-share-twitter i-amphtml-built i-amphtml-layout"
              type="twitter"
              width="30px"
              height="30px"
              i-amphtml-layout="fixed"
              style={{ width: "30px", height: "30px" }}
              role="button"
              tabindex="0"
              aria-label="Share by twitter"
            >
              <span>Twitter</span>
            </amp-social-share>
          ) : (
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedArticleUrl}`}
              target="_blank"
              rel="noreferrer"
              className="twitter-share-button"
            >
              <svg>
                <use xlinkHref="#icon-twitter"></use>
              </svg>
            </a>
          )}
        </li>
      </ul>
      {outputType !== "amp" && (
        <a className="republish-link" href={`/republish${globalContent?.canonical_url}`}>
          Republish
        </a>
      )}
    </div>
  );
};

ShareBarFeature.label = "Share Bar - Civic";
ShareBarFeature.description = "Shows share bar for artcile";

export default ShareBarFeature;
