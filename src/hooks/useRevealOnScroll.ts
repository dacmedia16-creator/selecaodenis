import { useEffect } from "react";

/**
 * Adds `is-visible` to elements with `.reveal` when scrolled into view.
 * - Observes elements added later via MutationObserver.
 * - Fallback: forces visibility after 1.5s to avoid blank gaps if the
 *   IntersectionObserver never fires (e.g. anchor jumps, layout quirks).
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px" },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Watch for newly mounted .reveal elements (e.g. after state changes).
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Safety fallback: after 1.5s, force-visible anything still hidden.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 1500);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
};
