# Activar envío automático de informes por correo

La app ya está preparada para enviar automáticamente el informe PDF al estudiante y a:

`pruebas@iemanueljbetancur.edu.co`

Para activar el envío real debes desplegar el backend de Google Apps Script.

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
10. Abre el archivo `app.js` y pega esa URL en esta línea:

```js
const REPORT_EMAIL_ENDPOINT = "PEGA_AQUI_LA_URL_EXEC";
```

11. Guarda los cambios y vuelve a subir la app a GitHub Pages.

## Funcionamiento

Al finalizar el intento, el sistema:

- Genera el PDF del informe con gráficos.
- Envía el PDF al correo del estudiante.
- Envía copia automática a `pruebas@iemanueljbetancur.edu.co`.
- Guarda el resultado en una hoja de cálculo de Google Sheets creada automáticamente en el Drive del propietario del Apps Script.

El botón **Enviar informe PDF** permite reenviar el informe si es necesario.
