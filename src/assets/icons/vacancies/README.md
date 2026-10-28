# Vacancy illustrations

The vacancy illustrations are WebP raster images. Filenames match `iconName` in `vacanciesData.js`:

- `cashier.webp`
- `bike-courier.webp`
- `seller.webp`
- `hall-manager.webp`
- `call-center-operator.webp`
- `senior-cashier.webp`
- `loader.webp`
- `accountant.webp`

`Like_perspective_matte.webp` is used in the introduction.

These files replace SVG wrappers containing embedded PNG data. The visible artwork and original transforms were preserved at three times the original SVG display dimensions. Total size: 95,206 bytes, previously 9,266,517 bytes.

`vacancyIcons.js` discovers `.webp` files and provides a React Icon fallback for a missing illustration. Use a real SVG only for vector artwork; do not embed raster images as base64 SVG payloads.