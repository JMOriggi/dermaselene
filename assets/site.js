// Shared header behaviour: solid background on scroll + mobile drawer nav.
(() => {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!toggle || !backdrop) return;

  // The backdrop must share the header's stacking context, or it covers the
  // open drawer and swallows taps on the links. Repair older cached markup.
  if (backdrop.parentElement !== header) header.appendChild(backdrop);

  const isOpen = () => document.body.classList.contains('nav-open');
  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  backdrop.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) setOpen(false); });
  document.querySelectorAll('#site-nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
})();

// Home gallery strip: every 3s one random tile crossfades to a photo not currently shown.
(() => {
  const strip = document.getElementById('gallery-strip');
  if (!strip) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pool = [
    { src: 'assets/personal/personal-2189.jpg', alt: 'Shanelle performing an AquaFirme facial', pos: 'center 30%' },
    { src: 'assets/personal/personal-2185.jpg', alt: 'Inside the DermaSelene treatment room' },
    { src: 'assets/personal/personal-2179.jpg', alt: 'A session at the clinique' },
    { src: 'assets/personal/personal-2184-poster.jpg', alt: 'Treatment in progress' },
    { src: 'assets/personal/personal-4631-poster.jpg', alt: 'Treatment in progress' },
    { src: 'assets/img/serum-drop.jpg', alt: 'Active serum applied with a dropper' },
    { src: 'assets/img/jade-roller.jpg', alt: 'Jade roller and gua sha ritual tools' },
    { src: 'assets/img/cream-cheek.jpg', alt: 'Moisturiser applied to the cheek' },
    { src: 'assets/img/leaf-face.jpg', alt: 'Portrait with monstera leaf' },
    { src: 'assets/img/arm-swatches.jpg', alt: 'Texture swatches on the forearm' },
    { src: 'assets/img/smile.jpg', alt: 'A confident, natural smile' },
  ];

  const tiles = Array.from(strip.querySelectorAll('.strip-tile'));
  const shown = tiles.map((t) => t.querySelector('img').getAttribute('src'));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let busy = false;

  const tick = () => {
    if (busy || document.hidden) return;
    const i = Math.floor(Math.random() * tiles.length);
    const next = pick(pool.filter((p) => !shown.includes(p.src)));
    if (!next) return;
    const tile = tiles[i];
    const cur = tile.querySelector('img:not(.is-hidden)');
    const img = tile.querySelector('img.is-hidden') || document.createElement('img');
    busy = true;
    img.className = 'is-hidden';
    img.alt = next.alt;
    img.style.objectPosition = next.pos || '';
    img.onload = () => {
      tile.appendChild(img);                      // incoming on top
      requestAnimationFrame(() => requestAnimationFrame(() => {
        img.classList.remove('is-hidden');        // fade in over the old one
        shown[i] = next.src;
        setTimeout(() => { cur.classList.add('is-hidden'); busy = false; }, 1200);
      }));
    };
    img.onerror = () => { busy = false; };
    img.src = next.src;
  };

  setInterval(tick, 3000);
})();
