import PropTypes from "@arc-fusion/prop-types";
import React from "react";

const MeetTheTeamChain = (props) => {
  const { title, subtitle } = props.customFields;
  const authors = props.children;
  return (
    <div className="AuthorListA">
      <div className="PageList-header">
        <svg className="PageList-header-squiggly">
          <use xlinkHref="#squiggly"></use>
        </svg>
        <div className="PageList-header-title-wrap">
          <div className="PageList-header-title">{title}</div>
        </div>
        <div className="PageList-header-subtitle-wrap">
          <div className="PageList-header-subtitle">{subtitle}</div>
        </div>
      </div>
      <ul className="AuthorListA-items">{authors}</ul>
    </div>
  );
};

MeetTheTeamChain.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "title",
      defaultValue: "Meet the team",
      description: "Title of the component",
    }),
    subtitle: PropTypes.string.tag({
      label: "subtitle",
      description: "Subtitle of the component",
    }),
  }),
};

MeetTheTeamChain.label = "Meet the Team - Civic";
MeetTheTeamChain.static = true;

export default MeetTheTeamChain;
