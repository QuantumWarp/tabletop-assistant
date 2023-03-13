import { useEffect, useRef, useState } from 'react';

export default function useElementWidth() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!elementRef.current) return;
      setWidth(elementRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { elementRef, width };
}
