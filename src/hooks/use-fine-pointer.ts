import * as React from "react";

// Genuine input-capability check — NOT a viewport-width proxy like
// useIsMobile/useIsPhoneLayout. A custom cursor only makes sense where a
// real mouse or trackpad drives :hover — touch phones AND touch-first
// tablets (any width) must fall through to native touch interaction, so
// this checks actual pointer/hover capability instead of screen size.
const FINE_POINTER_QUERY = "(pointer: fine) and (hover: hover)";

export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = React.useState(
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(FINE_POINTER_QUERY);
    const onChange = () => setHasFinePointer(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return hasFinePointer;
}
