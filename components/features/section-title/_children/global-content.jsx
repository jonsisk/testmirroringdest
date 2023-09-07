import { useAppContext } from "fusion:context";
import React from "react";
import SectionTitleCivic from "./section-title";

const GlobalContentSectionTitleCivic = () => {
  const { globalContent = {} } = useAppContext();

  return <SectionTitleCivic content={globalContent} />;
};

export default GlobalContentSectionTitleCivic;
