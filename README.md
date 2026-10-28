# DermaSelene — Medical Esthetics by Shanelle Rene G.

Static marketing site for the DermaSelene medical esthetics clinique. No build step —
plain HTML/CSS with a shared stylesheet.

## Pages

- `index.html` — landing page (hero, philosophy, services, founder)
- `gallery.html` — masonry photo gallery
- `about.html` — founder story and the three disciplines
- `book.html` — booking request form, relayed by [FormSubmit](https://formsubmit.co)
  to hello@dermaselene.com (free, no account). The first submission from a new
  domain triggers a one-time activation email to that address — click the link
  in it once, then every request lands in the inbox. Falls back to a `mailto:`
  link if the relay is unreachable.

## Assets

- `assets/img/` — stock photography (Unsplash).
- `assets/personal/` — real clinic photos/videos. Phone originals (`IMG_*.HEIC`,
  `IMG_*.mp4`) are git-ignored; the gallery uses the converted `personal-*.jpg`
  (max 1600px, q82) and `personal-*.mp4` (H.264, CRF 26, no audio) plus
  `*-poster.jpg` frames.

## Develop

Serve locally with any static server, e.g.:

```sh
python3 -m http.server 8000
```

## Credits

Photography from Unsplash (Kimia Kazemi, Ahmad Ebadi, Gideon Hezekiah, Amir
Seilsepour, Sum Sum, Leighann Blackwood, Diana Light, Lesly Juarez, Nataliya
Melnychuk, Mehran Khan, Content Pixie, PMV Chamara, Xandro Vandewalle, Enecta
Cannabis Extracts, Kate Laine, Sergio Martins, Muthia Ashifa Salsabella, Look Studio, Mina Rad), resized for web. Fonts: Cormorant Garamond & Jost via
Google Fonts.
