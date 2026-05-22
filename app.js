const EXAM_STRUCTURE = [
  {
    id: 1,
    label: "Sección 1",
    title: "Primera sesión",
    durationMinutes: 270,
    totalQuestions: 120,
    description: "Primera sesión del simulacro, organizada en Matemáticas, Lectura Crítica, Sociales y Ciudadanas y Ciencias Naturales.",
    blocks: [
      { block: 1, from: 1, to: 25, area: "Matemáticas", scored: true },
      { block: 2, from: 26, to: 66, area: "Lectura Crítica", scored: true },
      { block: 3, from: 67, to: 91, area: "Sociales y Ciudadanas", scored: true },
      { block: 4, from: 92, to: 120, area: "Ciencias Naturales", scored: true }
    ]
  },
  {
    id: 2,
    label: "Sección 2",
    title: "Segunda sesión",
    durationMinutes: 270,
    totalQuestions: 134,
    description: "Segunda sesión del simulacro, organizada en Sociales y Ciudadanas, Matemáticas, Ciencias Naturales e Inglés.",
    blocks: [
      { block: 1, from: 1, to: 28, area: "Sociales y Ciudadanas", scored: true },
      { block: 2, from: 29, to: 50, area: "Matemáticas", scored: true },
      { block: 3, from: 51, to: 79, area: "Ciencias Naturales", scored: true },
      { block: 4, from: 80, to: 134, area: "Inglés", scored: true }
    ]
  }
];

const STORAGE_KEY = "simulador_icfes_saber11_estado_v2";
const HISTORY_KEY = "simulador_icfes_saber11_historial_v2";
const STUDENT_KEY = "simulador_icfes_saber11_estudiante_v2";

// Envío automático de informes por correo.
// 1. Copia el código de google-apps-script/Code.gs en Apps Script.
// 2. Despliégalo como aplicación web.
// 3. Pega aquí la URL terminada en /exec para activar el envío automático real.
const REPORT_EMAIL_ENDPOINT = "https://script.google.com/a/macros/iemanueljbetancur.edu.co/s/AKfycbwCl5fXOLLDA6fKjk1S-eeLIfuYKa0WoTO6IT1E-di8De-DztCX7TQxtIKkv9SK_S8/exec";
const REPORT_INSTITUTION_EMAIL = "pruebas@iemanueljbetancur.edu.co";
const REPORT_MJB_FORM_URL = "https://docs.google.com/forms/d/1Q-jAP50dzVLYEmuhgEi3TO6eDNFHCoid3lLoo8tY91E/preview";
const INSTITUTION_NAME = "Institución Educativa Manuel J. Betancur";
const INSTITUTION_SHORT_NAME = "I.E. Manuel J. Betancur";
const REPORT_AUTOSEND_ON_FINISH = true;
const REPORT_APP_VERSION = "ICFES-S2-1-134-dashboard-institucional-mjb-v5-cerrar-sesion";

const app = document.getElementById("app");
const homeBtn = document.getElementById("homeBtn");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");
const tipsBtn = document.getElementById("tipsBtn");
const instructionsBtn = document.getElementById("instructionsBtn");

let timerInterval = null;
let state = {
  screen: "home",
  mode: "simulacro",
  sessionId: null,
  scope: null,
  navNumbers: [],
  availableNumbers: [],
  currentNumber: null,
  answers: {},
  marked: {},
  startedAt: null,
  finishedAt: null,
  student: null,
  remainingSeconds: 0,
  finished: false
};

function storageGet(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // En algunos navegadores, al estar incrustado en Google Sites, el almacenamiento puede estar limitado.
  }
}

function storageJson(key, fallback) {
  try {
    return JSON.parse(storageGet(key, JSON.stringify(fallback)));
  } catch (error) {
    return fallback;
  }
}

function init() {
  const savedTheme = storageGet("simulador_icfes_theme", "light");
  document.documentElement.dataset.theme = savedTheme;
  themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  const savedStudent = loadSavedStudent();
  if (savedStudent) {
    state.student = savedStudent;
    updateHeaderSessionButtons();
    renderHome();
  } else {
    updateHeaderSessionButtons();
    renderAccess();
  }
  bindGlobalEvents();
}

function bindGlobalEvents() {
  homeBtn.addEventListener("click", handleHomeNavigation);
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  if (tipsBtn) tipsBtn.addEventListener("click", openTipsModal);
  if (instructionsBtn) instructionsBtn.addEventListener("click", openInstructionsModal);

  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    storageSet("simulador_icfes_theme", next);
  });
}

function handleHomeNavigation() {
  if (state.screen === "exam" && !state.finished) {
    openActionDialog({
      title: "Volver al inicio",
      message: "El intento actual se guardará en este navegador. Podrás retomarlo con el botón ‘Continuar intento guardado’. ¿Deseas volver al inicio?",
      confirmText: "Sí, ir al inicio",
      cancelText: "Continuar intento",
      onConfirm: () => {
        saveState();
        clearTimer();
        renderHome();
        focusApp();
      }
    });
    return;
  }

  clearTimer();
  renderHome();
  focusApp();
}

function handleLogout() {
  const hasActiveAttempt = state.screen === "exam" && !state.finished;
  openActionDialog({
    title: "Cerrar sesión",
    message: hasActiveAttempt
      ? "Se cerrará la sesión del estudiante actual y se eliminará el intento guardado en este navegador. Luego podrás ingresar con otro nombre, grupo y correo. ¿Deseas continuar?"
      : "Se cerrará la sesión del estudiante actual. Luego podrás ingresar con otro nombre, grupo y correo. ¿Deseas continuar?",
    confirmText: "Sí, cerrar sesión",
    cancelText: "Cancelar",
    danger: true,
    onConfirm: performLogout
  });
}

function performLogout() {
  clearTimer();
  storageRemove(STUDENT_KEY);
  storageRemove(STORAGE_KEY);
  state = {
    screen: "access",
    mode: "simulacro",
    sessionId: null,
    scope: null,
    navNumbers: [],
    availableNumbers: [],
    currentNumber: null,
    answers: {},
    marked: {},
    startedAt: null,
    finishedAt: null,
    student: null,
    remainingSeconds: 0,
    finished: false
  };
  updateHeaderSessionButtons();
  renderAccess();
  scrollToPageTop();
}

function updateHeaderSessionButtons() {
  const loggedIn = hasValidStudent();
  if (logoutBtn) logoutBtn.classList.toggle("hidden", !loggedIn);
}

function openActionDialog({ title, message, confirmText = "Aceptar", cancelText = "Cancelar", danger = false, onConfirm }) {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="dialogTitle" aria-describedby="dialogMessage">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Simulador ICFES</p>
      <h2 id="dialogTitle">${title}</h2>
      <p id="dialogMessage">${message}</p>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-dialog-cancel>${cancelText}</button>
        <button class="${danger ? "danger-btn" : "primary-btn"}" type="button" data-dialog-confirm>${confirmText}</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
    }

    if (event.target.closest("[data-dialog-confirm]")) {
      closeActionDialog();
      if (typeof onConfirm === "function") onConfirm();
    }
  });

  document.body.appendChild(overlay);
  const confirmBtn = overlay.querySelector("[data-dialog-confirm]");
  if (confirmBtn) confirmBtn.focus({ preventScroll: true });
}

function closeActionDialog() {
  const current = document.querySelector(".dialog-overlay");
  if (current) current.remove();
}

