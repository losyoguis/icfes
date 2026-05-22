const DASHBOARD_ENDPOINT = "https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec";
const DASHBOARD_ENDPOINT_DOMAIN = "";
const DASHBOARD_ENDPOINTS = Array.from(new Set([DASHBOARD_ENDPOINT_DOMAIN, DASHBOARD_ENDPOINT].filter(Boolean)));
const DASHBOARD_INSTITUTION = "Institución Educativa Manuel J. Betancur";
const DASHBOARD_SPREADSHEET_ID = "17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs";
const DASHBOARD_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_SPREADSHEET_ID}/edit`;

const dashboardState = {
  data: null,
  filteredRecords: [],
  filteredDetails: []
};

const els = {
  app: document.getElementById("dashboardApp"),
  status: document.getElementById("dashboardStatus"),
  themeBtn: document.getElementById("themeBtn"),
  refreshBtn: document.getElementById("refreshDashboardBtn"),
  printBtn: document.getElementById("printDashboardBtn"),
  deleteBtn: document.getElementById("deleteSheetDataBtn"),
  group: document.getElementById("filterGroup"),
  student: document.getElementById("filterStudent"),
  from: document.getElementById("filterFrom"),
  to: document.getElementById("filterTo"),
  clear: document.getElementById("clearFiltersBtn"),
  sheets: document.getElementById("openSheetsBtn"),
  kpi: document.getElementById("kpiGrid"),
  groupChart: document.getElementById("groupChart"),
  levelChart: document.getElementById("levelChart"),
  areaChart: document.getElementById("areaChart"),
  questionChart: document.getElementById("questionChart"),
  recommendations: document.getElementById("recommendationsList"),
  studentTable: document.getElementById("studentTableBody"),
  individualPanel: document.getElementById("individualPanel"),
  individualTitle: document.getElementById("individualTitle"),
  individualContent: document.getElementById("individualContent")
};

initDashboard();

function initDashboard() {
  const savedTheme = localStorage.getItem("simulador_icfes_theme") || "light";
  document.documentElement.dataset.theme = savedTheme;
  els.themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  els.themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    els.themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("simulador_icfes_theme", next);
  });

  els.refreshBtn.addEventListener("click", loadDashboardData);
  els.printBtn.addEventListener("click", () => window.print());
  if (els.deleteBtn) els.deleteBtn.addEventListener("click", deleteSheetData);
  [els.group, els.student, els.from, els.to].forEach(input => input.addEventListener("change", renderDashboard));
  els.clear.addEventListener("click", () => {
    els.group.value = "";
    els.student.value = "";
    els.from.value = "";
    els.to.value = "";
    renderDashboard();
  });

  loadDashboardData();
}

function setStatus(message, kind = "info") {
  els.status.textContent = message;
  els.status.dataset.kind = kind;
}

function deleteSheetData() {
  const firstConfirm = window.confirm(
    "Esta acción borrará los resultados registrados en Google Sheets y dejará las hojas listas con sus encabezados.\n\nNo se borrarán las carpetas ni los PDF guardados en Drive.\n\n¿Deseas continuar?"
  );
  if (!firstConfirm) return;

  const phrase = window.prompt('Para confirmar escribe exactamente: BORRAR DATOS');
  if ((phrase || '').trim().toUpperCase() !== 'BORRAR DATOS') {
    setStatus('Borrado cancelado: la frase de confirmación no coincide.', 'warning');
    return;
  }

  const password = window.prompt('Escribe la clave institucional de borrado:');
  if (!password) {
    setStatus('Borrado cancelado: no se ingresó la clave institucional.', 'warning');
    return;
  }

  els.deleteBtn.disabled = true;
  setStatus('Borrando datos de Google Sheets...', 'warning');

  const query = `?accion=borrar-datos&confirmacion=${encodeURIComponent('BORRAR DATOS')}&clave=${encodeURIComponent(password.trim())}`;
  fetchJsonpFromEndpoints(DASHBOARD_ENDPOINTS, query, 90000)
    .then(response => {
      if (!response || response.ok === false) throw new Error(response && response.message ? response.message : 'No fue posible borrar los datos.');
      setStatus(`${response.message || 'Datos borrados correctamente.'} Hojas limpiadas: ${(response.sheetsCleared || []).join(', ')}`, 'success');
      dashboardState.data = { ok: true, records: [], details: [], updatedAt: new Date().toISOString(), institutionName: DASHBOARD_INSTITUTION };
      renderDashboard();
      setTimeout(loadDashboardData, 1200);
    })
    .catch(error => {
      console.error(error);
      setStatus(`No fue posible borrar los datos. Detalle: ${error.message}`, 'error');
    })
    .finally(() => { els.deleteBtn.disabled = false; });
}

function loadDashboardData() {
  setStatus("Inicializando conexión con Google Sheets...", "info");
  els.refreshBtn.disabled = true;
  els.sheets.href = DASHBOARD_SPREADSHEET_URL;
  els.sheets.classList.remove("hidden");

  loadDashboardDataFromAppsScript()
    .catch(error => {
      console.warn("Apps Script no respondió. Se intentará lectura directa desde Google Sheets.", error);
      setStatus("Apps Script no respondió. Intentando lectura directa desde Google Sheets...", "warning");
      return loadDashboardDataFromGoogleSheets();
    })
    .then(data => {
      if (!data || data.ok === false) throw new Error(data && data.message ? data.message : "No se recibieron datos válidos.");
      dashboardState.data = normalizeDashboardData(data);
      populateFilterOptions();
      renderDashboard();
      const count = dashboardState.data.records.length;
      const source = data.source ? ` Fuente: ${data.source}.` : "";
      setStatus(`Datos actualizados: ${count} intento(s). Última actualización: ${formatDateTime(data.updatedAt)}.${source}`, "success");
      if (data.spreadsheetUrl) {
        els.sheets.href = data.spreadsheetUrl;
        els.sheets.classList.remove("hidden");
      }
    })
    .catch(error => {
      console.error(error);
      setStatus(`No fue posible cargar el dashboard. Verifica que el nuevo Code.gs esté desplegado, que el Web App sea accesible y que el Sheets tenga permisos de lectura. Detalle: ${error.message}`, "error");
      renderEmptyState();
    })
    .finally(() => { els.refreshBtn.disabled = false; });
}

function loadDashboardDataFromAppsScript() {
  return fetchJsonpFromEndpoints(DASHBOARD_ENDPOINTS, '?accion=dashboard-data', 90000)
    .then(data => {
      if (!data || data.ok === false) throw new Error(data && data.message ? data.message : "Respuesta inválida de Apps Script.");
      data.source = "Apps Script";
      return data;
    });
}

function loadDashboardDataFromGoogleSheets() {
  return Promise.all([
    fetchGvizRows("Resultados"),
    fetchGvizRows("Respuestas_Detalladas")
  ]).then(([resultTable, detailTable]) => {
    const records = recordsFromSheetRows(resultTable);
    const details = detailsFromSheetRows(detailTable);
    return {
      ok: true,
      source: "Google Sheets directo",
      institutionName: DASHBOARD_INSTITUTION,
      updatedAt: new Date().toISOString(),
      spreadsheetUrl: DASHBOARD_SPREADSHEET_URL,
      records,
      details,
      summary: {},
      notes: [
        "Datos leídos directamente desde Google Sheets como respaldo cuando Apps Script no respondió.",
        "Para registrar nuevos resultados automáticamente, el Apps Script debe estar desplegado con el Code.gs actualizado."
      ]
    };
  });
}

function fetchJsonpFromEndpoints(endpoints, query, timeoutMs = 25000) {
  const ordered = Array.from(new Set((endpoints || []).filter(Boolean)));
  let lastError = null;
  return ordered.reduce((promise, endpoint) => {
    return promise.catch(error => {
      lastError = error;
      const url = endpoint + (query || '');
      return fetchJsonp(url, timeoutMs);
    });
  }, Promise.reject(new Error('inicio'))).catch(error => {
    throw error && error.message !== 'inicio' ? error : (lastError || new Error('No se pudo conectar con Apps Script.'));
  });
}

function fetchJsonp(url, timeoutMs = 25000) {
  return new Promise((resolve, reject) => {
    const callbackName = `dashboardCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const separator = url.includes("?") ? "&" : "?";
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Tiempo de espera agotado al consultar Apps Script."));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = payload => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con el endpoint del dashboard."));
    };
    script.src = `${url}${separator}callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
    document.body.appendChild(script);
  });
}

function fetchGvizRows(sheetName) {
  return new Promise((resolve, reject) => {
    const callbackName = `gvizCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = `https://docs.google.com/spreadsheets/d/${DASHBOARD_SPREADSHEET_ID}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=out:json;responseHandler:${callbackName}&t=${Date.now()}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Tiempo de espera agotado leyendo la hoja ${sheetName}.`));
    }, 30000);

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = response => {
      cleanup();
      try {
        const table = response && response.table ? response.table : { cols: [], rows: [] };
        const headers = table.cols.map(col => (col.label || col.id || "").trim());
        const rows = table.rows.map(row => (row.c || []).map(cell => cell ? (cell.f ?? cell.v ?? "") : ""));
        resolve({ headers, rows });
      } catch (error) {
        reject(error);
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error(`No fue posible leer la hoja ${sheetName} directamente.`));
    };

    script.src = url;
    document.body.appendChild(script);
  });
}

