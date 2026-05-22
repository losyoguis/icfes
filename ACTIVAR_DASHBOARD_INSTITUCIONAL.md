# Activación del Dashboard Institucional ICFES - Manuel J. Betancur

Esta versión queda conectada al Google Sheets oficial compartido:

https://docs.google.com/spreadsheets/d/17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs/edit

## Problema corregido

El dashboard no cargaba porque el Apps Script estaba intentando abrir un ID de hoja incorrecto o una hoja diferente. El ID correcto es:

```text
17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs
```

En esta versión el ID quedó fijo dentro de `google-apps-script/Code.gs` mediante la constante:

```javascript
const SPREADSHEET_ID_OFICIAL = '17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs';
```

Además, el `dashboard.html` tiene lectura de respaldo directamente desde Google Sheets si Apps Script tarda o no responde.

## Pasos de actualización

1. Descomprime este ZIP.
2. Entra a Google Apps Script.
3. Abre `Code.gs`.
4. Borra todo el código anterior.
5. Copia y pega el contenido nuevo de `google-apps-script/Code.gs`.
6. Guarda.
7. Ejecuta en este orden:

```javascript
configurarConexionOficialMJB
inicializarSistema
probarConexionDashboardMJB
probarRegistroDashboard
```

8. Verifica que en el Google Sheets aparezcan o se conserven estas hojas:

- Resultados
- Respuestas_Detalladas
- Registro_Envios
- Analisis_Estudiantes
- Analisis_Grupos
- Analisis_Areas
- Informe_Institucional

9. Actualiza la implementación del Web App:

**Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**

10. Abre el simulador y el dashboard. En el navegador usa:

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

para evitar caché vieja.

## Pruebas rápidas

Desde Apps Script, ejecuta:

```javascript
probarConexionDashboardMJB
```

Debe devolver el ID del Sheets oficial y el número de intentos registrados.

También puedes abrir el endpoint en el navegador con:

```text
/exec?accion=ping
```

Debe mostrar que el backend está conectado a Google Sheets.

## Nueva opción: borrar datos del Google Sheets

Esta versión agrega un botón en `dashboard.html` llamado:

```text
Borrar datos Sheets
```

El botón permite limpiar los registros del Google Sheets institucional sin borrar las hojas ni sus encabezados. También deja el dashboard listo para recibir nuevos resultados.

La acción limpia estas hojas:

- Resultados
- Respuestas_Detalladas
- Registro_Envios
- Analisis_Estudiantes
- Analisis_Grupos
- Analisis_Areas
- Informe_Institucional

No se eliminan los PDF guardados en Drive.

Para usar el botón se debe confirmar escribiendo:

```text
BORRAR DATOS
```

y luego escribir la clave institucional predeterminada:

```text
MJB-ICFES-2026
```

Si deseas cambiar esa clave, ejecuta desde Apps Script:

```javascript
configurarClaveBorradoDatos("NuevaClaveSegura2026")
```

También puedes borrar los datos directamente desde Apps Script ejecutando:

```javascript
borrarDatosDelSheets
```

## Corrección importante de registro en Sheets

Esta versión registra primero un resultado liviano en Google Sheets, antes de procesar el PDF. Esto permite que la hoja `Resultados` y el dashboard se actualicen aunque el envío del PDF tarde o falle.

Después de pegar el nuevo `Code.gs`, ejecuta estas funciones en Apps Script:

1. `configurarConexionOficialMJB`
2. `inicializarSistema`
3. `probarRegistroLivianoDesdeApp`
4. `probarConexionDashboardMJB`

Luego actualiza la implementación:

**Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**

La URL pública recomendada para la app es la versión sin `/a/macros/`:

```text
https://script.google.com/macros/s/AKfycbwCl5fXOLLDA6fKjk1S-eeLIfuYKa0WoTO6IT1E-di8De-DztCX7TQxtIKkv9SK_S8/exec
```

La versión con `/a/macros/iemanueljbetancur.edu.co/` queda como respaldo, pero puede exigir inicio de sesión del dominio y bloquear el envío desde algunos navegadores de estudiantes.

## Corrección v7: registro real en Google Sheets

Esta versión corrige el problema en el que el dashboard podía mostrar solo registros de prueba.

Cambios técnicos importantes:

1. El registro principal del simulacro ahora se envía por JSONP confirmado al endpoint de Apps Script.
2. El primer envío es liviano y estable: guarda nombre, grupo, correo, puntaje, áreas y resumen general.
3. El detalle por pregunta se envía después en lotes pequeños para evitar que el navegador bloquee el envío por tamaño.
4. El PDF y los correos se procesan después de registrar los datos, de modo que el dashboard no depende del peso del PDF.
5. El dashboard oculta automáticamente los registros de prueba generados por funciones como `probarRegistroDashboard` o `probarRegistroLivianoDesdeApp`.

### Para limpiar registros de prueba ya creados

En Apps Script puedes ejecutar manualmente:

```javascript
borrarDatosDePruebaSistema
```

O, si deseas iniciar totalmente limpio desde la página del dashboard, usa el botón:

**Borrar datos Sheets**

Clave predeterminada:

```text
MJB-ICFES-2026
```

### Pasos obligatorios después de reemplazar Code.gs

1. Pega el nuevo `Code.gs` completo.
2. Guarda el proyecto.
3. Ejecuta `configurarConexionOficialMJB`.
4. Ejecuta `inicializarSistema`.
5. Actualiza la implementación: **Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**.
6. En GitHub Pages, sube también los nuevos `app.js` y `dashboard.js`.
7. Abre la app y presiona `Cmd + Shift + R` en Mac o `Ctrl + Shift + R` en Windows para limpiar caché.

