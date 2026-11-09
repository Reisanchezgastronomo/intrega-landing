# Rei Sánchez | Dirección Ejecutiva — adaptación comercial MVP 1.0

**Estado:** borrador en rama independiente, sin publicar. Este repositorio es una bifurcación de `adriaavila/intrega-landing`, proyecto desarrollado por Adrià Ávila / creativ3. La adaptación mantiene esta atribución y no modifica el proyecto original.

## Objetivo
Landing ejecutiva mínima para generar confianza cuando propietarios o gerentes generales revisen el perfil después de un primer contacto comercial.

**Marca:** Dirección Ejecutiva · Transformación · Autonomía  
**Principio:** Simplificar para transformar.

## Alcance de la primera revisión
- Identidad ejecutiva y propuesta de valor.
- Tres modalidades de dirección: Fraccionada, Intensiva y Tiempo Completo.
- Tres sectores: producción/panadería, restaurantes/cafeterías multisede, catering/foodservice.
- Trayectoria sin atribuir métricas no respaldadas.
- Contacto mediante enlaces directos a correo, WhatsApp Colombia y LinkedIn.
- Eliminación del formulario anterior que solo registraba datos en consola.
- Supresión de navegación activa a páginas antiguas de Integra.
- Reducción de peso de la portada al no utilizar el escáner animado de fotogramas.
- Metadatos de identidad actualizados. Indexación desactivada hasta aprobación y publicación.

## No incluido
No hay backend, CRM, formularios de almacenamiento ni automatizaciones. Los enlaces `mailto:` y WhatsApp abren aplicaciones externas y necesitan una prueba manual antes de publicar. No se garantizan resultados empresariales.

## Revisión previa a publicar
1. Revisar textos, casos citados y aprobación de identidad por el propietario.
2. Ejecutar `npm install`, `npm run lint`, `npm run build`.
3. Verificar funcionamiento real de los enlaces y navegación móvil.
4. Comprobar políticas de privacidad y condiciones del alojamiento elegido.
5. Sustituir robots `noindex` solo tras fijar dominio definitivo y aprobación.

## Desarrollo local
```bash
npm install
npm run dev
```

**Tecnología heredada:** Next.js, React, TypeScript y Tailwind CSS.  
**Autor del proyecto de origen:** Adrià Ávila / creativ3.

## Fotografía ejecutiva
- Imagen autorizada por el propietario: `public/rei-sanchez-retrato.webp` (480 × 527 píxeles, WebP optimizado desde la fotografía suministrada).
- Ubicada exclusivamente en «Quién dirige»; no se usa en el hero principal.
- No se han realizado modificaciones artísticas ni alteraciones de rasgos.

## Publicación Netlify
- Hospedaje propuesto: Netlify Free, sin contratar un plan de pago.
- Conectar GitHub al panel de Netlify y elegir este repositorio, rama `main`.
- Framework Next.js; comando `npm run build`; salida `.next`.
- Confirmar que el sitio sea público y verificar la dirección `*.netlify.app`.
- No utilizar GitHub Pages como alojamiento de esta landing comercial.
