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
