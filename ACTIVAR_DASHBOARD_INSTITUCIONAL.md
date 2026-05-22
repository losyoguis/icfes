# Activar dashboard institucional - I.E. Manuel J. Betancur

Esta versión incluye una nueva página:

```text
dashboard.html
```

El dashboard permite analizar los resultados del Simulador ICFES Saber 11 por:

- Resultado global institucional.
- Grupo: 11-1, 11-2 y 11-3.
- Estudiante individual.
- Área evaluada.
- Preguntas con mayor porcentaje de error.
- Distribución por niveles internos de desempeño.
- Recomendaciones pedagógicas automáticas tipo ICFES.

## 1. Actualizar Apps Script

1. Abre tu proyecto de Google Apps Script.
2. Abre el archivo `Code.gs`.
3. Borra el código anterior.
4. Copia y pega el nuevo `Code.gs` incluido en la carpeta:

```text
google-apps-script/Code.gs
```

5. Guarda los cambios.

## 2. Crear nueva versión de la implementación

Cada vez que reemplaces el código de Apps Script debes actualizar la implementación:

1. Clic en **Implementar**.
2. Clic en **Administrar implementaciones**.
3. Clic en el lápiz de edición.
4. En versión, selecciona **Nueva versión**.
5. Clic en **Implementar**.
6. Copia la URL que termina en `/exec`.

## 3. Verificar el exec

Esta versión ya trae configurado el exec entregado:

```text
https://script.google.com/a/macros/iemanueljbetancur.edu.co/s/AKfycbwCl5fXOLLDA6fKjk1S-eeLIfuYKa0WoTO6IT1E-di8De-DztCX7TQxtIKkv9SK_S8/exec
```

Si Google te genera una URL nueva, debes cambiarla en estos dos archivos:

```text
app.js
dashboard.js
```

Busca las constantes:

```javascript
REPORT_EMAIL_ENDPOINT
DASHBOARD_ENDPOINT
```

Y reemplaza el enlace anterior por el nuevo `/exec`.

## 4. Subir los archivos actualizados a GitHub Pages

Sube todos los archivos del ZIP al repositorio del simulador, incluyendo:

```text
index.html
app.js
styles.css
dashboard.html
dashboard.js
data/question-bank.js
google-apps-script/Code.gs
```

## 5. Limpiar caché

Después de publicar en GitHub Pages, abre la app y presiona:

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

## 6. Abrir el dashboard

Desde la app principal aparecerá el botón:

```text
Dashboard institucional
```

También se puede abrir directamente con:

```text
dashboard.html
```

## 7. Exportar a PDF

En el dashboard, usa el botón:

```text
Exportar PDF
```

Esto abre la ventana de impresión del navegador. Selecciona **Guardar como PDF**.

## Nota de privacidad

El dashboard contiene nombres, correos y resultados de estudiantes. Se recomienda que el Web App de Apps Script esté desplegado con permisos institucionales adecuados y que el enlace del dashboard sea compartido solo con docentes o directivos autorizados.