function recordsFromSheetRows(table) {
  const headers = table.headers || [];
  const rows = table.rows || [];
  const idx = name => headers.findIndex(header => normalizeHeader(header) === normalizeHeader(name));
  const at = (row, name) => {
    const i = idx(name);
    return i >= 0 ? row[i] : "";
  };

  return rows.filter(row => row.some(cell => String(cell || "").trim() !== "")).map(row => {
    const byAreaRaw = at(row, "Resultado por area JSON");
    return {
      timestamp: at(row, "Marca de tiempo"),
      timestampISO: parseDateToIso(at(row, "Marca de tiempo")) || parseDateToIso(at(row, "Fecha de finalizacion")),
      institution: at(row, "Institucion educativa") || DASHBOARD_INSTITUTION,
      studentName: at(row, "Nombre del estudiante"),
      group: at(row, "Grupo"),
      email: at(row, "Correo del estudiante"),
      sessionLabel: at(row, "Seccion"),
      sessionTitle: at(row, "Titulo de sesion"),
      scopeLabel: at(row, "Alcance"),
      modeLabel: at(row, "Modo"),
      finishedAtLabel: at(row, "Fecha de finalizacion"),
      elapsedLabel: at(row, "Tiempo empleado"),
      totalQuestions: toNumber(at(row, "Preguntas disponibles")),
      answered: toNumber(at(row, "Respondidas")),
      scored: toNumber(at(row, "Calificables")),
      correct: toNumber(at(row, "Correctas")),
      incorrect: toNumber(at(row, "Incorrectas")),
      omitted: toNumber(at(row, "Omitidas")),
      score: toNumber(at(row, "Porcentaje de acierto")),
      level: at(row, "Nivel de desempeno interno"),
      recommendation: at(row, "Recomendacion pedagogica"),
      pdfDriveUrl: at(row, "PDF en Drive"),
      pdfDriveId: at(row, "ID PDF en Drive"),
      byArea: parseJsonArray(byAreaRaw),
      submissionId: at(row, "ID envio")
    };
  }).filter(record => !isSystemTestRecord(record));
}

