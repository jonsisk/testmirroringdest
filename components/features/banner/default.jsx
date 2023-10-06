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
          <svg id="close-x" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.336 7L0 .664.664 0 7 6.336 13.336 0 14 .664 7.664 7 14 13.336l-.664.664L7 7.664.664 14 0 13.336 6.336 7z"></path>
          </svg>
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
