import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Instantly scrolls to top on route change (no animation) so new page starts from the top.
 * Place this inside your main layout or App component, above Footer.
 */
export function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