function detailsFromSheetRows(table) {
  const headers = table.headers || [];
  const rows = table.rows || [];
  const idx = name => headers.findIndex(header => normalizeHeader(header) === normalizeHeader(name));
  const at = (row, name) => {
    const i = idx(name);
    return i >= 0 ? row[i] : "";
  };

  return rows.filter(row => row.some(cell => String(cell || "").trim() !== "")).map(row => ({
    timestamp: at(row, "Marca de tiempo"),
    timestampISO: parseDateToIso(at(row, "Marca de tiempo")) || parseDateToIso(at(row, "Fecha de finalizacion")),
    institution: at(row, "Institucion educativa") || DASHBOARD_INSTITUTION,
    studentName: at(row, "Nombre del estudiante"),
    group: at(row, "Grupo"),
    email: at(row, "Correo del estudiante"),
    sessionLabel: at(row, "Seccion"),
    scopeLabel: at(row, "Alcance"),
    number: toNumber(at(row, "Pregunta")),
    area: at(row, "Area"),
    competence: at(row, "Competencia"),
    component: at(row, "Componente"),
    difficulty: at(row, "Dificultad"),
    studentAnswer: at(row, "Respuesta del estudiante"),
    correctAnswer: at(row, "Respuesta correcta"),
    result: at(row, "Resultado"),
    submissionId: at(row, "ID envio")
  })).filter(record => !isSystemTestRecord(record));
}

