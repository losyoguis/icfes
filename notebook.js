const NOTEBOOK_APP = document.getElementById("notebookApp");
const NOTEBOOK_INSTITUTION = "Institución Educativa Manuel J. Betancur";
const NOTEBOOK_RESOURCE_TYPES = [
  { key: "mindmap", label: "Mapa mental", icon: "🧠" },
  { key: "video", label: "Video", icon: "🎬" },
  { key: "audio", label: "Audio", icon: "🎧" },
  { key: "presentation", label: "Presentación", icon: "📊" },
  { key: "infographic", label: "Infografía", icon: "🖼️" },
  { key: "simulator", label: "Simulador", icon: "🧩" }
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
    },
    simulator: {
      title: "Simulador interactivo · Promedio de edades",
      description: "Actividad dinámica para comprender cómo se resuelve la pregunta 1 de Matemáticas paso a paso."
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
  const content = resource === "simulator"
    ? renderNotebookSimulator(question, customResource)
    : (customResource ? renderCustomNotebookResource(question, resource, customResource) : ({
      mindmap: renderMindMap(question),
      video: renderVideoLesson(question),
      audio: renderAudioGuide(question),
      presentation: renderPresentation(question),
      infographic: renderInfographic(question)
    }[resource] || renderMindMap(question)));
  panel.innerHTML = content;
  const playBtn = document.getElementById("playAudioGuideBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => playAudioGuide(buildAudioGuide(question)));
  }
  if (resource === "simulator") {
    initNotebookSimulator(question);
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


function renderNotebookSimulator(question, customResource) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    return renderS1P1AverageSimulator(question, customResource);
  }
  return renderGenericNotebookSimulator(question);
}

