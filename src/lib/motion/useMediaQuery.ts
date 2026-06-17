"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(queryText: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(queryText);
    const updateMatch = () => setMatches(query.matches);

    updateMatch();
    query.addEventListener("change", updateMatch);

    return () => query.removeEventListener("change", updateMatch);
  }, [queryText]);

  return matches;
}
