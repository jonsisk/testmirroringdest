import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/engine-theme-sdk";
import { HeadingSection } from "@wpmedia/shared-styles";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { LIST_FILTER } from "../../../content/helpers/filters.helper";
import { StoriesCard } from "./storiesCard";

const StoriesMissed = ({ customFields }) => {
  const {
    title,
    lazyLoad,
    subtitle,
    listContentConfig: { contentService, contentConfigValues },
  } = customFields;
  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;
  const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();
  const { fallbackImage } = getProperties(arcSite);
  const requestedResultList = useContent({
    source: isServerSideLazy ? null : contentService,
    query: {
      ...contentConfigValues,
      feature: "results-list",
    },
    filter: LIST_FILTER(arcSite),
  });
  const targetFallbackImage = !fallbackImage.includes("http")
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;
  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes("/resources/") ? "resize-image-api" : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });
  const { content_elements } = requestedResultList ? requestedResultList : {};
  return (
    <LazyLoad enabled={lazyLoad && !isAdmin}>
      <HeadingSection>
        <div className="PageList-header articles-slider">
          <svg className="PageList-header-squiggly">
            <use xlinkHref="#squiggly"></use>
          </svg>
          <div className="PageList-header-title-wrap">
            <div className="PageList-header-title">{title}</div>
          </div>

          <div className="PageList-header-description">
            <p>{subtitle}</p>
          </div>
        </div>
        {content_elements?.length > 0 &&
          !isServerSideLazy &&
          content_elements.map((slide, index) => (
            <StoriesCard
              key={index}
              slide={slide}
              showImage={index === 0}
              arcSite={arcSite}
              targetFallbackImage={targetFallbackImage}
              placeholderResizedImageOptions={placeholderResizedImageOptions}
            />
          ))}
      </HeadingSection>
    </LazyLoad>
  );
};
StoriesMissed.label = "StoriesList – Civic";

StoriesMissed.icon = "arc-list";

StoriesMissed.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    subtitle: PropTypes.string.tag({
      label: "Subtitle",
      group: "Configure Content",
    }),
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
  }),
};
export default StoriesMissed;
