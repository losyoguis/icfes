# Simulador ICFES Saber 11°

Proyecto en HTML, CSS y JavaScript puro, rediseñado con experiencia responsive tipo aplicación móvil.

## Estructura configurada

### Sección 1 - Primera sesión

| Bloque | Preguntas | Área |
|---|---:|---|
| 1 | 1 a 25 | Matemáticas |
| 2 | 26 a 66 | Lectura Crítica |
| 3 | 67 a 91 | Sociales y Ciudadanas |
| 4 | 92 a 120 | Ciencias Naturales |

Duración: 4 horas y 30 minutos. Total académico configurado: 120 preguntas.

### Sección 2 - Segunda sesión

| Bloque | Preguntas | Área |
|---|---:|---|
| 1 | 1 a 28 | Sociales y Ciudadanas |
| 2 | 29 a 50 | Matemáticas |
| 3 | 51 a 79 | Ciencias Naturales |
| 4 | 80 a 134 | Inglés |

Duración: 4 horas y 30 minutos. Total académico configurado: 134 preguntas.

## Cambios de esta versión

- Se retiró el bloque de cuestionario socioeconómico de la Sección 1.
- Se retiró el bloque pendiente por clasificar de la Sección 2.
- Se eliminaron los botones de “Ver estructura”.
- Se rediseñó la interfaz responsive para móviles: tarjetas, botones táctiles, tablas convertidas en tarjetas, encabezado tipo app, mejor navegación y estética visual renovada.

## Sección TIPS

El inicio del simulador incluye una sección llamada **TIPS**, con la estructura académica de las dos sesiones y los tipos de preguntas identificadas por área: Matemáticas, Lectura Crítica, Sociales y Ciudadanas, Ciencias Naturales e Inglés.

## Preguntas cargadas

- Sección 1 - Matemáticas - Preguntas 1 a 25.
- Sección 1 - Lectura Crítica - Preguntas 26 a 66.
- Sección 1 - Sociales y Ciudadanas - Preguntas 67 a 91.

## Cómo probar

1. Descomprimir el archivo ZIP.
2. Abrir `index.html` en Google Chrome, Edge, Firefox o Safari.
3. Elegir la sesión o el bloque.
4. Responder las preguntas cargadas.

## Archivos principales

- `index.html`: estructura principal.
- `styles.css`: diseño visual responsive.
- `app.js`: lógica del simulador.
- `data/question-bank.js`: banco interno de preguntas.

## Actualización para Google Sites

Esta versión evita depender de ventanas nativas `confirm()` para las acciones críticas. Los botones **Inicio** y **Finalizar intento** usan una confirmación interna del simulador, por lo que funcionan correctamente al alojar el proyecto en GitHub Pages e incrustarlo como iframe en Google Sites.
