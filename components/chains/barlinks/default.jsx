import PropTypes from "prop-types";

const LinksBarCivic = (props) => {
  const { heading } = props.customFields;
  const blocks = props.children;

  return (
    <div className="SectionNavigation-navContainer">
      <nav className="SectionNavigation">
        <div className="SectionNavigation-items">{blocks}</div>
      </nav>
    </div>
  );
};

LinksBarCivic.propTypes = {
  customFields: PropTypes.shape({
    heading: PropTypes.string,
  }),
};

LinksBarCivic.label = "Bar Links - Civic";

LinksBarCivic.icon = "arc-article";

export default LinksBarCivic;
