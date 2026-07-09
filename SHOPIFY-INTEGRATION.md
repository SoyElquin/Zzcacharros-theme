# Integración GitHub ↔ Shopify — Guía completa

Esta guía te lleva de **cero a tener tu tema Zzcacharros publicado en tu Shopify**, gestionado 100% desde GitHub, sin depender más de Lovable.

---

## 0. Concepto (léelo una vez)

- **Shopify no ejecuta React/Vite/Next**. Los "themes" de Shopify se escriben en **Liquid** (plantillas) + HTML/CSS/JS estáticos. Este repo YA está en Liquid válido.
- **La app de Lovable (React + TanStack)** que tenías era una SPA — sirve como sitio headless, pero NO como tema de Shopify. Por eso empezamos un tema nuevo desde cero con tu branding.
- **GitHub ↔ Shopify** es una integración oficial nativa: apuntas Shopify a una rama de tu repo y Shopify lee/edita los archivos del tema directamente. No hay build ni CI/CD; Shopify sirve los archivos tal cual están en el repo.
- **Productos, colecciones, clientes, pedidos, pagos, envío, checkout** viven en el **admin de Shopify**, no en el código del tema. El tema solo los *muestra*.

---

## 1. Crear el repositorio en GitHub

El repo de Shopify **debe tener la estructura del tema en la RAÍZ** (no dentro de una subcarpeta).

```bash
# Desde tu equipo local
cd shopify-theme
git init
git add .
git commit -m "chore: initial Zzcacharros theme"
git branch -M main
# crea el repo en https://github.com/new (ejemplo: zzcacharros-theme)
git remote add origin git@github.com:TU-USUARIO/zzcacharros-theme.git
git push -u origin main
```

Verifica que en la raíz de tu repo de GitHub veas: `layout/`, `templates/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`. Si esas carpetas están DENTRO de otra carpeta, Shopify **no lo va a detectar como tema válido**.

---

## 2. Conectar Shopify a GitHub

1. Entra a tu admin de Shopify → **Online Store → Themes**.
2. Botón **Add theme → Connect from GitHub**.
3. Autoriza la app oficial *Shopify* en GitHub y dale acceso al repo `zzcacharros-theme`.
4. Elige la **rama** (`main`) y confirma.
5. Shopify escanea el repo. Si la estructura es correcta verás el tema **Zzcacharros** en la lista.
6. Haz clic en **Preview** para verlo antes de publicar. Cuando estés listo, **Actions → Publish**.

### Cómo funciona el sync (esto es clave)

- **GitHub → Shopify**: cualquier `git push` a la rama conectada se refleja en tu tema en Shopify en segundos.
- **Shopify → GitHub**: si editas en *Online Store → Customize* (colores, textos, secciones, orden de bloques) Shopify hace commits automáticos al repo con un mensaje tipo `Update by shopify`.
- Por eso: **NO edites `settings_data.json` a mano y a la vez desde Customize sin hacer pull antes**. Riesgo de conflicto.

### Flujo de trabajo recomendado

```
 Cambios de código (secciones, snippets, CSS)  → los haces en Git localmente y push.
 Cambios de contenido (textos, imágenes, orden)→ los hace el equipo en el Customizer de Shopify.
```

---

## 3. Configurar el catálogo (productos, colecciones)

El tema es un contenedor visual. El catálogo se carga en Shopify:

### 3.1 Productos

- **Products → Add product**. Rellena: título, descripción, imágenes, precio, precio comparativo (para mostrar "Oferta"), inventario, SKU, peso (para envíos), variantes (talla/color) y status = **Active**.
- Marca **Sales channels: Online Store** para que se muestren en el tema.
- Importar en masa: **Products → Import** con un CSV (formato oficial de Shopify).

### 3.2 Colecciones (= tus categorías)

El tema tiene sección **Collection list** en el home. Para que aparezcan tus categorías, crea colecciones que coincidan con las de tu ex-app:

| Handle sugerido | Título |
|---|---|
| `accesorios` | Accesorios |
| `belleza` | Belleza |
| `bolsos` | Bolsos |
| `cacharros` | Cacharros |
| `electrobelleza` | Electrobelleza |
| `gafas` | Gafas |
| `hogar` | Hogar |
| `infantil` | Infantil |
| `jugueteria` | Juguetería |
| `papeleria` | Papelería |
| `perfumeria` | Perfumería |
| `relojeria` | Relojería |
| `tecnologia` | Tecnología |
| `temporada` | Temporada |
| `termos` | Termos |

- **Products → Collections → Create collection**.
- Tipo **Smart** con condición p. ej. `Product tag equals belleza` → así al taggear productos se auto-clasifican.
- Sube una **Collection image** (será la portada de la tarjeta en el home). El tema hace fallback al logo si no hay imagen.

### 3.3 Menús de navegación

- **Online Store → Navigation**. Edita el menú `main-menu` con links a `/collections/all`, `/collections/hogar`, `/pages/como-comprar`, etc.
- El header del tema muestra sus links vía **Customize → Header → menú de bloques**. Puedes usar el linklist oficial `main-menu` cambiando el header por su versión con `linklist` si prefieres — pero por defecto los bloques del header ya funcionan sin depender del menú del admin.

