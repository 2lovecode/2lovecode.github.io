(() => {
  const article = document.querySelector(".post-single.has-side-toc");
  if (!article) return;

  const content = article.querySelector(".post-content");
  const sideRoot = article.querySelector(".post-toc--side");
  const mobileRoot = article.querySelector(".toc--mobile");
  const tocRoots = [sideRoot, mobileRoot].filter(Boolean);
  if (!content || !tocRoots.length) return;

  const headings = Array.from(content.querySelectorAll("h2[id], h3[id], h4[id]"));
  if (!headings.length) return;

  const linksById = new Map();
  tocRoots.forEach((root) => {
    root.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      let id = href.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch (_) {
        /* keep raw id */
      }
      if (!linksById.has(id)) linksById.set(id, []);
      linksById.get(id).push(anchor);
    });
  });

  let activeId = "";
  const setActive = (id) => {
    if (!id || id === activeId) return;
    activeId = id;
    tocRoots.forEach((root) => {
      root.querySelectorAll("a.is-active").forEach((a) => a.classList.remove("is-active"));
    });
    (linksById.get(id) || []).forEach((a) => a.classList.add("is-active"));
  };

  const visible = new Map();
  const pickActive = () => {
    const entries = Array.from(visible.entries())
      .filter(([, ratio]) => ratio > 0)
      .sort((a, b) => {
        const elA = document.getElementById(a[0]);
        const elB = document.getElementById(b[0]);
        if (!elA || !elB) return 0;
        return elA.getBoundingClientRect().top - elB.getBoundingClientRect().top;
      });
    if (entries.length) {
      setActive(entries[0][0]);
      return;
    }
    let fallback = headings[0].id;
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= 120) fallback = h.id;
    }
    setActive(fallback);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      pickActive();
    },
    {
      root: null,
      rootMargin: "-12% 0px -62% 0px",
      threshold: [0, 0.25, 0.5, 1],
    }
  );

  headings.forEach((h) => observer.observe(h));
  setActive(headings[0].id);
})();
