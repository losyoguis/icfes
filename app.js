const EXAM_STRUCTURE = [
  {
    id: 1,
    label: "Sección 1",
    title: "Primera sesión",
    durationMinutes: 270,
    totalQuestions: 131,
    description: "Primera sesión del simulacro, organizada en Matemáticas, Lectura Crítica, Sociales y Ciudadanas, Ciencias Naturales y Cuestionario socioeconómico.",
    blocks: [
      { block: 1, from: 1, to: 25, area: "Matemáticas", scored: true },
      { block: 2, from: 26, to: 66, area: "Lectura Crítica", scored: true },
      { block: 3, from: 67, to: 91, area: "Sociales y Ciudadanas", scored: true },
      { block: 4, from: 92, to: 120, area: "Ciencias Naturales", scored: true },
      { block: 5, from: 121, to: 131, area: "Cuestionario socioeconómico", scored: false }
    ]
  },
  {
    id: 2,
    label: "Sección 2",
    title: "Segunda sesión",
    durationMinutes: 270,
    totalQuestions: 147,
    description: "Segunda sesión del simulacro. En el material visible se observan Sociales y Ciudadanas, Matemáticas, Ciencias Naturales e Inglés hasta la pregunta 134; las preguntas 135 a 147 quedan como bloque pendiente por clasificar.",
    blocks: [
      { block: 1, from: 1, to: 28, area: "Sociales y Ciudadanas", scored: true },
      { block: 2, from: 29, to: 50, area: "Matemáticas", scored: true },
      { block: 3, from: 51, to: 79, area: "Ciencias Naturales", scored: true },
      { block: 4, from: 80, to: 134, area: "Inglés", scored: true },
      { block: 5, from: 135, to: 147, area: "Pendiente por clasificar", scored: false, note: "Posible cuestionario socioeconómico o cierre no visible en el material entregado." }
    ]
  }
];

const STORAGE_KEY = "simulador_icfes_saber11_estado_v2";
const HISTORY_KEY = "simulador_icfes_saber11_historial_v2";

const app = document.getElementById("app");
const homeBtn = document.getElementById("homeBtn");
const themeBtn = document.getElementById("themeBtn");

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
  remainingSeconds: 0,
  finished: false
};

function init() {
  const savedTheme = localStorage.getItem("simulador_icfes_theme") || "light";
  document.documentElement.dataset.theme = savedTheme;
  themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  renderHome();
  bindGlobalEvents();
}

function bindGlobalEvents() {
  homeBtn.addEventListener("click", () => {
    if (state.screen === "exam" && !state.finished) {
      const leave = confirm("¿Deseas volver al inicio? El intento actual se conservará en este navegador.");
      if (!leave) return;
      saveState();
    }
    clearTimer();
    renderHome();
  });

  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("simulador_icfes_theme", next);
  });
}