function renderS1P1AverageSimulator(question, customResource) {
  const ages = [21, 26, 20, 21, 22, 28, 30];
  const options = (question.options || []).map(option => `
    <button class="sim-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  return `
    <article class="notebook-card large notebook-simulator-card">
      <p class="eyebrow">🧩 Simulador · Recurso interactivo individual</p>
      <h3>${escapeHtml((customResource && customResource.title) || "Simulador interactivo · Pregunta 1")}</h3>
      <p>${escapeHtml((customResource && customResource.description) || "Explora la pregunta paso a paso antes de responder en el simulador.")}</p>

      <div class="sim-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto</h4>
          <p>Calcula el promedio de las edades en las que siete madres tuvieron su primer hijo.</p>
          <div class="sim-data-table" role="table" aria-label="Edades de la pregunta 1">
            <div role="row"><strong>Madre</strong><strong>Edad</strong></div>
            ${ages.map((age, index) => `<div role="row"><span>${index + 1}</span><span>${age}</span></div>`).join("")}
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea clave</h4>
          <div class="average-formula">
            <span>Promedio</span>
            <strong>=</strong>
            <span>Suma de datos ÷ cantidad de datos</span>
          </div>
          <p>No basta con mirar el dato más repetido o el dato del centro: para el promedio se suman todos los datos y luego se divide por el número total de datos.</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Pasos del simulador de promedio">
        <section class="sim-step active" data-step="1">
          <div class="sim-step-head">
            <span>Paso 1</span>
            <h4>Selecciona las siete edades y observa la suma</h4>
          </div>
          <p>Haz clic en cada edad para agregarla a la suma. El simulador irá construyendo la operación.</p>
          <div class="age-chip-grid" id="ageChipGrid">
            ${ages.map((age, index) => `<button class="age-chip" type="button" data-index="${index}" data-age="${age}">${age}</button>`).join("")}
          </div>
          <div class="sim-equation" id="sumEquation">Suma: <strong>0</strong></div>
          <div class="sim-progress-wrap"><span id="sumProgressText">0 de 7 edades seleccionadas</span><div><span id="sumProgressBar"></span></div></div>
        </section>

        <section class="sim-step" data-step="2">
          <div class="sim-step-head">
            <span>Paso 2</span>
            <h4>Divide entre la cantidad de datos</h4>
          </div>
          <p>Como hay siete madres entrevistadas, la suma total debe dividirse entre 7.</p>
          <label class="sim-input-label" for="dividerInput">¿Entre cuántos datos se divide?</label>
          <div class="sim-inline-action">
            <input id="dividerInput" type="number" min="1" max="20" placeholder="Escribe el número" />
            <button class="secondary-btn" type="button" id="checkDividerBtn">Verificar</button>
          </div>
          <p id="dividerFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step" data-step="3">
          <div class="sim-step-head">
            <span>Paso 3</span>
            <h4>Construye el promedio</h4>
          </div>
          <p>Cuando tengas la suma y el divisor correctos, calcula el promedio.</p>
          <div class="average-machine">
            <div><span>Suma</span><strong id="machineSum">—</strong></div>
            <div><span>÷</span><strong id="machineDivider">—</strong></div>
            <div><span>Promedio</span><strong id="machineAverage">—</strong></div>
          </div>
          <button class="primary-btn" type="button" id="calculateAverageBtn">Calcular promedio</button>
          <p id="averageFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step" data-step="4">
          <div class="sim-step-head">
            <span>Paso 4</span>
            <h4>Relaciona el resultado con las opciones ICFES</h4>
          </div>
          <p>Elige la opción que coincide con el promedio obtenido. Esta práctica te ayuda a justificar la respuesta antes de volver a la pregunta.</p>
          <div class="sim-answer-grid" id="simAnswerGrid">${options}</div>
          <div id="simFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note">
        <strong>Lectura didáctica:</strong> esta pregunta evalúa interpretación de una tabla y uso del promedio aritmético. El error frecuente es escoger una edad visible en la tabla sin aplicar la operación completa.
      </div>
    </article>
  `;
}

function renderGenericNotebookSimulator(question) {
  return `
    <article class="notebook-card large notebook-simulator-card">
      <p class="eyebrow">🧩 Simulador · Recurso interactivo individual</p>
      <h3>Simulador didáctico de la pregunta ${escapeHtml(question.number)}</h3>
      <p>Este espacio permite preparar una solución guiada para esta pregunta. Cuando se cargue un simulador específico, aparecerán actividades interactivas relacionadas con sus datos, recursos multimedia y tipo de competencia.</p>
      <div class="generic-simulator-grid">
        <div><strong>1. Comprende</strong><span>Identifica qué pide la pregunta.</span></div>
        <div><strong>2. Extrae datos</strong><span>Separa información útil de información contextual.</span></div>
        <div><strong>3. Aplica estrategia</strong><span>Usa el procedimiento adecuado para el área.</span></div>
        <div><strong>4. Verifica</strong><span>Compara tu resultado con las opciones.</span></div>
      </div>
    </article>
  `;
}

function initNotebookSimulator(question) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    initS1P1AverageSimulator(question);
  }
}

function initS1P1AverageSimulator(question) {
  const ages = [21, 26, 20, 21, 22, 28, 30];
  const selected = new Set();
  let divisorOk = false;
  let averageOk = false;
  const total = ages.reduce((acc, value) => acc + value, 0);
  const divisor = ages.length;
  const average = total / divisor;

  const chips = Array.from(document.querySelectorAll(".age-chip"));
  const sumEquation = document.getElementById("sumEquation");
  const sumProgressText = document.getElementById("sumProgressText");
  const sumProgressBar = document.getElementById("sumProgressBar");
  const dividerInput = document.getElementById("dividerInput");
  const checkDividerBtn = document.getElementById("checkDividerBtn");
  const dividerFeedback = document.getElementById("dividerFeedback");
  const machineSum = document.getElementById("machineSum");
  const machineDivider = document.getElementById("machineDivider");
  const machineAverage = document.getElementById("machineAverage");
  const calculateAverageBtn = document.getElementById("calculateAverageBtn");
  const averageFeedback = document.getElementById("averageFeedback");
  const answerGrid = document.getElementById("simAnswerGrid");
  const finalFeedback = document.getElementById("simFinalFeedback");

  function currentSum() {
    return Array.from(selected).reduce((acc, index) => acc + ages[index], 0);
  }

  function markStep(number, enabled) {
    const step = document.querySelector(`.sim-step[data-step="${number}"]`);
    if (step) step.classList.toggle("active", Boolean(enabled));
  }

  function updateSumUI() {
    const picked = Array.from(selected).sort((a, b) => a - b).map(index => ages[index]);
    const sum = currentSum();
    sumEquation.innerHTML = picked.length
      ? `Suma: <strong>${picked.join(" + ")} = ${sum}</strong>`
      : `Suma: <strong>0</strong>`;
    sumProgressText.textContent = `${picked.length} de ${ages.length} edades seleccionadas`;
    sumProgressBar.style.width = `${Math.round((picked.length / ages.length) * 100)}%`;
    machineSum.textContent = picked.length === ages.length ? String(total) : "—";
    if (picked.length === ages.length) {
      markStep(2, true);
      dividerFeedback.textContent = "Muy bien. Ya tienes la suma completa: 168.";
      dividerFeedback.className = "sim-feedback ok";
    } else {
      markStep(2, false);
      markStep(3, false);
      markStep(4, false);
      divisorOk = false;
      averageOk = false;
      machineDivider.textContent = "—";
      machineAverage.textContent = "—";
    }
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const index = Number(chip.dataset.index);
      if (selected.has(index)) selected.delete(index);
      else selected.add(index);
      chip.classList.toggle("selected", selected.has(index));
      updateSumUI();
    });
  });

  if (checkDividerBtn) {
    checkDividerBtn.addEventListener("click", () => {
      if (selected.size !== ages.length) {
        dividerFeedback.textContent = "Primero selecciona las siete edades para construir la suma total.";
        dividerFeedback.className = "sim-feedback warn";
        return;
      }
      const value = Number(dividerInput.value);
      if (value === divisor) {
        divisorOk = true;
        machineDivider.textContent = String(divisor);
        dividerFeedback.textContent = "Correcto. Se divide entre 7 porque hay siete datos en la tabla.";
        dividerFeedback.className = "sim-feedback ok";
        markStep(3, true);
      } else {
        divisorOk = false;
        machineDivider.textContent = "—";
        dividerFeedback.textContent = "Revisa la tabla: el divisor debe ser la cantidad total de madres entrevistadas.";
        dividerFeedback.className = "sim-feedback error";
        markStep(3, false);
        markStep(4, false);
      }
    });
  }

  if (calculateAverageBtn) {
    calculateAverageBtn.addEventListener("click", () => {
      if (!divisorOk) {
        averageFeedback.textContent = "Antes de calcular, verifica correctamente el divisor.";
        averageFeedback.className = "sim-feedback warn";
        return;
      }
      averageOk = true;
      machineAverage.textContent = String(average);
      averageFeedback.innerHTML = `Excelente: <strong>${total} ÷ ${divisor} = ${average}</strong>. Ahora busca esa cantidad en las opciones.`;
      averageFeedback.className = "sim-feedback ok";
      markStep(4, true);
    });
  }

  if (answerGrid) {
    answerGrid.addEventListener("click", event => {
      const button = event.target.closest(".sim-answer");
      if (!button) return;
      if (!averageOk) {
        finalFeedback.textContent = "Calcula primero el promedio en el paso 3 antes de elegir la opción.";
        finalFeedback.className = "sim-final-feedback warn";
        return;
      }
      answerGrid.querySelectorAll(".sim-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      const answer = button.dataset.answer;
      if (answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La respuesta es ${escapeHtml(question.correctAnswer)} porque el promedio de las edades es ${average}. Regresa a la pregunta y marca la opción con seguridad.`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa.</strong> La opción elegida no coincide con el promedio calculado. Recuerda: ${total} ÷ ${divisor} = ${average}.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }

  updateSumUI();
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


/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 1 Matemáticas
   Preguntas 2 a 25
   ========================================================== */

function renderNotebookSimulator(question, customResource) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    return renderS1P1AverageSimulator(question, customResource);
  }
  if (Number(question.session) === 1 && String(question.area || "").toLowerCase().includes("matem") && Number(question.number) >= 2 && Number(question.number) <= 25) {
    const config = getS1MathSimulatorConfig(Number(question.number));
    if (config) return renderS1MathGuidedSimulator(question, config);
  }
  return renderGenericNotebookSimulator(question);
}

function initNotebookSimulator(question) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    initS1P1AverageSimulator(question);
    return;
  }
  if (Number(question.session) === 1 && String(question.area || "").toLowerCase().includes("matem") && Number(question.number) >= 2 && Number(question.number) <= 25) {
    initS1MathGuidedSimulator(question);
  }
}

