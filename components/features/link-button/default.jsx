import PropTypes from "prop-types";
import React from "react";

const LinkButtonCivic = ({ customFields }) => {
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

LinkButtonCivic.propTypes = {
  customFields: PropTypes.shape({
    linkName: PropTypes.string.tag({
      defaultValue: "Interested in writing a piece? Here’s how to pitch",
      label: "Button Name",
      group: "Configure Content",
    }),
    linkURL: PropTypes.string.tag({
      defaultValue: "https://www.chalkbeat.org/pages/first-person-guidelines",
      label: "Link URL",
      group: "Configure Content",
    }),
  }),
};

LinkButtonCivic.label = "Link Button - Civic";
LinkButtonCivic.description = "Link button";
LinkButtonCivic.static = true;

export default LinkButtonCivic;
