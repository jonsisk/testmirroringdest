import PropTypes from "prop-types";

const LinksBarCivic = (props) => {
  const { heading } = props.customFields;
  const blocks = props.children;

  return (
    <section>
      <nav>
        <ul>
          <li>
            <div>{blocks}</div>
          </li>
        </ul>
      </nav>
    </section>
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