function getS1MathSimulatorConfig(number) {
  const configs = {
    2: {
      title: "Simulador interactivo · Porcentajes con dato faltante",
      challenge: "Determina si se puede calcular un valor total cuando el impuesto depende de una temporada no informada.",
      keyIdea: "En modelación matemática no basta con tener una fórmula: todas las variables necesarias deben estar definidas.",
      dataTable: { headers: ["Dato", "Valor"], rows: [["5 tiquetes jueves", "$80.000 cada uno"], ["2 tiquetes sábado", "$150.000 cada uno"], ["Impuesto y", "12 % o 19 % según temporada"], ["Temporada", "No informada"]] },
      chips: [{ text: "Valor base de tiquetes", correct: true }, { text: "Impuesto y", correct: true }, { text: "Temporada del viaje", correct: true }, { text: "Color del avión", correct: false }],
      strategyQuestion: "¿Qué impide hallar un único total?",
      strategyChoices: [{ text: "No conocer la temporada que define si el impuesto es 12 % o 19 %.", correct: true }, { text: "No saber multiplicar 5 por 80.000.", correct: false }, { text: "No conocer el día de viaje.", correct: false }],
      miniQuestion: "El valor base es 5×80.000 + 2×150.000 = 700.000. ¿Qué falta para convertirlo en total final?",
      miniChoices: [{ text: "El porcentaje de impuesto exacto.", correct: true }, { text: "El número de tiquetes del jueves.", correct: false }, { text: "El número de tiquetes del sábado.", correct: false }],
      teacherNote: "Esta pregunta evalúa lectura de variables: cuando una variable no está determinada, la respuesta correcta puede ser que no es posible calcular un único resultado."
    },
    3: {
      title: "Simulador interactivo · Diagrama de Venn y tabla",
      challenge: "Comprueba si la tabla resume correctamente las regiones del diagrama de Venn.",
      keyIdea: "En un diagrama de Venn, cada total por categoría se obtiene sumando todas las regiones que pertenecen a ese conjunto.",
      dataTable: { headers: ["Síntoma", "Suma correcta"], rows: [["Dolor de cabeza", "10 + 8 + 6 = 24"], ["Náuseas", "6 + 15 + 1 = 22"], ["Mareo", "8 + 5 + 1 = 14"]] },
      chips: [{ text: "Sumar solo las regiones dentro de cada círculo", correct: true }, { text: "Comparar con la tabla del médico", correct: true }, { text: "Sumar toda la población de 60 para cada síntoma", correct: false }, { text: "Revisar intersecciones", correct: true }],
      strategyQuestion: "¿Cómo se valida la tabla?",
      strategyChoices: [{ text: "Se calcula cada síntoma sumando sus regiones del diagrama y se compara con la tabla.", correct: true }, { text: "Se escoge el número más grande del diagrama.", correct: false }, { text: "Se suman todos los números y se asignan a cada síntoma.", correct: false }],
      miniQuestion: "Para dolor de cabeza, ¿qué suma corresponde?",
      miniChoices: [{ text: "10 + 8 + 6 = 24", correct: true }, { text: "10 + 8 + 5 = 23", correct: false }, { text: "6 + 15 + 1 = 22", correct: false }],
      teacherNote: "El error frecuente es olvidar las intersecciones. En Venn, quienes están en dos síntomas cuentan para ambos síntomas."
    },
    4: {
      title: "Simulador interactivo · Conteo con condición 'al menos uno'",
      challenge: "Decide qué casos se necesitan para contar grupos de 3 con al menos un hombre.",
      keyIdea: "'Al menos un hombre' significa uno o más hombres. Se excluyen los grupos sin hombres y también los imposibles.",
      dataTable: { headers: ["Caso", "¿Sirve?"], rows: [["X: tres hombres", "No es posible: solo hay 2 hombres"], ["Y: una mujer y dos hombres", "Sí sirve"], ["Z: dos mujeres y un hombre", "Sí sirve"], ["W: tres mujeres", "No sirve"]] },
      chips: [{ text: "Y: una mujer y dos hombres", correct: true }, { text: "Z: dos mujeres y un hombre", correct: true }, { text: "W: tres mujeres", correct: false }, { text: "X: tres hombres", correct: false }],
      strategyQuestion: "¿Qué valores se deben conocer?",
      strategyChoices: [{ text: "Y y Z, porque ambos casos tienen al menos un hombre y son posibles.", correct: true }, { text: "Solo W, porque es el grupo más numeroso.", correct: false }, { text: "X y W, porque son los extremos.", correct: false }],
      miniQuestion: "Si hay 2 hombres en la clase, ¿se puede formar un grupo de tres hombres?",
      miniChoices: [{ text: "No, porque faltaría un hombre.", correct: true }, { text: "Sí, porque el grupo es de tres estudiantes.", correct: false }, { text: "Sí, porque hay seis estudiantes en total.", correct: false }],
      teacherNote: "Para condiciones de conteo, primero clasifica casos posibles e imposibles; luego revisa cuáles cumplen la condición."
    },
    5: {
      title: "Simulador interactivo · Multiplicación cantidad × valor",
      challenge: "Calcula cuánto dinero entregó el banco por cada tipo de premio.",
      keyIdea: "El total por categoría se obtiene multiplicando cantidad de premios por monto de cada premio.",
      dataTable: { headers: ["Premio", "Operación"], rows: [["Oro", "5 × 10.000.000 = 50.000.000"], ["Plata", "25 × 5.000.000 = 125.000.000"], ["Bronce", "100 × 1.000.000 = 100.000.000"]] },
      chips: [{ text: "Cantidad de premios", correct: true }, { text: "Monto de cada premio", correct: true }, { text: "Multiplicación por categoría", correct: true }, { text: "Suma de todos antes de clasificar", correct: false }],
      strategyQuestion: "¿Cuál es la operación central?",
      strategyChoices: [{ text: "Multiplicar cantidad de premios por valor unitario en cada fila.", correct: true }, { text: "Dividir el monto entre la cantidad de premios.", correct: false }, { text: "Elegir la fila con mayor valor unitario solamente.", correct: false }],
      miniQuestion: "¿Cuánto dinero se entregó en premios de Plata?",
      miniChoices: [{ text: "$125.000.000", correct: true }, { text: "$100.000.000", correct: false }, { text: "$50.000.000", correct: false }],
      teacherNote: "Esta es una pregunta de proporcionalidad directa: si hay más premios, el total de dinero aumenta proporcionalmente."
    },
    6: {
      title: "Simulador interactivo · Ahorro duplicado cada mes",
      challenge: "Comprende una progresión geométrica acumulada para alcanzar $750.000.",
      keyIdea: "Duplicar cada mes genera una sucesión: 50.000, 100.000, 200.000, 400.000... El total acumulado es la suma de esos ahorros.",
      dataTable: { headers: ["Mes", "Ahorro del mes"], rows: [["1", "$50.000"], ["2", "$100.000"], ["3", "$200.000"], ["4", "$400.000"], ["Total 4 meses", "$750.000"]] },
      chips: [{ text: "Se duplica el ahorro mensual", correct: true }, { text: "Se necesita acumular $750.000", correct: true }, { text: "Se suma el ahorro de cada mes", correct: true }, { text: "Se multiplica 50.000 por 15 meses", correct: false }],
      strategyQuestion: "¿Cómo se halla el número de meses?",
      strategyChoices: [{ text: "Construyendo la suma acumulada de valores que se duplican.", correct: true }, { text: "Dividiendo 750.000 entre 50.000 y tomando ese resultado como meses.", correct: false }, { text: "Restando 50.000 cada mes.", correct: false }],
      miniQuestion: "¿Qué suma de factores completa 15 veces el ahorro inicial?",
      miniChoices: [{ text: "1 + 2 + 4 + 8 = 15", correct: true }, { text: "1 + 2 + 3 + 4 = 10", correct: false }, { text: "2 + 4 + 6 + 8 = 20", correct: false }],
      teacherNote: "La clave es distinguir entre ahorro del mes y ahorro acumulado. ICFES suele evaluar esa lectura."
    },
    7: {
      title: "Simulador interactivo · Porcentaje mensual y acumulado",
      challenge: "Calcula cuánto ahorra una persona cuando guarda un porcentaje fijo durante varios meses.",
      keyIdea: "Primero se calcula el porcentaje de un sueldo; después se multiplica por la cantidad de meses.",
      dataTable: { headers: ["Dato", "Valor"], rows: [["Sueldo de Estefanía", "$900.000"], ["Porcentaje de ahorro", "3 %"], ["Ahorro mensual", "$27.000"], ["10 meses", "$270.000"]] },
      chips: [{ text: "3 % de $900.000", correct: true }, { text: "10 meses consecutivos", correct: true }, { text: "Multiplicar ahorro mensual por 10", correct: true }, { text: "Usar el sueldo de Alberto sin revisar el dato de Estefanía", correct: false }],
      strategyQuestion: "¿Cuál es el orden correcto?",
      strategyChoices: [{ text: "Calcular el ahorro mensual y luego multiplicarlo por 10.", correct: true }, { text: "Sumar 3 y 10 al sueldo.", correct: false }, { text: "Dividir el sueldo entre 10 y luego restar 3.", correct: false }],
      miniQuestion: "¿Cuánto es el 3 % de $900.000?",
      miniChoices: [{ text: "$27.000", correct: true }, { text: "$24.000", correct: false }, { text: "$297.000", correct: false }],
      teacherNote: "En porcentajes, 3 % significa 3/100. Luego se interpreta si el resultado es mensual o total."
    },
    8: {
      title: "Simulador interactivo · Comparar tabla y gráfica",
      challenge: "Detecta si una gráfica reproduce exactamente los datos de una tabla.",
      keyIdea: "Para validar una gráfica, no basta con que se parezca: hay que comparar valores puntuales por región y año.",
      dataTable: { headers: ["Dato revisado", "Diferencia detectada"], rows: [["Antioquia 2012", "Tabla: 21,7 · Gráfica: 20,5"], ["Antioquia 2013", "Tabla: 22,4 · Gráfica: 18,3"], ["Bogotá 2015", "Tabla: 4,7 · Gráfica: 7,6"]] },
      chips: [{ text: "Comparar año por año", correct: true }, { text: "Revisar si Antioquia coincide", correct: true }, { text: "Revisar Bogotá 2015", correct: true }, { text: "Concluir solo por el color de la gráfica", correct: false }],
      strategyQuestion: "¿Qué hace falsa la equivalencia tabla-gráfica?",
      strategyChoices: [{ text: "Algunos valores específicos de la gráfica no coinciden con la tabla.", correct: true }, { text: "La gráfica siempre es menos confiable que la tabla.", correct: false }, { text: "La tabla no tiene años.", correct: false }],
      miniQuestion: "¿Cuál par muestra una diferencia mencionada?",
      miniChoices: [{ text: "Bogotá 2015: 4,7 frente a 7,6", correct: true }, { text: "Antioquia 2015: 4,7 frente a 7,6", correct: false }, { text: "Central 2011: 0 frente a 0", correct: false }],
      teacherNote: "Una pregunta de interpretación gráfica exige contraste preciso de datos, no solo una lectura general visual."
    },
    9: {
      title: "Simulador interactivo · Tabla de frecuencias y gráfica correcta",
      challenge: "Elige la gráfica que representa cantidades por intervalo de peso.",
      keyIdea: "Si la tabla da frecuencias absolutas, la gráfica debe ubicar intervalos en el eje horizontal y cantidades en el eje vertical.",
      dataTable: { headers: ["Intervalo de peso", "Cantidad de papas"], rows: [["15 ≤ p < 20", "700"], ["20 ≤ p < 25", "500"], ["25 ≤ p < 30", "800"]] },
      chips: [{ text: "Intervalos de peso en el eje horizontal", correct: true }, { text: "Cantidad de papas en el eje vertical", correct: true }, { text: "Frecuencias 700, 500 y 800", correct: true }, { text: "Usar porcentajes iguales", correct: false }],
      strategyQuestion: "¿Qué debe respetar la gráfica?",
      strategyChoices: [{ text: "Las cantidades exactas por intervalo de peso.", correct: true }, { text: "Tres porcentajes iguales de 33,3 %.", correct: false }, { text: "Solo el número total de papas sin intervalos.", correct: false }],
      miniQuestion: "¿Qué barra debería ser la más alta?",
      miniChoices: [{ text: "25 ≤ p < 30, porque tiene 800 papas.", correct: true }, { text: "20 ≤ p < 25, porque tiene 500 papas.", correct: false }, { text: "15 ≤ p < 20, porque tiene 700 papas.", correct: false }],
      teacherNote: "La representación debe conservar la unidad: cantidad de papas, no porcentaje si la tabla no lo exige."
    },
    10: {
      title: "Simulador interactivo · Muestra y representatividad",
      challenge: "Analiza por qué una encuesta de un solo municipio puede no representar a todo un departamento.",
      keyIdea: "Una muestra debe representar a la población objetivo. Si se toma de un solo municipio, puede sesgar la estimación departamental.",
      dataTable: { headers: ["Elemento", "Lectura"], rows: [["Población objetivo", "Todo el departamento"], ["Muestra usada", "1.000 personas de un municipio"], ["Riesgo", "Sesgo de cobertura"]] },
      chips: [{ text: "Población: departamento completo", correct: true }, { text: "Muestra: un solo municipio", correct: true }, { text: "Riesgo de no representar diversidad", correct: true }, { text: "La muestra es mala porque tiene demasiadas personas", correct: false }],
      strategyQuestion: "¿Cuál es la falla metodológica?",
      strategyChoices: [{ text: "La muestra solo cubre un municipio y no todo el departamento.", correct: true }, { text: "Toda encuesta debe preguntarle a absolutamente todos.", correct: false }, { text: "1.000 llamadas siempre son suficientes sin importar de dónde salgan.", correct: false }],
      miniQuestion: "¿Qué debería mejorar la firma encuestadora?",
      miniChoices: [{ text: "Seleccionar una muestra distribuida en varios municipios.", correct: true }, { text: "Llamar únicamente al municipio más grande.", correct: false }, { text: "Eliminar preguntas de preferencia electoral.", correct: false }],
      teacherNote: "ICFES suele preguntar por la relación entre muestra, población e inferencia. La palabra clave aquí es representatividad."
    },
    11: {
      title: "Simulador interactivo · Área de un rectángulo dentro de una figura",
      challenge: "Identifica dimensiones faltantes y calcula el área de un trozo rectangular.",
      keyIdea: "El área de un rectángulo es base × altura. Si una medida no aparece directa, se obtiene por resta.",
      dataTable: { headers: ["Medida", "Valor"], rows: [["Altura total", "20 cm"], ["Parte descontada", "5 cm"], ["Altura del trozo 1", "20 - 5 = 15 cm"], ["Base del trozo 1", "15 cm"], ["Área", "15 × 15 = 225 cm²"]] },
      chips: [{ text: "Base del trozo 1: 15 cm", correct: true }, { text: "Altura del trozo 1: 15 cm", correct: true }, { text: "Área = base × altura", correct: true }, { text: "Multiplicar por las 8 personas", correct: false }],
      strategyQuestion: "¿Qué procedimiento resuelve el área?",
      strategyChoices: [{ text: "Restar para obtener la altura y multiplicar base por altura.", correct: true }, { text: "Dividir toda la torta en 8 partes iguales.", correct: false }, { text: "Sumar 60 y 20 sin mirar el trozo.", correct: false }],
      miniQuestion: "¿Cuál es la altura del trozo 1?",
      miniChoices: [{ text: "15 cm", correct: true }, { text: "20 cm", correct: false }, { text: "5 cm", correct: false }],
      teacherNote: "Antes de aplicar fórmulas, localiza exactamente la región preguntada. No siempre se pide el área total."
    },
    12: {
      title: "Simulador interactivo · Unidades antes de sumar",
      challenge: "Evalúa si una solución que suma pesos en unidades diferentes es válida.",
      keyIdea: "Las magnitudes solo se suman directamente cuando están en la misma unidad.",
      dataTable: { headers: ["Situación", "Cuidado matemático"], rows: [["Pesos en kg y toneladas", "No se suman directamente"], ["Antes de operar", "Convertir todo a kg o todo a toneladas"], ["Error frecuente", "Mezclar unidades"]] },
      chips: [{ text: "Revisar unidades", correct: true }, { text: "Convertir antes de sumar", correct: true }, { text: "Kilogramos y toneladas son unidades diferentes", correct: true }, { text: "Sumar directamente porque todos son pesos", correct: false }],
      strategyQuestion: "¿Por qué la solución es incorrecta?",
      strategyChoices: [{ text: "Porque mezcla unidades diferentes sin convertirlas.", correct: true }, { text: "Porque siempre se debe responder en toneladas.", correct: false }, { text: "Porque no se pueden sumar pesos en ningún caso.", correct: false }],
      miniQuestion: "¿Qué debes hacer antes de sumar 1 tonelada y 500 kg?",
      miniChoices: [{ text: "Convertir 1 tonelada a 1.000 kg o 500 kg a 0,5 t.", correct: true }, { text: "Sumar 1 + 500 directamente.", correct: false }, { text: "Restar las unidades.", correct: false }],
      teacherNote: "Las pruebas Saber evalúan coherencia de unidades: una operación numérica puede verse bien y aun así ser inválida."
    },
    13: {
      title: "Simulador interactivo · Área triangular y cuarto de círculo",
      challenge: "Detecta en qué paso de una solución se usó mal una fórmula de área.",
      keyIdea: "El área de un triángulo es base × altura ÷ 2; el área de un cuarto de círculo es πr² ÷ 4.",
      dataTable: { headers: ["Región", "Fórmula correcta"], rows: [["Triángulo", "4 × 3 ÷ 2 = 6 m²"], ["Cuarto de círculo", "π × 4² ÷ 4"], ["Error", "Omitir dividir entre 2 en el triángulo"]] },
      chips: [{ text: "Triángulo requiere dividir entre 2", correct: true }, { text: "Revisar el paso 2", correct: true }, { text: "Cuarto de círculo usa radio al cuadrado", correct: true }, { text: "Multiplicar 3 × 4 × 5", correct: false }],
      strategyQuestion: "¿Dónde está el error?",
      strategyChoices: [{ text: "En el paso 2: calcularon un triángulo como rectángulo.", correct: true }, { text: "En el paso 3: se debe usar perímetro, no área.", correct: false }, { text: "En el paso 1: no se puede calcular un rectángulo.", correct: false }],
      miniQuestion: "¿Cuál es el área correcta del triángulo de base 4 m y altura 3 m?",
      miniChoices: [{ text: "6 m²", correct: true }, { text: "12 m²", correct: false }, { text: "60 m²", correct: false }],
      teacherNote: "Cuando una pregunta pide corregir un procedimiento, revisa fórmula por fórmula y no solo el resultado final."
    },
    14: {
      title: "Simulador interactivo · Tabla, gráfica y precisión",
      challenge: "Determina qué afirmación es falsa sobre la información en tabla y gráfica.",
      keyIdea: "Una gráfica circular permite comparar proporciones, pero no siempre permite recuperar datos exactos de una tabla.",
      dataTable: { headers: ["Fuente", "Qué permite"], rows: [["Tabla", "Ver datos exactos"], ["Gráfica", "Comparar proporciones visualmente"], ["Cuidado", "La gráfica no siempre permite reconstruir la tabla exacta"]] },
      chips: [{ text: "La tabla da valores exactos", correct: true }, { text: "La gráfica permite comparar candidatos", correct: true }, { text: "De la gráfica no siempre salen datos exactos", correct: true }, { text: "La gráfica siempre reemplaza la tabla", correct: false }],
      strategyQuestion: "¿Qué afirmación debe rechazarse?",
      strategyChoices: [{ text: "Que con la gráfica se obtienen exactamente los datos de la tabla.", correct: true }, { text: "Que la gráfica permite reconocer el candidato con mayor intención.", correct: false }, { text: "Que la tabla puede alimentar la gráfica.", correct: false }],
      miniQuestion: "¿Cuál fuente es más adecuada para leer números exactos?",
      miniChoices: [{ text: "La tabla.", correct: true }, { text: "El color de la gráfica.", correct: false }, { text: "El título únicamente.", correct: false }],
      teacherNote: "Distinguir lectura exacta y lectura visual es clave en preguntas de representación de datos."
    },
    15: {
      title: "Simulador interactivo · Tendencia en una secuencia",
      challenge: "Identifica cómo cambia el ahorro al finalizar cada mes.",
      keyIdea: "La tendencia se analiza comparando diferencias consecutivas: si la diferencia es constante, hay patrón lineal.",
      dataTable: { headers: ["Mes", "Ahorro final"], rows: [["Enero", "$130.000"], ["Febrero", "$160.000"], ["Marzo", "$190.000"], ["Abril", "$220.000"], ["Cambio", "+$30.000 cada mes"]] },
      chips: [{ text: "Comparar meses consecutivos", correct: true }, { text: "160.000 - 130.000", correct: true }, { text: "Aumento constante", correct: true }, { text: "Mirar solo el primer valor", correct: false }],
      strategyQuestion: "¿Qué muestra la tendencia?",
      strategyChoices: [{ text: "Aumenta $30.000 cada mes.", correct: true }, { text: "Disminuye $30.000 cada mes.", correct: false }, { text: "Aumenta $100.000 cada mes.", correct: false }],
      miniQuestion: "¿Cuál es la diferencia entre $190.000 y $160.000?",
      miniChoices: [{ text: "$30.000", correct: true }, { text: "$100.000", correct: false }, { text: "$60.000", correct: false }],
      teacherNote: "Para tendencias, calcula diferencias entre datos consecutivos, no entre el primer y último valor únicamente."
    },
    16: {
      title: "Simulador interactivo · Promedio de piezas reemplazadas",
      challenge: "Calcula el promedio del número de piezas reemplazadas en tres vehículos.",
      keyIdea: "Promedio = suma de los datos ÷ cantidad de datos.",
      dataTable: { headers: ["Vehículo", "Piezas"], rows: [["1", "6"], ["2", "5"], ["3", "10"], ["Suma", "21"], ["Promedio", "21 ÷ 3 = 7"]] },
      chips: [{ text: "Sumar 6 + 5 + 10", correct: true }, { text: "Dividir entre 3 vehículos", correct: true }, { text: "Promedio aritmético", correct: true }, { text: "Elegir el valor mayor", correct: false }],
      strategyQuestion: "¿Cómo se calcula el promedio?",
      strategyChoices: [{ text: "Sumando los tres valores y dividiendo entre tres.", correct: true }, { text: "Tomando el número máximo de piezas.", correct: false }, { text: "Restando el menor del mayor.", correct: false }],
      miniQuestion: "¿Cuánto es 21 ÷ 3?",
      miniChoices: [{ text: "7", correct: true }, { text: "6", correct: false }, { text: "10", correct: false }],
      teacherNote: "Aunque el contexto cambie, el promedio siempre mantiene la misma estructura: sumar y dividir por cantidad de datos."
    },
    17: {
      title: "Simulador interactivo · Sumar regiones de un conjunto",
      challenge: "Encuentra todas las regiones que pertenecen al conjunto bicicleta.",
      keyIdea: "En diagramas de conjuntos, el total de un medio se obtiene sumando todas las regiones dentro de su círculo, incluidas intersecciones.",
      dataTable: { headers: ["Región con bicicleta", "Valor"], rows: [["Solo bicicleta", "50"], ["Carro y bicicleta", "20"], ["Bicicleta y transporte público", "25"], ["Los tres medios", "5"]] },
      chips: [{ text: "50: solo bicicleta", correct: true }, { text: "20: carro y bicicleta", correct: true }, { text: "25: bicicleta y transporte público", correct: true }, { text: "5: los tres medios", correct: true }, { text: "35: solo carro", correct: false }],
      strategyQuestion: "¿Qué datos se suman?",
      strategyChoices: [{ text: "Todos los valores ubicados dentro del círculo de bicicleta.", correct: true }, { text: "Solo quienes usan únicamente bicicleta.", correct: false }, { text: "Todos los valores del diagrama completo.", correct: false }],
      miniQuestion: "¿El valor de la intersección de los tres medios se suma al total de bicicleta?",
      miniChoices: [{ text: "Sí, porque también usan bicicleta.", correct: true }, { text: "No, porque usan más de un medio.", correct: false }, { text: "No, porque está en el centro.", correct: false }],
      teacherNote: "Toda intersección que toca el conjunto preguntado debe contarse en ese total."
    },
    18: {
      title: "Simulador interactivo · Crecimiento por duplicación",
      challenge: "Calcula cuántas duplicaciones ocurren entre 2010 y 2016.",
      keyIdea: "Si algo se duplica cada 2 años, en 6 años ocurren 3 duplicaciones.",
      dataTable: { headers: ["Año", "Transistores"], rows: [["2010", "10.000"], ["2012", "20.000"], ["2014", "40.000"], ["2016", "80.000"]] },
      chips: [{ text: "Del 2010 al 2016 hay 6 años", correct: true }, { text: "Se duplica cada 2 años", correct: true }, { text: "Hay 3 duplicaciones", correct: true }, { text: "Se suma 10.000 cada año", correct: false }],
      strategyQuestion: "¿Cuál es la estructura de crecimiento?",
      strategyChoices: [{ text: "Multiplicar por 2 tres veces.", correct: true }, { text: "Sumar 2 tres veces al dato inicial.", correct: false }, { text: "Dividir entre 2 cada año.", correct: false }],
      miniQuestion: "Después de 3 duplicaciones, ¿cuál es el factor total?",
      miniChoices: [{ text: "2 × 2 × 2 = 8", correct: true }, { text: "2 + 2 + 2 = 6", correct: false }, { text: "3 × 2 = 6", correct: false }],
      teacherNote: "La palabra 'duplicar' indica multiplicación, no suma. Reconocer eso cambia completamente el modelo."
    },
    19: {
      title: "Simulador interactivo · Procedimientos equivalentes y redundancia",
      challenge: "Identifica qué paso repite una operación ya realizada de otra forma.",
      keyIdea: "Un paso es redundante si no aporta información nueva porque equivale a un cálculo anterior.",
      dataTable: { headers: ["Relación", "Lectura"], rows: [["Paso 2", "Área de un triángulo"], ["Paso 3", "Multiplica por 4 el paso 2"], ["Paso 4", "Suma cuatro veces el paso 2"], ["Conclusión", "Paso 4 repite el paso 3"]] },
      chips: [{ text: "Multiplicar por 4", correct: true }, { text: "Sumar cuatro veces", correct: true }, { text: "Procedimientos equivalentes", correct: true }, { text: "Cambiar la figura completa", correct: false }],
      strategyQuestion: "¿Qué paso sobra?",
      strategyChoices: [{ text: "El paso 4, porque repite lo obtenido al multiplicar por 4.", correct: true }, { text: "El paso 1, porque todo procedimiento de área sobra.", correct: false }, { text: "El paso 2, porque nunca se usan triángulos.", correct: false }],
      miniQuestion: "¿Qué es equivalente a sumar A + A + A + A?",
      miniChoices: [{ text: "4A", correct: true }, { text: "A/4", correct: false }, { text: "A²", correct: false }],
      teacherNote: "ICFES no solo pregunta por resultados; también evalúa si reconoces procedimientos innecesarios o equivalentes."
    },
    20: {
      title: "Simulador interactivo · Factorización con término cuadrático",
      challenge: "Revisa si una factorización conservó correctamente el tiempo al cuadrado.",
      keyIdea: "Cuando t² se factoriza por t, todavía queda otro factor t: t² = t · t.",
      dataTable: { headers: ["Expresión", "Cuidado"], rows: [["10(15)", "Tiene un factor 15"], ["1/2 · 3 · 15²", "Al factorizar 15, queda otro 15"], ["Error", "Omitir el segundo 15"]] },
      chips: [{ text: "El tiempo está al cuadrado", correct: true }, { text: "Al factorizar 15 queda otro 15", correct: true }, { text: "La afirmación omite un factor", correct: true }, { text: "El exponente se cancela solo", correct: false }],
      strategyQuestion: "¿Por qué la afirmación es falsa?",
      strategyChoices: [{ text: "Porque al factorizar se perdió un factor 15 del término cuadrático.", correct: true }, { text: "Porque no se puede usar aceleración en ningún problema.", correct: false }, { text: "Porque se debe eliminar el 1/2.", correct: false }],
      miniQuestion: "Si factorizas t en t², ¿qué queda?",
      miniChoices: [{ text: "t", correct: true }, { text: "1", correct: false }, { text: "0", correct: false }],
      teacherNote: "En álgebra aplicada, verifica que la transformación sea equivalente término a término."
    },
    21: {
      title: "Simulador interactivo · Conversión de unidades y velocidad",
      challenge: "Detecta cuál procedimiento NO calcula el tiempo de descarga.",
      keyIdea: "Tiempo = tamaño del archivo ÷ velocidad. Antes se debe convertir MB a KB.",
      dataTable: { headers: ["Dato", "Uso"], rows: [["12,6 MB", "Tamaño"], ["1 MB = 1.024 KB", "Conversión"], ["300 KB/s", "Velocidad"], ["Tiempo", "(12,6 × 1.024) ÷ 300"]] },
      chips: [{ text: "Convertir MB a KB", correct: true }, { text: "Dividir tamaño entre velocidad", correct: true }, { text: "Velocidad: 300 KB/s", correct: true }, { text: "Multiplicar velocidad por 1.024 y dividir entre tamaño", correct: false }],
      strategyQuestion: "¿Qué forma tiene el procedimiento correcto?",
      strategyChoices: [{ text: "(12,6 × 1.024) ÷ 300", correct: true }, { text: "(1.024 × 300) ÷ 12,6", correct: false }, { text: "300 ÷ (12,6 × 1.024)", correct: false }],
      miniQuestion: "¿Qué representa el numerador en tiempo = tamaño ÷ velocidad?",
      miniChoices: [{ text: "El tamaño del archivo convertido a KB.", correct: true }, { text: "La velocidad multiplicada por la conversión.", correct: false }, { text: "La cantidad de segundos ya conocida.", correct: false }],
      teacherNote: "Una forma rápida de detectar el error es preguntar: ¿estoy dividiendo tamaño entre velocidad o velocidad entre tamaño?"
    },
    22: {
      title: "Simulador interactivo · Semejanza de triángulos en una rampa",
      challenge: "Usa proporcionalidad para calcular la altura de una columna de refuerzo.",
      keyIdea: "Si los triángulos son semejantes, las razones entre bases y alturas correspondientes se conservan.",
      dataTable: { headers: ["Medida", "Valor"], rows: [["Base total", "4 m"], ["Base pequeña", "2 m"], ["Altura total", "3 m"], ["Razón", "4 ÷ 2 = 2"], ["Altura columna", "3 ÷ 2 = 1,5 m"]] },
      chips: [{ text: "Triángulos semejantes", correct: true }, { text: "Comparar 4 m con 2 m", correct: true }, { text: "Dividir 3 m entre 2", correct: true }, { text: "Multiplicar 3 por 4 y sumar 2", correct: false }],
      strategyQuestion: "¿Qué procedimiento permite hallar h?",
      strategyChoices: [{ text: "Calcular la razón 4 ÷ 2 y dividir 3 entre esa razón.", correct: true }, { text: "Dividir 2 entre 4 y luego dividir 3 entre 0,5.", correct: false }, { text: "Multiplicar 3 por 2 sin razón de semejanza.", correct: false }],
      miniQuestion: "Si la base pequeña es la mitad de la base total, ¿qué pasa con la altura correspondiente?",
      miniChoices: [{ text: "También es la mitad de la altura total.", correct: true }, { text: "Es el doble de la altura total.", correct: false }, { text: "No se relaciona con la altura.", correct: false }],
      teacherNote: "En semejanza, observa qué magnitudes corresponden. No todas las divisiones posibles representan una razón útil."
    },
    23: {
      title: "Simulador interactivo · Coordenadas polares y distancia",
      challenge: "Ordena aviones de acuerdo con su distancia a la torre de control.",
      keyIdea: "En coordenadas polares (r, θ), el valor r indica distancia al polo; θ solo indica dirección.",
      dataTable: { headers: ["Avión", "Distancia r"], rows: [["W", "20 km"], ["V", "30 km"], ["Y", "40 km"], ["X", "60 km"]] },
      chips: [{ text: "Leer el valor r", correct: true }, { text: "Ordenar r de menor a mayor", correct: true }, { text: "Ignorar θ para distancia", correct: true }, { text: "Ordenar por el ángulo θ", correct: false }],
      strategyQuestion: "¿Qué determina cercanía a la torre?",
      strategyChoices: [{ text: "El radio r.", correct: true }, { text: "El ángulo θ únicamente.", correct: false }, { text: "El nombre del avión.", correct: false }],
      miniQuestion: "¿Cuál avión está más cerca si W tiene r=20 y X tiene r=60?",
      miniChoices: [{ text: "W", correct: true }, { text: "X", correct: false }, { text: "Depende del ángulo únicamente", correct: false }],
      teacherNote: "La notación polar separa distancia y dirección: para cercanía, mira r."
    },
    24: {
      title: "Simulador interactivo · Construcción de una operación con desplazamientos",
      challenge: "Traduce una ruta verbal a una expresión con sumas y restas.",
      keyIdea: "Avanzar suma distancia; regresar resta distancia. Las palabras 'doble' y 'mitad' transforman el valor anterior.",
      dataTable: { headers: ["Tramo", "Operación"], rows: [["Primer pedido", "+3"], ["Segundo: doble", "+6"], ["Tercero: mitad de 6", "+3"], ["Regreso", "-10"], ["Hasta la casa", "+1"], ["Expresión", "3 + 6 + 3 - 10 + 1"]] },
      chips: [{ text: "+3 primer avance", correct: true }, { text: "+6 doble de 3", correct: true }, { text: "+3 mitad de 6", correct: true }, { text: "-10 regreso", correct: true }, { text: "+1 hasta la casa", correct: true }, { text: "Sumar 10 porque se regresó", correct: false }],
      strategyQuestion: "¿Cómo se representa regresar 10 cuadras?",
      strategyChoices: [{ text: "Con -10, porque reduce el avance neto hacia la casa.", correct: true }, { text: "Con +10, porque también caminó 10 cuadras.", correct: false }, { text: "No se incluye en la operación.", correct: false }],
      miniQuestion: "Si el segundo tramo fue 6, ¿cuánto es la mitad para el tercer tramo?",
      miniChoices: [{ text: "3", correct: true }, { text: "6", correct: false }, { text: "10", correct: false }],
      teacherNote: "La clave es traducir el contexto a signos: avanzar y retroceder no tienen el mismo efecto en la distancia final."
    },
    25: {
      title: "Simulador interactivo · Orden de números decimales negativos",
      challenge: "Ordena presiones negativas de menor a mayor.",
      keyIdea: "Con números negativos, el menor es el que está más a la izquierda en la recta numérica; por eso -7,62 es menor que -7,6.",
      dataTable: { headers: ["Paciente", "Presión"], rows: [["Mariana", "-7,62"], ["Santiago", "-7,60"], ["Orlando", "-7,53"], ["Ximena", "-7,09"], ["Orden", "Mariana, Santiago, Orlando, Ximena"]] },
      chips: [{ text: "Todos son negativos", correct: true }, { text: "Menor = más a la izquierda", correct: true }, { text: "Comparar cifras decimales", correct: true }, { text: "El número con menor valor absoluto siempre es menor", correct: false }],
      strategyQuestion: "¿Cuál presión es la menor?",
      strategyChoices: [{ text: "-7,62", correct: true }, { text: "-7,09", correct: false }, { text: "-7,53", correct: false }],
      miniQuestion: "¿Cuál está más a la izquierda en la recta numérica?",
      miniChoices: [{ text: "-7,62", correct: true }, { text: "-7,6 equivale a 7,6 positivo", correct: false }, { text: "-7,09", correct: false }],
      teacherNote: "En decimales negativos, no basta mirar cuál parece 'más pequeño' en valor absoluto: hay que pensar en la recta numérica."
    }
  };
  return configs[number] || null;
}

