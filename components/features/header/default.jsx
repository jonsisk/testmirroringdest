import PropTypes from "prop-types";
import HeaderSignup from "../../base/header/header-signup.component";
import "./styles.scss";

const Header = (props) => {
  const { message, display, textColor, textSize, community } = props.customFields;

  return (
    <div className={`customheader`}>
      {community === "National" ? (
        <HeaderSignup logoURL="https://chalkbeat.brightspotcdn.com/d5/b0/f967e5a84ca58f5e717c9671b6da/vb-logo-2color-light-v2.svg" />
      ) : community === "Arizona" ? (
        <HeaderSignup logoURL="https://chalkbeat.brightspotcdn.com/c6/10/2aca1a55477fb476de4bc9b6fc37/vb-az-logo-left-2color-light-2022.svg" />
      ) : community === "Michigan" ? (
        <HeaderSignup logoURL="https://chalkbeat.brightspotcdn.com/fa/b4/cdf6c5034d1fab062653a18f78ab/vb-mi-logo-left-2color-light-2022.svg" />
      ) : community === "Texas" ? (
        <HeaderSignup logoURL="https://chalkbeat.brightspotcdn.com/3a/69/319d5d4b497796d0c4f0bf309ed4/vb-tx-logo-left-2color-light-2022.svg" />
      ) : community === "Pennsylvania" ? (
        <HeaderSignup logoURL="https://chalkbeat.brightspotcdn.com/a4/bf/14970d0740f4bc79d9f848bc1567/vb-pa-logo-left-2color-light-2022.svg" />
      ) : (
        "Hidden Content"
      )}
    </div>
  );
};

//

Header.propTypes = {
  customFields: PropTypes.shape({
    message: PropTypes.string.tag({
      description: "Add a message",
    }),
    textColor: PropTypes.oneOf(["purple", "green", "black"]).tag({
      description: "Text Color",
    }),
    textSize: PropTypes.oneOf(["18px", "30px", "66px", "100px"]).tag({
      description: "Text Size",
    }),
    community: PropTypes.oneOf(["National", "Arizona", "Texas", "Michigan", "Pennsylvania"]).tag({
      description: "Community",
    }),
    display: PropTypes.boolean,
  }),
};

Header.label = "Custom Header";

export default Header;
