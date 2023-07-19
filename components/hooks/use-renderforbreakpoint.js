import { useEffect, useState } from "react";
import { useResponsive } from "./use-responsive";

/**
 * Hook to validate if a Feature should be rendered for the current breakpoint depending on the props passed.
 */
const useRenderForBreakpoint = ({
  renderMobile = true,
  renderTablet = true,
  renderDesktop = true,
}) => {
  const [shouldRender, setShouldRender] = useState(renderMobile && renderTablet && renderDesktop);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    if (renderMobile && renderTablet && renderDesktop) return;

    if (isMobile && renderMobile && !shouldRender) setShouldRender(true);
    else if (isTablet && renderTablet && !shouldRender) setShouldRender(true);
    else if (isDesktop && renderDesktop && !shouldRender) setShouldRender(true);
    else setShouldRender(false);
  }, [isMobile, isDesktop, isTablet]);

  return { shouldRender: shouldRender };
};

export default useRenderForBreakpoint;
