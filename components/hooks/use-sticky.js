import { useEffect, useRef, useState } from "react";
import { useBrowserGlobals } from "./use-browserglobals";

const useSticky = () => {
  const global = useBrowserGlobals();
  const stickyRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }

    setOffset(stickyRef.current.offsetTop + 100);
  }, [stickyRef, setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return;
      }

      setSticky(global.window.scrollY > offset);
    };
    global.window.addEventListener("scroll", handleScroll);
    return () => global.window.removeEventListener("scroll", handleScroll);
  }, [setSticky, stickyRef, offset]);

  return { stickyRef, sticky };
};

export default useSticky;
