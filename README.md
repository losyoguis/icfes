# Simulador ICFES Saber 11°

Proyecto en HTML, CSS y JavaScript puro.

## Estructura configurada

### Sección 1 - Primera sesión

| Bloque | Preguntas | Área |
|---|---:|---|
| 1 | 1 a 25 | Matemáticas |
| 2 | 26 a 66 | Lectura Crítica |
| 3 | 67 a 91 | Sociales y Ciudadanas |
| 4 | 92 a 120 | Ciencias Naturales |
| 5 | 121 a 131 | Cuestionario socioeconómico |

Duración: 4 horas y 30 minutos. Total: 131 preguntas.

### Sección 2 - Segunda sesión

| Bloque | Preguntas | Área |
|---|---:|---|
| 1 | 1 a 28 | Sociales y Ciudadanas |
| 2 | 29 a 50 | Matemáticas |
| 3 | 51 a 79 | Ciencias Naturales |
| 4 | 80 a 134 | Inglés |
| 5 | 135 a 147 | Pendiente por clasificar |

Duración: 4 horas y 30 minutos. Total: 147 preguntas.

## Sección TIPS

El inicio del simulador incluye una sección llamada **TIPS**, con la estructura de las dos sesiones y los tipos de preguntas identificadas por área: Matemáticas, Lectura Crítica, Sociales y Ciudadanas, Ciencias Naturales e Inglés.

## Preguntas cargadas

- Sección 1 - Matemáticas - Preguntas 1 a 25.
- Sección 1 - Lectura Crítica - Preguntas 26 a 66.

## Cómo agregar más preguntas

Abrir el archivo:

```text
data/question-bank.js
```

Agregar cada pregunta nueva dentro del arreglo `QUESTION_BANK` como objeto JavaScript.

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
- `assets/img/`: carpeta reservada para imágenes de futuras preguntas.