function renderS1MathGuidedSimulator(question, config) {
  const dataTable = config.dataTable ? `
    <div class="sim-data-table guided-data-table" role="table" aria-label="Datos clave del simulador">
      <div role="row">${config.dataTable.headers.map(header => `<strong>${escapeHtml(header)}</strong>`).join("")}</div>
      ${config.dataTable.rows.map(row => `<div role="row">${row.map(cell => `<span>${escapeHtml(cell)}</span>`).join("")}</div>`).join("")}
    </div>
  ` : "";
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const options = (question.options || []).map(option => `
    <button class="sim-answer guided-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  return `
    <article class="notebook-card large notebook-simulator-card guided-s1-math-sim" data-question="${Number(question.number)}">
      <p class="eyebrow">🧩 Simulador · Matemáticas Saber 11</p>
      <h3>${escapeHtml(config.title || `Simulador interactivo · Pregunta ${question.number}`)}</h3>
      <p>${escapeHtml(config.challenge || "Practica el razonamiento necesario para resolver la pregunta.")}</p>

      <div class="sim-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto ICFES</h4>
          <p>${escapeHtml(question.prompt || config.challenge || "Analiza la situación y justifica una opción.")}</p>
          ${dataTable}
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea matemática clave</h4>
          <div class="average-formula guided-concept-box">${escapeHtml(config.keyIdea || "Identifica datos, operación, representación y condición del enunciado.")}</div>
          <p>Trabaja los pasos antes de elegir la opción final. El objetivo es aprender el método, no memorizar la respuesta.</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de la pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-guided-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Detecta las pistas útiles</h4></div>
          <p>Selecciona solo las pistas que realmente ayudan a resolver la pregunta.</p>
          <div class="guided-chip-grid" id="guidedChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkGuidedChipsBtn">Verificar pistas</button>
          <p id="guidedChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige la estrategia</h4></div>
          <p>${escapeHtml(config.strategyQuestion || "¿Qué procedimiento conviene aplicar?")}</p>
          <div class="guided-choice-grid" id="guidedStrategyGrid">${strategies}</div>
          <p id="guidedStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Entrenamiento breve</h4></div>
          <p>${escapeHtml(config.miniQuestion || "Resuelve este micro-reto antes de elegir la opción.")}</p>
          <div class="guided-choice-grid" id="guidedMiniGrid">${miniChoices}</div>
          <p id="guidedMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Decide como en la prueba</h4></div>
          <p>Ahora selecciona la opción que mejor responde la pregunta. Si te equivocas, el simulador te muestra qué debes revisar.</p>
          <div class="sim-answer-grid guided-answer-grid" id="guidedFinalAnswerGrid">${options}</div>
          <div id="guidedFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote || question.explanation || "Usa los datos del enunciado y verifica la coherencia de la opción elegida.")}</div>
    </article>
  `;
}

function initS1MathGuidedSimulator(question) {
  const config = getS1MathSimulatorConfig(Number(question.number));
  if (!config) return;

  const chipGrid = document.getElementById("guidedChipGrid");
  const checkChipsBtn = document.getElementById("checkGuidedChipsBtn");
  const chipsFeedback = document.getElementById("guidedChipsFeedback");
  const strategyGrid = document.getElementById("guidedStrategyGrid");
  const strategyFeedback = document.getElementById("guidedStrategyFeedback");
  const miniGrid = document.getElementById("guidedMiniGrid");
  const miniFeedback = document.getElementById("guidedMiniFeedback");
  const finalGrid = document.getElementById("guidedFinalAnswerGrid");
  const finalFeedback = document.getElementById("guidedFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Pistas seleccionadas. Ahora verifica si todas son relevantes.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".guided-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Muy bien.</strong> Identificaste las pistas necesarias para modelar la pregunta.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Seleccionaste una pista que no ayuda a resolver la pregunta. En Saber 11 debes separar datos útiles de distractores.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta seleccionar una pista relevante del enunciado.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".guided-choice");
      if (!button) return;
      grid.querySelectorAll(".guided-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindChoiceGrid(strategyGrid, strategyFeedback, "La estrategia elegida se conecta con la información clave de la pregunta.", "La estrategia no responde directamente a lo que pregunta el enunciado.");
  bindChoiceGrid(miniGrid, miniFeedback, "El micro-reto confirma el procedimiento que debes aplicar.", "Vuelve a la idea matemática clave y revisa los datos antes de continuar.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".guided-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es la adecuada. ${escapeHtml(question.explanation || "La elección coincide con el procedimiento trabajado en el simulador.")}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> La opción marcada no coincide con el razonamiento. Relee el paso 2 y el entrenamiento breve antes de volver a intentarlo.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}
