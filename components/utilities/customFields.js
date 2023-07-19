import PropTypes from "fusion:prop-types";

export const deviceRender = {
  renderMobile: PropTypes.bool.tag({
    group: "Render",
    name: "Show on mobile?",
    defaultValue: true,
  }),
  renderTablet: PropTypes.bool.tag({
    group: "Render",
    name: "Show on Tablet?",
    defaultValue: true,
  }),
  renderDesktop: PropTypes.bool.tag({
    group: "Render",
    name: "Show on Desktop?",
    defaultValue: true,
  }),
};
