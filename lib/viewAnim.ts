// IntersectionObserver-driven entrance runner — used instead of ScrollTrigger
// for section card entrances (fires reliably regardless of scroll library state).
export function animateOnView(trigger: Element | null | undefined, run: () => void) {
  if (!trigger) return () => {};

  let fired = false;
  let io: IntersectionObserver | undefined;
  let iv: ReturnType<typeof setInterval> | undefined;
  const fire = () => {
    if (fired) return;
    fired = true;
    io?.disconnect();
    if (iv) clearInterval(iv);
    window.removeEventListener("scroll", check);
    window.removeEventListener("resize", check);
    run();
  };

  // manual visibility check — fallback for environments where IO is throttled
  const check = () => {
    const r = trigger.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) fire();
  };

  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) fire();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(trigger);
  }
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check, { passive: true });
  iv = setInterval(check, 450);
  check();

  return () => {
    io?.disconnect();
    if (iv) clearInterval(iv);
    window.removeEventListener("scroll", check);
    window.removeEventListener("resize", check);
  };
}

// Adds .rv-go (starts the CSS reveal transitions), then .rv-done once settled
// so hover transitions become snappy again.
export function revealOnView(container: Element | null | undefined) {
  let t: ReturnType<typeof setTimeout> | undefined;
  const stop = animateOnView(container, () => {
    container?.classList.add("rv-go");
    t = setTimeout(() => container?.classList.add("rv-done"), 2800);
  });
  return () => {
    stop();
    if (t) clearTimeout(t);
  };
}
