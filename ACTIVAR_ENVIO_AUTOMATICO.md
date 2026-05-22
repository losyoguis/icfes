# Activar envío automático y análisis institucional

La app está preparada para enviar automáticamente el informe PDF al estudiante y a:

`pruebas@iemanueljbetancur.edu.co`

Además, el backend genera una base de resultados en Google Sheets y un informe general tipo ICFES para la **Institución Educativa Manuel J. Betancur**.

## Paso a paso

1. Entra a https://script.google.com/
2. Crea un proyecto nuevo.
3. Copia el contenido del archivo:

   `google-apps-script/Code.gs`

4. Pégalo en el archivo `Code.gs` del proyecto de Apps Script.
5. Haz clic en **Implementar > Nueva implementación**.
6. Selecciona el tipo **Aplicación web**.
7. Configura:
   - **Ejecutar como:** Tú.
   - **Quién tiene acceso:** Cualquier usuario.
8. Autoriza los permisos solicitados.
9. Copia la URL que termina en `/exec`.
10. En esta versión el archivo `app.js` ya quedó configurado con la URL `/exec` suministrada:

```js
const REPORT_EMAIL_ENDPOINT = "https://script.google.com/a/macros/iemanueljbetancur.edu.co/s/AKfycbwCl5fXOLLDA6fKjk1S-eeLIfuYKa0WoTO6IT1E-di8De-DztCX7TQxtIKkv9SK_S8/exec";
```

11. Guarda los cambios y vuelve a subir la app a GitHub Pages.

## Funcionamiento automático

Al finalizar el intento, el sistema:

- Genera el PDF individual con gráficos.
- Envía el PDF al correo del estudiante.
- Envía copia automática a `pruebas@iemanueljbetancur.edu.co`.
- Guarda el resultado en Google Sheets.
- Actualiza las hojas de análisis:
  - `Resultados`
  - `Respuestas_Detalladas`
  - `Analisis_Estudiantes`
  - `Analisis_Grupos`
  - `Analisis_Areas`
  - `Informe_Institucional`

## Informe general institucional

Para actualizarlo manualmente desde Apps Script, ejecuta la función:

```js
generarInformeInstitucional()
```

También puedes abrir la URL `/exec` del Web App en el navegador. Allí aparecerá un enlace para actualizar y ver el análisis institucional.

El informe institucional incluye:

- Promedio general institucional.
- Distribución por niveles internos.
- Comparativo por grupo: 11-1, 11-2 y 11-3.
- Resultado por área evaluada.
- Áreas fortaleza.
- Áreas prioritarias de mejoramiento.
- Recomendaciones pedagógicas para la institución.

> Nota: Este análisis es una escala interna de seguimiento pedagógico. No reemplaza el reporte oficial del ICFES.

## Corrección incluida en esta versión

Esta versión corrige el error:

```txt
TypeError: sheet.clearCharts is not a function
```

La limpieza de gráficos ahora se hace con `getCharts()` y `removeChart()`, que son compatibles con Google Apps Script.

Si ya tenías el backend desplegado, copia de nuevo todo el contenido de `google-apps-script/Code.gs`, pégalo en tu proyecto de Apps Script y crea una nueva implementación o actualiza la implementación existente.


## Corrección incluida en esta versión: envío de correo

Esta versión corrige el problema en el que la página mostraba que la solicitud de envío se había realizado, pero el correo no llegaba.

Cambios realizados:

- La app ahora envía el informe al Web App como `application/x-www-form-urlencoded` usando el campo `payload`, que Google Apps Script recibe de forma más estable.
- El backend también acepta JSON directo y formulario codificado como respaldo.
- Si ejecutas manualmente `doPost` desde Apps Script, ya no aparecerá el error `No se recibieron datos del informe`; esa función solo recibe datos reales cuando la llama la app.
- Se agregó la función `probarEnvioConDatosDePrueba()` para autorizar permisos y verificar el envío real de correo.

## Prueba recomendada después de pegar el nuevo Code.gs

1. En Apps Script, pega de nuevo todo el contenido de `google-apps-script/Code.gs`.
2. Guarda el proyecto.
3. En el selector de funciones, elige:

```js
probarEnvioConDatosDePrueba
```

4. Haz clic en **Ejecutar**.
5. Autoriza los permisos solicitados.
6. Verifica que llegue un correo de prueba a `pruebas@iemanueljbetancur.edu.co`.
7. Luego ve a **Implementar > Administrar implementaciones > Editar > Nueva versión > Implementar**.
8. Prueba nuevamente desde la app del simulador.

Importante: no pruebes el envío ejecutando manualmente `doPost`, porque `doPost` necesita recibir datos desde la app. Para pruebas manuales usa `probarEnvioConDatosDePrueba()`.
