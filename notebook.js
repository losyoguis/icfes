const NOTEBOOK_APP = document.getElementById("notebookApp");
const NOTEBOOK_INSTITUTION = "Institución Educativa Manuel J. Betancur";
const NOTEBOOK_RESOURCE_TYPES = [
  { key: "mindmap", label: "Mapa mental", icon: "🧠" },
  { key: "video", label: "Video", icon: "🎬" },
  { key: "audio", label: "Audio", icon: "🎧" },
  { key: "presentation", label: "Presentación", icon: "📊" },
  { key: "infographic", label: "Infografía", icon: "🖼️" }
];

const NOTEBOOK_CUSTOM_RESOURCES = {
  "1-1": {
    mindmap: {
      title: "Mapa mental · Sección 1 - Matemáticas - Pregunta 1",
      description: "Mapa mental individual para organizar los datos de la tabla y preparar la comprensión de la pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1unEMah3-QKQ4ft7U3aLLU418dTfVjYql/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    video: {
      title: "Video de preparación · Sección 1 - Matemáticas - Pregunta 1",
      description: "Video individual de preparación para la Sección 1 · Matemáticas · Pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1WjJl5tmp1XrmCs1cPgbNR7ZvytTjtSTZ/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    audio: {
      title: "Audio de preparación · Sección 1 - Matemáticas - Pregunta 1",
      description: "Audio individual de orientación para comprender la pregunta 1 de Matemáticas antes de responder.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1zOmudVfmN--MEAL-sqSEqRSZO-_v80oY/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    presentation: {
      title: "Presentación de estudio · Sección 1 - Matemáticas - Pregunta 1",
      description: "Presentación individual de apoyo para preparar la pregunta 1 de Matemáticas.",
      embedHtml: `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQtCZB-sV6wIeQgnRHzcZoO7K4PR45ZpZ4E-6q_GXPJtiixGzv6Ql6XKwh8q0_Kiw/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="1707" height="989" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
    },
    infographic: {
      title: "Infografía · Sección 1 - Matemáticas - Pregunta 1",
      description: "Infografía individual para sintetizar visualmente la información de la pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1crO89zIz6JyP3gvLHhi0g2m77fMedXpp/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    }
  }
};

let notebookState = {
  question: null,
  activeResource: "mindmap",
  session: 2,
  questionNumber: 1,
  returnUrl: "index.html"
};

initNotebook();

function initNotebook() {
  initNotebookTheme();
  const params = new URLSearchParams(window.location.search);
  const session = Number(params.get("session") || 2);
  const questionNumber = Number(params.get("question") || 1);
  const resource = params.get("resource") || "mindmap";
  const returnParam = params.get("return") || "";
  const question = findNotebookQuestion(session, questionNumber);
  notebookState.session = session;
  notebookState.questionNumber = questionNumber;
  notebookState.returnUrl = buildReturnToQuestionUrl(session, questionNumber, returnParam);
  notebookState.question = question;
  notebookState.activeResource = NOTEBOOK_RESOURCE_TYPES.some(item => item.key === resource) ? resource : "mindmap";
  configureReturnButtons();
  renderNotebook();
}

function configureReturnButtons() {
  const returnBtn = document.getElementById("returnQuestionHeaderBtn");
  if (returnBtn) returnBtn.href = notebookState.returnUrl || "index.html";
}

function initNotebookTheme() {
  const storedTheme = localStorage.getItem("simulador_icfes_tema") || "dark";
  document.body.dataset.theme = storedTheme;
  const themeBtn = document.getElementById("themeBtn");
  if (!themeBtn) return;
  themeBtn.textContent = storedTheme === "light" ? "🌙" : "☀️";
  themeBtn.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("simulador_icfes_tema", nextTheme);
    themeBtn.textContent = nextTheme === "light" ? "🌙" : "☀️";
  });
}

function buildReturnToQuestionUrl(session, questionNumber, returnParam) {
  if (returnParam) {
    try {
      const decoded = decodeURIComponent(returnParam);
      if (decoded && !/^https?:\/\//i.test(decoded)) return decoded;
    } catch (error) {
      // Si el parámetro llega mal codificado, se usa el retorno seguro al simulador.
    }
  }
  const params = new URLSearchParams();
  params.set("volverPregunta", "1");
  params.set("session", String(session || 2));
  params.set("question", String(questionNumber || 1));
  params.set("mode", "practica");
  return `index.html?${params.toString()}`;
}

function getNotebookQuestionBank() {
  if (Array.isArray(window.QUESTION_BANK)) return window.QUESTION_BANK;
  try {
    if (typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK)) return QUESTION_BANK;
  } catch (error) {
    // En algunos navegadores, el banco puede no estar disponible como propiedad de window
    // porque fue declarado con const en question-bank.js. Este fallback evita que
    // Notebook muestre "No se encontró la pregunta" cuando el banco sí está cargado.
  }
  return [];
}

function findNotebookQuestion(session, number) {
  const bank = getNotebookQuestionBank();
  return bank.find(item => Number(item.session) === Number(session) && Number(item.number) === Number(number)) || null;
}

function renderNotebook() {
  const question = notebookState.question;
  if (!question) {
    const returnUrl = escapeHtml(notebookState.returnUrl || "index.html");
    NOTEBOOK_APP.innerHTML = `
      <section class="empty-state notebook-empty-state">
        <p class="eyebrow">Notebook</p>
        <h2>No se encontró la pregunta solicitada</h2>
        <p>Regresa directamente a la pregunta desde la que abriste el Notebook.</p>
        <div class="notebook-empty-actions">
          <a class="primary-btn header-link" href="${returnUrl}">Volver a la pregunta</a>
        </div>
      </section>
    `;
    return;
  }

  const resourceTabs = NOTEBOOK_RESOURCE_TYPES.map(item => `
    <button class="notebook-tab ${item.key === notebookState.activeResource ? "active" : ""}" type="button" data-resource="${item.key}">
      <span>${item.icon}</span>${item.label}
    </button>
  `).join("");

  NOTEBOOK_APP.innerHTML = `
    <section class="notebook-hero">
      <div>
        <p class="eyebrow">${NOTEBOOK_INSTITUTION}</p>
        <h2>Preparación guiada para la pregunta ${question.number}</h2>
        <p>Este espacio acompaña el modo <strong>Práctica con Notebook</strong>. Cada pregunta tiene su propio conjunto de recursos: mapa mental, video, audio, presentación e infografía.</p>
      </div>
      <div class="notebook-badge">
        <span>Área</span>
        <strong>${escapeHtml(question.area || "Por definir")}</strong>
      </div>
    </section>

    <section class="notebook-question-summary">
      <div>
        <p class="eyebrow">Referencia de la pregunta</p>
        <h3>${escapeHtml(question.sourceLabel || `Pregunta ${question.number}`)}</h3>
        <p class="notebook-stem">${question.stem || ""}</p>
        <p class="prompt">${question.prompt || ""}</p>
      </div>
      <div class="notebook-metadata-grid">
        <span><strong>Competencia</strong>${escapeHtml(question.competencia || "Por definir")}</span>
        <span><strong>Componente</strong>${escapeHtml(question.componente || "Por definir")}</span>
        <span><strong>Dificultad</strong>${escapeHtml(question.dificultad || "Por definir")}</span>
      </div>
    </section>

    <section class="notebook-tabs" aria-label="Recursos Notebook individuales de la pregunta">
      ${resourceTabs}
    </section>

    <section id="notebookResource" class="notebook-resource-panel"></section>
  `;

  NOTEBOOK_APP.querySelectorAll(".notebook-tab").forEach(button => {
    button.addEventListener("click", () => {
      notebookState.activeResource = button.dataset.resource;
      const params = new URLSearchParams(window.location.search);
      params.set("resource", notebookState.activeResource);
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
      renderNotebookResource();
      NOTEBOOK_APP.querySelectorAll(".notebook-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.resource === notebookState.activeResource));
    });
  });

  renderNotebookResource();
  NOTEBOOK_APP.focus();
}

function renderNotebookResource() {
  const panel = document.getElementById("notebookResource");
  if (!panel || !notebookState.question) return;
  const question = notebookState.question;
  const resource = notebookState.activeResource;
  const customResource = getCustomNotebookResource(question, resource);
  const content = customResource ? renderCustomNotebookResource(question, resource, customResource) : ({
    mindmap: renderMindMap(question),
    video: renderVideoLesson(question),
    audio: renderAudioGuide(question),
    presentation: renderPresentation(question),
    infographic: renderInfographic(question)
  }[resource] || renderMindMap(question));
  panel.innerHTML = content;
  const playBtn = document.getElementById("playAudioGuideBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => playAudioGuide(buildAudioGuide(question)));
  }
}

function getCustomNotebookResource(question, resourceKey) {
  const key = `${Number(question.session)}-${Number(question.number)}`;
  const questionResources = NOTEBOOK_CUSTOM_RESOURCES[key];
  return questionResources ? questionResources[resourceKey] : null;
}

function renderCustomNotebookResource(question, resourceKey, resource) {
  const resourceMeta = NOTEBOOK_RESOURCE_TYPES.find(item => item.key === resourceKey) || { label: "Recurso", icon: "📌" };
  const embed = resource.embedHtml ? `
    <div class="notebook-embed-wrap" aria-label="${escapeHtml(resource.title || resourceMeta.label)}">
      ${resource.embedHtml}
    </div>
  ` : "";
  const link = resource.url ? `
    <a class="secondary-btn" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener">Abrir recurso en una pestaña nueva</a>
  ` : "";
  return `
    <article class="notebook-card large notebook-custom-resource">
      <p class="eyebrow">${escapeHtml(resourceMeta.icon)} ${escapeHtml(resourceMeta.label)} · Recurso individual</p>
      <h3>${escapeHtml(resource.title || `${resourceMeta.label} de preparación · Pregunta ${question.number}`)}</h3>
      <p>${escapeHtml(resource.description || "Material multimedia cargado específicamente para esta pregunta.")}</p>
      ${embed}
      ${link}
      <p class="footer-note">Este recurso pertenece únicamente a la Sección ${escapeHtml(question.session)} · Pregunta ${escapeHtml(question.number)}.</p>
    </article>
  `;
}

function renderMindMap(question) {
  const topic = getTopicLabel(question);
  const nodes = [
    { title: "Área", value: question.area || "Por definir" },
    { title: "Competencia", value: question.competencia || "Comprensión y análisis" },
    { title: "Componente", value: question.componente || "Conceptos clave" },
    { title: "Acción mental", value: getActionVerb(question) },
    { title: "Estrategia", value: getStrategy(question) }
  ];
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 1</p>
      <h3>Mapa mental de preparación</h3>
      <p>Identifica qué debes leer, relacionar y decidir antes de elegir una opción.</p>
      <div class="mindmap">
        <div class="mindmap-center">
          <span>Pregunta ${question.number}</span>
          <strong>${escapeHtml(topic)}</strong>
        </div>
        ${nodes.map(node => `
          <div class="mindmap-node">
            <small>${escapeHtml(node.title)}</small>
            <strong>${escapeHtml(node.value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderVideoLesson(question) {
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 2</p>
      <h3>Video guía para preparar la pregunta</h3>
      <div class="video-placeholder" role="img" aria-label="Espacio de video pedagógico">
        <div class="play-circle">▶</div>
        <div>
          <strong>Video de preparación · Pregunta ${question.number}</strong>
          <span>Espacio listo para alojar o enlazar un video institucional.</span>
        </div>
      </div>
      <div class="lesson-script">
        <h4>Guion sugerido del video</h4>
        <ol>
          <li>Lee el enunciado y ubica la intención de la pregunta.</li>
          <li>Reconoce el área: <strong>${escapeHtml(question.area || "Por definir")}</strong>.</li>
          <li>Identifica palabras clave del componente: <strong>${escapeHtml(question.componente || "Por definir")}</strong>.</li>
          <li>Descarta opciones que no respondan directamente al enunciado.</li>
          <li>Selecciona la alternativa que mejor se sostenga con la información dada.</li>
        </ol>
      </div>
    </article>
  `;
}

function renderAudioGuide(question) {
  const guide = buildAudioGuide(question);
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 3</p>
      <h3>Audio de orientación</h3>
      <p>Usa esta guía breve para preparar la lectura de la pregunta sin revelar la respuesta correcta.</p>
      <button class="primary-btn" type="button" id="playAudioGuideBtn">Reproducir audio guía</button>
      <blockquote class="audio-script">${escapeHtml(guide)}</blockquote>
    </article>
  `;
}

function renderPresentation(question) {
  const slides = [
    { title: "1. Comprende", text: "Lee el enunciado completo y reconoce qué te están preguntando." },
    { title: "2. Clasifica", text: `Área: ${question.area || "Por definir"}. Competencia: ${question.competencia || "Por definir"}.` },
    { title: "3. Relaciona", text: `Conecta el enunciado con el componente: ${question.componente || "Por definir"}.` },
    { title: "4. Decide", text: "Compara las opciones y elige la que responda con mayor precisión." }
  ];
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 4</p>
      <h3>Presentación de estudio</h3>
      <div class="slide-grid">
        ${slides.map(slide => `
          <section class="mini-slide">
            <h4>${escapeHtml(slide.title)}</h4>
            <p>${escapeHtml(slide.text)}</p>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderInfographic(question) {
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 5</p>
      <h3>Infografía de preparación</h3>
      <div class="infographic-grid">
        <div><strong>1</strong><span>Lee</span><small>Comprende el contexto antes de mirar opciones.</small></div>
        <div><strong>2</strong><span>Subraya</span><small>Ubica datos, verbos, conectores y palabras clave.</small></div>
        <div><strong>3</strong><span>Compara</span><small>Contrasta cada opción con el enunciado.</small></div>
        <div><strong>4</strong><span>Verifica</span><small>Confirma que tu respuesta resuelva exactamente lo pedido.</small></div>
      </div>
      <p class="footer-note">Dificultad estimada: ${escapeHtml(question.dificultad || "Por definir")} · Recurso diseñado para práctica formativa.</p>
    </article>
  `;
}

function buildAudioGuide(question) {
  return `Pregunta ${question.number}. Antes de responder, identifica el área ${question.area || "por definir"}, revisa el componente ${question.componente || "por definir"} y determina qué información del enunciado permite justificar la opción. No elijas por descarte rápido: compara cada alternativa con la intención de la pregunta.`;
}

function playAudioGuide(text) {
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no permite reproducir audio por síntesis de voz. Puedes leer el guion en pantalla.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-CO";
  utterance.rate = 0.94;
  window.speechSynthesis.speak(utterance);
}

function getTopicLabel(question) {
  const area = question.area || "ICFES";
  const component = question.componente || question.competencia || "habilidad evaluada";
  return `${area}: ${component}`;
}

function getActionVerb(question) {
  const text = `${question.prompt || ""} ${question.stem || ""}`.toLowerCase();
  if (text.includes("purpose") || text.includes("propósito")) return "Identificar propósito";
  if (text.includes("according") || text.includes("de acuerdo")) return "Localizar evidencia";
  if (text.includes("infer") || text.includes("inferir")) return "Inferir";
  if (text.includes("title") || text.includes("título")) return "Sintetizar idea central";
  if (text.includes("mean") || text.includes("significa")) return "Interpretar significado";
  return "Analizar y justificar";
}

function getStrategy(question) {
  const area = String(question.area || "").toLowerCase();
  if (area.includes("inglés")) return "Lee conectores, intención y contexto antes de traducir palabra por palabra.";
  if (area.includes("matem")) return "Identifica datos, relación matemática y operación necesaria.";
  if (area.includes("lectura")) return "Ubica tesis, intención comunicativa e información explícita e implícita.";
  if (area.includes("sociales")) return "Relaciona situación, actor social, norma o contexto histórico.";
  if (area.includes("ciencias")) return "Reconoce fenómeno, variable y explicación científica.";
  return "Vuelve al enunciado y justifica la respuesta con evidencia.";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