function openTipsModal() {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay tips-modal-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card tips-dialog-card" role="dialog" aria-modal="true" aria-labelledby="tipsDialogTitle">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Guía rápida del simulador</p>
      <h2 id="tipsDialogTitle">Tips</h2>
      <div class="tips-modal-content">
        <article class="tip-card">
          <h3>1. Estructura general del material</h3>
          <h4>Sección 1: Primera sesión</h4>
          <p>En la portada se identifican las áreas:</p>
          <ul>
            <li>Matemáticas</li>
            <li>Lectura Crítica</li>
            <li>Sociales y Ciudadanas</li>
            <li>Ciencias Naturales</li>
          </ul>
          <p><strong>Duración:</strong> 4 horas y 30 minutos.</p>
          <p>La distribución visible es aproximadamente:</p>
          <div class="tips-table-scroll">
            <table class="tips-table">
              <thead><tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>1 a 25</td><td>Matemáticas</td></tr>
                <tr><td>2</td><td>26 a 66</td><td>Lectura Crítica</td></tr>
                <tr><td>3</td><td>67 a 91</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>4</td><td>92 a 120</td><td>Ciencias Naturales</td></tr>
              </tbody>
            </table>
          </div>

          <h4>Sección 2: Segunda sesión</h4>
          <p>En la portada se identifican las áreas:</p>
          <ul>
            <li>Sociales y Ciudadanas</li>
            <li>Matemáticas</li>
            <li>Ciencias Naturales</li>
            <li>Inglés</li>
          </ul>
          <p>También aparece una duración de <strong>4 horas y 30 minutos</strong>. En esta versión del simulador se trabajan las preguntas académicas visibles: <strong>1 a 134</strong>.</p>
          <p>En el archivo visible se observa esta distribución:</p>
          <div class="tips-table-scroll">
            <table class="tips-table">
              <thead><tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>1 a 28</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>2</td><td>29 a 50</td><td>Matemáticas</td></tr>
                <tr><td>3</td><td>51 a 79</td><td>Ciencias Naturales</td></tr>
                <tr><td>4</td><td>80 a 134</td><td>Inglés</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="tip-card">
          <h3>2. Tipos de preguntas identificadas</h3>
          <p>El material no se limita a preguntas memorísticas. La mayoría son preguntas contextualizadas, con situaciones reales, tablas, gráficos, textos, imágenes o casos.</p>

          <div class="tips-area-grid">
            <section>
              <h4>Matemáticas</h4>
              <p>Predominan preguntas sobre:</p>
              <ul>
                <li>Promedios y análisis de tablas.</li>
                <li>Porcentajes, impuestos, descuentos e intereses.</li>
                <li>Probabilidad y conteo.</li>
                <li>Geometría: áreas, figuras, regiones sombreadas.</li>
                <li>Conversión de unidades.</li>
                <li>Lectura de gráficos de barras, circulares, cajas y líneas.</li>
                <li>Proporcionalidad directa e inversa.</li>
                <li>Interpretación de fórmulas y procedimientos.</li>
              </ul>
              <p class="tip-note">Esto indica que el simulador debe permitir preguntas con tablas, gráficos, imágenes y fórmulas.</p>
            </section>

            <section>
              <h4>Lectura Crítica</h4>
              <p>Se observan textos filosóficos, literarios, argumentativos, infografías e historietas. Las preguntas evalúan:</p>
              <ul>
                <li>Idea principal.</li>
                <li>Intención del autor.</li>
                <li>Relación entre enunciados.</li>
                <li>Parafraseo.</li>
                <li>Inferencias.</li>
                <li>Estrategias argumentativas.</li>
                <li>Función de conectores.</li>
                <li>Interpretación de textos continuos y discontinuos.</li>
              </ul>
              <p class="tip-note">Para el simulador, esta área necesita una pantalla cómoda para leer textos largos, con opción de ampliar el texto o dividir pantalla entre texto y preguntas.</p>
            </section>

            <section>
              <h4>Sociales y Ciudadanas</h4>
              <p>Las preguntas trabajan situaciones sobre:</p>
              <ul>
                <li>Constitución Política de Colombia.</li>
                <li>Participación ciudadana.</li>
                <li>Derechos fundamentales.</li>
                <li>Conflictos sociales y ambientales.</li>
                <li>Desarrollo sostenible.</li>
                <li>Democracia.</li>
                <li>Inclusión social.</li>
                <li>Discriminación.</li>
                <li>Economía, Estado y sociedad.</li>
              </ul>
              <p class="tip-note">Son preguntas basadas en casos, por lo que el simulador debe clasificar cada ítem por competencia ciudadana, tema y nivel de dificultad.</p>
            </section>

            <section>
              <h4>Ciencias Naturales</h4>
              <p>Aparecen preguntas sobre:</p>
              <ul>
                <li>Ecosistemas.</li>
                <li>Contaminación.</li>
                <li>Fotosíntesis.</li>
                <li>Fuerzas.</li>
                <li>pH.</li>
                <li>Vacunas y enfermedades.</li>
                <li>Transporte celular.</li>
                <li>Evolución.</li>
                <li>Reacciones químicas.</li>
                <li>Mezclas.</li>
                <li>Energía.</li>
                <li>Interpretación de experimentos.</li>
                <li>Gráficas científicas.</li>
              </ul>
              <p class="tip-note">Esta área requiere soporte para imágenes, diagramas científicos, tablas de datos y preguntas experimentales.</p>
            </section>

            <section>
              <h4>Inglés</h4>
              <p>La sección de inglés está organizada por partes. Se observan ejercicios de:</p>
              <ul>
                <li>Relación de palabras con definiciones.</li>
                <li>Comprensión de avisos.</li>
                <li>Conversaciones cortas.</li>
                <li>Completar textos con palabras.</li>
                <li>Comprensión de lectura.</li>
                <li>Selección de vocabulario y estructuras gramaticales.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
      <div class="dialog-actions tips-modal-actions">
        <button class="primary-btn" type="button" data-dialog-cancel>Cerrar tips</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
    }
  });

  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector(".dialog-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}


function openInstructionsModal() {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay tips-modal-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card tips-dialog-card instructions-dialog-card" role="dialog" aria-modal="true" aria-labelledby="instructionsDialogTitle">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Guía rápida del simulador</p>
      <h2 id="instructionsDialogTitle">Instrucciones</h2>
      <div class="tips-modal-content instructions-content">
        <article class="tip-card">
          <ol class="instructions-list">
            <li><strong>Modo de trabajo:</strong> Simulacro.</li>
            <li>Iniciar <strong>Primera sesión</strong> o <strong>Segunda sesión</strong>.</li>
            <li>Analiza la pregunta y da clic en la opción de respuesta.</li>
            <li>Las preguntas que quieras dejar para el final selecciónalas con <strong>Marcar para revisar</strong>.</li>
            <li>Cuando finalices, da clic en el botón <strong>Finalizar intento</strong>.</li>
            <li>Descarga el <strong>informe PDF</strong>.</li>
            <li>Da clic en <strong>Enviar informe PDF</strong> para cargarlo en el formulario indicado.</li>
            <li>Usa <strong>Enviar Informe al MJB</strong> para abrir el formulario institucional de la I.E. Manuel J. Betancur.</li>
          </ol>
        </article>
      </div>
      <div class="dialog-actions tips-modal-actions">
        <button class="primary-btn" type="button" data-dialog-cancel>Cerrar instrucciones</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
    }
  });

  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector(".dialog-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

function focusApp() {
  if (app && typeof app.focus === "function") {
    requestAnimationFrame(() => app.focus({ preventScroll: true }));
  }
}

function scrollToPageTop() {
  requestAnimationFrame(() => {
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (app && typeof app.focus === "function") {
      app.focus({ preventScroll: true });
    }
  });
}

function scrollToTimerBox() {
  requestAnimationFrame(() => {
    const target = document.querySelector(".exam-layout") || app;
    const header = document.querySelector(".app-header");
    if (target && typeof window.scrollTo === "function") {
      const headerHeight = header ? header.offsetHeight : 0;
      const top = Math.max(target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10, 0);
      window.scrollTo({ top, behavior: "smooth" });
    } else if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (app && typeof app.focus === "function") {
      app.focus({ preventScroll: true });
    }
  });
}

function renderAccess(pendingScope = null) {
  clearTimer();
  state.screen = "access";
  homeBtn.classList.add("hidden");
  if (logoutBtn) logoutBtn.classList.add("hidden");
  const current = state.student || loadSavedStudent() || { fullName: "", group: "", email: "" };
  const currentFullName = normalizeNameInput(current.fullName || `${current.firstName || ""} ${current.lastName || ""}`);
  const currentGroup = normalizeGroupInput(current.group || current.gradeGroup || current.course || "");
  const currentEmail = normalizeEmailInput(current.email || current.studentEmail || "");

  app.innerHTML = `
    <section class="access-panel" aria-labelledby="accessTitle">
      <div class="access-card">
        <p class="eyebrow">${escapeHtml(INSTITUTION_NAME)}</p>
        <h2 id="accessTitle">Antes de iniciar, registra tus datos</h2>
        <p class="access-intro">Esta información aparecerá en la página de resultados, en el informe final en PDF y permitirá el envío automático del informe al estudiante y al equipo institucional de la ${escapeHtml(INSTITUTION_NAME)}.</p>
        <form id="studentForm" class="student-form">
          <div class="form-grid student-form-grid">
            <label class="field field-wide">
              <span>Nombre y apellido completo</span>
              <input id="studentFullName" type="text" autocomplete="name" required maxlength="120" placeholder="Ejemplo: Juan Carlos Blandón Vargas" value="${escapeAttr(currentFullName)}" />
            </label>
            <label class="field">
              <span>Grupo</span>
              <select id="studentGroup" required>
                <option value="">Selecciona el grupo</option>
                <option value="11-1" ${currentGroup === "11-1" ? "selected" : ""}>11-1</option>
                <option value="11-2" ${currentGroup === "11-2" ? "selected" : ""}>11-2</option>
                <option value="11-3" ${currentGroup === "11-3" ? "selected" : ""}>11-3</option>
              </select>
            </label>
            <label class="field field-wide">
              <span>Correo electrónico del estudiante</span>
              <input id="studentEmail" type="email" autocomplete="email" required maxlength="140" placeholder="Ejemplo: estudiante@correo.com" value="${escapeAttr(currentEmail)}" />
            </label>
            <label class="field field-wide">
              <span>Confirmar correo electrónico</span>
              <input id="studentEmailConfirm" type="email" autocomplete="email" required maxlength="140" placeholder="Vuelve a escribir el correo del estudiante" value="${escapeAttr(currentEmail)}" />
            </label>
          </div>
          <div class="form-error" id="studentFormError" aria-live="polite"></div>
          <div class="session-actions">
            <button class="primary-btn" type="submit">Ingresar al simulador</button>
          </div>
        </form>
      </div>
    </section>
  `;

  document.getElementById("studentForm").addEventListener("submit", event => {
    event.preventDefault();
    const fullName = normalizeNameInput(document.getElementById("studentFullName").value);
    const group = normalizeGroupInput(document.getElementById("studentGroup").value);
    const email = normalizeEmailInput(document.getElementById("studentEmail").value);
    const emailConfirm = normalizeEmailInput(document.getElementById("studentEmailConfirm").value);
    const error = document.getElementById("studentFormError");

    if (!fullName) {
      error.textContent = "Por favor, escribe el nombre y apellido completo del estudiante.";
      return;
    }

    if (!group) {
      error.textContent = "Por favor, selecciona el grupo: 11-1, 11-2 o 11-3.";
      return;
    }

    if (!isValidEmail(email)) {
      error.textContent = "Por favor, escribe un correo electrónico válido para enviar el informe.";
      return;
    }

    if (email !== emailConfirm) {
      error.textContent = "Los correos electrónicos no coinciden. Verifica el correo del estudiante antes de continuar.";
      return;
    }

    state.student = { fullName, group, email };
    storageSet(STUDENT_KEY, JSON.stringify(state.student));
    updateHeaderSessionButtons();
    if (pendingScope) startScope(pendingScope);
    else renderHome();
  });

  const firstInput = document.getElementById("studentFullName");
  if (firstInput) firstInput.focus({ preventScroll: true });
}

function normalizeNameInput(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeGroupInput(value) {
  const group = String(value || "").replace(/\s+/g, "").trim();
  return ["11-1", "11-2", "11-3"].includes(group) ? group : "";
}

function normalizeEmailInput(value) {
  return String(value || "").replace(/\s+/g, "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmailInput(value));
}

function loadSavedStudent() {
  const student = storageJson(STUDENT_KEY, null);
  if (!student) return null;
  const fullName = normalizeNameInput(student.fullName || `${student.firstName || ""} ${student.lastName || ""}`);
  const group = normalizeGroupInput(student.group || student.gradeGroup || student.course || "");
  const email = normalizeEmailInput(student.email || student.studentEmail || "");
  if (!fullName || !group || !isValidEmail(email)) return null;
  return { fullName, group, email };
}

function hasValidStudent() {
  if (!state.student) return false;
  const fullName = normalizeNameInput(state.student.fullName || `${state.student.firstName || ""} ${state.student.lastName || ""}`);
  const group = normalizeGroupInput(state.student.group || state.student.gradeGroup || state.student.course || "");
  const email = normalizeEmailInput(state.student.email || state.student.studentEmail || "");
  return Boolean(fullName && group && isValidEmail(email));
}

function getStudentFullName() {
  if (!hasValidStudent()) return "Estudiante sin registrar";
  return normalizeNameInput(state.student.fullName || `${state.student.firstName || ""} ${state.student.lastName || ""}`);
}

function getStudentGroup() {
  if (!hasValidStudent()) return "Sin grupo";
  return normalizeGroupInput(state.student.group || state.student.gradeGroup || state.student.course || "") || "Sin grupo";
}

function getStudentEmail() {
  if (!hasValidStudent()) return "Sin correo";
  return normalizeEmailInput(state.student.email || state.student.studentEmail || "") || "Sin correo";
}

function renderHome() {
  if (!hasValidStudent()) {
    renderAccess();
    return;
  }
  clearTimer();
  state.screen = "home";
  homeBtn.classList.add("hidden");
  updateHeaderSessionButtons();
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${escapeHtml(INSTITUTION_NAME)}</p>
      <h2>Simulador ICFES Saber 11° por sesiones, bloques y áreas</h2>
      <p>
        Selecciona una sesión completa o un bloque específico para iniciar el simulacro, practicar con retroalimentación o entrenar sin límite de tiempo.
      </p>
      <div class="hero-grid">
        <div class="stat"><strong>2</strong><span>sesiones configuradas</span></div>
        <div class="stat"><strong>270 min</strong><span>por sesión completa</span></div>
        <div class="stat"><strong>${EXAM_STRUCTURE.reduce((sum, session) => sum + session.totalQuestions, 0)}</strong><span>preguntas estructuradas</span></div>
        <div class="stat"><strong>${QUESTION_BANK.length}</strong><span>preguntas disponibles</span></div>
      </div>
    </section>

    <section class="student-strip" aria-label="Datos del estudiante">
      <div>
        <p class="eyebrow">Estudiante registrado · ${escapeHtml(INSTITUTION_SHORT_NAME)}</p>
        <strong>${getStudentFullName()}</strong>
        <span class="student-group-label">Grupo: ${getStudentGroup()} · Correo: ${getStudentEmail()}</span>
      </div>
      <div class="student-actions">
        <button class="secondary-btn" id="changeStudentBtn" type="button">Cambiar estudiante</button>
        <button class="danger-btn" id="logoutStudentBtn" type="button">Cerrar sesión</button>
      </div>
    </section>

    <section class="config-bar" aria-label="Configuración del simulador">
      <div>
        <p class="eyebrow">Modo de trabajo</p>
        <div class="mode-control">
          <label class="mode-option"><input type="radio" name="mode" value="simulacro" ${state.mode === "simulacro" ? "checked" : ""}> Simulacro</label>
          <label class="mode-option"><input type="radio" name="mode" value="practica" ${state.mode === "practica" ? "checked" : ""}> Práctica con retroalimentación</label>
          <label class="mode-option"><input type="radio" name="mode" value="entrenamiento" ${state.mode === "entrenamiento" ? "checked" : ""}> Entrenamiento sin tiempo</label>
        </div>
      </div>
      <button class="secondary-btn" id="resumeBtn" type="button">Continuar intento guardado</button>
    </section>


    <section class="session-grid" id="sessionGrid"></section>
  `;

  document.querySelectorAll('input[name="mode"]').forEach(input => {
    input.addEventListener("change", event => {
      state.mode = event.target.value;
    });
  });

  document.getElementById("changeStudentBtn").addEventListener("click", () => {
    openActionDialog({
      title: "Cambiar estudiante",
      message: "Al cambiar los datos del estudiante, los nuevos intentos e informes quedarán asociados al nuevo nombre y grupo. El intento guardado actual, si existe, se conservará en este navegador.",
      confirmText: "Cambiar",
      cancelText: "Cancelar",
      onConfirm: () => renderAccess()
    });
  });
  const logoutStudentBtn = document.getElementById("logoutStudentBtn");
  if (logoutStudentBtn) logoutStudentBtn.addEventListener("click", handleLogout);
  document.getElementById("resumeBtn").addEventListener("click", resumeSavedAttempt);
  renderSessionCards();
  app.focus();
}

function renderSessionCards() {
  const grid = document.getElementById("sessionGrid");
  const template = document.getElementById("session-card-template");
  grid.innerHTML = "";

  EXAM_STRUCTURE.forEach(session => {
    const node = template.content.cloneNode(true);
    node.querySelector(".session-label").textContent = session.label;
    node.querySelector(".session-title").textContent = session.title;
    node.querySelector(".session-duration").textContent = `${formatMinutes(session.durationMinutes)} · ${session.totalQuestions} preguntas`;
    node.querySelector(".session-description").textContent = session.description;

    const loadedTotal = getLoadedQuestionsForSession(session.id).length;
    node.querySelector(".session-stats").innerHTML = `
      <span class="pill">Total: ${session.totalQuestions}</span>
      <span class="pill success">Disponibles: ${loadedTotal}</span>
      <span class="pill muted">Pendientes: ${session.totalQuestions - loadedTotal}</span>
    `;

    const tbody = node.querySelector("tbody");
    session.blocks.forEach(block => {
      const loaded = getLoadedQuestionsInRange(session.id, block.from, block.to).length;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${block.block}</strong></td>
        <td>${block.from} a ${block.to}</td>
        <td>${block.area}${block.note ? `<br><small class="footer-note">${block.note}</small>` : ""}</td>
        <td><span class="pill ${loaded ? "success" : "muted"}">${loaded}/${block.to - block.from + 1}</span></td>
        <td>
          <div class="row-actions">
            <button class="tiny-btn" type="button" data-action="area" data-session="${session.id}" data-from="${block.from}" data-to="${block.to}" data-area="${escapeAttr(block.area)}">Elegir bloque</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    node.querySelector(".session-actions").innerHTML = `
      <button class="primary-btn" type="button" data-action="session" data-session="${session.id}">Iniciar ${session.title}</button>
    `;

    grid.appendChild(node);
  });

  grid.querySelectorAll("button[data-action]").forEach(button => {
    button.addEventListener("click", event => {
      const action = event.currentTarget.dataset.action;
      const sessionId = Number(event.currentTarget.dataset.session);
      if (action === "session") startScope({ sessionId, type: "session" });
      if (action === "area") {
        startScope({
          sessionId,
          type: "block",
          from: Number(event.currentTarget.dataset.from),
          to: Number(event.currentTarget.dataset.to),
          area: event.currentTarget.dataset.area
        });
      }
    });
  });
}

function showStructure(sessionId) {
  const session = getSession(sessionId);
  const rows = session.blocks.map(block => {
    const loaded = getLoadedQuestionsInRange(session.id, block.from, block.to).length;
    return `
      <tr>
        <td><strong>${block.block}</strong></td>
        <td>${block.from} a ${block.to}</td>
        <td>${block.area}</td>
        <td>${block.scored ? "Sí" : "No"}</td>
        <td>${loaded}</td>
      </tr>
    `;
  }).join("");

  app.innerHTML = `
    <section class="panel session-card">
      <div class="session-card__head">
        <div>
          <p class="eyebrow">${session.label}</p>
          <h2>${session.title}</h2>
        </div>
        <span class="pill">${formatMinutes(session.durationMinutes)} · ${session.totalQuestions} preguntas</span>
      </div>
      <p class="session-description">${session.description}</p>
      <div class="table-wrap">
        <table class="structure-table">
          <thead>
            <tr><th>Bloque</th><th>Preguntas</th><th>Área</th><th>Calificable</th><th>Disponibles</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="session-actions">
        <button class="primary-btn" type="button" id="startFromStructure">Iniciar ${session.title}</button>
        <button class="secondary-btn" type="button" id="backHome">Volver</button>
      </div>
    </section>
  `;

  document.getElementById("startFromStructure").addEventListener("click", () => startScope({ sessionId, type: "session" }));
  document.getElementById("backHome").addEventListener("click", renderHome);
  homeBtn.classList.remove("hidden");
  updateHeaderSessionButtons();
}

function startScope(scope) {
  if (!hasValidStudent()) {
    renderAccess(scope);
    return;
  }
  const session = getSession(scope.sessionId);
  const range = getScopeRange(session, scope);
  const navNumbers = createNumberRange(range.from, range.to);
  const availableNumbers = navNumbers.filter(number => getQuestion(session.id, number));

  state = {
    ...state,
    screen: "exam",
    sessionId: session.id,
    scope: { ...scope, from: range.from, to: range.to, label: range.label },
    navNumbers,
    availableNumbers,
    currentNumber: availableNumbers[0] || range.from,
    answers: {},
    marked: {},
    startedAt: new Date().toISOString(),
    finishedAt: null,
    student: { ...state.student },
    remainingSeconds: state.mode === "entrenamiento" ? 0 : session.durationMinutes * 60,
    finished: false
  };

  homeBtn.classList.remove("hidden");
  updateHeaderSessionButtons();
  saveState();
  renderExam({ scrollToTimer: true });
  if (state.mode !== "entrenamiento") startTimer();
}

function renderExam({ scrollToTimer = false } = {}) {
  updateHeaderSessionButtons();
  const session = getSession(state.sessionId);
  const loaded = state.availableNumbers.length;

  if (!loaded) {
    clearTimer();
    app.innerHTML = `
      <section class="empty-state">
        <p class="eyebrow">${session.label} · ${state.scope.label}</p>
        <h2>Este bloque todavía no tiene preguntas disponibles</h2>
        <p>La estructura ya está preparada para este rango de preguntas (${state.scope.from} a ${state.scope.to}). Cuando envíes las preguntas, se irán incorporando al banco interno del simulador.</p>
        <button class="primary-btn" type="button" id="backHomeEmpty">Volver al inicio</button>
      </section>
    `;
    document.getElementById("backHomeEmpty").addEventListener("click", renderHome);
    return;
  }

  const question = getQuestion(state.sessionId, state.currentNumber) || getQuestion(state.sessionId, state.availableNumbers[0]);
  if (!question) return;
  state.currentNumber = question.number;
  const answeredCount = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const progress = loaded ? Math.round((answeredCount / loaded) * 100) : 0;

  app.innerHTML = `
    <section class="exam-layout">
      <article class="exam-main">
        <div class="exam-top">
          <div>
            <p class="eyebrow">${session.label} · ${session.title}</p>
            <h2 class="exam-title">${state.scope.label}</h2>
            <div class="exam-meta">
              <span class="pill">Modo: ${getModeLabel(state.mode)}</span>
              <span class="pill success">Disponibles: ${loaded}</span>
              <span class="pill muted">Rango: ${state.scope.from}-${state.scope.to}</span>
            </div>
          </div>
          <div class="timer-box" id="timerBox" tabindex="-1">
            <div class="timer" id="timerText">${state.mode === "entrenamiento" ? "Sin tiempo" : formatSeconds(state.remainingSeconds)}</div>
            <span class="timer-label">${state.mode === "entrenamiento" ? "Entrenamiento" : "Tiempo restante"}</span>
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-text"><span id="answeredCounter">Respondidas: ${answeredCount}/${loaded}</span><span id="progressPercent">${progress}%</span></div>
          <div class="progress-bar"><span id="progressBar" style="width:${progress}%"></span></div>
        </div>
        <div class="question-card" id="questionCard"></div>
      </article>

      <aside class="exam-side" aria-label="Navegación de preguntas">
        <h3 class="side-title">Panel de preguntas</h3>
        <div class="legend">
          <span class="answered"><i></i>Respondida</span>
          <span class="marked"><i></i>Marcada para revisar</span>
          <span class="pending"><i></i>Pendiente</span>
          <span class="missing"><i></i>No disponible todavía</span>
        </div>
        <div class="question-grid" id="questionGrid"></div>
        <p class="side-note">El panel conserva la numeración oficial del bloque. Las preguntas rayadas están reservadas para cuando sean adicionadas.</p>
      </aside>
    </section>
  `;

  renderQuestion(question);
  renderQuestionGrid();
  if (scrollToTimer) scrollToTimerBox();
  else app.focus();
}

function renderQuestion(question) {
  const key = getAnswerKey(question.number);
  const selected = state.answers[key] || "";
  const showFeedback = state.mode === "practica" && selected;
  const card = document.getElementById("questionCard");
  const resources = renderResources([...(question.resources || []), ...(question.context || [])]);
  const options = question.options.map(option => {
    const isSelected = selected === option.letter;
    const isCorrect = showFeedback && option.letter === question.correctAnswer;
    const isIncorrect = showFeedback && isSelected && option.letter !== question.correctAnswer;
    return `
      <button class="option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}" type="button" data-answer="${option.letter}">
        <span class="option-letter">${option.letter}</span>
        ${option.isHtml ? `<div class="option-rich">${option.text}</div>` : `<span>${option.text}</span>`}
      </button>
    `;
  }).join("");

  card.innerHTML = `
    <div class="question-head">
      <div>
        <p class="eyebrow">${question.sourceLabel || `Pregunta ${question.number}`}</p>
        <h3 class="question-title">Pregunta ${question.number} · ${question.area}</h3>
      </div>
      <span class="pill ${question.scored ? "success" : "muted"}">${question.scored ? "Calificable" : "No calificable"}</span>
    </div>
    <p class="question-text">${question.stem}</p>
    ${resources}
    <p class="prompt">${question.prompt}</p>
    <div class="options">${options}</div>
    ${showFeedback ? renderFeedback(question, selected) : ""}
    <div class="question-actions">
      <button class="secondary-btn" type="button" id="markBtn">${state.marked[key] ? "Quitar marca" : "Marcar para revisar"}</button>
      <div class="nav-group">
        <button class="nav-btn secondary-btn" type="button" id="prevBtn">Anterior</button>
        <button class="nav-btn secondary-btn" type="button" id="nextBtn">Siguiente</button>
      </div>
    </div>
    <div class="bottom-actions" style="margin-top:18px">
      <p class="footer-note">Competencia: ${question.competencia || "Por definir"} · Componente: ${question.componente || "Por definir"} · Dificultad: ${question.dificultad || "Por definir"}</p>
      <button class="danger-btn" type="button" id="finishBtn">Finalizar intento</button>
    </div>
  `;

  card.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
      state.answers[key] = button.dataset.answer;
      saveState();

      // Al seleccionar una respuesta, el simulador permanece en la misma zona de lectura.
      // La navegación solo cambia de pregunta con Anterior, Siguiente o el panel numérico.
      renderQuestion(question);
      renderQuestionGrid();
      updateProgressUI();
    });
  });

  document.getElementById("markBtn").addEventListener("click", () => {
    state.marked[key] = !state.marked[key];
    saveState();
    renderQuestion(question);
    renderQuestionGrid();
  });

  document.getElementById("prevBtn").addEventListener("click", () => moveLoadedQuestion(-1));
  document.getElementById("nextBtn").addEventListener("click", () => moveLoadedQuestion(1));
  document.getElementById("finishBtn").addEventListener("click", finishAttempt);
}

function renderResources(resources) {
  if (!resources.length) return "";
  return resources.map(resource => {
    if (resource.type === "table") {
      const head = resource.headers.map(header => `<th>${header}</th>`).join("");
      const rows = resource.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
      return `
        <div class="question-resource">
          <div class="table-wrap" style="max-width:520px;margin:auto">
            <table class="data-table" aria-label="${resource.caption || "Tabla"}">
              <thead><tr>${head}</tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `;
    }
    if (resource.type === "image") {
      return `
        <figure class="question-resource">
          <img src="${resource.src}" alt="${resource.alt || "Imagen de la pregunta"}" style="max-width:100%;border-radius:18px;border:1px solid var(--line)">
          ${resource.caption ? `<figcaption class="footer-note">${resource.caption}</figcaption>` : ""}
        </figure>
      `;
    }
    if (resource.type === "html") return `<div class="question-resource">${resource.html || resource.content || ""}</div>`;
    return "";
  }).join("");
}

function updateProgressUI() {
  const loaded = state.availableNumbers.length;
  const answeredCount = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const progress = loaded ? Math.round((answeredCount / loaded) * 100) : 0;

  const answeredCounter = document.getElementById("answeredCounter");
  const progressPercent = document.getElementById("progressPercent");
  const progressBar = document.getElementById("progressBar");

  if (answeredCounter) answeredCounter.textContent = `Respondidas: ${answeredCount}/${loaded}`;
  if (progressPercent) progressPercent.textContent = `${progress}%`;
  if (progressBar) progressBar.style.width = `${progress}%`;
}

function renderFeedback(question, selected) {
  const ok = selected === question.correctAnswer;
  return `
    <div class="feedback">
      <strong>${ok ? "Respuesta correcta." : `Respuesta incorrecta. La correcta es ${question.correctAnswer}.`}</strong><br>
      ${question.explanation || "Aún no se ha registrado retroalimentación para esta pregunta."}
    </div>
  `;
}

function renderQuestionGrid() {
  const grid = document.getElementById("questionGrid");
  grid.innerHTML = state.navNumbers.map(number => {
    const question = getQuestion(state.sessionId, number);
    const key = getAnswerKey(number);
    const classes = ["q-dot"];
    if (!question) classes.push("missing");
    if (number === state.currentNumber) classes.push("active");
    if (state.answers[key]) classes.push("answered");
    if (state.marked[key]) classes.push("marked");
    return `<button class="${classes.join(" ")}" type="button" data-number="${number}" ${question ? "" : "disabled"}>${number}</button>`;
  }).join("");

  grid.querySelectorAll("button:not(:disabled)").forEach(button => {
    button.addEventListener("click", () => {
      state.currentNumber = Number(button.dataset.number);
      saveState();
      renderExam({ scrollToTimer: true });
    });
  });
}

function moveLoadedQuestion(direction) {
  const index = state.availableNumbers.indexOf(state.currentNumber);
  if (index < 0) return;
  let nextIndex = index + direction;
  if (nextIndex < 0) nextIndex = state.availableNumbers.length - 1;
  if (nextIndex >= state.availableNumbers.length) nextIndex = 0;
  state.currentNumber = state.availableNumbers[nextIndex];
  saveState();
  renderExam({ scrollToTimer: true });
}

function finishAttempt() {
  if (state.screen !== "exam") return;
  const loaded = state.availableNumbers.length;
  const answered = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const pending = Math.max(loaded - answered, 0);
  const message = pending > 0
    ? `Has respondido ${answered} de ${loaded} preguntas disponibles. Quedan ${pending} sin responder. ¿Deseas finalizar el intento y ver los resultados?`
    : "Has respondido todas las preguntas disponibles. ¿Deseas finalizar el intento y ver los resultados?";

  openActionDialog({
    title: "Finalizar intento",
    message,
    confirmText: "Sí, finalizar",
    cancelText: "Seguir respondiendo",
    danger: true,
    onConfirm: completeAttempt
  });
}

function completeAttempt() {
  clearTimer();
  state.finished = true;
  state.finishedAt = new Date().toISOString();
  saveAttemptToHistory();
  storageRemove(STORAGE_KEY);
  renderResults();
  scrollToPageTop();
  if (REPORT_AUTOSEND_ON_FINISH) {
    sendReportEmail({ automatic: true });
  }
}

function renderResults() {
  updateHeaderSessionButtons();
  const result = buildResultData();

  const areaRows = result.byArea.map(row => `
    <tr>
      <td>${escapeHtml(row.area)}</td>
      <td>${row.total}</td>
      <td>${row.answered}</td>
      <td>${row.correct}</td>
      <td>${row.incorrect}</td>
      <td>${row.omitted}</td>
      <td><strong>${row.percent}%</strong></td>
      <td>${escapeHtml(row.level || getInternalPerformanceLevel(row.percent))}</td>
    </tr>
  `).join("");

  const review = result.details.map(item => `
    <div class="review-item">
      <strong>Pregunta ${item.number} · ${escapeHtml(item.area)}</strong>
      <p><strong>Respuesta del estudiante:</strong> ${escapeHtml(item.studentAnswer)} · <strong>Respuesta correcta:</strong> ${escapeHtml(item.correctAnswer)} · <strong>Resultado:</strong> ${escapeHtml(item.result)}</p>
      <p><strong>Competencia:</strong> ${escapeHtml(item.competence)} · <strong>Componente:</strong> ${escapeHtml(item.component)} · <strong>Dificultad:</strong> ${escapeHtml(item.difficulty)}</p>
      <p>${escapeHtml(item.explanation)}</p>
    </div>
  `).join("");

  app.innerHTML = `
    <section class="results-panel">
      <div class="result-top">
        <div>
          <p class="eyebrow">${escapeHtml(result.institutionName)}</p>
          <h2>Informe detallado de resultados · ${escapeHtml(result.sessionLabel)} · ${escapeHtml(result.scopeLabel)}</h2>
          <p class="student-result-name">Estudiante: <strong>${escapeHtml(result.studentName)}</strong> · Grupo: <strong>${escapeHtml(result.studentGroup)}</strong> · Correo: <strong>${escapeHtml(result.studentEmail)}</strong></p>
        </div>
        <span class="pill success">Puntaje interno: ${result.score}%</span>
      </div>

      <div class="report-meta-grid">
        <div><span>Institución educativa</span><strong>${escapeHtml(result.institutionName)}</strong></div>
        <div><span>Fecha de finalización</span><strong>${escapeHtml(result.finishedAtLabel)}</strong></div>
        <div><span>Grupo</span><strong>${escapeHtml(result.studentGroup)}</strong></div>
        <div><span>Correo del estudiante</span><strong>${escapeHtml(result.studentEmail)}</strong></div>
        <div><span>Modo</span><strong>${escapeHtml(result.modeLabel)}</strong></div>
        <div><span>Preguntas disponibles</span><strong>${result.totalQuestions}</strong></div>
        <div><span>Tiempo empleado</span><strong>${escapeHtml(result.elapsedLabel)}</strong></div>
        <div><span>Nivel interno</span><strong>${escapeHtml(result.performanceLevel)}</strong></div>
      </div>

      <div class="result-grid">
        <div class="result-card"><strong>${result.score}%</strong><span>Porcentaje de acierto</span></div>
        <div class="result-card"><strong>${result.correct}</strong><span>Correctas</span></div>
        <div class="result-card"><strong>${result.incorrect}</strong><span>Incorrectas</span></div>
        <div class="result-card"><strong>${result.omitted}</strong><span>Omitidas</span></div>
        <div class="result-card level-card"><strong>${escapeHtml(result.performanceLevel)}</strong><span>Nivel interno</span></div>
      </div>

      <div class="results-chart-grid" aria-label="Gráficos de resultados">
        ${renderStatusChart(result)}
        ${renderAreaChart(result)}
      </div>

      <h3>Resultado por área</h3>
      <div class="table-wrap">
        <table class="structure-table">
          <thead><tr><th>Área</th><th>Preguntas</th><th>Respondidas</th><th>Correctas</th><th>Incorrectas</th><th>Omitidas</th><th>Resultado</th><th>Nivel interno</th></tr></thead>
          <tbody>${areaRows || `<tr><td colspan="8">No hay preguntas calificables disponibles.</td></tr>`}</tbody>
        </table>
      </div>

      <div class="session-actions report-actions">
        <button class="primary-btn" type="button" id="newAttemptBtn">Nuevo intento</button>
        <button class="secondary-btn" type="button" id="downloadPdfBtn">Descargar informe PDF</button>
        <button class="secondary-btn send-report-btn" type="button" id="sendPdfBtn">Enviar informe PDF</button>
        <a class="secondary-btn mjb-report-btn" id="sendMjbReportBtn" href="${REPORT_MJB_FORM_URL}" target="_blank" rel="noopener noreferrer">Enviar Informe al MJB</a>
      </div>
      <div id="emailReportStatus" class="email-report-status" role="status" aria-live="polite"></div>

      <h3 style="margin-top:24px">Revisión detallada por pregunta</h3>
      <p class="footer-note">Esta sección se conserva en pantalla para revisión pedagógica. El PDF descargable contiene el resumen general y los gráficos, sin la revisión detallada por pregunta. El backend de Google Sheets consolida los resultados para el informe institucional de la I.E. Manuel J. Betancur.</p>
      <div class="review-list">${review}</div>
    </section>
  `;

  document.getElementById("newAttemptBtn").addEventListener("click", renderHome);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPdfReport);
  document.getElementById("sendPdfBtn").addEventListener("click", () => sendReportEmail({ automatic: false }));
  updateReportEmailStatus(getReportEmailInitialMessage());
}

function renderStatusChart(result) {
  const total = Math.max(result.scored, 1);
  const parts = [
    { label: "Correctas", value: result.correct, className: "correct" },
    { label: "Incorrectas", value: result.incorrect, className: "incorrect" },
    { label: "Omitidas", value: result.omitted, className: "omitted" }
  ].map(part => ({ ...part, percent: Math.round((part.value / total) * 100) }));

  const stackedSegments = parts.map(part => `
    <span class="stacked-segment ${part.className}" style="width:${part.percent}%" title="${part.label}: ${part.value}"></span>
  `).join("");

  const rows = parts.map(part => `
    <div class="status-chart-row">
      <div class="status-chart-label"><i class="${part.className}"></i><span>${part.label}</span></div>
      <strong>${part.value}</strong>
      <span>${part.percent}%</span>
    </div>
  `).join("");

  return `
    <article class="result-chart-card">
      <div class="chart-heading">
        <div>
          <p class="eyebrow">Gráfico general</p>
          <h3>Distribución de respuestas</h3>
        </div>
        <span class="chart-score">${result.score}%</span>
      </div>
      <div class="score-ring" style="--score:${result.score}">
        <div><strong>${result.score}%</strong><span>Acierto</span></div>
      </div>
      <div class="stacked-bar" aria-hidden="true">${stackedSegments}</div>
      <div class="status-chart-table">${rows}</div>
    </article>
  `;
}

function renderAreaChart(result) {
  if (!result.byArea.length) {
    return `
      <article class="result-chart-card">
        <p class="eyebrow">Gráfico por área</p>
        <h3>Desempeño por área</h3>
        <p class="footer-note">No hay preguntas calificables disponibles para generar el gráfico.</p>
      </article>
    `;
  }

  const rows = result.byArea.map(row => `
    <div class="area-chart-row">
      <div class="area-chart-label">
        <strong>${escapeHtml(row.area)}</strong>
        <span>${row.correct}/${row.total} correctas · ${row.answered} respondidas · ${escapeHtml(row.level || getInternalPerformanceLevel(row.percent))}</span>
      </div>
      <div class="area-chart-track"><span style="width:${row.percent}%"></span></div>
      <strong class="area-chart-percent">${row.percent}%</strong>
    </div>
  `).join("");

  return `
    <article class="result-chart-card area-chart-card">
      <p class="eyebrow">Gráfico por área</p>
      <h3>Desempeño por área</h3>
      <div class="area-chart-list">${rows}</div>
    </article>
  `;
}

function startTimer() {
  clearTimer();
  timerInterval = setInterval(() => {
    state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
    const timerText = document.getElementById("timerText");
    if (timerText) timerText.textContent = formatSeconds(state.remainingSeconds);
    if ([30 * 60, 10 * 60, 5 * 60, 60].includes(state.remainingSeconds)) {
      alert(`Atención: quedan ${formatSeconds(state.remainingSeconds)}.`);
    }
    if (state.remainingSeconds <= 0) {
      clearTimer();
      alert("El tiempo ha finalizado. Se mostrarán los resultados.");
      state.finished = true;
      state.finishedAt = new Date().toISOString();
      saveAttemptToHistory();
      storageRemove(STORAGE_KEY);
      renderResults();
      scrollToPageTop();
    } else {
      saveState();
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function getScopeRange(session, scope) {
  if (scope.type === "block") {
    return { from: scope.from, to: scope.to, label: scope.area };
  }
  return { from: 1, to: session.totalQuestions, label: session.title };
}

function getSession(sessionId) {
  return EXAM_STRUCTURE.find(session => session.id === Number(sessionId));
}

function getQuestion(sessionId, number) {
  return QUESTION_BANK.find(q => q.session === Number(sessionId) && q.number === Number(number));
}

function getLoadedQuestionsForSession(sessionId) {
  return QUESTION_BANK.filter(q => q.session === Number(sessionId));
}

function getLoadedQuestionsInRange(sessionId, from, to) {
  return QUESTION_BANK.filter(q => q.session === Number(sessionId) && q.number >= from && q.number <= to);
}

function getAnswerKey(number) {
  return `s${state.sessionId}-q${number}`;
}

function createNumberRange(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h ${m} min`;
}

function formatSeconds(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(value => String(value).padStart(2, "0")).join(":");
}

function getModeLabel(mode) {
  return {
    simulacro: "Simulacro",
    practica: "Práctica",
    entrenamiento: "Entrenamiento"
  }[mode] || mode;
}

function getInternalPerformanceLevel(score) {
  const value = Number(score) || 0;
  if (value >= 76) return "Nivel 4 - Avanzado";
  if (value >= 61) return "Nivel 3 - Satisfactorio";
  if (value >= 41) return "Nivel 2 - Básico";
  return "Nivel 1 - Bajo";
}

function getInternalPerformanceRecommendation(score) {
  const value = Number(score) || 0;
  if (value >= 76) return "Mantener desempeño alto con simulacros cronometrados y preguntas de mayor complejidad.";
  if (value >= 61) return "Fortalecer áreas específicas con error recurrente y mejorar velocidad de respuesta.";
  if (value >= 41) return "Implementar refuerzo por competencias, revisión de conceptos base y práctica guiada.";
  return "Priorizar acompañamiento intensivo, lectura de enunciados y recuperación de aprendizajes fundamentales.";
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function groupBy(items, callback) {
  return items.reduce((acc, item) => {
    const key = callback(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function saveState() {
  if (state.screen === "exam" && !state.finished) {
    storageSet(STORAGE_KEY, JSON.stringify(state));
  }
}

function resumeSavedAttempt() {
  const raw = storageGet(STORAGE_KEY);
  if (!raw) {
    alert("No hay un intento guardado en este navegador.");
    return;
  }
  try {
    const saved = JSON.parse(raw);
    const session = getSession(saved.sessionId);
    if (!session) throw new Error("Sesión no encontrada");
    state = { ...state, ...saved, finished: false };
    if (saved.student) state.student = saved.student;
    if (!hasValidStudent()) {
      const savedStudent = loadSavedStudent();
      if (savedStudent) state.student = savedStudent;
    }
    if (!hasValidStudent()) {
      renderAccess();
      return;
    }
    homeBtn.classList.remove("hidden");
    renderExam({ scrollToTimer: true });
    if (state.mode !== "entrenamiento") startTimer();
  } catch (error) {
    alert("No fue posible recuperar el intento guardado.");
    storageRemove(STORAGE_KEY);
  }
}

function saveAttemptToHistory() {
  const history = storageJson(HISTORY_KEY, []);
  history.unshift({
    date: new Date().toISOString(),
    sessionId: state.sessionId,
    scope: state.scope,
    answers: state.answers,
    marked: state.marked,
    mode: state.mode,
    student: state.student,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt || new Date().toISOString()
  });
  storageSet(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function buildResultData() {
  const session = getSession(state.sessionId) || { label: "Sección", title: "Sesión" };
  const loadedQuestions = state.availableNumbers.map(number => getQuestion(state.sessionId, number)).filter(Boolean);
  const scored = loadedQuestions.filter(q => q.scored !== false);
  const answeredQuestions = loadedQuestions.filter(q => state.answers[getAnswerKey(q.number)]);
  const correct = scored.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
  const incorrect = scored.filter(q => state.answers[getAnswerKey(q.number)] && state.answers[getAnswerKey(q.number)] !== q.correctAnswer).length;
  const omitted = scored.length - correct - incorrect;
  const score = scored.length ? Math.round((correct / scored.length) * 100) : 0;
  const byArea = Object.entries(groupBy(scored, q => q.area)).map(([area, questions]) => {
    const areaAnswered = questions.filter(q => state.answers[getAnswerKey(q.number)]).length;
    const areaCorrect = questions.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
    const areaIncorrect = questions.filter(q => state.answers[getAnswerKey(q.number)] && state.answers[getAnswerKey(q.number)] !== q.correctAnswer).length;
    const areaOmitted = questions.length - areaCorrect - areaIncorrect;
    const percent = questions.length ? Math.round((areaCorrect / questions.length) * 100) : 0;
    return {
      area,
      total: questions.length,
      answered: areaAnswered,
      correct: areaCorrect,
      incorrect: areaIncorrect,
      omitted: areaOmitted,
      percent,
      level: getInternalPerformanceLevel(percent)
    };
  });

  const details = loadedQuestions.map(q => {
    const ans = state.answers[getAnswerKey(q.number)] || "Sin responder";
    const result = getQuestionResultLabel(q, ans);
    return {
      number: q.number,
      area: q.area,
      studentAnswer: ans,
      correctAnswer: q.correctAnswer || "No aplica",
      result,
      competence: q.competencia || "Por definir",
      component: q.componente || "Por definir",
      difficulty: q.dificultad || "Por definir",
      explanation: q.explanation || "Sin explicación registrada."
    };
  });

  const performanceLevel = getInternalPerformanceLevel(score);
  const performanceRecommendation = getInternalPerformanceRecommendation(score);

  return {
    institutionName: INSTITUTION_NAME,
    studentName: getStudentFullName(),
    studentGroup: getStudentGroup(),
    studentEmail: getStudentEmail(),
    sessionLabel: session.label || `Sección ${state.sessionId}`,
    sessionTitle: session.title || "Sesión",
    scopeLabel: state.scope ? state.scope.label : "Intento",
    modeLabel: getModeLabel(state.mode),
    startedAt: state.startedAt,
    finishedAt: state.finishedAt || new Date().toISOString(),
    finishedAtLabel: formatDateTime(state.finishedAt || new Date().toISOString()),
    elapsedLabel: formatElapsedTime(state.startedAt, state.finishedAt || new Date().toISOString()),
    totalQuestions: loadedQuestions.length,
    answered: answeredQuestions.length,
    scored: scored.length,
    correct,
    incorrect,
    omitted,
    score,
    performanceLevel,
    performanceRecommendation,
    byArea,
    details
  };
}

function getQuestionResultLabel(question, answer) {
  if (question.scored === false) return "No calificable";
  if (!answer || answer === "Sin responder") return "Omitida";
  return answer === question.correctAnswer ? "Correcta" : "Incorrecta";
}

function formatDateTime(value) {
  if (!value) return "No registrado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No registrado";
  return date.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function formatElapsedTime(startValue, endValue) {
  if (!startValue || !endValue) return "No registrado";
  const start = new Date(startValue).getTime();
  const end = new Date(endValue).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "No registrado";
  return formatSeconds(Math.round((end - start) / 1000));
}

function downloadPdfReport() {
  const result = buildResultData();
  const pdf = createChartPdf(result);
  const filename = getReportFileName(result);
  downloadBlob(filename, new Blob([pdf], { type: "application/pdf" }));
}

function getReportEmailInitialMessage() {
  if (!REPORT_EMAIL_ENDPOINT) {
    return `Envío automático pendiente de activar: pega la URL /exec de Google Apps Script en la constante REPORT_EMAIL_ENDPOINT. El informe se enviará al estudiante y a ${REPORT_INSTITUTION_EMAIL}, y quedará registrado para el análisis institucional de la ${INSTITUTION_NAME}.`;
  }
  return `Al finalizar, el informe se envía automáticamente al estudiante con PDF adjunto y enlace de Drive, y se envía copia institucional a ${REPORT_INSTITUTION_EMAIL}. Además, Google Sheets actualiza el análisis por estudiante, grupo y área.`;
}

function updateReportEmailStatus(message, kind = "info") {
  const status = document.getElementById("emailReportStatus");
  if (!status) return;
  status.textContent = message || "";
  status.dataset.kind = kind;
}

function getReportFileName(result) {
  return `informe-icfes-manuel-j-betancur-${slugify(result.studentName)}-${slugify(result.studentGroup)}.pdf`;
}

function buildReportEmailPayload(result, pdf) {
  return {
    version: REPORT_APP_VERSION,
    institutionName: result.institutionName,
    institutionEmail: REPORT_INSTITUTION_EMAIL,
    studentName: result.studentName,
    studentGroup: result.studentGroup,
    studentEmail: result.studentEmail,
    studentEmailRaw: result.studentEmail,
    sessionLabel: result.sessionLabel,
    sessionTitle: result.sessionTitle,
    scopeLabel: result.scopeLabel,
    modeLabel: result.modeLabel,
    startedAt: result.startedAt,
    finishedAt: result.finishedAt,
    finishedAtLabel: result.finishedAtLabel,
    elapsedLabel: result.elapsedLabel,
    totalQuestions: result.totalQuestions,
    answered: result.answered,
    scored: result.scored,
    correct: result.correct,
    incorrect: result.incorrect,
    omitted: result.omitted,
    score: result.score,
    performanceLevel: result.performanceLevel,
    performanceRecommendation: result.performanceRecommendation,
    byArea: result.byArea,
    details: result.details,
    pdfFileName: getReportFileName(result),
    pdfBase64: btoa(pdf)
  };
}

async function sendReportEmail({ automatic = false } = {}) {
  const result = buildResultData();
  const sendBtn = document.getElementById("sendPdfBtn");

  if (!REPORT_EMAIL_ENDPOINT) {
    const message = `No se pudo enviar todavía porque falta configurar la URL /exec de Google Apps Script. El informe debe enviarse al estudiante (${result.studentEmail}) y a ${REPORT_INSTITUTION_EMAIL}.`;
    updateReportEmailStatus(message, "warning");
    if (!automatic) {
      openActionDialog({
        title: "Activar envío automático",
        message: "La app ya está preparada para enviar el PDF por correo. Para activarlo, despliega el archivo google-apps-script/Code.gs como aplicación web y pega la URL /exec en REPORT_EMAIL_ENDPOINT dentro de app.js.",
        confirmText: "Entendido",
        cancelText: "Cerrar"
      });
    }
    return false;
  }

  try {
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = automatic ? "Enviando informe..." : "Enviando...";
    }
    updateReportEmailStatus(`Enviando informe PDF a ${result.studentEmail} y copia institucional a ${REPORT_INSTITUTION_EMAIL}...`, "info");

    const pdf = createChartPdf(result);
    const payload = buildReportEmailPayload(result, pdf);

    await submitReportPayloadToAppsScript(payload);

    updateReportEmailStatus(`Solicitud enviada al backend institucional. El sistema registrará el resultado en Google Sheets, actualizará el dashboard y enviará el informe. Revisa ${result.studentEmail}, ${REPORT_INSTITUTION_EMAIL}, la hoja Resultados y Apps Script > Ejecuciones.`, "success");
    return true;
  } catch (error) {
    updateReportEmailStatus("No fue posible enviar el informe. Verifica la conexión o la URL de Google Apps Script.", "error");
    return false;
  } finally {
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.textContent = "Enviar informe PDF";
    }
  }
}


function submitReportPayloadToAppsScript(payload) {
  const payloadText = JSON.stringify(payload);

  // Envío principal por formulario oculto. Es más estable con Google Apps Script
  // desde GitHub Pages o desde archivo local porque no depende de CORS.
  return new Promise(resolve => {
    const iframeName = `gasSubmitFrame_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.title = "Envío seguro del informe";
    iframe.style.position = "fixed";
    iframe.style.left = "-9999px";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = REPORT_EMAIL_ENDPOINT;
    form.target = iframeName;
    form.enctype = "application/x-www-form-urlencoded";
    form.style.display = "none";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "payload";
    input.value = payloadText;
    form.appendChild(input);

    let resolved = false;
    const cleanup = () => {
      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1000);
    };

    const finish = () => {
      if (resolved) return;
      resolved = true;
      cleanup();
      resolve(true);
    };

    iframe.addEventListener("load", finish, { once: true });
    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();

    // Algunos navegadores no disparan load en iframes con respuestas opacas de Apps Script.
    // El POST ya queda enviado; este respaldo permite continuar la experiencia del estudiante.
    setTimeout(finish, 3500);
  });
}

function buildPdfReportLines(result) {
  const lines = [
    "REPORTE DETALLADO - SIMULADOR ICFES SABER 11",
    `${result.institutionName}`,
    "",
    `Estudiante: ${result.studentName}`,
    `Grupo: ${result.studentGroup}`,
    `Correo: ${result.studentEmail}`,
    `Fecha de finalizacion: ${result.finishedAtLabel}`,
    `Seccion: ${result.sessionLabel} - ${result.sessionTitle}`,
    `Bloque o alcance: ${result.scopeLabel}`,
    `Modo: ${result.modeLabel}`,
    `Tiempo empleado: ${result.elapsedLabel}`,
    "",
    "RESUMEN GENERAL",
    `Preguntas disponibles: ${result.totalQuestions}`,
    `Preguntas calificables: ${result.scored}`,
    `Preguntas respondidas: ${result.answered}`,
    `Correctas: ${result.correct}`,
    `Incorrectas: ${result.incorrect}`,
    `Omitidas: ${result.omitted}`,
    `Porcentaje de acierto: ${result.score}%`,
    `Nivel de desempeno interno: ${result.performanceLevel}`,
    `Recomendacion: ${result.performanceRecommendation}`,
    "",
    "RESULTADO POR AREA"
  ];

  if (!result.byArea.length) {
    lines.push("No hay preguntas calificables disponibles.");
  } else {
    result.byArea.forEach(row => {
      lines.push(`${row.area}: ${row.correct}/${row.total} correctas | Respondidas: ${row.answered} | Incorrectas: ${row.incorrect} | Omitidas: ${row.omitted} | Resultado: ${row.percent}%`);
    });
  }

  return lines;
}

function createChartPdf(result) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.14, 0.33, 0.76],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    white: [1, 1, 1]
  };

  const ops = [];
  pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(ops, "INFORME DE RESULTADOS - SIMULADOR ICFES SABER 11", marginX, 804, 14.5, true, colors.primary);
  pdfText(ops, result.institutionName || INSTITUTION_NAME, marginX, 784, 11, true, colors.text);
  pdfText(ops, `Estudiante: ${result.studentName}`, marginX, 764, 11.5, true, colors.text);
  pdfText(ops, `Grupo: ${result.studentGroup} | Correo: ${result.studentEmail}`, marginX, 747, 9.5, false, colors.text, 92);
  pdfText(ops, `${result.sessionLabel} - ${result.sessionTitle} | ${result.scopeLabel}`, marginX, 731, 9.5, false, colors.muted);
  pdfText(ops, `Fecha: ${result.finishedAtLabel} | Modo: ${result.modeLabel} | Tiempo empleado: ${result.elapsedLabel}`, marginX, 716, 9.2, false, colors.muted, 92);
  pdfText(ops, `Nivel interno: ${result.performanceLevel}`, marginX, 701, 9.2, true, colors.primary);

  const cardY = 628;
  const cardW = 116;
  const cardGap = 10;
  const cards = [
    ["Acierto", `${result.score}%`, colors.primary],
    ["Correctas", String(result.correct), colors.accent],
    ["Incorrectas", String(result.incorrect), colors.danger],
    ["Omitidas", String(result.omitted), colors.warning]
  ];
  cards.forEach((card, index) => {
    const x = marginX + index * (cardW + cardGap);
    pdfRoundRect(ops, x, cardY, cardW, 58, 8, colors.panel, colors.line);
    pdfText(ops, card[0], x + 12, cardY + 37, 8.5, false, colors.muted);
    pdfText(ops, card[1], x + 12, cardY + 16, 20, true, card[2]);
  });

  // Bloque grafico general: se separan titulos, metadatos y barras para evitar superposiciones en el PDF.
  const summaryTitleY = 578;
  pdfText(ops, "RESUMEN GRAFICO GENERAL", marginX, summaryTitleY, 11.5, true, colors.text);
  pdfText(ops, `Preguntas calificables: ${result.scored} | Respondidas: ${result.answered} | Disponibles: ${result.totalQuestions}`, marginX, summaryTitleY - 24, 9.2, false, colors.muted);

  const scoreX = marginX;
  const scoreY = 508;
  const scoreW = rightX - marginX;
  pdfText(ops, `Porcentaje de acierto: ${result.score}%`, scoreX, scoreY + 31, 9.5, true, colors.text);
  pdfText(ops, `Recomendacion: ${result.performanceRecommendation}`, scoreX, scoreY - 15, 8.2, false, colors.muted, 112);
  pdfRect(ops, scoreX, scoreY, scoreW, 16, colors.line);
  pdfRect(ops, scoreX, scoreY, scoreW * Math.max(0, Math.min(result.score, 100)) / 100, 16, colors.primary);

  pdfText(ops, "Distribucion de respuestas", marginX, 472, 9.5, true, colors.text);
  const total = Math.max(result.scored, 1);
  let cursorX = marginX;
  const stackedY = 446;
  const stackedW = rightX - marginX;
  const segments = [
    ["Correctas", result.correct, colors.accent],
    ["Incorrectas", result.incorrect, colors.danger],
    ["Omitidas", result.omitted, colors.warning]
  ];
  pdfRect(ops, marginX, stackedY, stackedW, 18, colors.line);
  segments.forEach(segment => {
    const width = stackedW * segment[1] / total;
    if (width > 0) pdfRect(ops, cursorX, stackedY, width, 18, segment[2]);
    cursorX += width;
  });
  let labelY = 422;
  segments.forEach(segment => {
    const pct = Math.round((segment[1] / total) * 100);
    pdfRect(ops, marginX, labelY - 4, 8, 8, segment[2]);
    pdfText(ops, `${segment[0]}: ${segment[1]} (${pct}%)`, marginX + 14, labelY - 2, 9, false, colors.text);
    labelY -= 16;
  });

  let y = 360;
  pdfText(ops, "RESULTADO POR AREA", marginX, y, 11.5, true, colors.text);
  y -= 22;

  if (!result.byArea.length) {
    pdfText(ops, "No hay preguntas calificables disponibles para graficar.", marginX, y, 9.5, false, colors.muted);
  } else {
    result.byArea.forEach(row => {
      if (y < 90) return;
      pdfText(ops, `${row.area}`, marginX, y, 9.2, true, colors.text);
      pdfText(ops, `${row.correct}/${row.total} correctas | ${row.percent}% | ${row.level || getInternalPerformanceLevel(row.percent)}`, rightX - 186, y, 8.8, false, colors.text);
      const barY = y - 17;
      pdfRect(ops, marginX, barY, 400, 12, colors.line);
      pdfRect(ops, marginX, barY, 400 * Math.max(0, Math.min(row.percent, 100)) / 100, 12, colors.accent);
      y -= 42;
    });
  }

  y -= 8;
  pdfText(ops, "Nota: Este PDF resume el desempeno individual de la Institucion Educativa Manuel J. Betancur. Google Sheets consolida el informe general por estudiante, grupo y area. La revision detallada por pregunta se conserva en la pagina de resultados.", marginX, Math.max(y, 70), 8.5, false, colors.muted, 92);
  pdfText(ops, "Pagina 1 de 1", marginX, 30, 8, false, colors.muted);

  return buildPdfFromStreams([ops.join("\n")], pageWidth, pageHeight);
}

function buildPdfFromStreams(streams, pageWidth = 595.28, pageHeight = 841.89) {
  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const kids = [];
  streams.forEach((stream, index) => {
    const pageObj = 5 + index * 2;
    const contentObj = pageObj + 1;
    kids.push(`${pageObj} 0 R`);
    objects[pageObj] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${streams.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function pdfText(ops, text, x, y, size = 9.5, bold = false, color = [0, 0, 0], maxChars = 0) {
  const safe = pdfSafeText(text);
  const lines = maxChars ? wrapPdfLine(safe, maxChars) : [safe];
  lines.forEach((line, index) => {
    const yy = y - index * (size + 3);
    ops.push(`${color.map(formatPdfNumber).join(" ")} rg`);
    ops.push("BT");
    ops.push(`/${bold ? "F2" : "F1"} ${formatPdfNumber(size)} Tf`);
    ops.push(`1 0 0 1 ${formatPdfNumber(x)} ${formatPdfNumber(yy)} Tm (${escapePdfText(line)}) Tj`);
    ops.push("ET");
  });
}

function pdfRect(ops, x, y, width, height, fill = [0, 0, 0], stroke = null) {
  ops.push(`${fill.map(formatPdfNumber).join(" ")} rg`);
  if (stroke) ops.push(`${stroke.map(formatPdfNumber).join(" ")} RG`);
  ops.push(`${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re ${stroke ? "B" : "f"}`);
}

function pdfRoundRect(ops, x, y, width, height, radius, fill, stroke = null) {
  // Rectangulo simple con esquinas visualmente limpias para mantener compatibilidad PDF basica.
  pdfRect(ops, x, y, width, height, fill, stroke);
}

function formatPdfNumber(value) {
  return Number(value).toFixed(3).replace(/\.000$/, "");
}


function createSimplePdf(lines) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const topY = 800;
  const lineHeight = 13;
  const maxChars = 92;
  const maxLinesPerPage = 55;
  const normalizedLines = [];

  lines.forEach(line => {
    const wrapped = wrapPdfLine(pdfSafeText(line), maxChars);
    if (!wrapped.length) normalizedLines.push("");
    else normalizedLines.push(...wrapped);
  });

  const pages = [];
  for (let i = 0; i < normalizedLines.length; i += maxLinesPerPage) {
    pages.push(normalizedLines.slice(i, i + maxLinesPerPage));
  }
  if (!pages.length) pages.push(["Reporte sin datos"]);

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const kids = [];
  pages.forEach((pageLines, index) => {
    const pageObj = 5 + index * 2;
    const contentObj = pageObj + 1;
    kids.push(`${pageObj} 0 R`);
    const stream = buildPdfPageStream(pageLines, index + 1, pages.length, marginX, topY, lineHeight);
    objects[pageObj] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pages.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function buildPdfPageStream(lines, pageNumber, totalPages, marginX, topY, lineHeight) {
  const ops = ["BT"];
  lines.forEach((line, index) => {
    const y = topY - index * lineHeight;
    const isTitle = pageNumber === 1 && index === 0;
    const isSection = /^[A-Z0-9 ]{5,}$/.test(line) && line.length < 48 && index !== 0;
    ops.push(`${isTitle || isSection ? "/F2" : "/F1"} ${isTitle ? 15 : isSection ? 11 : 9.5} Tf`);
    ops.push(`1 0 0 1 ${marginX} ${y} Tm (${escapePdfText(line)}) Tj`);
  });
  ops.push(`/F1 8 Tf`);
  ops.push(`1 0 0 1 ${marginX} 30 Tm (Pagina ${pageNumber} de ${totalPages}) Tj`);
  ops.push("ET");
  return ops.join("\n");
}

function wrapPdfLine(text, maxChars) {
  const clean = String(text || "");
  if (!clean) return [""];
  const words = clean.split(/\s+/);
  const lines = [];
  let current = "";
  words.forEach(word => {
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function pdfSafeText(value) {
  return String(value ?? "")
    .replace(/–|—/g, "-")
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ");
}

function escapePdfText(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function slugify(value) {
  const slug = pdfSafeText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "estudiante";
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

init();
