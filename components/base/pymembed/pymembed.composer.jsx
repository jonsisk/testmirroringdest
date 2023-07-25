import React, { useState, useEffect } from "react";
import { useBrowserGlobals } from "../../hooks/use-browserglobals.js";

const PymEmbedComposer = ({ embed }) => {
  const global = useBrowserGlobals();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const SCRIPT_SRC = "https://apps.npr.org/sidechain/loader.js";

  const loadScripts = () => {
    global.document.getElementById("sidechain-script")?.remove();

    const script = global.document.createElement("script");
    script.id = "sidechain-script";
    script.type = "text/javascript";
    script.async = true;
    global.document.body.appendChild(script);
    script.onload = () => {
      setScriptLoaded(true);
    };
    script.src = `${SCRIPT_SRC}?t=${Date.now()}`;
  };

  useEffect(() => {
    if (!scriptLoaded && global?.document) {
      loadScripts();
    }
  }, [global, scriptLoaded]);

  return <side-chain src={embed.config.pymembed}></side-chain>;
};

export default PymEmbedComposer;