function isSystemTestRecord(record) {
  const text = `${record.studentName || ""} ${record.scopeLabel || ""} ${record.sessionTitle || ""} ${record.email || ""}`.toLowerCase();
  return text.includes("prueba registro liviano") || text.includes("estudiante prueba dashboard") || (text.includes("prueba") && text.includes("dashboard institucional"));
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  const text = String(value || "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function parseDateToIso(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const nativeDate = new Date(text);
  if (!Number.isNaN(nativeDate.getTime())) return nativeDate.toISOString();
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (match) {
    const [, d, m, y, hh = "0", mm = "0", ss = "0"] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss));
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return "";
}

function normalizeDashboardData(data) {
  return {
    ...data,
    records: Array.isArray(data.records) ? data.records.map(record => ({
      ...record,
      score: toNumber(record.score),
      totalQuestions: toNumber(record.totalQuestions),
      answered: toNumber(record.answered),
      correct: toNumber(record.correct),
      incorrect: toNumber(record.incorrect),
      omitted: toNumber(record.omitted),
      byArea: Array.isArray(record.byArea) ? record.byArea : []
    })).filter(record => !isSystemTestRecord(record)) : [],
    details: Array.isArray(data.details) ? data.details.map(item => ({
      ...item,
      number: toNumber(item.number)
    })).filter(record => !isSystemTestRecord(record)) : []
  };
}

function populateFilterOptions() {
  const data = dashboardState.data || { records: [] };
  const groups = unique(data.records.map(record => record.group).filter(Boolean)).sort();
  const selectedGroup = els.group.value;
  els.group.innerHTML = `<option value="">Todos los grupos</option>` + groups.map(group => `<option value="${escapeAttr(group)}">${escapeHtml(group)}</option>`).join("");
  if (groups.includes(selectedGroup)) els.group.value = selectedGroup;
  populateStudentOptions();
}

function populateStudentOptions() {
  const data = dashboardState.data || { records: [] };
  const group = els.group.value;
  const selectedStudent = els.student.value;
  const students = latestStudents(data.records.filter(record => !group || record.group === group));
  els.student.innerHTML = `<option value="">Todos los estudiantes</option>` + students.map(student => `<option value="${escapeAttr(student.key)}">${escapeHtml(student.studentName)} · ${escapeHtml(student.group)}</option>`).join("");
  if (students.some(student => student.key === selectedStudent)) els.student.value = selectedStudent;
}

function renderDashboard() {
  if (!dashboardState.data) {
    renderEmptyState();
    return;
  }

  populateStudentOptions();
  const { records, details } = applyFilters(dashboardState.data.records, dashboardState.data.details);
  dashboardState.filteredRecords = records;
  dashboardState.filteredDetails = details;

  if (!records.length) {
    renderNoFilteredData();
    return;
  }

  const summary = summarize(records);
  renderKpis(summary);
  renderGroupChart(records);
  renderLevelChart(records);
  renderAreaChart(records);
  renderQuestionChart(details);
  renderRecommendations(summary, records, details);
  renderStudentTable(records);
  renderIndividualPanel(records);
}

