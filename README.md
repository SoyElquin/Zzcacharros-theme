# Zzcacharros — Shopify Theme

Tema Liquid oficial de **Zzcacharros**, listo para conectarse a Shopify vía GitHub.

- Paleta: azul `#1D3F8C`, rojo `#E30613`, amarillo `#FFD200`.
- Tipografías: Bebas Neue (display) + Inter (body), cargadas de Google Fonts.
- Estructura Shopify OS 2.0 (sections + JSON templates).

## Estructura

```
layout/       theme.liquid, password.liquid
templates/    index.json, product.json, collection.json, cart.json, page.json,
              search.json, 404.json, password.json, list-collections.json,
              blog.liquid, article.liquid, customers/*.liquid
sections/     header, footer, announcement-bar, image-banner, collection-list,
              featured-collection, rich-text, main-product, main-collection-product-grid,
              main-cart, main-page, main-search, main-list-collections, main-404,
              main-password, header-group.json, footer-group.json
snippets/     product-card.liquid
assets/       base.css, theme.js, logo-zz.png, hero-zz.jpg, favicon.ico
config/       settings_schema.json, settings_data.json
locales/      es.default.json, en.json
```

Ver `SHOPIFY-INTEGRATION.md` para el flujo completo GitHub ↔ Shopify.