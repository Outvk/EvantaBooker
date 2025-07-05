import React, { useCallback, useRef } from 'react';
import { ScrollToTopWithSync } from './components/ui/scroll-to-top';
import { DashboardButtonWithScrollSync } from './components/ui/dashboard-button';

export function DashboardSyncButtons() {
  const isScrollVisible = useRef(false);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    isScrollVisible.current = visible;
    forceUpdate();
  }, []);

  return (
    <>
      <ScrollToTopWithSync onVisibilityChange={handleVisibilityChange} />
      <DashboardButtonWithScrollSync isScrollButtonVisible={isScrollVisible.current} />
    </>
  );
}
