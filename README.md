# Simulador ICFES Saber 11 - Institución Educativa Manuel J. Betancur

Versión actualizada con banco de preguntas incorporado hasta **Inglés 134** y sistema de informes institucionales.

## Actualización realizada

- Se integró el nombre institucional **Institución Educativa Manuel J. Betancur** en la app, en la página de resultados y en el PDF.
- Se conserva el ingreso con **nombre y apellido completo**, **grupo** y **correo electrónico del estudiante**.
- Se conserva la descarga del **informe PDF individual** con gráficos.
- Se conserva el envío automático del informe al estudiante y a `pruebas@iemanueljbetancur.edu.co` mediante Google Apps Script.
- El backend de Google Apps Script ahora guarda los datos en Google Sheets y genera análisis automático:
  - **Resultados** generales.
  - **Respuestas_Detalladas** por pregunta.
  - **Analisis_Estudiantes**.
  - **Analisis_Grupos**.
  - **Analisis_Areas**.
  - **Informe_Institucional** tipo ICFES interno con gráficos y recomendaciones pedagógicas.
- Al finalizar cada intento, Google Sheets se actualiza automáticamente.
- Se mantiene el botón **Tips** y el botón **Instrucciones**.
- Se mantiene el botón **Descargar informe PDF** y el botón **Enviar informe PDF**.
- Al seleccionar una respuesta, la pantalla permanece en la misma zona; no avanza automáticamente.
- La navegación entre preguntas se realiza únicamente con **Anterior**, **Siguiente** o el panel numérico.

## Uso en GitHub Pages

1. Sube todos los archivos a un repositorio.
2. Activa GitHub Pages desde la rama principal.
3. Abre `index.html`.

Incluye `.nojekyll` para publicación directa e incrustación en Google Sites.

## Envío y análisis institucional con Google Sheets

La carpeta `google-apps-script/` contiene el backend necesario para:

- Enviar el informe PDF individual.
- Guardar los resultados en Google Sheets.
- Analizar resultados por estudiante.
- Analizar resultados por grupo.
- Analizar resultados por área.
- Generar un informe general institucional tipo ICFES para la **Institución Educativa Manuel J. Betancur**.

Consulta `ACTIVAR_ENVIO_AUTOMATICO.md`. En esta versión la URL `/exec` ya quedó configurada en `app.js`.


### Mejora de entrega al estudiante

El estudiante recibe un correo liviano con enlace al PDF guardado en Drive. La copia institucional llega a `pruebas@iemanueljbetancur.edu.co` con el PDF adjunto. El estado técnico se registra en la hoja `Registro_Envios`.

### Corrección v5 de correo al estudiante

Se corrigió la prueba manual de Apps Script para que no requiera parámetros. Además, el envío al estudiante ahora se realiza con una estrategia reforzada: mensaje principal por `GmailApp` y mensaje de respaldo en texto plano por `MailApp`. El estado técnico queda registrado en la hoja `Registro_Envios`.
