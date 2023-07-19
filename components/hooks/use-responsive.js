import { useState, useEffect } from "react";
import { useBreakpoint } from "use-breakpoint";
import { jsBREAKPOINTS } from "../utilities/media";

/**
 * Hook to handle responsive breakpoints defined in jsBREAKPOINTS.
 */
export const useResponsive = () => {
  const { breakpoint: contextBreakpoint } = useBreakpoint(jsBREAKPOINTS, "mobile", false);
  const [breakpoint, setBreakpoint] = useState(contextBreakpoint);
  const [isMobile, setIsMobile] = useState(breakpoint === "mobile");
  const [isTablet, setIsTablet] = useState(breakpoint === "tablet");
  const [isDesktop, setIsDesktop] = useState(breakpoint === "desktop");

  useEffect(() => {
    if (contextBreakpoint !== breakpoint) {
      setBreakpoint(contextBreakpoint);
      setIsMobile(contextBreakpoint === "mobile");
      setIsTablet(contextBreakpoint === "tablet");
      setIsDesktop(contextBreakpoint === "desktop");
    }
  }, [contextBreakpoint]);

  return { breakpoint, isMobile, isTablet, isDesktop };
};
