import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

const Banner = ({ customFields }) => {
  const { title, url, description } = customFields;
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const bannerFlag = sessionStorage.getItem("banner");
    if (!bannerFlag) {
      setShowComponent(true);
    }
  }, []);

  const handleClick = () => {
    sessionStorage.setItem("banner", "hidden");
    setShowComponent(false);
  };

  if (!showComponent) return null;

  return (
    <div className="banner">
      <div className="banner-content">
        <span className="banner-title">
          <b>{title}</b>
        </span>

        <a className="banner-link" href={url}>
          {description}
        </a>

        <button className="banner-close" onClick={handleClick}>
          <span>X</span>
        </button>
      </div>
    </div>
  );
};

Banner.label = "Banner - Civic";
Banner.description = "Shows banner below the header";

Banner.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Banner;
