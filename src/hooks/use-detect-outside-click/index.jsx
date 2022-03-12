import { useRef, useEffect } from "react";

export const useDetectOutsideClick = (onClick) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
    // eslint-disable-next-line
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClick(false);
    }
  };

  return { wrapperRef };
};
