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
