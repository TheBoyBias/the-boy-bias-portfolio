
(() => {
  const header = document.querySelector("header");
  const toggle = document.querySelector(".mobile-menu-toggle");
  const nav = header?.querySelector("nav");

  if (header && toggle && nav) {
    const closeNav = () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    };

    toggle.addEventListener("click", () => {
      const open = !header.classList.contains("nav-open");
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeNav();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) closeNav();
    });
  }

  // Respect reduced-motion preferences for autoplay presentation loops.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach(video => {
      video.removeAttribute("autoplay");
      video.pause();
    });
  }


  // Expandable turnaround / video presentations.
  const mediaLightbox = document.getElementById("media-lightbox");
  const mediaLightboxVideo = mediaLightbox?.querySelector("video");
  const mediaLightboxClose = mediaLightbox?.querySelector(".media-lightbox-close");

  const closeMediaLightbox = () => {
    if (!mediaLightbox || !mediaLightboxVideo) return;
    mediaLightbox.classList.remove("open");
    mediaLightbox.setAttribute("aria-hidden", "true");
    mediaLightboxVideo.pause();
    mediaLightboxVideo.removeAttribute("src");
    mediaLightboxVideo.load();
    document.body.style.overflow = "";
  };

  const openMediaLightbox = source => {
    if (!mediaLightbox || !mediaLightboxVideo || !source) return;
    mediaLightboxVideo.src = source;
    mediaLightboxVideo.muted = true;
    mediaLightbox.classList.add("open");
    mediaLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const play = mediaLightboxVideo.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
    mediaLightboxClose?.focus();
  };

  document.querySelectorAll("video.media-zoomable").forEach(video => {
    const activate = event => {
      if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openMediaLightbox(video.currentSrc || video.src);
    };
    video.addEventListener("click", activate);
    video.addEventListener("keydown", activate);
  });

  mediaLightboxClose?.addEventListener("click", closeMediaLightbox);
  mediaLightbox?.addEventListener("click", event => {
    if (event.target === mediaLightbox) closeMediaLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && mediaLightbox?.classList.contains("open")) closeMediaLightbox();
  });

})();
