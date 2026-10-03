// "Code in the chat" hero mark. The motion itself is pure CSS (see the
// .ld rules in src/index.css) so it starts at first paint, before hydration.
// This only marks the hero done when the sun lands, which drops will-change.
// Reduced-motion users are done immediately: the CSS never animates for them.

export function initLogoDraw(root: HTMLElement): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.dataset.ld = 'done'
    return () => {}
  }
  const sun = root.querySelector('.ld-sun')
  const done = () => {
    root.dataset.ld = 'done'
  }
  sun?.addEventListener('animationend', done, { once: true })
  return () => sun?.removeEventListener('animationend', done)
}
