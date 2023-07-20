import PropTypes from "prop-types";
import React from "react";
import "./default.scss";

/**
 * Handles the composer-driven sidebar component together with the power-up for sidebars
 * @param {*} embed - power-up stored data (custom_embed)
 * @returns
 */
const SidebarComposer = ({ embed }) => {
  const data = embed.config;

  return (
    <div className="sidebar-composer">
      <h3>{data.title}</h3>
      {data.image_url && (
        <div className="logo">
          <img width="200" src={data.image_url} alt={data.title} />
        </div>
      )}
      <p className="body" dangerouslySetInnerHTML={{ __html: data.content }}></p>
    </div>
  );
};

SidebarComposer.propTypes = {
  embed: PropTypes.any,
};

export default SidebarComposer;
