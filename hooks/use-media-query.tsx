import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: any) => {
      setMatches(event.matches);
    };

    // Initial check
    handleChange(mediaQuery);

    // Add listener for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      // Remove listener
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
