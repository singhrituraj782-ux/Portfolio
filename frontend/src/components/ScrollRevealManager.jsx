import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollRevealManager() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
    const parallaxElements = Array.from(
      document.querySelectorAll("[data-parallax]")
    );

    if (reduceMotion) {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
      parallaxElements.forEach((el) => el.style.setProperty("--parallax-y", "0px"));
      return undefined;
    }

    let observer;
    if ("IntersectionObserver" in window && revealElements.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        // Trigger once the element is clearly within the viewport so the motion is noticeable.
        { threshold: 0.18, rootMargin: "0px 0px -18% 0px" }
      );

      revealElements.forEach((el) => {
        el.classList.remove("is-revealed");
        observer.observe(el);
      });

      // If the user lands mid-page (hash/deeplink), reveal anything already in view immediately.
      window.requestAnimationFrame(() => {
        revealElements.forEach((el) => {
          if (el.classList.contains("is-revealed")) return;
          const rect = el.getBoundingClientRect();
          const visible =
            rect.bottom > 0 && rect.top < window.innerHeight * 0.85;
          if (!visible) return;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      });
    } else {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
    }

    if (!isDesktop) {
      parallaxElements.forEach((el) => el.style.setProperty("--parallax-y", "0px"));
      return () => {
        if (observer) observer.disconnect();
      };
    }

    let raf = 0;
    const updateParallax = () => {
      raf = 0;
      if (!parallaxElements.length) return;

      const viewportMid = window.innerHeight / 2;
      parallaxElements.forEach((el) => {
        const speed = Number(el.getAttribute("data-parallax")) || 0.06;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const offset = elMid - viewportMid;
        const y = offset * -speed;
        el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      parallaxElements.forEach((el) => el.style.removeProperty("--parallax-y"));
    };
  }, [location.key]);

  return null;
}
