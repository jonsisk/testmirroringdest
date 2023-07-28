import loadable from "@loadable/component";
import { useFusionContext } from "fusion:context";

const ThemeComponent = () => {
    const { arcSite, contextPath } = useFusionContext();
    const theme = arcSite.split("-")[0];
    loadable(() => {
        const header = document.getElementsByTagName("header");
        const loadTheme = `<link rel="stylesheet" href={deployment(${contextPath}/resources/site-theme/${theme}.scss)}/>`;
        hydrate(loadTheme, header);
    });
};

export default ThemeComponent;
