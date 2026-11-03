# Urbanfood market photography

New editorial stock photographs for the November 2026 visual redesign. All photographs are stored locally as WebP, not hotlinked.

## License and source

All images below were selected from Pexels free stock photo pages in November 2026 and are covered by the [Pexels License](https://www.pexels.com/license/). Pexels confirms [free use for personal and commercial projects](https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project) and [optional attribution](https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels). Photographer and source-page credits are retained below and in `asset-sources.json`.

The files are stock illustrations of food and everyday products. They do not depict actual Urbanfood stock, staff, facilities, or product packaging. No identifiable faces are used. Existing product-page wording identifies the photos as illustrative.

## Preparation

- EXIF orientation normalized; original subjects and colors retained. The dairy category image is cropped to remove empty space; its crop is recorded in `asset-sources.json`.
- Converted to WebP using Pillow; no generated imagery or branded product cutouts.
- Catalog photographs have a maximum edge of 640–800 px; editorial photographs have a maximum edge of 1200–1600 px.
- All 55 photographs visually checked; the two dedicated category thumbnails are also checked in desktop and mobile card crops.
- No image exceeds 140 KB; total photographic payload is about 2 MB across the whole catalog and all pages.
- `src/data/marketPhotography.js` maps 26 categories, 55 stable product IDs, and six editorial placements to these files. Related products may share a thematically appropriate photograph.
- Category thumbnails should show recognizable ingredients or a prepared drink, with a clear subject that remains visible in both landscape and near-square crops. Avoid empty vessels and incidental kitchen snapshots.

## Credits

| File                     | Photographer        | Pexels source                                                                                                                   | Dimensions  | WebP bytes |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------: |
| `body-wash.webp`         | Daria Liudnaya      | [Photo 8166607](https://www.pexels.com/photo/a-brown-and-black-pump-bottle-8166607/)                                            | 640 × 800   |     13,992 |
| `borscht.webp`           | Valeria Boltneva    | [Photo 15389366](https://www.pexels.com/photo/borscht-in-bowl-15389366/)                                                        | 534 × 800   |     21,680 |
| `bread.webp`             | Feyza Dastan        | [Photo 38699000](https://www.pexels.com/photo/artisanal-sourdough-bread-on-rustic-table-38699000/)                              | 1400 × 933  |     65,778 |
| `breaded-chicken.webp`   | Evgeniya Davydova   | [Photo 11710530](https://www.pexels.com/photo/close-up-photography-of-nuggets-11710530/)                                        | 800 × 533   |     38,952 |
| `broccoli.webp`          | Christina & Peter   | [Photo 36895573](https://www.pexels.com/photo/fresh-cut-broccoli-florets-on-wooden-board-36895573/)                             | 800 × 533   |     29,960 |
| `caesar.webp`            | Anhelina Vasylyk    | [Photo 34337578](https://www.pexels.com/photo/close-up-of-classic-caesar-salad-with-croutons-34337578/)                         | 533 × 800   |     25,742 |
| `cheese.webp`            | Tabitha Mort        | [Photo 773253](https://www.pexels.com/photo/close-up-photography-of-cheese-773253/)                                             | 800 × 533   |     17,488 |
| `chicken-thigh.webp`     | SONIC               | [Photo 12381147](https://www.pexels.com/photo/fresh-chicken-breasts-on-frying-pan-12381147/)                                    | 534 × 800   |     32,700 |
| `chips.webp`             | Los Muertos Crew    | [Photo 7601338](https://www.pexels.com/photo/guacamole-and-chips-on-a-bowl-7601338/)                                            | 533 × 800   |     50,512 |
| `cinnamon-roll.webp`     | Carmen van Laar     | [Photo 31249261](https://www.pexels.com/photo/freshly-baked-cinnamon-rolls-on-tray-31249261/)                                   | 533 × 800   |     20,496 |
| `cleaning.webp`          | Jonathan Borba      | [Photo 28576626](https://www.pexels.com/photo/minimalist-cleaning-supplies-on-grey-background-28576626/)                        | 800 × 533   |     12,474 |
| `coffee.webp`            | Roman Bengaiev      | [Photo 17307344](https://www.pexels.com/photo/cup-with-coffee-17307344/)                                                        | 800 × 533   |     46,900 |
| `cola.webp`              | Ron Lach            | [Photo 8879626](https://www.pexels.com/photo/a-cola-on-a-drinking-glass-with-ice-cubes-8879626/)                                | 533 × 800   |     30,128 |
| `corn.webp`              | Towfiqu barbhuiya   | [Photo 12408945](https://www.pexels.com/photo/yellow-corn-kernels-in-white-ceramic-bowl-12408945/)                              | 800 × 533   |     16,456 |
| `croissant.webp`         | Natalia Olivera     | [Photo 30632257](https://www.pexels.com/photo/close-up-of-freshly-baked-croissants-on-wooden-board-30632257/)                   | 534 × 800   |     26,148 |
| `dumplings.webp`         | Polina Tankilevitch | [Photo 8601580](https://www.pexels.com/photo/cooked-pelmeni-in-a-plate-8601580/)                                                | 533 × 800   |     16,664 |
| `eclair.webp`            | Shameel mukkath     | [Photo 5112591](https://www.pexels.com/photo/close-up-shot-of-a-croissant-5112591/)                                             | 533 × 800   |     23,850 |
| `eggs.webp`              | Klaus Nielsen       | [Photo 6294263](https://www.pexels.com/photo/box-of-healthy-organic-chicken-eggs-on-beige-surface-6294263/)                     | 565 × 800   |     21,726 |
| `fish.webp`              | Olga Lioncat        | [Photo 7244376](https://www.pexels.com/photo/uncooked-fish-fillet-with-spices-7244376/)                                         | 800 × 533   |     26,516 |
| `grocery-counter.webp`   | SHVETS production   | [Photo 8900041](https://www.pexels.com/photo/green-vegetable-on-brown-paper-bag-8900041/)                                       | 1400 × 933  |     36,596 |
| `honey-cake.webp`        | Sarah Films         | [Photo 15913166](https://www.pexels.com/photo/piece-of-medovik-cake-15913166/)                                                  | 582 × 800   |     34,428 |
| `khinkali.webp`          | Nadin Sh            | [Photo 17146254](https://www.pexels.com/photo/close-up-of-georgian-khinkali-17146254/)                                          | 600 × 800   |     18,278 |
| `kitchen-hands.webp`     | cottonbro studio    | [Photo 4057678](https://www.pexels.com/photo/food-hands-chef-kitchen-4057678/)                                                  | 933 × 1400  |    102,698 |
| `kyiv-chicken.webp`      | Shameel mukkath     | [Photo 10296276](https://www.pexels.com/photo/a-chicken-kiev-with-white-sauce-on-a-ceramic-plate-10296276/)                     | 800 × 533   |     42,344 |
| `laundry.webp` | Ron Lach | [Photo 10566522](https://www.pexels.com/photo/close-up-view-of-plastic-bottle-in-laundry-basket-10566522/) | 800 × 533 | 33,482 |
| `market-bag.webp`        | Sarah Chai          | [Photo 7262897](https://www.pexels.com/photo/crop-unrecognizable-woman-carrying-bag-with-organic-vegetables-in-garden-7262897/) | 1600 × 1067 |    102,262 |
| `milk.webp` | Josephine | [Photo 7429050](https://www.pexels.com/photo/a-glass-cup-with-milk-on-white-surface-7429050/) | 533 × 800 | 6,598 |
| `minced-meat.webp`       | Eva Bronzini        | [Photo 7225724](https://www.pexels.com/photo/close-up-photo-of-minced-meat-in-a-bowl-7225724/)                                  | 533 × 800   |     30,124 |
| `nuts.webp`              | Engin Akyurt        | [Photo 5472169](https://www.pexels.com/photo/flatlay-of-assorted-nuts-on-black-bowl-5472169/)                                   | 800 × 533   |     21,382 |
| `oil.webp`               | Valeria Boltneva    | [Photo 20184699](https://www.pexels.com/photo/bottle-of-olive-oil-20184699/)                                                    | 534 × 800   |     21,524 |
| `pasta.webp`             | ROMAN ODINTSOV      | [Photo 6588388](https://www.pexels.com/photo/homemade-pasta-sorts-on-wooden-board-6588388/)                                     | 480 × 640   |     62,524 |
| `peas.webp`              | R Khalil            | [Photo 768089](https://www.pexels.com/photo/green-peas-on-white-ceramic-bowl-768089/)                                           | 528 × 800   |     57,968 |
| `pizza.webp`             | Anhelina Vasylyk    | [Photo 33593122](https://www.pexels.com/photo/close-up-of-a-margherita-pizza-preparation-33593122/)                             | 533 × 800   |     44,176 |
| `pork.webp`              | Evgeniy Alekseyev   | [Photo 7333260](https://www.pexels.com/photo/a-spiced-raw-meat-on-a-wooden-chopping-board-7333260/)                             | 800 × 534   |     69,196 |
| `produce-basket.webp`    | Nataliya Vaitkevich | [Photo 5425893](https://www.pexels.com/photo/fresh-vegetables-on-a-woven-basket-5425893/)                                       | 1600 × 1067 |    135,952 |
| `raw-chicken.webp`       | alleksana           | [Photo 6107734](https://www.pexels.com/photo/close-up-photo-of-a-raw-chicken-meat-6107734/)                                     | 533 × 800   |     22,124 |
| `rice.webp`              | Waskyria Miranda    | [Photo 31555431](https://www.pexels.com/photo/close-up-of-white-rice-in-ceramic-bowl-31555431/)                                 | 800 × 533   |     11,118 |
| `rice-dish.webp`         | Satyam Verma        | [Photo 4439740](https://www.pexels.com/photo/appetizing-traditional-rice-pilaf-and-soups-on-table-4439740/)                     | 800 × 533   |     52,052 |
| `roast-chicken.webp`     | furkanfdemir        | [Photo 10821330](https://www.pexels.com/photo/close-up-shot-of-a-roasted-chicken-10821330/)                                     | 533 × 800   |     29,166 |
| `salad.webp`             | Nadin Sh            | [Photo 19295808](https://www.pexels.com/photo/greek-salad-in-a-bowl-19295808/)                                                  | 600 × 800   |     38,452 |
| `salad-preparation.webp` | Nicole Michalou     | [Photo 6061856](https://www.pexels.com/photo/person-mixing-a-vegetable-salad-in-a-bowl-6061856/)                                | 800 × 1200  |     35,684 |
| `sausages.webp`          | Markus Spiske       | [Photo 116726](https://www.pexels.com/photo/cooked-food-on-white-ceramic-plate-116726/)                                         | 533 × 800   |     12,492 |
| `shrimp.webp`            | Valeria Boltneva    | [Photo 21771247](https://www.pexels.com/photo/close-up-of-a-bowl-of-raw-shrimps-21771247/)                                      | 534 × 800   |     29,162 |
| `slippers.webp`          | KATRIN BOLOVTSOVA   | [Photo 6976412](https://www.pexels.com/photo/close-up-of-woman-legs-in-fluffy-home-slippers-6976412/)                           | 533 × 800   |     18,216 |
| `soup.webp`              | Helen Brudna        | [Photo 32795463](https://www.pexels.com/photo/delicious-vegetable-soup-in-rustic-setting-32795463/)                             | 600 × 800   |     55,630 |
| `sponges.webp`           | Jonathan Borba      | [Photo 28576640](https://www.pexels.com/photo/hands-cleaning-with-sponge-and-spray-bottle-28576640/)                            | 800 × 533   |     30,310 |
| `tea.webp`               | Emeric Laperriere   | [Photo 4563760](https://www.pexels.com/photo/hot-tea-pouring-into-glass-cup-4563760/)                                           | 640 × 800   |     40,736 |
| `tomato-sauce.webp`      | Valentina Sergi     | [Photo 36546509](https://www.pexels.com/photo/homemade-tomato-sauce-canning-process-36546509/)                                  | 534 × 800   |     27,848 |
| `varenyky.webp`          | kaboompics.com      | [Photo 4084933](https://www.pexels.com/photo/freshly-made-pierogi-4084933/)                                                     | 533 × 800   |     44,636 |
| `vegetables.webp`        | IARA MELO           | [Photo 30635690](https://www.pexels.com/photo/colorful-vegetable-medley-in-white-bowl-30635690/)                                | 800 × 514   |     67,368 |
| `water.webp` | Bogdan Giurca | [Photo 22431052](https://www.pexels.com/photo/pouring-water-in-glass-22431052/) | 689 × 800 | 29,510 |
| `white-pump.webp`        | Mikhail Nilov       | [Photo 7814990](https://www.pexels.com/photo/white-cosmetic-plastic-pump-bottle-with-beige-background-7814990/)                 | 534 × 800   |      9,836 |
| `wine.webp`              | Nicole Queiroz      | [Photo 10772487](https://www.pexels.com/photo/a-bottle-and-glass-of-red-wine-on-a-table-10772487/)                              | 533 × 800   |     18,674 |
| `category-drinks.webp` | Lukas Blazek | [Photo 298720](https://www.pexels.com/photo/lemon-juice-in-cup-298720/) | 800 × 530 | 19,830 |
| `category-dairy.webp` | RDNE Stock project | [Photo 8963368](https://www.pexels.com/photo/close-up-shot-of-a-glass-of-milk-beside-two-eggs-8963368/) | 800 × 610 | 9,048 |

The machine-readable source list includes the original Pexels photo ID and a documented preferred download width. Delivery and careers photos show anonymous hands or cropped people as lifestyle context; they are not employee portraits.
