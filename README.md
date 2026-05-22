# Simulador ICFES — Sección 2

Versión actualizada con banco de datos incorporado hasta **Inglés 134**.

## Actualización realizada
- Se solicita **nombre y apellido completo**, **grupo** y **correo electrónico del estudiante** antes de ingresar al simulador.
- Los datos del estudiante aparecen en la pantalla inicial, en la página de resultados y en el **informe PDF final**.
- Al finalizar la prueba, el sistema muestra un informe con resumen general, resultado por área y revisión detallada por pregunta.
- Se eliminaron las descargas de resultados en CSV y TXT.
- La descarga de resultados queda disponible únicamente como **informe PDF**.
- La app queda preparada para el **envío automático del informe PDF por correo** al estudiante y a `pruebas@iemanueljbetancur.edu.co` mediante Google Apps Script.
- Al seleccionar una respuesta, la pantalla permanece en la misma zona; no avanza automáticamente.
- La navegación entre preguntas se realiza únicamente con Anterior, Siguiente o el panel numérico.
- Los botones de navegación dicen “Anterior” y “Siguiente”.
- Al cambiar de pregunta, la vista se ubica al inicio del contenido de la página.
- Se mantienen las preguntas previamente disponibles de la Sección 2.
- Se conserva la tanda de Inglés 108 a 114: comprensión de lectura “I’ll Be a Nurse”.
- Se conserva la tanda de Inglés 115 a 119: Parte 6.A, texto sobre el valor de “doing nothing”.
- Se conserva la tanda de Inglés 120 a 124: Parte 6.B, texto sobre gimnasia y desarrollo personal.
- Se agregan las preguntas **125 a 134** de Inglés, Parte 7, texto cloze sobre **Jamaica Kincaid**.
- Respuestas integradas: 125 B, 126 B, 127 A, 128 D, 129 B, 130 C, 131 D, 132 A, 133 B, 134 D.

## Uso en GitHub Pages
1. Suba todos los archivos a un repositorio.
2. Active GitHub Pages desde la rama principal.
3. Abra `index.html`.

Incluye `.nojekyll` para publicación directa e incrustación en Google Sites.

## Envío automático por correo

La carpeta `google-apps-script/` contiene el backend necesario para enviar el informe PDF por correo y guardar los resultados en Google Sheets. Consulta el archivo `ACTIVAR_ENVIO_AUTOMATICO.md` para desplegarlo y pegar la URL `/exec` en `app.js`.
