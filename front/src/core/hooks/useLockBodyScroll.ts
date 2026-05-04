import { useLayoutEffect } from 'react';

const useLockBodyScroll = (isOpen: boolean) => {
  useLayoutEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // trava o scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // restaura
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
}

export default useLockBodyScroll;