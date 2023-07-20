import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import HeaderSignup from "../../base/header/header-signup.component";
import "./styles.scss";

const Header = () => {
  const context = useFusionContext();
  const { arcSite } = context;
  const { primaryLogo, primaryLogoAlt } = getProperties(arcSite);

  return (
    <div className={`customheader`}>
      <HeaderSignup logoURL={primaryLogo} logoAlt={primaryLogoAlt} />
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
