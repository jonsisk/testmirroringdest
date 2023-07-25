import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import "./styles.scss";

/**
 * Shows 3 share buttons for FB,Twitter & Republish
 */
const ShareBarFeature = () => {
  const { globalContent, arcSite } = useFusionContext();
  const { websiteDomain } = getProperties(arcSite);

  const encodedArticleUrl = encodeURIComponent(`${websiteDomain}${globalContent?.canonical_url}`);

  return (
    <div className="share-bar">
      <ul>
        <li>
          <a
            href={`https://www.facebook.com/dialog/share?app_id=735437511148430&display=popup&href=${encodedArticleUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg>
              <path d="M5.43 43.754v-20.53H0V15.83h5.43V9.518C5.43 4.558 8.635 0 16.024 0c2.99 0 5.204.286 5.204.286l-.175 6.903s-2.257-.03-4.72-.03c-2.663 0-3.09 1.23-3.09 3.26v5.4h8.022l-.35 7.39h-7.672v20.53H5.43z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedArticleUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg>
              <path d="M44.71 4.295c-1.656.724-3.415 1.242-5.278 1.45A9.146 9.146 0 0 0 43.468.673a18.75 18.75 0 0 1-5.796 2.225C35.965 1.138 33.584 0 30.945 0a9.145 9.145 0 0 0-9.16 9.16c0 .724.052 1.448.208 2.12-7.607-.413-14.335-3.88-18.888-9.417-.777 1.345-1.242 2.742-1.242 4.45 0 3.157 1.604 5.95 4.088 7.607a9.376 9.376 0 0 1-4.14-1.138v.103c0 4.45 3.16 8.176 7.35 9.004-.77.2-1.6.31-2.43.31-.57 0-1.14-.06-1.71-.16 1.14 3.62 4.56 6.31 8.54 6.36-3.1 2.48-7.09 4.34-11.38 4.34-.72 0-1.45-.05-2.17-.16 4.04 2.59 8.9 3.72 14.08 3.72 16.87 0 26.08-13.97 26.08-26.08V9.05c1.76-1.294 3.32-2.9 4.56-4.76"></path>
            </svg>
          </a>
        </li>
        <li>
          <a className="republish-link" href={`/republish${globalContent?.canonical_url}`}>
            Republish
          </a>
        </li>
      </ul>
    </div>
  );
};

ShareBarFeature.label = "Share Bar - Civic";
ShareBarFeature.description = "Shows share bar for artcile";

export default ShareBarFeature;
