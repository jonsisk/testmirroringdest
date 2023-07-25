import React from "react";
import "./default.scss";

const TwoColLayout = (props) => {
  const [header, fullWidth, leftCol, rightCol, footer] = props.children;

  return (
    <div>
      <header className="header">{header}</header>
      <div className="main-section">
        <main className="main-col">{fullWidth}</main>
        <section className="column">{leftCol}</section>
        <section className="column">{rightCol}</section>
      </div>
      <footer className="footer">{footer}</footer>
    </div>
  );
};

TwoColLayout.sections = ["Header", "Full Width", "Left Column", "Right Column", "Footer"];
TwoColLayout.label = "Two Column Layout";
export default TwoColLayout;