### 3.4 Páginas estáticas (Cómo comprar, Contacto, Devoluciones, etc.)

- **Online Store → Pages → Add page**. Handles sugeridos: `como-comprar`, `contacto`, `devoluciones`, `envios`, `faq`, `mayoristas`, `terminos`.
- El tema tiene `templates/page.json` universal para todas.

---

## 4. Customizar (colores, logo, textos)

**Online Store → Themes → Zzcacharros → Customize**:

- **Theme settings → Colors**: cambia primary/accent/danger.
- **Header → Logo**: sube el logo oficial (o queda `logo-zz.png` del repo).
- **Announcement bar**: mensaje superior.
- **Image banner (Home)**: cambia hero, título, botón.
- **Collection list**: elige 4-24 colecciones para mostrar.
- **Featured collection**: elige la colección de destacados.
- **WhatsApp**: en **Theme settings → Contact** pon tu número con código país (ej. `573001234567`).

Cada cambio en Customizer genera un commit automático en tu repo → totalmente sincronizado.

---

## 5. Checkout, pagos, envíos

- El botón **Finalizar compra** del carrito lleva al checkout oficial de Shopify. No se toca el tema.
- **Settings → Payments**: activa medios de pago (Wompi, PayU, Mercado Pago para Colombia, o Shopify Payments donde esté).
- **Settings → Shipping and delivery**: define zonas, tarifas y contra entrega.
- **Settings → Taxes and duties**: activa IVA si aplica.

---

## 6. Dominio

- **Settings → Domains**. Puedes usar el dominio gratis `zzcacharros.myshopify.com`, comprar uno en Shopify, o **Connect existing domain** apuntando `A` a `23.227.38.65` y `CNAME www` a `shops.myshopify.com`.

---

## 7. Correr el tema localmente (opcional pero recomendado)

Instala **Shopify CLI** para previsualizar cambios sin tocar la tienda live:

```bash
npm install -g @shopify/cli @shopify/theme
cd shopify-theme
shopify theme dev --store TU-TIENDA.myshopify.com
```

Abre `http://127.0.0.1:9292`. Cada guardado recarga en caliente. Cuando termines: `git commit && git push` → Shopify lo toma automáticamente.

Para validar que no hay errores de Liquid:

```bash
shopify theme check
```

---

## 8. Desconectarte de Lovable

Ya puedes:

1. **Descargar/exportar** cualquier dato de Lovable Cloud si lo usabas (no hace falta, este tema no depende).
2. En Lovable: **Settings → Delete project** (o dejarlo archivado).
3. Tu única fuente de verdad ahora es el repo de GitHub `zzcacharros-theme` y tu admin de Shopify.

---

## 9. Problemas comunes y solución

| Síntoma | Causa | Solución |
|---|---|---|
| "This repository doesn't contain a valid theme" al conectar | Estructura dentro de subcarpeta | Mueve `layout/`, `templates/`, etc. a la raíz del repo. |
| Preview en blanco / secciones no aparecen | Falta `templates/index.json` o los `type` no coinciden con los archivos de `sections/` | Cada `"type": "xxx"` en el JSON debe existir como `sections/xxx.liquid`. |
| Header/footer no se muestran | Faltan `sections/header-group.json` y `footer-group.json` o la section no tiene `"enabled_on": { "groups": [...] }` | Ya incluidos en este tema. |
| Cambios de Git no aparecen en la tienda | Rama incorrecta conectada | Themes → tu tema → ⋯ → Edit connection → cambia rama. |
| Customizer sobreescribe tu código | Editaron en Customize sin pull previo | `git pull` antes de trabajar; considera abrir una rama `staging` para experimentar. |
| Imágenes de categorías rotas | La colección no tiene Collection image | Products → Collection → edit → sube imagen. |
| Precio dice "0" o "N/A" | Producto sin variante activa | Product → Variants → asegúrate que hay al menos una variante con precio > 0 y stock. |
| No sale el WhatsApp flotante | Falta número | Customize → Theme settings → Contact → WhatsApp number (sin `+`). |
| Fuentes se ven raras | Google Fonts bloqueado o falta preconnect | Ya está en `layout/theme.liquid`; verifica que tu CSP (si tienes app de seguridad) permita `fonts.googleapis.com` y `fonts.gstatic.com`. |
| `Liquid error: Section 'xxx' not found` | Renombraste una section sin actualizar el JSON | Actualiza el `type` en el template JSON correspondiente. |

---

## 10. Checklist final antes de publicar

- [ ] Repo en GitHub con estructura de tema en la RAÍZ.
- [ ] Tema conectado y visible en Online Store → Themes.
- [ ] Al menos 1 producto activo, con imagen y precio.
- [ ] Al menos 3-4 colecciones creadas con imagen.
- [ ] Menú `main-menu` configurado.
- [ ] Páginas legales creadas: Términos, Devoluciones, Envíos, FAQ.
- [ ] Método de pago activado.
- [ ] Zonas de envío definidas.
- [ ] Logo y colores confirmados en Customize.
- [ ] Número de WhatsApp definido.
- [ ] Dominio conectado.
- [ ] `shopify theme check` sin errores.
- [ ] **Publish theme.**

---

¡Listo! Tu tienda ya no depende de Lovable — GitHub es la fuente de código, Shopify es la fuente de datos y del checkout.