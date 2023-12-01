import PropTypes from "@arc-fusion/prop-types";
import { Image } from "@wpmedia/arc-themes-components";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";

const AuthorFeature = (props) => {
  const { arcSite } = useFusionContext();
  const { slug, bio } = props.customFields;

  const authorResult = useContent({
    source: "author-api",
    query: { slug: slug },
  });

  if (!authorResult) return null;

  const author = authorResult?.authors?.[0];

  const authorUrl = `/authors/${author.slug}`;

  return (
    <li className="AuthorListA-items-item" key={author.slug}>
      <div className="AuthorPromo">
        <div className="PagePromo-media">
          <a className="Link" aria-label={author.byline} href={authorUrl} data-cms-ai="0">
            {author.image ? (
              <Image
                url={author.image}
                alt={author.byline ? author.byline : ""}
                smallWidth={158}
                smallHeight={158}
                mediumWidth={158}
                mediumHeight={158}
                largeWidth={158}
                largeHeight={158}
                resizedImageOptions={author.resized_params}
                resizerURL={getProperties(arcSite)?.resizerURL}
                breakpoints={getProperties(arcSite)?.breakpoints}
              />
            ) : null}
          </a>
        </div>

        <div className="AuthorPromo-content">
          <div className="PagePromo-title">
            <a className="Link" href={authorUrl} data-cms-ai="0">
              {author.byline}
            </a>
          </div>

          <div className="PagePromo-label">
            <a className="Link" href={authorUrl} data-cms-ai="0">
              {author.role}
            </a>
          </div>

          <div className="PagePromo-label">
            <a className="Link" href={authorUrl} data-cms-ai="0">
              {bio || author.longBio}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

AuthorFeature.propTypes = {
  customFields: PropTypes.shape({
    slug: PropTypes.string.tag({
      label: "slug",
      description: "Author slug",
    }),
    bio: PropTypes.string.tag({
      label: "bio",
      description: "Author bio (overrides default)",
    }),
  }),
};

AuthorFeature.label = "Author - Civic";
AuthorFeature.static = true;

export default AuthorFeature;