function applyFilters(records, details) {
  const group = els.group.value;
  const studentKey = els.student.value;
  const from = els.from.value ? new Date(`${els.from.value}T00:00:00`) : null;
  const to = els.to.value ? new Date(`${els.to.value}T23:59:59`) : null;

  const filteredRecords = records.filter(record => {
    if (group && record.group !== group) return false;
    if (studentKey && getStudentKey(record) !== studentKey) return false;
    const date = getRecordDate(record);
    if (from && date && date < from) return false;
    if (to && date && date > to) return false;
    return true;
  });

  const allowed = new Set(filteredRecords.map(getRecordAttemptKey));
  const filteredDetails = details.filter(item => {
    if (allowed.has(getDetailAttemptKey(item))) return true;
    if (group && item.group !== group) return false;
    if (studentKey && getStudentKey(item) !== studentKey) return false;
    return !from && !to;
  });

  return { records: filteredRecords, details: filteredDetails };
}

function renderKpis(summary) {
  els.kpi.innerHTML = [
    kpiCard("Intentos registrados", summary.totalAttempts, "Pruebas enviadas al sistema"),
    kpiCard("Estudiantes únicos", summary.uniqueStudents, "Seguimiento individual"),
    kpiCard("Promedio general", `${summary.avgScore}%`, "Porcentaje de acierto"),
    kpiCard("Nivel predominante", summary.mainLevel, "Según escala interna"),
    kpiCard("Área fortaleza", summary.bestArea, "Mayor porcentaje de acierto"),
    kpiCard("Área prioritaria", summary.weakArea, "Menor porcentaje de acierto")
  ].join("");
}

function kpiCard(label, value, hint) {
  return `<article class="dashboard-kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><p>${escapeHtml(hint)}</p></article>`;
}

function renderGroupChart(records) {
  const groups = Object.entries(groupBy(records, record => record.group || "Sin grupo"))
    .map(([group, items]) => ({
      group,
      avg: round(average(items.map(item => item.score)), 1),
      attempts: items.length,
      unique: unique(items.map(getStudentKey)).length
    }))
    .sort((a, b) => b.avg - a.avg);

  els.groupChart.innerHTML = groups.length ? groups.map(item => horizontalBar(item.group, item.avg, `${item.avg}% · ${item.unique} estudiante(s) · ${item.attempts} intento(s)`)).join("") : emptyBlock("Sin datos por grupo.");
}

function renderLevelChart(records) {
  const levels = levelDistribution(records);
  const total = Math.max(records.length, 1);
  els.levelChart.innerHTML = Object.entries(levels).map(([level, count]) => {
    const percent = Math.round((count / total) * 100);
    return horizontalBar(level, percent, `${count} intento(s) · ${percent}%`, levelClass(level));
  }).join("");
}

function renderAreaChart(records) {
  const stats = summarizeAreas(records);
  const rows = Object.entries(stats).map(([area, stat]) => ({
    area,
    percent: stat.total ? round((stat.correct / stat.total) * 100, 1) : 0,
    total: stat.total,
    correct: stat.correct
  })).sort((a, b) => b.percent - a.percent);

  els.areaChart.innerHTML = rows.length ? rows.map(row => horizontalBar(row.area, row.percent, `${row.percent}% · ${row.correct}/${row.total} correctas`)).join("") : emptyBlock("Sin resultados por área.");
}

function renderQuestionChart(details) {
  const stats = questionStats(details)
    .filter(item => item.total >= 1)
    .sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total)
    .slice(0, 12);

  if (!stats.length) {
    els.questionChart.innerHTML = emptyBlock("Aún no hay detalle de preguntas suficiente para generar este análisis.");
    return;
  }

  els.questionChart.innerHTML = stats.map(item => {
    const errorPercent = Math.round(100 - item.percentCorrect);
    const label = `Pregunta ${item.number} · ${item.area}`;
    const detail = `${errorPercent}% error · ${item.incorrect + item.omitted}/${item.total} dificultades`;
    return horizontalBar(label, errorPercent, detail, "risk");
  }).join("");
}

