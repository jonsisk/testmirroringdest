import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

const HeaderBelow = (props) => {
  const context = useFusionContext();
  const { arcSite } = context;
  const { darkBackgroundLogo, lightBackgroundLogo, primaryLogo, primaryLogoAlt } =
    getProperties(arcSite);

  const { imageURL } = props.customFields;

  const imageURLBydefault =
    "https://chalkbeat.brightspotcdn.com/dims4/default/9dccf73/2147483647/strip/true/crop/4000x2251+0+0/resize/1665x937!/format/webp/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FU0mahAS69fEFYhPFokCf9SgPLck%3D%2F0x0%3A4000x2667%2F4000x2667%2Ffilters%3Afocal%282625x676%3A2626x677%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24193814%2F1108_Tarrant_County_Election_ST_37B.jpg";

  return (
    <div className={`customheader`}>
      <img src={lightBackgroundLogo} />
      <img src={!imageURL ? imageURLBydefault : imageURL} />
    </div>
  );
};

HeaderBelow.propTypes = {
  customFields: PropTypes.shape({
    imageURL: PropTypes.string.tag({
      label: "Image URL",
      group: "Configure Content",
    }),
  }),
};

HeaderBelow.label = "Custom HeaderBelow";

export default HeaderBelow;
