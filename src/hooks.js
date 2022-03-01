import { useEffect } from "react";

export const useIntersectionObserver = async ({
  root,
  target,
  onIntersect,
  threshold = 0,
  rootMargin = "0px",
}) => {
  useEffect(() => {
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.bottom > 0) {
          if (entry.isIntersecting) {
            // entered viewport at the top edge, hence scroll direction is up
            onIntersect();
          } else {
            // left viewport at the top edge, hence scroll direction is down
          }
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [root, target, onIntersect, threshold, rootMargin]);
};