function renderRecommendations(summary, records, details) {
  const questions = questionStats(details).sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total).slice(0, 5);
  const groupRisk = Object.entries(groupBy(records, record => record.group || "Sin grupo"))
    .map(([group, items]) => ({ group, avg: average(items.map(item => item.score)) }))
    .sort((a, b) => a.avg - b.avg)[0];

  const recommendations = [
    `El promedio general filtrado es ${summary.avgScore}%, con nivel predominante ${summary.mainLevel}.`,
    `El área prioritaria es ${summary.weakArea}. Se recomienda diseñar refuerzos cortos por competencias y revisar los distractores más frecuentes.`,
    groupRisk ? `El grupo que requiere mayor acompañamiento en este filtro es ${groupRisk.group}, con promedio de ${round(groupRisk.avg, 1)}%.` : "No hay datos suficientes para priorizar un grupo.",
    questions.length ? `Preguntas críticas sugeridas para socialización: ${questions.map(q => `P${q.number}`).join(", ")}.` : "Cuando existan más registros, el sistema identificará automáticamente las preguntas con mayor error.",
    "Usar estos datos como lectura pedagógica interna. No reemplaza el cálculo oficial del ICFES, pero permite orientar planes de mejoramiento institucional."
  ];

  els.recommendations.innerHTML = recommendations.map(text => `<div class="recommendation-item">${escapeHtml(text)}</div>`).join("");
}

function renderStudentTable(records) {
  const students = latestStudents(records);
  els.studentTable.innerHTML = students.map(student => {
    const pdf = student.latest.pdfDriveUrl ? `<a href="${escapeAttr(student.latest.pdfDriveUrl)}" target="_blank" rel="noopener noreferrer">Abrir</a>` : "-";
    return `
      <tr>
        <td>${escapeHtml(student.group)}</td>
        <td>${escapeHtml(student.studentName)}<br><small>${escapeHtml(student.email)}</small></td>
        <td>${student.attempts}</td>
        <td><strong>${student.latest.score}%</strong></td>
        <td>${student.avgScore}%</td>
        <td>${escapeHtml(levelForScore(student.avgScore))}</td>
        <td>${escapeHtml(weakAreasText(student.latest.byArea))}</td>
        <td>${pdf}</td>
      </tr>
    `;
  }).join("");
}

function renderIndividualPanel(records) {
  const key = els.student.value;
  if (!key) {
    els.individualPanel.classList.add("hidden");
    return;
  }

  const studentRecords = records.filter(record => getStudentKey(record) === key).sort((a, b) => dateValue(b.timestampISO || b.timestamp) - dateValue(a.timestampISO || a.timestamp));
  if (!studentRecords.length) {
    els.individualPanel.classList.add("hidden");
    return;
  }

  const latest = studentRecords[0];
  const groupRecords = (dashboardState.data.records || []).filter(record => record.group === latest.group);
  const groupAvg = round(average(groupRecords.map(record => record.score)), 1);
  const instAvg = round(average((dashboardState.data.records || []).map(record => record.score)), 1);
  const studentAvg = round(average(studentRecords.map(record => record.score)), 1);

  els.individualTitle.textContent = `${latest.studentName} · ${latest.group}`;
  els.individualContent.innerHTML = `
    <div class="individual-summary-grid">
      ${kpiCard("Último resultado", `${latest.score}%`, latest.finishedAtLabel || "Último intento")}
      ${kpiCard("Promedio estudiante", `${studentAvg}%`, `${studentRecords.length} intento(s)`) }
      ${kpiCard("Promedio grupo", `${groupAvg}%`, latest.group)}
      ${kpiCard("Promedio institución", `${instAvg}%`, DASHBOARD_INSTITUTION)}
    </div>
    <div class="dashboard-chart individual-area-chart">
      ${(latest.byArea || []).map(area => horizontalBar(area.area, toNumber(area.percent), `${toNumber(area.percent)}% · ${area.correct}/${area.total} correctas`)).join("") || emptyBlock("Sin datos por área para este estudiante.")}
    </div>
    <div class="recommendations-list">
      <div class="recommendation-item"><strong>Recomendación:</strong> ${escapeHtml(recommendationForScore(studentAvg))}</div>
      ${latest.pdfDriveUrl ? `<div class="recommendation-item"><a href="${escapeAttr(latest.pdfDriveUrl)}" target="_blank" rel="noopener noreferrer">Abrir PDF individual guardado en Drive</a></div>` : ""}
    </div>
  `;
  els.individualPanel.classList.remove("hidden");
}

