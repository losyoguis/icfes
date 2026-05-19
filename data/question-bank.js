/*
  Banco interno de preguntas del simulador.
  No es JSON externo: cada pregunta se adiciona aquí como objeto JavaScript.
*/

const QUESTION_BANK = [
  {
    uid: "s1-mat-001",
    session: 1,
    block: 1,
    number: 1,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística descriptiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 1",
    stem: "En la siguiente tabla se evidencian los resultados de una entrevista realizada a siete mujeres, madres de familia, en donde se les preguntó a qué edad tuvieron su primer hijo.",
    resources: [
      {
        type: "table",
        caption: "Resultados de la entrevista",
        headers: ["Madre", "Edad (años)"],
        rows: [
          ["1", "21"],
          ["2", "26"],
          ["3", "20"],
          ["4", "21"],
          ["5", "22"],
          ["6", "28"],
          ["7", "30"]
        ]
      }
    ],
    prompt: "A partir de la información suministrada, ¿cuál es el promedio de las edades?",
    options: [
      { letter: "A", text: "18" },
      { letter: "B", text: "22" },
      { letter: "C", text: "24" },
      { letter: "D", text: "28" }
    ],
    correctAnswer: "C",
    explanation: "El promedio se obtiene sumando las siete edades y dividiendo entre 7: 21 + 26 + 20 + 21 + 22 + 28 + 30 = 168. Luego, 168 ÷ 7 = 24. Por tanto, la respuesta correcta es C."
  }
  ,
  {
    uid: "s1-mat-002",
    session: 1,
    block: 1,
    number: 2,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Aritmética y modelación con porcentajes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 2",
    stem: "Una aerolínea ofrece vuelos nacionales manejando las siguientes tarifas y aclarando que, al precio relacionado, se debe agregar el impuesto del 12 % o 19 % según la temporada del año seleccionada para el viaje.",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-fare-card">
            <div class="table-wrap icfes-table-wrap">
              <table class="data-table fare-table" aria-label="Tarifas de trayecto nacional">
                <thead>
                  <tr>
                    <th></th>
                    <th>Costo de lunes, martes, miércoles o jueves</th>
                    <th>Costo de viernes, sábado o domingo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Trayecto nacional</th>
                    <td>$80.000</td>
                    <td>$150.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Un usuario compra 5 tiquetes para viajar el día jueves y 2 tiquetes para viajar el día sábado, para lo que debe usar la fórmula:</p>
            <div class="formula-box">
              <span>Valor total a pagar</span>
              <strong>=</strong>
              <span>(5 × 80.000 + 2 × 150.000)(1 + y)</span>
            </div>
            <p>Donde <em>y</em> es el porcentaje del impuesto.</p>
          </div>
        `
      }
    ],
    prompt: "Sobre el valor total a pagar, ¿cuál de las siguientes afirmaciones es verdadera?",
    options: [
      { letter: "A", text: "Es posible calcular el valor total a pagar, ya que se aplica el impuesto del 12 % a los tiquetes comprados para el día jueves y el impuesto del 19 % a los tiquetes para el día sábado." },
      { letter: "B", text: "No es posible calcular el valor total a pagar, ya que el impuesto del 12 % y 19 % dependen de la temporada del año, y esta se desconoce." },
      { letter: "C", text: "Es posible calcular el valor total a pagar, ya que se ejecuta la multiplicación entre la cantidad de tiquetes comprados para cada día y el valor respectivo." },
      { letter: "D", text: "No es posible calcular el valor total a pagar, ya que falta conocer la tarifa correspondiente para asignar el valor de los tiquetes para el día jueves y sábado." }
    ],
    correctAnswer: "B",
    explanation: "La fórmula permite calcular el valor base de los tiquetes: 5 × 80.000 + 2 × 150.000. Sin embargo, para hallar el valor total se necesita conocer el valor de y, que representa el impuesto aplicable. Como el impuesto puede ser 12 % o 19 % según la temporada y la temporada no se informa, no es posible determinar un único valor total. Por tanto, la respuesta correcta es B."
  }
  ,
  {
    uid: "s1-mat-003",
    session: 1,
    block: 1,
    number: 3,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Conjuntos, tablas y diagramas de Venn",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 3",
    stem: "Un laboratorio aplicó un tratamiento médico a 60 pacientes y registró en un diagrama los tres efectos secundarios que padecieron algunos de ellos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-venn-card">
            <figure class="venn-figure" aria-label="Diagrama de Venn con efectos secundarios: dolor de cabeza, mareo y náuseas">
              <svg class="venn-svg" viewBox="0 0 560 360" role="img" aria-labelledby="vennTitle vennDesc">
                <title id="vennTitle">Diagrama de efectos secundarios</title>
                <desc id="vennDesc">Diagrama de Venn con dolor de cabeza, mareo y náuseas. Las regiones muestran 10, 8, 5, 6, 1, 15 y 15 pacientes.</desc>
                <rect x="15" y="15" width="530" height="330" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="235" cy="145" r="82" class="venn-circle"/>
                <circle cx="345" cy="145" r="82" class="venn-circle"/>
                <circle cx="290" cy="230" r="82" class="venn-circle"/>

                <line x1="62" y1="105" x2="150" y2="105" class="venn-line"/>
                <line x1="150" y1="105" x2="158" y2="125" class="venn-line"/>
                <text x="45" y="96" class="venn-label">Dolor de cabeza</text>

                <line x1="492" y1="105" x2="430" y2="105" class="venn-line"/>
                <line x1="430" y1="105" x2="420" y2="125" class="venn-line"/>
                <text x="465" y="96" class="venn-label right">Mareo</text>

                <line x1="90" y1="280" x2="190" y2="280" class="venn-line"/>
                <line x1="190" y1="280" x2="218" y2="250" class="venn-line"/>
                <text x="65" y="270" class="venn-label">Náuseas</text>

                <text x="193" y="142" class="venn-number">10</text>
                <text x="290" y="126" class="venn-number">8</text>
                <text x="385" y="142" class="venn-number">5</text>
                <text x="245" y="205" class="venn-number">6</text>
                <text x="335" y="205" class="venn-number">1</text>
                <text x="282" y="268" class="venn-number">15</text>
                <text x="448" y="268" class="venn-number">15</text>
                <text x="425" y="315" class="venn-caption">Diagrama</text>
              </svg>
            </figure>

            <p>Luego, un médico del laboratorio registró la información en una tabla de la siguiente manera.</p>

            <div class="table-wrap icfes-table-wrap">
              <table class="data-table symptoms-table" aria-label="Efectos secundarios después del tratamiento">
                <thead>
                  <tr>
                    <th colspan="2">Efectos secundarios después del tratamiento</th>
                  </tr>
                  <tr>
                    <th>Efecto secundario</th>
                    <th>Cantidad de pacientes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dolor de cabeza</td>
                    <td>24</td>
                  </tr>
                  <tr>
                    <td>Náuseas</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>Mareo</td>
                    <td>14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Es válida la información que registró el médico en la tabla?",
    options: [
      { letter: "A", text: "No, porque en el diagrama se evidencia que el efecto secundario que más presentaron los pacientes fue el de náuseas." },
      { letter: "B", text: "Sí, porque la cantidad de pacientes que presentó cada síntoma, según la tabla, coincide con la cantidad de pacientes que indica el diagrama." },
      { letter: "C", text: "Sí, porque la cantidad de pacientes a los que se les aplicó el tratamiento, según el diagrama, coincide con la suma de las frecuencias que se presentan en la tabla." },
      { letter: "D", text: "No, porque falta tener en cuenta la cantidad de pacientes que presentaron los tres efectos secundarios." }
    ],
    correctAnswer: "B",
    explanation: "La tabla sí coincide con el diagrama: dolor de cabeza = 10 + 8 + 6 = 24; náuseas = 6 + 15 + 1 = 22; mareo = 8 + 5 + 1 = 14. Por eso, la información registrada es válida y la respuesta correcta es B."
  }


  ,
  {
    uid: "s1-mat-004",
    session: 1,
    block: 1,
    number: 4,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conteo y organización de casos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 4",
    stem: "En una clase de Inglés hay 6 estudiantes, 4 son mujeres y 2 son hombres. Para una exposición, el profesor quiere conformar grupos de 3 estudiantes.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <p>En la tabla, X, Y, Z, y W representan la cantidad de formas que tiene el profesor para escoger cada grupo de 3 estudiantes.</p>
            <table class="data-table" aria-label="Tabla de grupos y características">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Grupo 1</th>
                  <th>Grupo 2</th>
                  <th>Grupo 3</th>
                  <th>Grupo 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Característica</th>
                  <td>Tres hombres</td>
                  <td>Una mujer y dos hombres</td>
                  <td>Dos mujeres y un hombre</td>
                  <td>Tres mujeres</td>
                </tr>
                <tr>
                  <th>Cantidad de formas de escoger el grupo</th>
                  <td>X</td>
                  <td>Y</td>
                  <td>Z</td>
                  <td>W</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con los datos de la tabla, ¿cuáles valores se deben conocer para determinar la cantidad total de formas que hay para escoger un grupo de 3 estudiantes en donde, al menos, uno de ellos sea hombre?",
    options: [
      { letter: "A", text: "Solamente Z." },
      { letter: "B", text: "Solamente Z y W." },
      { letter: "C", text: "Solamente X." },
      { letter: "D", text: "Solamente Y y Z." }
    ],
    correctAnswer: "D",
    explanation: "Para que en el grupo de 3 estudiantes haya al menos un hombre, se deben contar los grupos con una mujer y dos hombres (Y) y los grupos con dos mujeres y un hombre (Z). El grupo de tres mujeres (W) no cumple la condición, y el grupo de tres hombres (X) no es posible porque en la clase solo hay 2 hombres. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-005",
    session: 1,
    block: 1,
    number: 5,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Proporcionalidad y operaciones multiplicativas",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 5",
    stem: "Un banco organizó un concurso para premiar a los usuarios que más utilizan las tarjetas de crédito. La tabla muestra el tipo de premio, la cantidad de premios que se entregó de cada tipo y el monto correspondiente a cada tipo de premio.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de premios del banco">
              <thead>
                <tr>
                  <th>Tipo de premio</th>
                  <th>Cantidad de premios</th>
                  <th>Monto de cada premio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oro</td>
                  <td>5</td>
                  <td>$10.000.000</td>
                </tr>
                <tr>
                  <td>Plata</td>
                  <td>25</td>
                  <td>$5.000.000</td>
                </tr>
                <tr>
                  <td>Bronce</td>
                  <td>100</td>
                  <td>$1.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes tablas muestra el total de dinero entregado por el banco para cada tipo de premio?",
    options: [
      {
        letter: "A",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción A">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$10.000.000</td></tr>
                <tr><td>Plata</td><td>$5.000.000</td></tr>
                <tr><td>Bronce</td><td>$1.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción B">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$50.000.000</td></tr>
                <tr><td>Plata</td><td>$125.000.000</td></tr>
                <tr><td>Bronce</td><td>$100.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción C">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$1.000.000.000</td></tr>
                <tr><td>Plata</td><td>$125.000.000</td></tr>
                <tr><td>Bronce</td><td>$5.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción D">
              <thead>
                <tr><th>Tipo de premio</th><th>Dinero entregado</th></tr>
              </thead>
              <tbody>
                <tr><td>Oro</td><td>$50.000.000</td></tr>
                <tr><td>Plata</td><td>$100.000.000</td></tr>
                <tr><td>Bronce</td><td>$125.000.000</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "B",
    explanation: "Se multiplica la cantidad de premios por el monto de cada premio: Oro = 5 × 10.000.000 = 50.000.000; Plata = 25 × 5.000.000 = 125.000.000; Bronce = 100 × 1.000.000 = 100.000.000. La tabla correcta es la opción B."
  }

  ,
  {
    uid: "s1-mat-006",
    session: 1,
    block: 1,
    number: 6,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Patrones numéricos y progresiones geométricas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 6",
    stem: "Los miembros de una familia deciden ahorrar dinero para comprar una bicicleta que cuesta $750.000. Ellos acuerdan ahorrar $50.000 el primer mes y duplicar el ahorro cada mes hasta completar el valor de la bicicleta. Para calcular la cantidad de meses que la familia debe ahorrar, se puede usar el siguiente procedimiento:",
    resources: [
      {
        type: "html",
        html: `
          <div class="procedure-card">
            <p><strong>Paso 1.</strong> Dividir $750.000 entre $50.000.</p>
            <p><strong>Paso 2.</strong> Encontrar el valor de <em>x</em> tal que la suma de 2<sup>0</sup> + 2<sup>1</sup> + &middot;&middot;&middot; + 2<sup>x</sup> sea igual al resultado obtenido en el paso 1.</p>
            <p><strong>Paso 3.</strong> Sumar 1 al valor de <em>x</em> encontrado en el paso 2.</p>
          </div>
        `
      }
    ],
    prompt: "¿Cuántos meses debe ahorrar la familia para comprar la bicicleta?",
    options: [
      { letter: "A", text: "16" },
      { letter: "B", text: "8" },
      { letter: "C", text: "4" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "Primero, 750.000 ÷ 50.000 = 15. Luego se busca x tal que 2⁰ + 2¹ + 2² + 2³ = 1 + 2 + 4 + 8 = 15, por lo tanto x = 3. Finalmente, se suma 1: 3 + 1 = 4. La familia debe ahorrar durante 4 meses, así que la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-007",
    session: 1,
    block: 1,
    number: 7,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Porcentajes y estrategias de cálculo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 7",
    stem: "Alberto tiene un salario mensual de $800.000 y quiere ahorrar, cada mes, el 2 % de su sueldo para comprar una trompeta. Para determinar cuánto dinero ahorrará cada mes, realizó los siguientes cálculos:",
    resources: [
      {
        type: "html",
        html: `
          <div class="procedure-card">
            <ul class="bullet-procedure">
              <li>8 × 2 = 16</li>
              <li>Como 800.000 tiene 5 ceros a la derecha, solo considera 3, y forma el número 1.000</li>
              <li>Finalmente, con los dos valores anteriores forma el número 16.000</li>
            </ul>
          </div>
          <div class="question-resource extra-text">
            <p>Esto quiere decir que Alberto ahorrará $16.000 cada mes. Estefanía quiere comprar una guitarra y planea seguir la misma estrategia de Alberto, pero ella tiene un sueldo mensual de $900.000 y quiere ahorrar, cada mes, el 3 %.</p>
          </div>
        `
      }
    ],
    prompt: "Si Estefanía ahorra durante 10 meses consecutivos, ¿cuánto dinero ahorrará en total?",
    options: [
      { letter: "A", text: "$297.000" },
      { letter: "B", text: "$270.000" },
      { letter: "C", text: "$240.000" },
      { letter: "D", text: "$180.000" }
    ],
    correctAnswer: "B",
    explanation: "El 3 % de $900.000 es $27.000. Si Estefanía ahorra esa cantidad durante 10 meses, entonces ahorrará 27.000 × 10 = $270.000. Por lo tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-008",
    session: 1,
    block: 1,
    number: 8,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura y comparación de tablas y gráficas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 8",
    stem: "El Departamento Administrativo Nacional de Estadística (DANE) realiza cada año mediciones de la pobreza en Colombia para determinar el índice de pobreza multidimensional (IPM). La tabla muestra la “incidencia de la pobreza por el IPM” para algunas regiones entre 2011 y 2015.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Incidencia de la pobreza por el IPM">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Pacífica</th>
                  <th>Antioquia</th>
                  <th>Bogotá, D. C.</th>
                  <th>Central</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2011</td><td>41,4</td><td>25,7</td><td>11,9</td><td>30,7</td></tr>
                <tr><td>2012</td><td>36,3</td><td>21,7</td><td>11,1</td><td>26,7</td></tr>
                <tr><td>2013</td><td>37,6</td><td>22,4</td><td>8,7</td><td>26,1</td></tr>
                <tr><td>2014</td><td>34,6</td><td>19,5</td><td>5,4</td><td>28,1</td></tr>
                <tr><td>2015</td><td>33,8</td><td>18,7</td><td>4,7</td><td>22,1</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote">Fuente: DANE</p>
          </div>
          <div class="question-resource">
            <p>La gráfica muestra la “incidencia de la pobreza por el IPM” para algunas regiones entre 2011 y 2015.</p>
            <figure class="chart-card">
              <svg class="linechart-svg" viewBox="0 0 640 420" role="img" aria-label="Gráfica de líneas de incidencia de pobreza por IPM para Pacífica, Antioquia, Bogotá D. C. y Central entre 2011 y 2015">
                <rect x="55" y="25" width="540" height="300" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <g class="chart-grid">
                  <line x1="55" y1="325" x2="595" y2="325"/>
                  <line x1="55" y1="265" x2="595" y2="265"/>
                  <line x1="55" y1="205" x2="595" y2="205"/>
                  <line x1="55" y1="145" x2="595" y2="145"/>
                  <line x1="55" y1="85" x2="595" y2="85"/>
                  <line x1="55" y1="25" x2="595" y2="25"/>
                  <line x1="55" y1="25" x2="55" y2="325"/>
                  <line x1="190" y1="25" x2="190" y2="325"/>
                  <line x1="325" y1="25" x2="325" y2="325"/>
                  <line x1="460" y1="25" x2="460" y2="325"/>
                  <line x1="595" y1="25" x2="595" y2="325"/>
                </g>
                <g class="chart-labels">
                  <text x="22" y="329">0</text>
                  <text x="15" y="269">10</text>
                  <text x="15" y="209">20</text>
                  <text x="15" y="149">30</text>
                  <text x="15" y="89">40</text>
                  <text x="15" y="29">45</text>

                  <text x="42" y="357">2011</text>
                  <text x="177" y="357">2012</text>
                  <text x="312" y="357">2013</text>
                  <text x="447" y="357">2014</text>
                  <text x="582" y="357">2015</text>
                </g>

                <g class="series pacifica">
                  <polyline points="55,49 190,83 325,74 460,94 595,101" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="49" r="4"/><circle cx="190" cy="83" r="4"/><circle cx="325" cy="74" r="4"/><circle cx="460" cy="94" r="4"/><circle cx="595" cy="101" r="4"/>
                  <text x="80" y="48">41,4</text><text x="214" y="82">36,3</text><text x="349" y="73">37,6</text><text x="484" y="93">34,6</text><text x="548" y="100">33,8</text>
                </g>

                <g class="series central">
                  <polyline points="55,120 190,148 325,168 460,157 595,192" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="120" r="4"/><circle cx="190" cy="148" r="4"/><circle cx="325" cy="168" r="4"/><circle cx="460" cy="157" r="4"/><circle cx="595" cy="192" r="4"/>
                  <text x="77" y="119">30,7</text><text x="212" y="147">26,7</text><text x="347" y="167">26,1</text><text x="482" y="156">28,1</text><text x="548" y="191">22,1</text>
                </g>

                <g class="series antioquia">
                  <polyline points="55,153 190,188 325,202 460,195 595,213" fill="none" stroke-width="3"/>
                  <polygon points="55,148 60,158 50,158"/><polygon points="190,183 195,193 185,193"/><polygon points="325,197 330,207 320,207"/><polygon points="460,190 465,200 455,200"/><polygon points="595,208 600,218 590,218"/>
                  <text x="68" y="151">25,7</text><text x="202" y="186">20,5</text><text x="337" y="200">18,3</text><text x="472" y="193">19,5</text><text x="548" y="211">18,7</text>
                </g>

                <g class="series bogota">
                  <polyline points="55,246 190,251 325,272 460,292 595,279" fill="none" stroke-width="3"/>
                  <circle cx="55" cy="246" r="4"/><circle cx="190" cy="251" r="4"/><circle cx="325" cy="272" r="4"/><circle cx="460" cy="292" r="4"/><circle cx="595" cy="279" r="4"/>
                  <text x="77" y="244">11,9</text><text x="212" y="249">11,1</text><text x="347" y="270">8,7</text><text x="482" y="290">5,4</text><text x="555" y="277">7,6</text>
                </g>

                <g class="chart-legend">
                  <text x="80" y="18">Pacífica</text>
                  <text x="225" y="18">Antioquia</text>
                  <text x="350" y="18">Bogotá, D. C.</text>
                  <text x="515" y="18">Central</text>
                </g>
              </svg>
              <figcaption class="resource-footnote">Fuente: DANE</figcaption>
            </figure>
          </div>
        `
      }
    ],
    prompt: "¿La información de los datos de la gráfica es la misma que la información presentada en la tabla?",
    options: [
      { letter: "A", text: "Sí, porque la información incluida en la gráfica es semejante a la información presentada en la tabla, para las regiones en mención." },
      { letter: "B", text: "No, porque, en vez de graficar los datos de Antioquia, se graficaron los datos de la región Central." },
      { letter: "C", text: "No, porque los datos de la gráfica de Antioquia para 2012 y 2013, y de Bogotá, D. C. para 2015, son diferentes a los datos presentados en la tabla." },
      { letter: "D", text: "Sí, porque los datos de la gráfica de Antioquia para 2013 y de la región Central para 2012 corresponden a los datos presentados en la tabla." }
    ],
    correctAnswer: "C",
    explanation: "La gráfica no coincide completamente con la tabla. En Antioquia, la tabla muestra 21,7 para 2012 y 22,4 para 2013, pero en la gráfica aparecen 20,5 y 18,3. Además, para Bogotá, D. C. en 2015 la tabla muestra 4,7 y en la gráfica aparece 7,6. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-009",
    session: 1,
    block: 1,
    number: 9,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura e interpretación de tablas y gráficas estadísticas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 9",
    stem: "Una máquina separa las 2.000 papas de un bulto de acuerdo con su peso p, obteniendo los datos de la tabla.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de peso y cantidad de papas">
              <thead>
                <tr>
                  <th>Peso (gramos)</th>
                  <th>Cantidad de papas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>15 ≤ p &lt; 20</td><td>700</td></tr>
                <tr><td>20 ≤ p &lt; 25</td><td>500</td></tr>
                <tr><td>25 ≤ p &lt; 30</td><td>800</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la gráfica que representa la distribución de las papas del bulto de acuerdo con su peso?",
    options: [
      {
        letter: "A",
        text: `
          <div class="graph-option">
            <div class="graph-title">Distribución del peso en gramos</div>
            <svg class="mini-chart" viewBox="0 0 280 170" role="img" aria-label="Opción A, gráfico circular">
              <circle cx="95" cy="85" r="60" fill="#f2f2f2" stroke="#666" stroke-width="1"/>
              <path d="M95 85 L95 25 A60 60 0 0 1 152.1 103.5 Z" fill="#2f6bd8" opacity="0.85"/>
              <path d="M95 85 L152.1 103.5 A60 60 0 0 1 59.7 133.5 Z" fill="#8a8f98" opacity="0.9"/>
              <path d="M95 85 L59.7 133.5 A60 60 0 0 1 95 25 Z" fill="#d7dbe3"/>
              <text x="110" y="68">700</text>
              <text x="112" y="83">35 %</text>
              <text x="93" y="124">500</text>
              <text x="90" y="139">25 %</text>
              <text x="50" y="74">800</text>
              <text x="48" y="89">40 %</text>
              <rect x="178" y="40" width="14" height="14" fill="#d7dbe3" stroke="#666"/>
              <text x="198" y="51">25 ≤ p &lt; 30</text>
              <rect x="178" y="66" width="14" height="14" fill="#2f6bd8" stroke="#666"/>
              <text x="198" y="77">15 ≤ p &lt; 20</text>
              <rect x="178" y="92" width="14" height="14" fill="#8a8f98" stroke="#666"/>
              <text x="198" y="103">20 ≤ p &lt; 25</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="graph-option">
            <div class="graph-title">Distribución del peso en gramos</div>
            <svg class="mini-chart" viewBox="0 0 280 170" role="img" aria-label="Opción B, gráfico circular con tercios iguales">
              <circle cx="95" cy="85" r="60" fill="#f2f2f2" stroke="#666" stroke-width="1"/>
              <path d="M95 85 L95 25 A60 60 0 0 1 147 115 Z" fill="#2f6bd8" opacity="0.85"/>
              <path d="M95 85 L147 115 A60 60 0 0 1 43 115 Z" fill="#8a8f98" opacity="0.9"/>
              <path d="M95 85 L43 115 A60 60 0 0 1 95 25 Z" fill="#d7dbe3"/>
              <text x="102" y="67">15–20</text><text x="105" y="82">33,3 %</text>
              <text x="86" y="129">20–25</text><text x="90" y="144">33,3 %</text>
              <text x="40" y="67">25–30</text><text x="44" y="82">33,3 %</text>
              <rect x="178" y="40" width="14" height="14" fill="#d7dbe3" stroke="#666"/>
              <text x="198" y="51">25 ≤ p &lt; 30</text>
              <rect x="178" y="66" width="14" height="14" fill="#2f6bd8" stroke="#666"/>
              <text x="198" y="77">15 ≤ p &lt; 20</text>
              <rect x="178" y="92" width="14" height="14" fill="#8a8f98" stroke="#666"/>
              <text x="198" y="103">20 ≤ p &lt; 25</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="graph-option">
            <svg class="mini-chart" viewBox="0 0 280 180" role="img" aria-label="Opción C, gráfico de barras del peso en gramos">
              <text x="55" y="18" class="chart-small-title">Distribución del peso en gramos</text>
              <line x1="40" y1="145" x2="240" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="25" x2="40" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <rect x="65" y="85" width="32" height="60" fill="#444"/>
              <rect x="125" y="85" width="32" height="60" fill="#444"/>
              <rect x="185" y="85" width="32" height="60" fill="#444"/>
              <text x="69" y="160">15–20</text>
              <text x="129" y="160">20–25</text>
              <text x="189" y="160">25–30</text>
              <text x="10" y="92">5</text>
              <text x="14" y="27">9</text>
              <text x="8" y="98" transform="rotate(-90 8,98)">Peso (gramos)</text>
              <text x="114" y="176">Intervalo</text>
            </svg>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="graph-option">
            <svg class="mini-chart" viewBox="0 0 280 180" role="img" aria-label="Opción D, gráfico de barras de cantidad de papas">
              <line x1="40" y1="145" x2="240" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="25" x2="40" y2="145" stroke="currentColor" stroke-width="1.5"/>
              <line x1="40" y1="115" x2="240" y2="115" stroke="#c8ccd3" stroke-width="1"/>
              <line x1="40" y1="85" x2="240" y2="85" stroke="#c8ccd3" stroke-width="1"/>
              <line x1="40" y1="55" x2="240" y2="55" stroke="#c8ccd3" stroke-width="1"/>
              <rect x="65" y="40" width="32" height="105" fill="#444"/>
              <rect x="125" y="70" width="32" height="75" fill="#444"/>
              <rect x="185" y="25" width="32" height="120" fill="#444"/>
              <text x="69" y="160">15–20</text>
              <text x="129" y="160">20–25</text>
              <text x="189" y="160">25–30</text>
              <text x="12" y="148">0</text>
              <text x="2" y="118">200</text>
              <text x="2" y="88">400</text>
              <text x="2" y="58">600</text>
              <text x="2" y="28">800</text>
              <text x="12" y="96" transform="rotate(-90 12,96)">Cantidad de papas</text>
              <text x="114" y="176">Intervalo</text>
            </svg>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "D",
    explanation: "La tabla muestra la cantidad de papas por intervalo de peso: 700 para 15 ≤ p < 20, 500 para 20 ≤ p < 25 y 800 para 25 ≤ p < 30. La única gráfica que representa directamente esas cantidades en el eje vertical y los intervalos en el eje horizontal es la opción D."
  }

  ,
  {
    uid: "s1-mat-010",
    session: 1,
    block: 1,
    number: 10,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Muestreo e inferencia estadística",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 10",
    stem: "Un candidato a la gobernación de un departamento quiere estimar el porcentaje de la población que votará por él. Para ello, contrata una firma encuestadora que realizará 1.000 llamadas telefónicas, en las que se preguntará por la preferencia de las personas a la hora de votar en las elecciones para gobernador. Para realizar la encuesta, la firma escoge aleatoriamente un municipio del departamento y llama a 1.000 personas de este lugar.",
    resources: [],
    prompt: "¿Por qué el resultado de la encuesta puede diferir mucho de la realidad?",
    options: [
      { letter: "A", text: "Porque la única manera de obtener resultados precisos es encuestar a toda la población del departamento." },
      { letter: "B", text: "Porque la encuesta solo representará la opinión de las personas del departamento, si el municipio escogido es el más grande." },
      { letter: "C", text: "Porque de esta manera solo están tomándose en cuenta las opiniones de la población de un municipio del departamento." },
      { letter: "D", text: "Porque la muestra es muy grande, lo cual permite que existan grandes diferencias entre las respuestas de las personas." }
    ],
    correctAnswer: "C",
    explanation: "El problema es que la muestra no representa adecuadamente a todo el departamento, porque las 1.000 personas encuestadas pertenecen solo a un municipio. Por eso, los resultados pueden diferir mucho de la realidad del departamento completo. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-011",
    session: 1,
    block: 1,
    number: 11,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría y cálculo de áreas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 11",
    stem: "Una torta con forma rectangular, que tiene 60 cm de base por 20 cm de altura, fue repartida entre 8 personas por medio de los siguientes cortes rectos:",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card cake-figure">
            <svg class="cake-svg" viewBox="0 0 760 280" role="img" aria-label="Diagrama de una torta rectangular dividida en 8 trozos con medidas indicadas">
              <defs>
                <pattern id="cakePattern" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#ece3c8"/>
                  <path d="M1,10 C4,7 8,7 11,10" stroke="#c6b58d" stroke-width="1.2" fill="none"/>
                  <path d="M2,4 C4,2 7,2 10,5" stroke="#d2c39e" stroke-width="1.2" fill="none"/>
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>
              <rect x="140" y="40" width="480" height="160" rx="2" fill="url(#cakePattern)" stroke="currentColor" stroke-width="2"/>
              <line x1="140" y1="120" x2="620" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="380" y1="40" x2="380" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="260" y1="40" x2="260" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="260" y1="120" x2="260" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="500" y1="40" x2="500" y2="120" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>
              <line x1="500" y1="120" x2="500" y2="200" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5"/>

              <text x="555" y="72" class="cake-num">1</text>
              <text x="185" y="72" class="cake-num">2</text>
              <text x="185" y="165" class="cake-num">3</text>
              <text x="555" y="165" class="cake-num">4</text>
              <text x="472" y="72" class="cake-num">5</text>
              <text x="282" y="72" class="cake-num">6</text>
              <text x="282" y="165" class="cake-num">7</text>
              <text x="472" y="165" class="cake-num">8</text>

              <line x1="260" y1="60" x2="380" y2="60" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="312" y="54" class="measure-label">15 cm</text>
              <line x1="380" y1="90" x2="500" y2="90" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="432" y="84" class="measure-label">15 cm</text>
              <line x1="300" y1="40" x2="300" y2="120" stroke="currentColor" stroke-width="1.4" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="308" y="84" class="measure-label">5 cm</text>

              <line x1="380" y1="224" x2="620" y2="224" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="484" y="243" class="measure-label">30 cm</text>

              <line x1="645" y1="120" x2="645" y2="200" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <text x="655" y="165" class="measure-label">10 cm</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Considerando la información anterior, ¿cuál es el área del trozo de torta número 1?",
    options: [
      { letter: "A", text: "225 cm²" },
      { letter: "B", text: "150 cm²" },
      { letter: "C", text: "75 cm²" },
      { letter: "D", text: "40 cm²" }
    ],
    correctAnswer: "A",
    explanation: "El trozo 1 es un rectángulo ubicado en la parte superior derecha. Su base es 15 cm y su altura es 20 cm − 5 cm = 15 cm. Entonces, su área es 15 × 15 = 225 cm². Por lo tanto, la respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-012",
    session: 1,
    block: 1,
    number: 12,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Magnitudes y unidades de medida",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 12",
    stem: "En la tabla se muestra el peso de tres pedidos de mercancía que una empresa necesita enviar a otro país:",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Peso de los pedidos">
              <thead>
                <tr>
                  <th></th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Pedido 1</td><td>500 kg</td></tr>
                <tr><td>Pedido 2</td><td>200 kg</td></tr>
                <tr><td>Pedido 3</td><td>1 ton</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote"><strong>Tabla.</strong> Peso de los pedidos.</p>
          </div>
          <div class="procedure-card">
            <p>Para saber el costo total del envío se debe calcular primero el peso total de los tres pedidos. Para esto, un empleado de la empresa efectúa el siguiente cálculo:</p>
            <p class="formula-inline">500 + 200 + 1 = 701 ton</p>
          </div>
        `
      }
    ],
    prompt: "Esta solución es",
    options: [
      { letter: "A", text: "incorrecta; el resultado debe estar dado en kg, ya que la mayoría de los valores están en esta unidad." },
      { letter: "B", text: "correcta; se suman correctamente los tres valores y se utiliza una de las unidades de los pedidos." },
      { letter: "C", text: "incorrecta; como los datos están en unidades diferentes, no pueden sumarse directamente." },
      { letter: "D", text: "correcta; el resultado se calcula bien y la unidad utilizada corresponde a la unidad de mayor peso." }
    ],
    correctAnswer: "C",
    explanation: "La solución es incorrecta porque los pesos están expresados en unidades diferentes: kilogramos y toneladas. Antes de sumar, es necesario convertir todas las cantidades a la misma unidad. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-013",
    session: 1,
    block: 1,
    number: 13,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría y cálculo de áreas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 13",
    stem: "Un pintor tiene un lienzo rectangular que quiere dividir en tres regiones: la región 1, que es triangular; la región 2, con forma de un cuarto de círculo; y la región 3, que ocupa el resto del lienzo, como se muestra en la figura.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card canvas-figure">
            <svg class="canvas-svg" viewBox="0 0 760 540" role="img" aria-label="Lienzo rectangular dividido en tres regiones con medidas indicadas">
              <defs>
                <marker id="arrowCanvas" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Rectángulo principal -->
              <rect x="120" y="90" width="480" height="300" fill="#f8f5ea" stroke="currentColor" stroke-width="2"/>

              <!-- Línea diagonal -->
              <line x1="120" y1="270" x2="360" y2="90" stroke="currentColor" stroke-width="3"/>

              <!-- Arco cuarto de círculo -->
              <path d="M 360 90 A 240 240 0 0 1 600 330" fill="none" stroke="currentColor" stroke-width="3"/>

              <!-- Etiquetas regiones -->
              <text x="170" y="180" class="canvas-label">Región 1</text>
              <text x="470" y="180" class="canvas-label">Región 2</text>
              <text x="285" y="300" class="canvas-label">Región 3</text>

              <!-- Medidas superiores -->
              <line x1="120" y1="55" x2="360" y2="55" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="225" y="45" class="measure-label">4 m</text>
              <line x1="360" y1="55" x2="600" y2="55" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="465" y="45" class="measure-label">4 m</text>

              <!-- Medida izquierda vertical -->
              <line x1="82" y1="90" x2="82" y2="270" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="58" y="190" class="measure-label">3 m</text>

              <!-- Medida derecha vertical -->
              <line x1="640" y1="90" x2="640" y2="390" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="650" y="245" class="measure-label">5 m</text>

              <!-- Medida inferior -->
              <line x1="120" y1="430" x2="600" y2="430" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="340" y="452" class="measure-label">8 m</text>

              <!-- Medida diagonal -->
              <line x1="170" y1="255" x2="325" y2="138" stroke="currentColor" stroke-width="1.6" marker-start="url(#arrowCanvas)" marker-end="url(#arrowCanvas)"/>
              <text x="240" y="210" class="measure-label" transform="rotate(-36 240,210)">5 m</text>
            </svg>
          </figure>
          <div class="procedure-card">
            <p>Para calcular el área de la región 3, el pintor realizó el siguiente procedimiento:</p>
            <p><strong>Paso 1.</strong> Calculó el área del lienzo, multiplicando 8 m × 5 m.</p>
            <p><strong>Paso 2.</strong> Calculó el área de la región 1, multiplicando 4 m × 3 m.</p>
            <p><strong>Paso 3.</strong> Calculó el área de la región 2, multiplicando π × 16 m² y dividiendo el resultado entre 4.</p>
            <p><strong>Paso 4.</strong> Al resultado del paso 1, le restó los resultados del paso 2 y del paso 3.</p>
          </div>
        `
      }
    ],
    prompt: "¿En cuál paso hay un error y cómo se puede corregir?",
    options: [
      { letter: "A", text: "En el paso 2, porque se debe multiplicar 3 m × 4 m × 5 m." },
      { letter: "B", text: "En el paso 3, porque se debe multiplicar 2π × 4 m y luego dividir entre 4." },
      { letter: "C", text: "En el paso 2, porque se debe multiplicar 4 m × 3 m y luego dividir entre 2." },
      { letter: "D", text: "En el paso 3, porque se debe multiplicar π × 4 m y luego dividir entre 4." }
    ],
    correctAnswer: "C",
    explanation: "El error está en el paso 2. La región 1 es un triángulo, por lo tanto su área no es 4 × 3, sino (4 × 3) ÷ 2 = 6 m². El paso 3 sí corresponde al área de un cuarto de círculo de radio 4 m: (π × 4²) ÷ 4. Por eso, la respuesta correcta es C."
  }

  ,
  {
    uid: "s1-mat-014",
    session: 1,
    block: 1,
    number: 14,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Lectura de tablas y gráficas circulares",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 14",
    stem: "En una encuesta sobre la intención de voto para la elección de presidente en un país, se registraron los resultados que se observan en tabla y en la gráfica.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Tabla de intención de voto por candidato">
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>E</td><td>2.000</td></tr>
                <tr><td>F</td><td>5.000</td></tr>
                <tr><td>G</td><td>4.500</td></tr>
                <tr><td>H</td><td>7.000</td></tr>
                <tr><td>I</td><td>3.400</td></tr>
              </tbody>
            </table>
            <p class="resource-footnote"><strong>Tabla</strong></p>
          </div>
          <figure class="chart-card vote-figure">
            <svg class="vote-svg" viewBox="0 0 520 360" role="img" aria-label="Gráfica circular con la intención de voto de los candidatos E, F, G, H e I">
              <defs>
                <pattern id="patE" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#f0f0f0"/>
                  <circle cx="5" cy="5" r="2.2" fill="#999"/>
                </pattern>
                <pattern id="patF" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
                  <rect width="10" height="10" fill="#111"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#f5f5f5" stroke-width="3"/>
                </pattern>
                <pattern id="patG" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#6f6f6f"/>
                </pattern>
                <pattern id="patH" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#222"/>
                  <rect x="2" y="2" width="4" height="4" fill="#ddd"/>
                  <rect x="6" y="6" width="4" height="4" fill="#ddd"/>
                </pattern>
                <pattern id="patI" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#dcdcdc"/>
                </pattern>
              </defs>

              <!-- pie centered at 210,190 r=120 -->
              <path d="M210 190 L210 70 A120 120 0 0 1 245.8 75.5 Z" fill="url(#patE)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L245.8 75.5 A120 120 0 0 1 326.6 159 Z" fill="url(#patF)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L326.6 159 A120 120 0 0 1 238.6 306.6 Z" fill="url(#patG)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L238.6 306.6 A120 120 0 0 1 93.5 161.4 Z" fill="url(#patH)" stroke="currentColor" stroke-width="1.2"/>
              <path d="M210 190 L93.5 161.4 A120 120 0 0 1 210 70 Z" fill="url(#patI)" stroke="currentColor" stroke-width="1.2"/>

              <text x="316" y="84" class="measure-label">Candidato E</text>
              <line x1="282" y1="100" x2="348" y2="90" stroke="currentColor" stroke-width="1.2"/>

              <text x="356" y="153" class="measure-label">Candidato F</text>
              <line x1="305" y1="150" x2="348" y2="150" stroke="currentColor" stroke-width="1.2"/>

              <text x="334" y="226" class="measure-label">Candidato G</text>
              <line x1="286" y1="217" x2="348" y2="220" stroke="currentColor" stroke-width="1.2"/>

              <text x="38" y="222" class="measure-label">Candidato H</text>
              <line x1="118" y1="216" x2="68" y2="216" stroke="currentColor" stroke-width="1.2"/>

              <text x="76" y="74" class="measure-label">Candidato I</text>
              <line x1="140" y1="82" x2="68" y2="82" stroke="currentColor" stroke-width="1.2"/>

              <text x="170" y="345" class="measure-label">Gráfica</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "De acuerdo con lo anterior, ¿cuál de las siguientes afirmaciones es falsa?",
    options: [
      { letter: "A", text: "Con la información de la tabla se obtienen los datos de la gráfica." },
      { letter: "B", text: "Con la información de la gráfica se obtiene cuál es el candidato con mayor intención de voto." },
      { letter: "C", text: "Con la información de la gráfica se obtienen los datos de la tabla." },
      { letter: "D", text: "Con la información de la tabla se obtiene la proporción entre los votos por un candidato y el total." }
    ],
    correctAnswer: "C",
    explanation: "La gráfica permite comparar visualmente las proporciones y reconocer, por ejemplo, cuál candidato tiene mayor intención de voto. Sin embargo, a partir de la gráfica no se obtienen con precisión los datos exactos de la tabla. Por eso, la afirmación falsa es la opción C."
  }

  ,
  {
    uid: "s1-mat-015",
    session: 1,
    block: 1,
    number: 15,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Patrones y cambio",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 15",
    stem: "Un estudiante está ahorrando para un paseo que tiene un costo de $800.000; él empezó su ahorro en enero con $100.000, que su abuela le regaló, y, al final de cada mes, está ahorrando cierta cantidad de dinero. La tabla resume el progreso del ahorro del estudiante durante los primeros cuatro meses.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Progreso del ahorro del estudiante">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Dinero ahorrado al inicio de mes</th>
                  <th>Dinero ahorrado al finalizar el mes</th>
                  <th>Dinero que hace falta para completar el ahorro</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Enero</td><td>$100.000</td><td>$130.000</td><td>$670.000</td></tr>
                <tr><td>Febrero</td><td>$130.000</td><td>$160.000</td><td>$640.000</td></tr>
                <tr><td>Marzo</td><td>$160.000</td><td>$190.000</td><td>$610.000</td></tr>
                <tr><td>Abril</td><td>$190.000</td><td>$220.000</td><td>$580.000</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la tendencia del dinero ahorrado al finalizar cada mes?",
    options: [
      { letter: "A", text: "Disminuye $30.000 cada mes." },
      { letter: "B", text: "Aumenta $30.000 cada mes." },
      { letter: "C", text: "Aumenta $100.000 cada mes." },
      { letter: "D", text: "Disminuye $100.000 cada mes." }
    ],
    correctAnswer: "B",
    explanation: "El dinero ahorrado al finalizar cada mes es 130.000, 160.000, 190.000 y 220.000. En cada paso aumenta 30.000. Por tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-016",
    session: 1,
    block: 1,
    number: 16,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Estadística descriptiva",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 16",
    stem: "La tabla muestra el registro que llevó un mecánico automotriz de las piezas que tuvieron que reemplazarse durante el mantenimiento de tres vehículos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Registro de piezas reemplazadas por vehículo">
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Número de piezas reemplazadas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>6</td></tr>
                <tr><td>2</td><td>5</td></tr>
                <tr><td>3</td><td>10</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "De acuerdo con esta información, ¿cuál es el promedio del número de piezas reemplazadas de los tres vehículos?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "7" },
      { letter: "C", text: "10" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "B",
    explanation: "El promedio se calcula sumando los valores y dividiendo entre el número de vehículos: 6 + 5 + 10 = 21, y 21 ÷ 3 = 7. Por lo tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-017",
    session: 1,
    block: 1,
    number: 17,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Conjuntos y diagramas de Venn",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 17",
    stem: "La figura muestra la distribución de los tipos de transporte que utilizan 160 personas para llegar al trabajo. Algunas personas usan únicamente un medio de transporte, otras dos, y otras tres.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card transport-figure">
            <svg class="transport-svg" viewBox="0 0 620 390" role="img" aria-label="Diagrama de Venn de los tipos de transporte usados para llegar al trabajo">
              <circle cx="245" cy="150" r="105" class="transport-circle"/>
              <circle cx="375" cy="150" r="105" class="transport-circle"/>
              <circle cx="310" cy="245" r="105" class="transport-circle"/>

              <text x="98" y="62" class="transport-label">Carro</text>
              <text x="92" y="88" class="transport-label">privado</text>
              <text x="425" y="68" class="transport-label">Bicicleta</text>
              <text x="428" y="315" class="transport-label">Transporte</text>
              <text x="428" y="341" class="transport-label">público</text>

              <text x="210" y="150" class="transport-number">35</text>
              <text x="402" y="150" class="transport-number">50</text>
              <text x="302" y="307" class="transport-number">10</text>
              <text x="303" y="132" class="transport-number">20</text>
              <text x="260" y="226" class="transport-number">15</text>
              <text x="357" y="226" class="transport-number">25</text>
              <text x="307" y="203" class="transport-number">5</text>

              <text x="500" y="286" class="figure-label">Figura</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Si se necesita saber la cantidad total de personas que se transportan en bicicleta, ¿cuáles son los datos que se deben sumar?",
    options: [
      { letter: "A", text: "5, 15, 20 y 25." },
      { letter: "B", text: "5 y 20." },
      { letter: "C", text: "25, 35 y 50." },
      { letter: "D", text: "5, 20, 25 y 50." }
    ],
    correctAnswer: "D",
    explanation: "Para saber la cantidad total de personas que se transportan en bicicleta, se deben sumar todas las regiones que están dentro del círculo de bicicleta: solo bicicleta 50, carro privado y bicicleta 20, bicicleta y transporte público 25, y los tres medios 5. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-018",
    session: 1,
    block: 1,
    number: 18,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Patrones, variación y crecimiento exponencial",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 18",
    stem: "El fundador de una empresa de procesadores identificó que el número de transistores de un procesador del tipo X se duplicó cada dos años.",
    resources: [],
    prompt: "Si en el 2010 el procesador tipo X tenía 10.000 transistores, ¿cuántos transistores tenía el procesador tipo X en el 2016?",
    options: [
      { letter: "A", text: "20.000 transistores." },
      { letter: "B", text: "40.000 transistores." },
      { letter: "C", text: "60.000 transistores." },
      { letter: "D", text: "80.000 transistores." }
    ],
    correctAnswer: "D",
    explanation: "Del 2010 al 2016 transcurren 6 años. Como el número de transistores se duplica cada 2 años, hay 3 duplicaciones: 2012, 2014 y 2016. Entonces, 10.000 × 2 × 2 × 2 = 80.000. Por tanto, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-mat-019",
    session: 1,
    block: 1,
    number: 19,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Geometría, áreas y procedimientos equivalentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 19",
    stem: "Un jardín con forma cuadrada, de vértices EFGH, tiene de lado x + y. Otro cuadrado de vértices PQRS está inscrito en el cuadrado EFGH, de tal manera que la distancia más cercana entre dos vértices consecutivos mide x.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card garden-figure">
            <svg class="garden-svg" viewBox="0 0 720 600" role="img" aria-label="Cuadrado EFGH con un cuadrado PQRS inscrito y cuatro regiones triangulares sombreadas">
              <defs>
                <pattern id="gardenShade" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#e2e2e2"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#c4c4c4" stroke-width="2"/>
                </pattern>
                <marker id="gardenArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Cuadrado exterior EFGH -->
              <rect x="130" y="90" width="420" height="420" fill="#fafafa" stroke="currentColor" stroke-width="3"/>

              <!-- Regiones sombreadas -->
              <polygon points="130,90 250,90 130,370" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="250,90 550,210 550,90" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="130,370 430,510 130,510" fill="url(#gardenShade)" stroke="none"/>
              <polygon points="550,210 550,510 430,510" fill="url(#gardenShade)" stroke="none"/>

              <!-- Cuadrado interior PQRS -->
              <polygon points="250,90 550,210 430,510 130,370" fill="#ffffff" stroke="currentColor" stroke-width="4"/>

              <!-- Vértices exteriores -->
              <circle cx="130" cy="90" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="90" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="510" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="130" cy="510" r="9" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="250" cy="90" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="550" cy="210" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="430" cy="510" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>
              <circle cx="130" cy="370" r="8" fill="#fff" stroke="currentColor" stroke-width="3"/>

              <!-- Letras de vértices -->
              <text x="105" y="78" class="garden-label">E</text>
              <text x="565" y="78" class="garden-label">F</text>
              <text x="565" y="535" class="garden-label">G</text>
              <text x="105" y="535" class="garden-label">H</text>
              <text x="252" y="78" class="garden-label">P</text>
              <text x="565" y="216" class="garden-label">Q</text>
              <text x="424" y="535" class="garden-label">R</text>
              <text x="103" y="375" class="garden-label">S</text>

              <!-- Medidas sobre los lados -->
              <text x="180" y="78" class="measure-label">x</text>
              <text x="395" y="78" class="measure-label">y</text>
              <text x="330" y="48" class="measure-label">x + y</text>

              <text x="570" y="150" class="measure-label">x</text>
              <text x="570" y="365" class="measure-label">y</text>
              <text x="610" y="305" class="measure-label">x + y</text>

              <text x="258" y="538" class="measure-label">y</text>
              <text x="485" y="538" class="measure-label">x</text>

              <text x="96" y="235" class="measure-label">y</text>
              <text x="96" y="448" class="measure-label">x</text>

              <!-- Marcas de dimensión principales -->
              <line x1="130" y1="55" x2="550" y2="55" stroke="currentColor" stroke-width="1.5" marker-start="url(#gardenArrow)" marker-end="url(#gardenArrow)"/>
              <line x1="610" y1="90" x2="610" y2="510" stroke="currentColor" stroke-width="1.5" marker-start="url(#gardenArrow)" marker-end="url(#gardenArrow)"/>
            </svg>
          </figure>
          <div class="procedure-card">
            <p>Para encontrar una fórmula que corresponda al área de la región sombreada, el jardinero propuso los siguientes pasos:</p>
            <p><strong>Paso 1.</strong> Escoger uno de los cuatro triángulos sombreados y multiplicar la medida de la altura por la medida de la base.</p>
            <p><strong>Paso 2.</strong> Dividir entre 2 el resultado obtenido en el paso 1.</p>
            <p><strong>Paso 3.</strong> Multiplicar por 4 el resultado del paso anterior.</p>
            <p><strong>Paso 4.</strong> Sumar cuatro veces el resultado del paso 2.</p>
          </div>
        `
      }
    ],
    prompt: "De los pasos propuestos, ¿cuál es redundante para el cálculo del área de la región sombreada?",
    options: [
      { letter: "A", text: "El paso 4, porque, al sumar cuatro veces el resultado del paso 2, se obtiene el resultado del paso 3." },
      { letter: "B", text: "El paso 3, porque, al multiplicar por 4 el resultado del paso 2 se obtiene el mismo resultado obtenido en el paso 1." },
      { letter: "C", text: "El paso 2, porque, al dividir entre 2 el resultado del paso 1, se obtiene el mismo resultado del paso 3." },
      { letter: "D", text: "El paso 1, porque, al multiplicar la altura de uno de los triángulos por la base, se obtiene el área total de la figura." }
    ],
    correctAnswer: "A",
    explanation: "El paso 4 es redundante porque sumar cuatro veces el resultado del paso 2 equivale exactamente a multiplicar por 4 ese mismo resultado, que es lo que ya se hizo en el paso 3. Por tanto, la respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-020",
    session: 1,
    block: 1,
    number: 20,
    area: "Matemáticas",
    competencia: "Argumentación",
    componente: "Álgebra, factorización y modelación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 20",
    stem: "Al entrar a un túnel, un carro que lleva una velocidad de 10 m/s acelera a 3 m/s² durante 15 segundos, que es lo que dura recorriéndolo. La longitud del túnel se puede calcular mediante la siguiente fórmula:",
    resources: [
      {
        type: "html",
        html: `
          <div class="icfes-formula-comparison">
            <div class="formula-box formula-box-wide" aria-label="Fórmula inicial">
              <span>Longitud</span>
              <strong>=</strong>
              <span>(10 m/s)(15 s) + 1/2(3 m/s²)(15 s)²</span>
            </div>
            <p>Al ver la fórmula, una persona afirma que esta es equivalente a:</p>
            <div class="formula-box formula-box-wide" aria-label="Fórmula equivalente propuesta">
              <span>Longitud</span>
              <strong>=</strong>
              <span>15 s × (10 m/s + 1/2(3 m/s²))</span>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Es verdadera la afirmación de la persona?",
    options: [
      { letter: "A", text: "Sí, porque lo que hizo fue factorizar el tiempo que tarda en recorrer el túnel." },
      { letter: "B", text: "No, porque omitió que hay unos 15 segundos elevados al cuadrado." },
      { letter: "C", text: "Sí, porque el exponente 2, al que está elevado el tiempo, se puede cancelar." },
      { letter: "D", text: "No, porque también se tiene que factorizar el fraccionario 1/2." }
    ],
    correctAnswer: "B",
    explanation: "La afirmación no es verdadera. Al factorizar 15 s, el segundo término debe conservar otro factor 15 s, porque (15 s)² = (15 s)(15 s). La forma equivalente sería 15 s × [10 m/s + 1/2(3 m/s²)(15 s)]. La expresión propuesta omitió ese factor; por tanto, la respuesta correcta es B."
  }


  ,
  {
    uid: "s1-mat-021",
    session: 1,
    block: 1,
    number: 21,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Conversión de unidades y proporcionalidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 21",
    stem: "Arturo quiere calcular el tiempo que se necesita para descargar un archivo de internet que tiene un tamaño de 12,6 megabytes. Él sabe que en su computador la velocidad de descarga es de 300 kilobytes por segundo y que 1 megabyte equivale a 1.024 kilobytes.",
    resources: [],
    prompt: "¿Cuál de los siguientes procedimientos NO permite calcular el tiempo necesario para descargar el archivo?",
    options: [
      {
        letter: "A",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Multiplicar 12,6 por 1.024</p>
            <p><strong>Paso 2.</strong> Dividir el resultado del paso 1 entre 300</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Multiplicar 1.024 por 300</p>
            <p><strong>Paso 2.</strong> Dividir el resultado del paso 1 entre 12,6</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 12,6 entre 300</p>
            <p><strong>Paso 2.</strong> Multiplicar el resultado del paso 1 por 1.024</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 1.024 entre 300</p>
            <p><strong>Paso 2.</strong> Multiplicar el resultado del paso 1 por 12,6</p>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "B",
    explanation: "Para calcular el tiempo, primero se convierte el tamaño del archivo a kilobytes: 12,6 × 1.024. Luego se divide entre la velocidad de descarga, 300 kilobytes por segundo. Los procedimientos A, C y D son formas equivalentes de hacer esa operación. El procedimiento B no permite calcular el tiempo porque multiplica 1.024 por 300 y luego divide entre 12,6, lo cual no corresponde a tamaño dividido entre velocidad. Por tanto, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-mat-022",
    session: 1,
    block: 1,
    number: 22,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Proporcionalidad y semejanza de triángulos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 22",
    stem: "Una persona construyó una rampa, como se muestra en la figura, pero se necesita un refuerzo para evitar que esta se parta. Para esto, a dos metros del muro, se va a construir una columna que fortalezca la estructura.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card ramp-figure">
            <svg class="ramp-svg" viewBox="0 0 820 310" role="img" aria-label="Rampa apoyada en un muro de 3 metros, con longitud horizontal de 4 metros y columna a 2 metros del muro de altura h">
              <defs>
                <pattern id="wallHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="#e8e2d6"/>
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#555" stroke-width="3"/>
                </pattern>
                <marker id="rampArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <!-- Piso -->
              <line x1="170" y1="235" x2="735" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Muro -->
              <rect x="90" y="55" width="100" height="180" fill="url(#wallHatch)" stroke="currentColor" stroke-width="2"/>
              <line x1="190" y1="55" x2="190" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Rampa -->
              <polygon points="190,55 735,235 728,245 183,66" fill="#f4f4f4" stroke="currentColor" stroke-width="2"/>
              <line x1="190" y1="55" x2="735" y2="235" stroke="currentColor" stroke-width="3"/>

              <!-- Columna a 2 m -->
              <line x1="462" y1="145" x2="462" y2="235" stroke="currentColor" stroke-width="4"/>
              <text x="475" y="195" class="measure-label">h</text>

              <!-- Medida vertical 3m -->
              <line x1="65" y1="55" x2="65" y2="235" stroke="currentColor" stroke-width="1.7" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <line x1="70" y1="55" x2="90" y2="55" stroke="currentColor" stroke-width="1.3"/>
              <line x1="70" y1="235" x2="90" y2="235" stroke="currentColor" stroke-width="1.3"/>
              <text x="35" y="150" class="measure-label">3 m</text>

              <!-- Medida 2m desde el muro hasta la columna -->
              <line x1="190" y1="218" x2="462" y2="218" stroke="currentColor" stroke-width="1.5" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <text x="315" y="210" class="measure-label">2 m</text>

              <!-- Medida 4m total -->
              <line x1="190" y1="268" x2="735" y2="268" stroke="currentColor" stroke-width="1.7" marker-start="url(#rampArrow)" marker-end="url(#rampArrow)"/>
              <line x1="190" y1="242" x2="190" y2="278" stroke="currentColor" stroke-width="1.3"/>
              <line x1="735" y1="242" x2="735" y2="278" stroke="currentColor" stroke-width="1.3"/>
              <text x="445" y="292" class="measure-label">4 m</text>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes procedimientos permite calcular la altura h que debe tener la columna?",
    options: [
      {
        letter: "A",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 2 m entre 4 m, obteniendo 0,5.</p>
            <p><strong>Paso 2.</strong> Dividir 3 m entre el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 4 m entre 2 m, obteniendo 0,5.</p>
            <p><strong>Paso 2.</strong> Multiplicar 3 m por el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 4 m entre 2 m, obteniendo 2.</p>
            <p><strong>Paso 2.</strong> Dividir 3 m entre el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="procedure-option">
            <p><strong>Paso 1.</strong> Dividir 2 m entre 4 m, obteniendo 2.</p>
            <p><strong>Paso 2.</strong> Multiplicar 3 m por el valor calculado en el paso 1.</p>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "C",
    explanation: "La rampa forma triángulos semejantes. La columna está a 2 m del muro y la base total mide 4 m; por tanto, la razón es 4 ÷ 2 = 2. La altura correspondiente es 3 m ÷ 2 = 1,5 m. El procedimiento correcto es el de la opción C."
  }

  ,
  {
    uid: "s1-mat-023",
    session: 1,
    block: 1,
    number: 23,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Coordenadas polares",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 23",
    stem: "En la gráfica se muestra la ubicación, en coordenadas polares, de cuatro aviones (V, W, X, Y) respecto a la torre de control de un aeropuerto.",
    resources: [
      {
        type: "html",
        html: `
          <figure class="chart-card polar-figure">
            <svg class="polar-svg" viewBox="0 0 760 430" role="img" aria-label="Ubicación de cuatro aviones en coordenadas polares respecto a la torre de control">
              <defs>
                <marker id="arrowPolar23" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
                </marker>
              </defs>

              <g class="polar-grid">
                <circle cx="370" cy="250" r="45"/>
                <circle cx="370" cy="250" r="90"/>
                <circle cx="370" cy="250" r="135"/>
                <circle cx="370" cy="250" r="180"/>
                <line x1="370" y1="250" x2="685" y2="250"/>
                <line x1="370" y1="250" x2="292" y2="115"/>
                <line x1="370" y1="250" x2="370" y2="60"/>
                <line x1="370" y1="250" x2="465" y2="85"/>
                <line x1="370" y1="250" x2="535" y2="155"/>
                <line x1="370" y1="250" x2="55" y2="250"/>
                <line x1="370" y1="250" x2="205" y2="155"/>
                <line x1="370" y1="250" x2="535" y2="345"/>
                <line x1="370" y1="250" x2="205" y2="345"/>
              </g>

              <line x1="65" y1="250" x2="705" y2="250" stroke="currentColor" stroke-width="3" marker-end="url(#arrowPolar23)"/>
              <circle cx="370" cy="250" r="7" class="polar-point"/>
              <text x="245" y="278" class="polar-axis-label">Torre de control (polo)</text>
              <text x="615" y="278" class="polar-axis-label">Eje polar</text>

              <g class="polar-airplanes">
                <circle cx="190" cy="250" r="7" class="polar-point"/>
                <text x="70" y="236" class="polar-label">X (60 km, 180°)</text>

                <circle cx="370" cy="190" r="7" class="polar-point"/>
                <text x="392" y="175" class="polar-label">W (20 km, 90°)</text>

                <circle cx="448" cy="205" r="7" class="polar-point"/>
                <text x="476" y="213" class="polar-label">V (30 km, 30°)</text>

                <circle cx="430" cy="146" r="7" class="polar-point"/>
                <text x="452" y="130" class="polar-label">Y (40 km, 60°)</text>
              </g>
            </svg>
          </figure>
        `
      }
    ],
    prompt: "Si las coordenadas polares de un punto son de la forma (r, θ), donde r es la distancia al polo y θ es el ángulo respecto al eje polar, ¿cuál es el orden de los aviones, del que está más cerca al que está más lejos de la torre de control?",
    options: [
      { letter: "A", text: "W, V, Y, X." },
      { letter: "B", text: "X, V, W, Y." },
      { letter: "C", text: "V, Y, W, X." },
      { letter: "D", text: "X, Y, V, W." }
    ],
    correctAnswer: "A",
    explanation: "En coordenadas polares, el valor r indica la distancia al polo, es decir, a la torre de control. Las distancias son: W = 20 km, V = 30 km, Y = 40 km y X = 60 km. Por tanto, el orden del avión más cercano al más lejano es W, V, Y, X. La respuesta correcta es A."
  }

  ,
  {
    uid: "s1-mat-024",
    session: 1,
    block: 1,
    number: 24,
    area: "Matemáticas",
    competencia: "Formulación y ejecución",
    componente: "Secuencias, operaciones y números enteros",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 24",
    stem: "Kevin trabaja en una farmacia que entrega medicamentos a domicilio. Los días viernes, Kevin tiene la posibilidad de salir tres horas antes de su trabajo, pero la condición es que debe repartir los pedidos que hacen falta por entregar y que estén ubicados en la ruta que toma hacia su casa. Por ejemplo, el último viernes que salió tuvo que entregar un total de cuatro pedidos.",
    resources: [
      {
        type: "html",
        html: `
          <div class="route-card">
            <p class="route-intro">La ruta de entregas del último viernes fue la siguiente:</p>
            <ol class="route-steps">
              <li>Para entregar el primer pedido, tuvo que avanzar <strong>3 cuadras</strong>.</li>
              <li>Para entregar el segundo pedido, tuvo que avanzar el <strong>doble</strong> de cuadras de las que había hecho para entregar el primer pedido.</li>
              <li>Para llegar a la dirección del tercer pedido, tuvo que avanzar la <strong>mitad</strong> de cuadras que avanzó para entregar el pedido anterior.</li>
              <li>Para el último pedido, tuvo que <strong>regresarse 10 cuadras</strong> y, así, acabar su ruta de entregas.</li>
              <li>Después de terminar las entregas, solo tuvo que caminar <strong>1 cuadra</strong> para llegar a su casa.</li>
            </ol>
            <div class="route-line" aria-label="Esquema de avances y retroceso de la ruta">
              <span class="route-node">Farmacia</span>
              <span class="route-arrow">+3</span>
              <span class="route-node">Pedido 1</span>
              <span class="route-arrow">+6</span>
              <span class="route-node">Pedido 2</span>
              <span class="route-arrow">+3</span>
              <span class="route-node">Pedido 3</span>
              <span class="route-arrow back">−10</span>
              <span class="route-node">Pedido 4</span>
              <span class="route-arrow">+1</span>
              <span class="route-node home">Casa</span>
            </div>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes operaciones permite obtener la distancia que hay desde la farmacia hasta la casa de Kevin?",
    options: [
      { letter: "A", text: "3 + 3 + 3 − 10 + 1" },
      { letter: "B", text: "3 + 6 + 6 + 10" },
      { letter: "C", text: "3 + 6 + 3 − 10 + 1" },
      { letter: "D", text: "6 + 3 + 10 − 1" }
    ],
    correctAnswer: "C",
    explanation: "Para el primer pedido avanzó 3 cuadras. Para el segundo avanzó el doble: 2 × 3 = 6 cuadras. Para el tercero avanzó la mitad de lo anterior: 6 ÷ 2 = 3 cuadras. Luego se regresó 10 cuadras, por eso se resta 10. Finalmente caminó 1 cuadra hasta su casa, por eso se suma 1. La operación correcta es 3 + 6 + 3 − 10 + 1, que corresponde a la opción C."
  }


  ,
  {
    uid: "s1-mat-025",
    session: 1,
    block: 1,
    number: 25,
    area: "Matemáticas",
    competencia: "Interpretación y representación",
    componente: "Números decimales y orden en la recta numérica",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Matemáticas - Pregunta 25",
    stem: "La presión pleural se genera entre algunas paredes de los pulmones en el proceso de respiración del ser humano. Al respecto, se midió la presión pleural de cuatro pacientes para determinar el orden en que deben recibir un tratamiento pulmonar.",
    resources: [
      {
        type: "html",
        html: `
          <div class="table-wrap icfes-table-wrap">
            <table class="data-table" aria-label="Presión pleural de cuatro pacientes">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Presión pleural (cmH₂O)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Santiago</td><td>−7,6</td></tr>
                <tr><td>Ximena</td><td>−7,09</td></tr>
                <tr><td>Mariana</td><td>−7,62</td></tr>
                <tr><td>Orlando</td><td>−7,53</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    prompt: "Para determinar el orden en que los pacientes van a recibir el tratamiento médico, se les debe ordenar de menor a mayor según su presión pleural. ¿Cuál de las siguientes tablas indica el orden en que deben recibir el tratamiento los pacientes?",
    options: [
      {
        letter: "A",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción A">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Ximena</td></tr>
                <tr><td>Segundo</td><td>Mariana</td></tr>
                <tr><td>Tercero</td><td>Santiago</td></tr>
                <tr><td>Cuarto</td><td>Orlando</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "B",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción B">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Orlando</td></tr>
                <tr><td>Segundo</td><td>Santiago</td></tr>
                <tr><td>Tercero</td><td>Mariana</td></tr>
                <tr><td>Cuarto</td><td>Ximena</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "C",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción C">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Mariana</td></tr>
                <tr><td>Segundo</td><td>Santiago</td></tr>
                <tr><td>Tercero</td><td>Orlando</td></tr>
                <tr><td>Cuarto</td><td>Ximena</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      },
      {
        letter: "D",
        text: `
          <div class="table-wrap option-table-wrap">
            <table class="data-table option-table" aria-label="Opción D">
              <thead>
                <tr><th>Orden en que se va a recibir el tratamiento</th><th>Paciente</th></tr>
              </thead>
              <tbody>
                <tr><td>Primero</td><td>Santiago</td></tr>
                <tr><td>Segundo</td><td>Ximena</td></tr>
                <tr><td>Tercero</td><td>Mariana</td></tr>
                <tr><td>Cuarto</td><td>Orlando</td></tr>
              </tbody>
            </table>
          </div>`,
        isHtml: true
      }
    ],
    correctAnswer: "C",
    explanation: "Para ordenar de menor a mayor con números negativos, el menor es el que está más alejado hacia la izquierda en la recta numérica. Así, −7,62 < −7,6 < −7,53 < −7,09. Por tanto, el orden correcto es: Mariana, Santiago, Orlando y Ximena. La respuesta correcta es C."
  }

];
