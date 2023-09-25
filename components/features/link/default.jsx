import PropTypes from "prop-types";
import React from "react";

const LinkCivic = ({ customFields }) => {
  const { linkName, linkURL } = customFields;

  return (
    <div className="SectionNavigation-items-item">
      <div className="SectionNavigationItem">
        <div className="SectionNavigationItem-text">
          <a
            href={linkURL}
            target="_blank"
            className="SectionNavigationItem-text-link"
            data-cms-ai="0"
            rel="noreferrer"
          >
            {linkName}
          </a>
        </div>
      </div>
    </div>
  );
};

LinkCivic.propTypes = {
  customFields: PropTypes.shape({
    linkName: PropTypes.string.tag({
      defaultValue: "Link Name",
      label: "Link Name",
      group: "Configure Content",
    }),
    linkURL: PropTypes.string.tag({
      defaultValue: "https://twitter.com/VotebeatUS",
      label: "Link URL",
      group: "Configure Content",
    }),
  }),
};

LinkCivic.label = "Link - Civic";
LinkCivic.description = "Link";
LinkCivic.static = true;

export default LinkCivic;