function renderNoFilteredData() {
  els.kpi.innerHTML = kpiCard("Sin datos", "0", "No hay registros con los filtros seleccionados.");
  els.groupChart.innerHTML = emptyBlock("Ajusta los filtros para ver resultados.");
  els.levelChart.innerHTML = emptyBlock("Sin datos.");
  els.areaChart.innerHTML = emptyBlock("Sin datos.");
  els.questionChart.innerHTML = emptyBlock("Sin datos.");
  els.recommendations.innerHTML = `<div class="recommendation-item">No se encontraron registros con los filtros seleccionados.</div>`;
  els.studentTable.innerHTML = `<tr><td colspan="8">Sin registros para mostrar.</td></tr>`;
  els.individualPanel.classList.add("hidden");
}

function renderEmptyState() {
  els.kpi.innerHTML = kpiCard("Dashboard", "Sin conexión", "No se recibió respuesta del Web App. Revisa la implementación de Apps Script.");
  els.groupChart.innerHTML = emptyBlock("Si este mensaje permanece, ejecuta inicializarSistema() y prueba ?accion=ping en el Web App.");
  els.levelChart.innerHTML = emptyBlock("Sin datos.");
  els.areaChart.innerHTML = emptyBlock("Sin datos.");
  els.questionChart.innerHTML = emptyBlock("Sin datos.");
  els.recommendations.innerHTML = `<div class="recommendation-item">Cuando los estudiantes finalicen el simulacro y envíen el informe, los datos aparecerán aquí automáticamente.</div>`;
  els.studentTable.innerHTML = `<tr><td colspan="8">Sin registros para mostrar.</td></tr>`;
  els.individualPanel.classList.add("hidden");
}

function horizontalBar(label, percent, detail, className = "") {
  const value = Math.max(0, Math.min(100, Number(percent) || 0));
  return `
    <div class="dashboard-bar-row ${escapeAttr(className)}">
      <div class="dashboard-bar-label"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div>
      <div class="dashboard-bar-track"><span style="width:${value}%"></span></div>
    </div>
  `;
}

function emptyBlock(text) {
  return `<div class="dashboard-empty">${escapeHtml(text)}</div>`;
}

function summarize(records) {
  const totalAttempts = records.length;
  const uniqueStudents = unique(records.map(getStudentKey)).length;
  const avgScore = round(average(records.map(record => record.score)), 1);
  const levels = levelDistribution(records);
  const mainLevel = Object.entries(levels).sort((a, b) => b[1] - a[1])[0]?.[0] || levelForScore(avgScore);
  const areaRows = Object.entries(summarizeAreas(records)).map(([area, stat]) => ({ area, percent: stat.total ? (stat.correct / stat.total) * 100 : 0 }));
  areaRows.sort((a, b) => b.percent - a.percent);
  return {
    totalAttempts,
    uniqueStudents,
    avgScore,
    mainLevel,
    bestArea: areaRows.length ? `${areaRows[0].area} (${round(areaRows[0].percent, 1)}%)` : "Sin datos",
    weakArea: areaRows.length ? `${areaRows[areaRows.length - 1].area} (${round(areaRows[areaRows.length - 1].percent, 1)}%)` : "Sin datos"
  };
}

function latestStudents(records) {
  const grouped = groupBy(records, getStudentKey);
  return Object.entries(grouped).map(([key, items]) => {
    const ordered = items.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp) - dateValue(a.timestampISO || a.timestamp));
    const latest = ordered[0];
    return {
      key,
      studentName: latest.studentName || "Sin nombre",
      group: latest.group || "Sin grupo",
      email: latest.email || "Sin correo",
      attempts: items.length,
      latest,
      avgScore: round(average(items.map(item => item.score)), 1)
    };
  }).sort((a, b) => b.avgScore - a.avgScore || a.studentName.localeCompare(b.studentName));
}

