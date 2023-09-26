import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/engine-theme-sdk";
import { HeadingSection } from "@wpmedia/shared-styles";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
/* import Slider from "react-slick"; */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@wpmedia/shared-styles/scss/_results-list.scss";
import { useArticleStore } from "../stores/articles.store";
import NoticeCard from "./noticeCard";

const NoticeList = ({ customFields }) => {
  const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();
  const { fallbackImage } = getProperties(arcSite);
  const {
    lazyLoad,
    listContentConfig: { contentService, contentConfigValues },
    title,
    subtitle,
    columns,
  } = customFields;

  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;
  const addArticle = useArticleStore((state) => state.addArticle);

  const requestedResultList = useContent({
    source: isServerSideLazy ? null : contentService,
    query: {
      ...contentConfigValues,
      feature: "results-list",
    },
  });

  const targetFallbackImage = !fallbackImage.includes("http")
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;
  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes("/resources/") ? "resize-image-api" : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });
  const { content_elements } = requestedResultList;

  if (content_elements) {
    content_elements.forEach((element) => {
      addArticle(element._id);
    });
  }

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
        <div className={`noticesContainer columns-${columns}`}>
          {content_elements?.length > 0 &&
            !isServerSideLazy &&
            content_elements.map((slide, index) => (
              <NoticeCard
                key={index}
                slide={slide}
                arcSite={arcSite}
                targetFallbackImage={targetFallbackImage}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
              />
            ))}
        </div>
      </HeadingSection>
    </LazyLoad>
  );
};

NoticeList.label = "Notices – Civic";

NoticeList.icon = "arc-list";

NoticeList.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    subtitle: PropTypes.string.tag({
      label: "Subtitle",
      group: "Configure Content",
    }),
    columns: PropTypes.oneOf(["2", "3", "4"]).tag({
      label: "Columns",
      group: "Configure Content",
      defaultValue: "3",
    }),
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
  }),
};

export default NoticeList;