function renderHome() {
  clearTimer();
  state.screen = "home";
  homeBtn.classList.add("hidden");
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Estructura del material</p>
      <h2>Simulador ICFES Saber 11° por sesiones, bloques y áreas</h2>
      <p>
        Selecciona una sesión completa o un bloque específico. El sistema conserva la estructura general del material:
        Primera sesión con 131 preguntas y Segunda sesión con 147 preguntas. Por ahora están cargadas las preguntas 1 a 25 de la Sección 1, área Matemáticas.
      </p>
      <div class="hero-grid">
        <div class="stat"><strong>2</strong><span>sesiones configuradas</span></div>
        <div class="stat"><strong>270 min</strong><span>por sesión completa</span></div>
        <div class="stat"><strong>278</strong><span>preguntas estructuradas</span></div>
        <div class="stat"><strong>${QUESTION_BANK.length}</strong><span>preguntas cargadas</span></div>
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


    <section class="tips-section" id="tips">
      <div class="tips-header">
        <div>
          <p class="eyebrow">Guía rápida</p>
          <h2>TIPS</h2>
        </div>
        <span class="pill success">Estructura + tipos de pregunta</span>
      </div>

      <div class="tips-content">
        <article class="tip-card tip-card--wide">
          <h3>1. Estructura general del material</h3>
          <h4>Sección 1: Primera sesión</h4>
          <p>En la portada se identifican las áreas:</p>
          <ul>
            <li>Matemáticas</li>
            <li>Lectura Crítica</li>
            <li>Sociales y Ciudadanas</li>
            <li>Ciencias Naturales</li>
          </ul>
          <p>También aparece una duración de <strong>4 horas y 30 minutos</strong> y un total de <strong>131 preguntas</strong>.</p>
          <p>La distribución visible es aproximadamente:</p>
          <div class="table-wrap tips-table-wrap">
            <table class="structure-table">
              <thead>
                <tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>1 a 25</td><td>Matemáticas</td></tr>
                <tr><td>2</td><td>26 a 66</td><td>Lectura Crítica</td></tr>
                <tr><td>3</td><td>67 a 91</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>4</td><td>92 a 120</td><td>Ciencias Naturales</td></tr>
                <tr><td>5</td><td>121 a 131</td><td>Cuestionario socioeconómico</td></tr>
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
          <p>También aparece una duración de <strong>4 horas y 30 minutos</strong> y un total de <strong>147 preguntas</strong>.</p>
          <p>En el archivo visible se observa esta distribución:</p>
          <div class="table-wrap tips-table-wrap">
            <table class="structure-table">
              <thead>
                <tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>1 a 28</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>2</td><td>29 a 50</td><td>Matemáticas</td></tr>
                <tr><td>3</td><td>51 a 79</td><td>Ciencias Naturales</td></tr>
                <tr><td>4</td><td>80 a 134</td><td>Inglés</td></tr>
              </tbody>
            </table>
          </div>
          <p class="tip-note">El archivo de la segunda sección llega hasta la pregunta 134 y luego aparece una página en blanco; por eso es posible que falten páginas del cuestionario socioeconómico o parte final del material.</p>
        </article>

        <article class="tip-card tip-card--wide">
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
    </section>

    <section class="session-grid" id="sessionGrid"></section>
  `;

  document.querySelectorAll('input[name="mode"]').forEach(input => {
    input.addEventListener("change", event => {
      state.mode = event.target.value;
    });
  });

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
      <span class="pill success">Cargadas: ${loadedTotal}</span>
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
      <button class="secondary-btn" type="button" data-action="structure" data-session="${session.id}">Ver estructura</button>
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
      if (action === "structure") showStructure(sessionId);
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
            <tr><th>Bloque</th><th>Preguntas</th><th>Área</th><th>Calificable</th><th>Cargadas</th></tr>
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
}

function startScope(scope) {
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
    remainingSeconds: state.mode === "entrenamiento" ? 0 : session.durationMinutes * 60,
    finished: false
  };

  homeBtn.classList.remove("hidden");
  saveState();
  renderExam();
  if (state.mode !== "entrenamiento") startTimer();
}

function renderExam() {
  const session = getSession(state.sessionId);
  const loaded = state.availableNumbers.length;

  if (!loaded) {
    clearTimer();
    app.innerHTML = `
      <section class="empty-state">
        <p class="eyebrow">${session.label} · ${state.scope.label}</p>
        <h2>Este bloque todavía no tiene preguntas cargadas</h2>
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
              <span class="pill success">Cargadas: ${loaded}</span>
              <span class="pill muted">Rango: ${state.scope.from}-${state.scope.to}</span>
            </div>
          </div>
          <div class="timer-box">
            <div class="timer" id="timerText">${state.mode === "entrenamiento" ? "Sin tiempo" : formatSeconds(state.remainingSeconds)}</div>
            <span class="timer-label">${state.mode === "entrenamiento" ? "Entrenamiento" : "Tiempo restante"}</span>
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-text"><span>Respondidas: ${answeredCount}/${loaded}</span><span>${progress}%</span></div>
          <div class="progress-bar"><span style="width:${progress}%"></span></div>
        </div>
        <div class="question-card" id="questionCard"></div>
      </article>

      <aside class="exam-side" aria-label="Navegación de preguntas">
        <h3 class="side-title">Panel de preguntas</h3>
        <div class="legend">
          <span class="answered"><i></i>Respondida</span>
          <span class="marked"><i></i>Marcada para revisar</span>
          <span class="pending"><i></i>Cargada pendiente</span>
          <span class="missing"><i></i>No cargada todavía</span>
        </div>
        <div class="question-grid" id="questionGrid"></div>
        <p class="side-note">El panel conserva la numeración oficial del bloque. Las preguntas rayadas están reservadas para cuando sean adicionadas.</p>
      </aside>
    </section>
  `;

  renderQuestion(question);
  renderQuestionGrid();
  app.focus();
}

function renderQuestion(question) {
  const key = getAnswerKey(question.number);
  const selected = state.answers[key] || "";
  const showFeedback = state.mode === "practica" && selected;
  const card = document.getElementById("questionCard");
  const resources = renderResources(question.resources || []);
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
        <button class="nav-btn secondary-btn" type="button" id="prevBtn">Anterior cargada</button>
        <button class="nav-btn secondary-btn" type="button" id="nextBtn">Siguiente cargada</button>
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
      renderExam();
    });
  });

  document.getElementById("markBtn").addEventListener("click", () => {
    state.marked[key] = !state.marked[key];
    saveState();
    renderExam();
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
    if (resource.type === "html") return `<div class="question-resource">${resource.html}</div>`;
    return "";
  }).join("");
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
      renderExam();
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
  renderExam();
}

function finishAttempt() {
  const loaded = state.availableNumbers.length;
  const answered = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const confirmText = answered < loaded
    ? `Has respondido ${answered} de ${loaded} preguntas cargadas. ¿Deseas finalizar?`
    : "¿Deseas finalizar el intento?";
  if (!confirm(confirmText)) return;

  clearTimer();
  state.finished = true;
  saveAttemptToHistory();
  localStorage.removeItem(STORAGE_KEY);
  renderResults();
}

function renderResults() {
  const session = getSession(state.sessionId);
  const loadedQuestions = state.availableNumbers.map(number => getQuestion(state.sessionId, number)).filter(Boolean);
  const scored = loadedQuestions.filter(q => q.scored !== false);
  const answered = loadedQuestions.filter(q => state.answers[getAnswerKey(q.number)]).length;
  const correct = scored.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
  const incorrect = scored.filter(q => state.answers[getAnswerKey(q.number)] && state.answers[getAnswerKey(q.number)] !== q.correctAnswer).length;
  const omitted = scored.length - correct - incorrect;
  const score = scored.length ? Math.round((correct / scored.length) * 100) : 0;

  const byArea = groupBy(scored, q => q.area);
  const areaRows = Object.entries(byArea).map(([area, questions]) => {
    const c = questions.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
    const pct = questions.length ? Math.round((c / questions.length) * 100) : 0;
    return `<tr><td>${area}</td><td>${questions.length}</td><td>${c}</td><td>${pct}%</td></tr>`;
  }).join("");

  const review = loadedQuestions.map(q => {
    const ans = state.answers[getAnswerKey(q.number)] || "Sin responder";
    const ok = q.scored === false ? "No calificable" : ans === q.correctAnswer ? "Correcta" : "Incorrecta";
    return `
      <div class="review-item">
        <strong>Pregunta ${q.number} · ${q.area}</strong>
        <p>Tu respuesta: ${ans} · Respuesta correcta: ${q.correctAnswer || "No aplica"} · ${ok}</p>
        <p>${q.explanation || "Sin explicación registrada."}</p>
      </div>
    `;
  }).join("");

  app.innerHTML = `
    <section class="results-panel">
      <div class="result-top">
        <div>
          <p class="eyebrow">Resultados</p>
          <h2>${session.label} · ${state.scope.label}</h2>
        </div>
        <span class="pill success">Puntaje interno: ${score}%</span>
      </div>

      <div class="result-grid">
        <div class="result-card"><strong>${score}%</strong><span>Porcentaje de acierto</span></div>
        <div class="result-card"><strong>${correct}</strong><span>Correctas</span></div>
        <div class="result-card"><strong>${incorrect}</strong><span>Incorrectas</span></div>
        <div class="result-card"><strong>${omitted}</strong><span>Omitidas</span></div>
      </div>

      <div class="table-wrap">
        <table class="structure-table">
          <thead><tr><th>Área</th><th>Preguntas cargadas</th><th>Correctas</th><th>Resultado</th></tr></thead>
          <tbody>${areaRows || `<tr><td colspan="4">No hay preguntas calificables cargadas.</td></tr>`}</tbody>
        </table>
      </div>

      <div class="session-actions">
        <button class="primary-btn" type="button" id="newAttemptBtn">Nuevo intento</button>
        <button class="secondary-btn" type="button" id="downloadCsvBtn">Descargar resultados CSV</button>
        <button class="secondary-btn" type="button" id="downloadTxtBtn">Descargar reporte TXT</button>
      </div>

      <h3 style="margin-top:24px">Revisión</h3>
      <div class="review-list">${review}</div>
    </section>
  `;

  document.getElementById("newAttemptBtn").addEventListener("click", renderHome);
  document.getElementById("downloadCsvBtn").addEventListener("click", downloadCsv);
  document.getElementById("downloadTxtBtn").addEventListener("click", downloadTxtReport);
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
      saveAttemptToHistory();
      localStorage.removeItem(STORAGE_KEY);
      renderResults();
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

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function resumeSavedAttempt() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    alert("No hay un intento guardado en este navegador.");
    return;
  }
  try {
    const saved = JSON.parse(raw);
    const session = getSession(saved.sessionId);
    if (!session) throw new Error("Sesión no encontrada");
    state = { ...state, ...saved, finished: false };
    homeBtn.classList.remove("hidden");
    renderExam();
    if (state.mode !== "entrenamiento") startTimer();
  } catch (error) {
    alert("No fue posible recuperar el intento guardado.");
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveAttemptToHistory() {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  history.unshift({
    date: new Date().toISOString(),
    sessionId: state.sessionId,
    scope: state.scope,
    answers: state.answers,
    marked: state.marked,
    mode: state.mode,
    startedAt: state.startedAt,
    finishedAt: new Date().toISOString()
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function downloadCsv() {
  const questions = state.availableNumbers.map(number => getQuestion(state.sessionId, number)).filter(Boolean);
  const lines = ["Sesion,Area,Pregunta,Respuesta_usuario,Respuesta_correcta,Resultado"];
  questions.forEach(q => {
    const ans = state.answers[getAnswerKey(q.number)] || "";
    const result = q.scored === false ? "No calificable" : ans === q.correctAnswer ? "Correcta" : ans ? "Incorrecta" : "Omitida";
    lines.push([state.sessionId, q.area, q.number, ans, q.correctAnswer || "", result].map(csvEscape).join(","));
  });
  downloadFile("resultados-simulador-icfes.csv", lines.join("\n"), "text/csv;charset=utf-8");
}

function downloadTxtReport() {
  const questions = state.availableNumbers.map(number => getQuestion(state.sessionId, number)).filter(Boolean);
  const scored = questions.filter(q => q.scored !== false);
  const correct = scored.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
  const lines = [
    "REPORTE DEL SIMULADOR ICFES SABER 11°",
    `Fecha: ${new Date().toLocaleString()}`,
    `Sección: ${state.sessionId}`,
    `Bloque: ${state.scope.label}`,
    `Modo: ${getModeLabel(state.mode)}`,
    `Preguntas cargadas: ${questions.length}`,
    `Resultado: ${scored.length ? Math.round((correct / scored.length) * 100) : 0}%`,
    "",
    "DETALLE",
    ...questions.map(q => {
      const ans = state.answers[getAnswerKey(q.number)] || "Sin responder";
      return `Pregunta ${q.number} (${q.area}) | Usuario: ${ans} | Correcta: ${q.correctAnswer || "No aplica"}`;
    })
  ];
  downloadFile("reporte-simulador-icfes.txt", lines.join("\n"), "text/plain;charset=utf-8");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
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