function summarizeAreas(records) {
  const stats = {};
  records.forEach(record => {
    (record.byArea || []).forEach(area => {
      const name = area.area || "Área sin nombre";
      if (!stats[name]) stats[name] = { total: 0, answered: 0, correct: 0, incorrect: 0, omitted: 0 };
      stats[name].total += toNumber(area.total);
      stats[name].answered += toNumber(area.answered);
      stats[name].correct += toNumber(area.correct);
      stats[name].incorrect += toNumber(area.incorrect);
      stats[name].omitted += toNumber(area.omitted);
    });
  });
  return stats;
}

function questionStats(details) {
  const grouped = groupBy(details, item => `${item.number}|${item.area || ""}`);
  return Object.entries(grouped).map(([key, items]) => {
    const [number, area] = key.split("|");
    const correct = items.filter(item => /correcta/i.test(item.result || "")).length;
    const omitted = items.filter(item => /omitida|sin responder/i.test(item.result || "") || /sin responder/i.test(item.studentAnswer || "")).length;
    const incorrect = Math.max(items.length - correct - omitted, 0);
    return {
      number: Number(number),
      area,
      total: items.length,
      correct,
      incorrect,
      omitted,
      percentCorrect: items.length ? round((correct / items.length) * 100, 1) : 0
    };
  });
}

function levelDistribution(records) {
  const levels = {
    "Nivel 1 - Bajo": 0,
    "Nivel 2 - Básico": 0,
    "Nivel 3 - Satisfactorio": 0,
    "Nivel 4 - Avanzado": 0
  };
  records.forEach(record => { levels[levelForScore(record.score)] += 1; });
  return levels;
}

function levelForScore(score) {
  const value = toNumber(score);
  if (value >= 76) return "Nivel 4 - Avanzado";
  if (value >= 61) return "Nivel 3 - Satisfactorio";
  if (value >= 41) return "Nivel 2 - Básico";
  return "Nivel 1 - Bajo";
}

function levelClass(level) {
  if (/avanzado/i.test(level)) return "advanced";
  if (/satisfactorio/i.test(level)) return "satisfactory";
  if (/básico|basico/i.test(level)) return "basic";
  return "low";
}

function weakAreasText(areas) {
  const weak = (areas || []).filter(area => toNumber(area.percent) < 60).sort((a, b) => toNumber(a.percent) - toNumber(b.percent));
  return weak.length ? weak.map(area => `${area.area} (${toNumber(area.percent)}%)`).join(", ") : "Sin áreas críticas";
}

function recommendationForScore(score) {
  const value = toNumber(score);
  if (value >= 76) return "Mantener desempeño alto con retos de profundización, simulacros cronometrados y análisis de preguntas de alta complejidad.";
  if (value >= 61) return "Fortalecer áreas específicas con errores recurrentes y trabajar lectura crítica de enunciados y opciones.";
  if (value >= 41) return "Implementar refuerzo por competencias, recuperación de conceptos base y práctica guiada con retroalimentación.";
  return "Priorizar acompañamiento intensivo, comprensión lectora de preguntas, manejo del tiempo y recuperación de aprendizajes esenciales.";
}

function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item) || "Sin dato";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function unique(items) {
  return Array.from(new Set(items.map(item => String(item || "").trim()).filter(Boolean)));
}

function average(values) {
  const nums = values.map(toNumber).filter(value => Number.isFinite(value));
  return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : 0;
}

function round(value, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round((Number(value) || 0) * factor) / factor;
}

function toNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function getStudentKey(record) {
  return `${record.email || ""}|${record.studentName || ""}|${record.group || ""}`;
}

function getRecordAttemptKey(record) {
  return `${record.timestampISO || record.timestamp || ""}|${record.email || ""}|${record.studentName || ""}|${record.group || ""}`;
}

function getDetailAttemptKey(item) {
  return `${item.timestampISO || item.timestamp || ""}|${item.email || ""}|${item.studentName || ""}|${item.group || ""}`;
}

function getRecordDate(record) {
  const value = record.timestampISO || record.timestamp || record.finishedAtLabel;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateValue(value) {
  const date = new Date(value || 0);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function formatDateTime(value) {
  if (!value) return "Sin registrar";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
