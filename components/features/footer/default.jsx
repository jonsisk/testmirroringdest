import PropTypes from "prop-types";
import React from "react";
import FooterSignup from "../../base/footer/footer-signup.component";
import "./styles.scss";

const Footer = (props) => {
  const { message, display, textColor, textSize } = props.customFields;

  return (
    <div className={`customfooter`}>
      {/*display ? (
        <h1
          style={{
            color: textColor || "blue",
            fontSize: textSize || "10px",
          }}
        >
          {message}
        </h1>
      ) : (
        "Hidden Content"
      )*/}

      <FooterSignup />
    </div>
  );
};

Footer.propTypes = {
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
    display: PropTypes.boolean,
  }),
};

Footer.label = "Custom Footer";

export default Footer;
