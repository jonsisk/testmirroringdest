import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/arc-themes-components";
import { Button, BUTTON_STYLES, BUTTON_TYPES, HeadingSection } from "@wpmedia/shared-styles";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@wpmedia/shared-styles/scss/_results-list.scss";
import { LIST_FILTER } from "../../../content/helpers/filters.helper";
import { useArticleStore } from "../stores/articles.store";
import { SlideCard } from "./slideCard";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrow: true,
  autoplay: false,
  nextArrow: (
    <div className="slider-right-arrow">
      <svg>
        <use xlinkHref="#icon-arrow-right"></use>
      </svg>
    </div>
  ),
  prevArrow: (
    <div className="slider-left-arrow">
      <svg>
        <use xlinkHref="#icon-arrow-left"></use>
      </svg>
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Carrousel = ({ customFields }) => {
  const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();
  const { fallbackImage } = getProperties(arcSite);
  const {
    lazyLoad,
    listContentConfig: { contentService, contentConfigValues },
    title,
    subtitle,
    buttonLabel,
    buttonUrl,
  } = customFields;

  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;
  const addArticle = useArticleStore((state) => state.addArticle);

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
        <div className="SliderWrapper">
          <Slider {...settings} className="slider">
            {content_elements?.length > 0 &&
              !isServerSideLazy &&
              content_elements.map((slide, index) => (
                <SlideCard
                  key={index}
                  slide={slide}
                  arcSite={arcSite}
                  targetFallbackImage={targetFallbackImage}
                  placeholderResizedImageOptions={placeholderResizedImageOptions}
                />
              ))}
          </Slider>
          {buttonLabel && buttonUrl && (
            <div className="see-more">
              <Button
                ariaLabel={buttonLabel}
                buttonStyle={BUTTON_STYLES.PRIMARY}
                buttonTypes={BUTTON_TYPES.LABEL_ONLY}
                text={buttonLabel}
                onClick={() => window.open(`${buttonUrl}`)}
              />
            </div>
          )}
        </div>
      </HeadingSection>
    </LazyLoad>
  );
};

Carrousel.label = "Slider – Civic";

Carrousel.icon = "arc-list";

Carrousel.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    subtitle: PropTypes.string.tag({
      label: "Subtitle",
      group: "Configure Content",
    }),
    buttonLabel: PropTypes.string.tag({
      label: "Button Label",
      group: "Configure Content",
    }),
    buttonUrl: PropTypes.string.tag({
      label: "Button URL",
      group: "Configure Content",
    }),
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
  }),
};

export default Carrousel;
