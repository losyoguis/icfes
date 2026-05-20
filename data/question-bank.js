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

  ,
  {
    uid: "s1-lect-026",
    session: 1,
    block: 2,
    number: 26,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Paráfrasis y sentido local",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 26",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


        `
      }
    ],
    prompt: "¿Cuál de las siguientes opciones es una paráfrasis correcta del segundo párrafo del texto?",
    options: [
      { letter: "A", text: "Para Epicuro hay dos formas de concebir la vida: aquella que busca el placer y aquella que busca evitar el dolor del nacimiento." },
      { letter: "B", text: "Para Epicuro hay dos formas en la que todo ser vivo concibe la buena vida: la primera es la búsqueda del dolor y la segunda es huir del placer." },
      { letter: "C", text: "Para Epicuro todos buscamos alcanzar una buena vida sin pensar en el dolor o en el placer. Desde que nacemos obramos guiados por el instinto." },
      { letter: "D", text: "Para Epicuro son ciertas dos cosas: que todos buscamos el placer y rechazamos el dolor, y que los sentimientos son los que determinan nuestras decisiones." }
    ],
    correctAnswer: "D",
    explanation: "El segundo párrafo presenta dos razones: todos los seres vivos buscan placer y rechazan el dolor por instinto, y los sentimientos de placer y dolor sirven como criterios reales para decidir y actuar. La opción D conserva esas ideas sin cambiar su sentido."
  }

  ,
  {
    uid: "s1-lect-027",
    session: 1,
    block: 2,
    number: 27,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 27",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea los siguientes dos enunciados tomados del texto:</strong></p>
            <ol class="numbered-statements">
              <li>La filosofía epicúrea tiene una finalidad ética, pues pretende guiarnos para alcanzar la buena vida.</li>
              <li>Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor.</li>
            </ol>
          </div>
        `
      }
    ],
    prompt: "¿Qué relación hay entre ambos enunciados?",
    options: [
      { letter: "A", text: "El primer enunciado rechaza la idea expuesta en el segundo enunciado." },
      { letter: "B", text: "El segundo enunciado es una síntesis del primer enunciado." },
      { letter: "C", text: "El primer enunciado da una hipótesis y el segundo enunciado la refuta." },
      { letter: "D", text: "El segundo enunciado amplía lo dicho en el primer enunciado." }
    ],
    correctAnswer: "D",
    explanation: "El primer enunciado afirma que la filosofía epicúrea busca orientar hacia la buena vida. El segundo amplía esa idea al explicar que, para el epicureísmo, la buena vida es placentera y busca placer evitando dolor."
  }

  ,
  {
    uid: "s1-lect-028",
    session: 1,
    block: 2,
    number: 28,
    area: "Lectura Crítica",
    competencia: "Argumentación",
    componente: "Identificación de argumentos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 28",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea el siguiente fragmento tomado del texto:</strong></p>
            <blockquote>“Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que lo sentimos”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Por qué el enunciado anterior puede ser considerado un argumento a favor de la tesis de que el fin último de todas las acciones humanas es conseguir placer y evitar dolor?",
    options: [
      { letter: "A", text: "Porque justifica la idea de que el dolor y el placer son reales e inevitables al momento de elegir la forma en la que actuamos." },
      { letter: "B", text: "Porque ejemplifica la teoría de que el placer y el dolor son criterios de decisión al ser sentimientos reales que tiene todo ser humano." },
      { letter: "C", text: "Porque explica que el fin último de todas las acciones humanas consiste en relacionar el placer con el bien y el dolor con el mal." },
      { letter: "D", text: "Porque relaciona los sentimientos reales de dolor y de placer existentes instintivamente en el ser humano con los conceptos de bien y de mal." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento funciona como argumento porque muestra que placer y dolor son sentimientos reales y, por eso, pueden orientar la conducta y las decisiones humanas. Esta idea corresponde a la opción B."
  }

  ,
  {
    uid: "s1-lect-029",
    session: 1,
    block: 2,
    number: 29,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Perspectiva e inferencia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 29",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>“Esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes enunciados presenta una perspectiva similar a la del fragmento?",
    options: [
      { letter: "A", text: "“El comportamiento del ser humano puede ser moldeado de acuerdo con las experiencias agradables y desagradables que se desprenden de cada acción”. B. F. Skinner." },
      { letter: "B", text: "“No hay ninguna diferencia fundamental entre el hombre y los animales en su capacidad de sentir placer y dolor, felicidad y miseria”. C. Darwin." },
      { letter: "C", text: "“La felicidad es un fin cuya posibilidad descansa en condiciones que solo pueden ser esperadas de la naturaleza, es decir, los medios para la felicidad propia están en la naturaleza tanto externa como interna”. I. Kant." },
      { letter: "D", text: "“No se trata de concebir el placer como asunto único y verdadero de felicidad, sino de hallar la mejor manera para alcanzar la virtud que es universal y que no se supedita a la sensibilidad”. I. Kant." }
    ],
    correctAnswer: "A",
    explanation: "El fragmento sostiene que la búsqueda del placer y la evitación del dolor guían la conducta. La opción A presenta una perspectiva semejante, pues relaciona el comportamiento con experiencias agradables y desagradables."
  }

  ,
  {
    uid: "s1-lect-030",
    session: 1,
    block: 2,
    number: 30,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Intención comunicativa",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 30",
    stem: "Responda de acuerdo con el texto “El placer y el dolor en el epicureísmo”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 26 A 30 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>El placer y el dolor en el epicureísmo</h3>
            <p>La filosofía epicúrea tiene una finalidad ética*, pues pretende guiarnos para alcanzar la buena vida. Para el epicureísmo esta es la vida placentera, ya que considera que el fin último de todas nuestras acciones es conseguir placer y evitar dolor; por ello, el epicureísmo identifica el placer con el bien y el dolor con el mal.</p>
            <p>Epicuro da por lo menos dos razones complementarias por las cuales considera que el propósito de la buena vida debe ser el placer. Por un lado, menciona el hecho de que, sin necesidad de pensarlo y desde su nacimiento, todas las criaturas vivientes, por instinto, se contentan con el placer y son reacias al dolor. Por otro lado, Epicuro toma a los sentimientos de placer y dolor como criterios esenciales de decisión y conducta, en tanto que son eventos reales que no pueden ser refutados: no hay razón o evidencia alguna que pueda hacernos dudar de que estamos sintiendo dolor o placer; es un hecho real que los sentimos, pues, ¿cómo podría ser falsa la sensación de dolor ante un golpe?</p>
            <p>Así, si lo que trae placer es lo que elegimos y lo que trae dolor es lo que evitamos, son nuestros sentimientos los que nos permiten deliberar qué debemos elegir y evitar, pues ellos no se equivocan. De esta manera, esa tendencia instintiva y natural hacia buscar el placer y evitar el dolor concuerda con lo que, para el epicureísmo, es el criterio ético más fundamental y verdadero.</p>
            <p class="reading-note">*La ética es el campo de la filosofía que estudia los principios para decidir correctamente.</p>
            <p class="reading-source">Tomado y adaptado de: Cifuentes, F. (2021). Ataraxia &amp; Aponía en el Epicureísmo. Saga, Revista de Estudiantes de Filosofía. Universidad Nacional de Colombia.</p>
          </div>


          <div class="fragment-card">
            <p><strong>Lea la siguiente pregunta tomada del texto:</strong></p>
            <blockquote>“¿cómo podría ser falsa la sensación de dolor ante un golpe?”</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la intención del autor con esa pregunta?",
    options: [
      { letter: "A", text: "Advertir sobre el peligro de dolor ante una decisión." },
      { letter: "B", text: "Dar la orden de huir del dolor ante un golpe." },
      { letter: "C", text: "Afirmar la idea de que no se puede dudar del dolor." },
      { letter: "D", text: "Expresar que los dolores pueden inventarse." }
    ],
    correctAnswer: "C",
    explanation: "La pregunta es retórica: no busca una respuesta literal, sino reforzar la idea de que la sensación de dolor es real y no puede ponerse en duda. Por eso, la opción correcta es C."
  }


  ,
  {
    uid: "s1-lect-031",
    session: 1,
    block: 2,
    number: 31,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Supuestos e inferencia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 31",
    stem: "Responda de acuerdo con el texto sobre los sofistas y la educación práctica.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 31 Y 32 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Los sofistas y la educación práctica</h3>
            <p>Auténticas bestias negras para Platón, los sofistas fueron unos filósofos y educadores que dominaron la escena intelectual de Atenas a finales del siglo IV a. C. De hecho, la palabra “sofista” no tenía entonces la connotación peyorativa que tiene hoy y que debemos, en buena medida, a la mala imagen que de ellos transmitió Platón. Sofista significaba simplemente “profesor”, y con el término se designaba a una serie de educadores que se ganaban la vida instruyendo jóvenes a cambio de una retribución.</p>
            <p>Eran dos los elementos de la sofística que despertaban el recelo, por decir lo menos, entre una nutrida parte de la población griega. El primero de ellos residía en que, contrario a los sabios de antaño, los sofistas no reunían en torno a sí a un grupo de discípulos por el mero placer de difundir sus ideas, sino que cobraban y vivían de ello. Esto, que probablemente hoy no nos parezca grave, era visto con escándalo por los sectores más esnobs y aristocráticos de la polis. En definitiva, y sin que hayan cambiado las cosas, los que despreciaban el “vil metal” eran precisamente aquellos que lo tenían garantizado y no tenían necesidad de ganárselo.</p>
            <p>En segundo lugar, y también como diferencia sustancial con los modelos del pasado, la educación impartida por los sofistas no tenía el objetivo teórico de alcanzar y descubrir la verdad, sino que su finalidad era eminentemente práctica: adquirir las técnicas necesarias para imponer el propio argumento. En efecto, en la democracia ateniense, regida con un sistema de participación directa de los ciudadanos en los asuntos de la polis, y con abundantes litigios y juicios, la capacidad de desenvolverse con habilidad en el arte de la palabra era imprescindible para el éxito en la política. En este contexto nacieron y se multiplicaron los sofistas, como maestros de la retórica y la oratoria cuya principal preocupación fue desarrollar y transmitir las técnicas necesarias para defender y convencer al público de un planteamiento, independientemente de que este fuera verdadero o no, moral o inmoral. Este énfasis práctico los condujo con frecuencia a posiciones escépticas o relativistas: no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos. Para Protágoras “el hombre es la medida de todas las cosas” y, para Gorgias, nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable.</p>
            <p class="reading-source">Tomado y adaptado de: Dal Maschio, E. (2016). <em>Platón. La verdad está en otra parte.</em> Emse Publishing.</p>
          </div>


        `
      }
    ],
    prompt: "¿Qué supuesto se encuentra presente en el tercer párrafo del texto?",
    options: [
      { letter: "A", text: "Que la búsqueda de la verdad no es un fin práctico." },
      { letter: "B", text: "Que la participación política en la actualidad no es alta." },
      { letter: "C", text: "Que los sofistas engañaban a sus discípulos con técnicas retóricas." },
      { letter: "D", text: "Que la búsqueda teórica de la verdad puede ayudar a vencer en un juicio." }
    ],
    correctAnswer: "A",
    explanation: "El tercer párrafo afirma que la educación sofista no buscaba alcanzar la verdad, sino desarrollar técnicas prácticas para imponer argumentos y convencer al público. Por eso, el supuesto presente es que la búsqueda de la verdad no constituye, en ese contexto, un fin práctico."
  }

  ,
  {
    uid: "s1-lect-032",
    session: 1,
    block: 2,
    number: 32,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación lógica entre afirmaciones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 32",
    stem: "Responda de acuerdo con el texto sobre los sofistas y la educación práctica.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 31 Y 32 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Los sofistas y la educación práctica</h3>
            <p>Auténticas bestias negras para Platón, los sofistas fueron unos filósofos y educadores que dominaron la escena intelectual de Atenas a finales del siglo IV a. C. De hecho, la palabra “sofista” no tenía entonces la connotación peyorativa que tiene hoy y que debemos, en buena medida, a la mala imagen que de ellos transmitió Platón. Sofista significaba simplemente “profesor”, y con el término se designaba a una serie de educadores que se ganaban la vida instruyendo jóvenes a cambio de una retribución.</p>
            <p>Eran dos los elementos de la sofística que despertaban el recelo, por decir lo menos, entre una nutrida parte de la población griega. El primero de ellos residía en que, contrario a los sabios de antaño, los sofistas no reunían en torno a sí a un grupo de discípulos por el mero placer de difundir sus ideas, sino que cobraban y vivían de ello. Esto, que probablemente hoy no nos parezca grave, era visto con escándalo por los sectores más esnobs y aristocráticos de la polis. En definitiva, y sin que hayan cambiado las cosas, los que despreciaban el “vil metal” eran precisamente aquellos que lo tenían garantizado y no tenían necesidad de ganárselo.</p>
            <p>En segundo lugar, y también como diferencia sustancial con los modelos del pasado, la educación impartida por los sofistas no tenía el objetivo teórico de alcanzar y descubrir la verdad, sino que su finalidad era eminentemente práctica: adquirir las técnicas necesarias para imponer el propio argumento. En efecto, en la democracia ateniense, regida con un sistema de participación directa de los ciudadanos en los asuntos de la polis, y con abundantes litigios y juicios, la capacidad de desenvolverse con habilidad en el arte de la palabra era imprescindible para el éxito en la política. En este contexto nacieron y se multiplicaron los sofistas, como maestros de la retórica y la oratoria cuya principal preocupación fue desarrollar y transmitir las técnicas necesarias para defender y convencer al público de un planteamiento, independientemente de que este fuera verdadero o no, moral o inmoral. Este énfasis práctico los condujo con frecuencia a posiciones escépticas o relativistas: no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos. Para Protágoras “el hombre es la medida de todas las cosas” y, para Gorgias, nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable.</p>
            <p class="reading-source">Tomado y adaptado de: Dal Maschio, E. (2016). <em>Platón. La verdad está en otra parte.</em> Emse Publishing.</p>
          </div>


        

          <div class="fragment-card">
            <p><strong>Considere las siguientes afirmaciones del texto:</strong></p>
            <ol>
              <li>“no existía una verdad con mayúsculas, sino que todo dependía del punto de vista, de los usos y costumbres, de la fuerza de los argumentos”.</li>
              <li>“nada existía; si existiera, sería incognoscible, y si existiera y fuera cognoscible, sería incomunicable”.</li>
            </ol>
          </div>
        `
      }
    ],
    prompt: "La afirmación 1 NO justifica la afirmación 2 por la siguiente razón:",
    options: [
      { letter: "A", text: "Que todo dependa del punto de vista y la cultura prueba que nada existe." },
      { letter: "B", text: "Que todo dependa del punto de vista y la cultura no prueba que nada existe." },
      { letter: "C", text: "Que el hombre sea la medida de todas las cosas prueba que hay muchas verdades universales." },
      { letter: "D", text: "Que el hombre sea la medida de todas las cosas muestra que no dependen del punto de vista de alguien." }
    ],
    correctAnswer: "B",
    explanation: "La primera afirmación expresa una postura relativista: la verdad depende del punto de vista, la cultura y los argumentos. Sin embargo, de esa idea no se sigue necesariamente la tesis radical de que nada existe. Por eso, la opción B explica correctamente por qué la afirmación 1 no justifica la afirmación 2."
  }

  ,
  {
    uid: "s1-lect-033",
    session: 1,
    block: 2,
    number: 33,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Léxico en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 33",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

        `
      }
    ],
    prompt: "Entre las siguientes opciones, ¿cuál podría reemplazar, sin cambiar el sentido, la palabra “deslumbrar” que aparece en la frase: “Por medio del dinero se espera poder deslumbrar o comprar a los otros [...]”?",
    options: [
      { letter: "A", text: "Encandilar." },
      { letter: "B", text: "Impresionar." },
      { letter: "C", text: "Ilusionar." },
      { letter: "D", text: "Engañar." }
    ],
    correctAnswer: "B",
    explanation: "En el contexto del texto, “deslumbrar” significa causar admiración o impresionar a los otros mediante el dinero o los bienes materiales. Por eso, la opción correcta es B."
  }

  ,
  {
    uid: "s1-lect-034",
    session: 1,
    block: 2,
    number: 34,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de fragmentos en el texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 34",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

          <div class="fragment-card">
            <p><strong>Lea el siguiente fragmento del texto:</strong></p>
            <blockquote>“Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Qué función cumple este fragmento dentro del texto?",
    options: [
      { letter: "A", text: "Presenta la tesis general del texto." },
      { letter: "B", text: "Introduce el tema que se trata en el texto." },
      { letter: "C", text: "Expone la conclusión general del texto." },
      { letter: "D", text: "Sintetiza el contenido del texto." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento inicial abre el tema de la buena vida humana y prepara el desarrollo posterior sobre la importancia de la relación con otros seres humanos. Por eso, cumple la función de introducir el tema del texto."
  }

  ,
  {
    uid: "s1-lect-035",
    session: 1,
    block: 2,
    number: 35,
    area: "Lectura Crítica",
    competencia: "Argumentación",
    componente: "Estrategias argumentativas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 35",
    stem: "Responda de acuerdo con el texto “Ética para Amador (fragmento)”.",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 33 A 35 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Ética para Amador (fragmento)</h3>
            <p>Quieres darte la buena vida: estupendo. Pero también quieres que esa buena vida no sea la buena vida de una coliflor o de un escarabajo, con todo mi respeto para ambas especies, sino una buena vida humana. Es lo que te corresponde, creo yo. Y estoy seguro de que a ello no renunciarías por nada del mundo. <em>Ser humano</em>, ya lo hemos indicado antes, consiste principalmente en tener relaciones con los otros seres humanos.</p>
            <p>Si pudieras tener muchísimo dinero, una casa más lujosa que un palacio de las mil y una noches, las mejores ropas, los más exquisitos alimentos —en tu caso, muchísimas lentejas—, los más sofisticados aparatos, etc., pero todo ello a costa de no volver a ver ni a ser visto por ningún ser humano jamás, ¿estarías contento? ¿Cuánto tiempo podrías vivir así sin volverte loco? ¿No es la mayor de las locuras querer las cosas a costa de la relación con las personas?</p>
            <p>¡Pero si precisamente la gracia de todas esas cosas radica en que te permiten —o parecen permitirte— relacionarte más favorablemente con los demás! Por medio del dinero se espera poder deslumbrar o comprar a los otros: las ropas son para gustarles o para que nos envidien; y lo mismo la buena casa, los mejores vinos, etcétera. Muy pocas cosas conservan su gracia en la soledad; y si la soledad es completa y definitiva, todas las cosas resultan tristes inevitablemente. La buena vida humana es una buena vida entre seres humanos o de lo contrario puede que sea vida, pero no será ni buena ni humana.</p>
            <p class="reading-source">Tomado y adaptado de: Savater, F. (1991). <em>Ética para Amador.</em> Ariel.</p>
          </div>

        `
      }
    ],
    prompt: "¿Qué tipo de estrategia argumentativa utiliza el autor para convencer al lector de su posición?",
    options: [
      { letter: "A", text: "El autor introduce el tema y la tesis con ironía, para hacer entender lo contrario de lo que dice, con la intención de restarle credibilidad a dicha tesis." },
      { letter: "B", text: "El autor contextualiza el problema sobre la buena vida, presenta algunas opiniones suyas sobre el tema y concluye con la tesis contraria." },
      { letter: "C", text: "El autor introduce el tema y la tesis, a través de diversas preguntas retóricas, ofreciendo ejemplos que lo conducen a una conclusión." },
      { letter: "D", text: "El autor contextualiza el problema sobre la buena vida, presenta su tesis y la defiende con la ayuda de ejemplos dados por autoridades en el tema." }
    ],
    correctAnswer: "C",
    explanation: "El autor guía al lector mediante preguntas retóricas y ejemplos relacionados con el dinero, la casa, la ropa y la soledad. Estos recursos conducen a la conclusión de que la buena vida humana requiere relación con otros seres humanos. La respuesta correcta es C."
  }

  ,
  {
    uid: "s1-lect-036",
    session: 1,
    block: 2,
    number: 36,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de conectores y expresiones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 36",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente apartado del texto:</strong></p>
            <blockquote>“Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Cuál es la función de la expresión “lo que”?",
    options: [
      { letter: "A", text: "Plantear dos opciones opuestas sobre una teoría." },
      { letter: "B", text: "Introducir una relación de causalidad entre la primera y la segunda idea." },
      { letter: "C", text: "Aclarar el sentido de la primera idea a partir de la segunda." },
      { letter: "D", text: "Añadir una idea similar a la que se presenta al principio de la oración." }
    ],
    correctAnswer: "B",
    explanation: "La expresión “lo que” conecta el hecho de que casi todas las sociedades hayan tenido música con la conclusión que se deriva de ello: que la apreciación por la música podría ser innata. Por eso introduce una relación causal o de consecuencia entre las dos ideas."
  }

  ,
  {
    uid: "s1-lect-037",
    session: 1,
    block: 2,
    number: 37,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 37",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

        `
      }
    ],
    prompt: "La trompeta es un instrumento de metal. Teniendo en cuenta lo que dice el texto, la invención de la trompeta ocurrió:",
    options: [
      { letter: "A", text: "Antes de la invención de la flauta de hueso." },
      { letter: "B", text: "Antes de la aparición de los instrumentos de percusión." },
      { letter: "C", text: "Después de la aparición de los instrumentos de percusión." },
      { letter: "D", text: "Después de la aparición de la guitarra eléctrica." }
    ],
    correctAnswer: "C",
    explanation: "El texto señala que primero los antepasados tocaban flautas de hueso y percusiones, y luego los instrumentos se diversificaron hacia los de madera, cuerda y metal. Como la trompeta es de metal, su aparición ocurrió después de los instrumentos de percusión."
  }

  ,
  {
    uid: "s1-lect-038",
    session: 1,
    block: 2,
    number: 38,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Léxico en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 38",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

        `
      }
    ],
    prompt: "En el texto, la palabra “disonantes” hace referencia a:",
    options: [
      { letter: "A", text: "Sonidos cautivantes." },
      { letter: "B", text: "Sonidos intensos." },
      { letter: "C", text: "Sonidos agudos." },
      { letter: "D", text: "Sonidos desagradables." }
    ],
    correctAnswer: "D",
    explanation: "El texto contrasta los sonidos agradables con los disonantes. Por oposición, “disonantes” se refiere a sonidos que no resultan agradables o armónicos. La respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-039",
    session: 1,
    block: 2,
    number: 39,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de fragmentos en el texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 39",
    stem: "Responda de acuerdo con el texto “Nuestro cerebro, ¿hecho para la música?” (fragmento).",
    resources: [
      {
        type: "html",
        html: `

          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 36 A 39 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>Nuestro cerebro, ¿hecho para la música? <span class="subtle-title">(fragmento)</span></h3>
            <p>La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización. Nuestros antepasados, en ese entonces, ya tocaban flautas de hueso y percusiones. Los instrumentos se fueron diversificando y multiplicando, pasando por la creación de instrumentos de madera, cuerda y metal, hasta llegar a las guitarras eléctricas y consolas de música electrónica de hoy en día.</p>
            <p>Casi todas las sociedades humanas conocidas han tenido música, lo que sugiere que nuestra apreciación por ella es innata; incluso bebés de dos meses de nacidos se voltean cuando escuchan sonidos agradables y le dan la espalda a los disonantes. Dada su universalidad, entonces, ¿será que la música podría haber ayudado en la supervivencia humana de alguna forma? ¿Tendría alguna ventaja o beneficio? Algunos investigadores sugieren que puede haber ayudado en el cortejo. Otros dicen que promueve la cohesión de grupo, tal como lo hace hoy en día. Incluso, puede ser un simple accidente feliz, una dulzura auditiva, que casualmente terminó creando una rumba cerebral.</p>
            <p class="reading-source">Tomado y adaptado de: Pardo, E. (20 de marzo de 2021). <em>Nuestro cerebro, ¿hecho para la música?</em> Shots de Ciencia. Recuperado de: https://www.shotsdeciencia.com/post/nuestro-cerebro-hecho-para-la-m%C3%BAsica</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>“La relación entre los humanos y lo que hoy reconocemos como música se remonta a más de 40.000 años atrás, desde los principios de nuestra civilización”.</blockquote>
          </div>
        `
      }
    ],
    prompt: "¿Qué función cumple el fragmento en el texto?",
    options: [
      { letter: "A", text: "Presentar la tesis central del texto." },
      { letter: "B", text: "Introducir el tema que se trata en el texto." },
      { letter: "C", text: "Resumir el contenido del texto." },
      { letter: "D", text: "Plantear la conclusión central del texto." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento inicial ubica al lector en el tema general del texto: la relación histórica entre los seres humanos y la música. No presenta la conclusión ni resume todo el contenido, sino que introduce el tema que será desarrollado."
  }

  ,
  {
    uid: "s1-lect-040",
    session: 1,
    block: 2,
    number: 40,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategias retóricas y argumentativas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 40",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>
`
      }
    ],
    prompt: "Según el autor, la afición por la literatura puede convertirse en esclavitud. ¿Qué estrategia retórica usa el autor para ilustrar esto?",
    options: [
      { letter: "A", text: "Contraste." },
      { letter: "B", text: "Exageración." },
      { letter: "C", text: "Comparación." },
      { letter: "D", text: "Cita de autoridades." }
    ],
    correctAnswer: "C",
    explanation: "El autor compara la situación del escritor con la de José María cuando llevaba una solitaria dentro de su organismo. Esa comparación ilustra cómo la afición por la literatura puede convertirse en una forma de servidumbre o esclavitud."
  }
  ,
  {
    uid: "s1-lect-041",
    session: 1,
    block: 2,
    number: 41,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Localización de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 41",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>
`
      }
    ],
    prompt: "El fragmento del texto que responde la pregunta “¿cómo actúa la solitaria dentro del organismo?” es:",
    options: [
      { letter: "A", text: "Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria." },
      { letter: "B", text: "Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él." },
      { letter: "C", text: "José María enflaquecía a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas." },
      { letter: "D", text: "Nosotros hacemos tantas cosas juntos. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria." }
    ],
    correctAnswer: "B",
    explanation: "La opción B responde directamente cómo actúa la solitaria dentro del organismo: se instala, se consubstancia con él, se alimenta de él, crece y se fortalece a sus expensas."
  }
  ,
  {
    uid: "s1-lect-042",
    session: 1,
    block: 2,
    number: 42,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Caracterización de personajes y situaciones",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 42",
    stem: "Responda de acuerdo con el texto adaptado de Vargas Llosa, “Parábola de la solitaria”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 40 A 42 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p><strong>Querido amigo,</strong></p>
            <p><strong>Usted ha decidido dedicarse a la literatura, ¿ahora qué?</strong></p>
            <p>Su decisión de asumir su afición por la literatura como un destino deberá convertirse en servidumbre, en nada menos que esclavitud. Para explicarlo de una manera gráfica, le diré que acaba usted de hacer algo que, por lo visto, hacían en el siglo XIX algunas damas espantadas con el grosor de su cuerpo, que, a fin de recobrar una silueta de sílfide, se tragaban una solitaria. ¿Ha tenido usted ocasión de ver a alguien que lleva en sus entrañas ese horrendo parásito? Yo sí, y puedo asegurarle que aquellas damas eran unas heroínas, unas mártires de la belleza. A comienzos de los años sesenta, en París, yo tenía un magnífico amigo, José María, un muchacho español, pintor y cineasta, que padeció esa enfermedad. Una vez que la solitaria se instala en el organismo se consubstancia con él, se alimenta de él, crece y se fortalece a expensas de él, y es dificilísimo expulsarla de ese cuerpo del que se aprovecha, al que tiene colonizado. José María enflaquecía, a pesar de que debía comer y beber líquidos (leche, sobre todo) constantemente para aplacar la ansiedad del animal aposentado en sus entrañas, pues, si no, su malestar se volvía insoportable. Pero todo lo que comía y bebía no era para su gusto y placer, sino para los de la solitaria. Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</p>
            <p>Desde entonces, me gusta comparar la situación del escritor con la de mi amigo José María cuando llevaba adentro la solitaria.</p>
            <p class="reading-source">Tomado y adaptado de: Vargas Llosa, M. (2011). Parábola de la solitaria. En M. Vargas Llosa (Ed.). <em>Cartas a un joven novelista</em> (pp. 11-22). Madrid: Alfaguara.</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong></p>
            <blockquote>Un día, que estábamos conversando en un pequeño bistrot de Montparnasse, me sorprendió con esta confesión: “Nosotros hacemos tantas cosas juntos. Vamos al cine, a exposiciones, a recorrer librerías, y discutimos horas de horas sobre política, libros, amigos comunes. Y tú crees que yo estoy haciendo esas cosas como las haces tú, porque te divierte hacerlas. Pero te equivocas. Yo las hago para ella, la solitaria. Esa es la impresión que tengo: que todo en mi vida, ahora, no lo vivo para mí, sino para ese ser que llevo adentro, del que ya no soy más que un sirviente”.</blockquote>
          </div>
`
      }
    ],
    prompt: "El anterior fragmento hace una caracterización de",
    options: [
      { letter: "A", text: "la libertad de José María." },
      { letter: "B", text: "la esclavitud de José María." },
      { letter: "C", text: "la soledad de José María." },
      { letter: "D", text: "la inteligencia de José María." }
    ],
    correctAnswer: "B",
    explanation: "El fragmento muestra que José María siente que ya no vive para sí mismo, sino para la solitaria, y que se considera un sirviente de ese ser. Por eso caracteriza su esclavitud."
  }
  ,
  {
    uid: "s1-lect-043",
    session: 1,
    block: 2,
    number: 43,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Paráfrasis y significado contextual",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 43",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>

          <div class="fragment-card">
            <p><strong>Considere el siguiente fragmento del texto:</strong> “Las burbujas hacen efervescencia como champaña”.</p>
          </div>`
      }
    ],
    prompt: "¿Cuál de las siguientes opciones expresa el mismo significado que este fragmento?",
    options: [
      { letter: "A", text: "Las burbujas de agua están llenas de alcohol, al igual que las burbujas de champaña." },
      { letter: "B", text: "El agua hierve de la misma manera que la champaña crea burbujas." },
      { letter: "C", text: "El gas sale de las burbujas de agua del mismo modo que de las burbujas de champaña." },
      { letter: "D", text: "Las burbujas que salen de la champaña son del mismo color que las del agua." }
    ],
    correctAnswer: "C",
    explanation: "La expresión compara la efervescencia de las burbujas con el comportamiento de la champaña. Es decir, el gas sale de las burbujas de manera semejante."
  }
  ,
  {
    uid: "s1-lect-044",
    session: 1,
    block: 2,
    number: 44,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Función de partes del texto",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 44",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>
`
      }
    ],
    prompt: "Teniendo en cuenta el proceso descrito en el texto, ¿qué función cumple el último cuadro?",
    options: [
      { letter: "A", text: "Sintetiza el contenido del texto." },
      { letter: "B", text: "Presenta los contenidos del texto." },
      { letter: "C", text: "Anuncia la estructura del texto." },
      { letter: "D", text: "Funciona como el cierre del texto." }
    ],
    correctAnswer: "D",
    explanation: "El último cuadro cierra la explicación al nombrar el fenómeno descrito: el conjunto de partículas produce el olor llamado petricor, conocido como tierra mojada."
  }
  ,
  {
    uid: "s1-lect-045",
    session: 1,
    block: 2,
    number: 45,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relaciones semánticas y conectores",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 45",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>

          <div class="fragment-card">
            <p><strong>En el último recuadro se presentan dos enunciados:</strong></p>
            <p>1. “El conjunto de partículas es lo que produce ese olor llamado petricor”; 2. “o como lo conoces tú: tierra mojada”.</p>
          </div>`
      }
    ],
    prompt: "¿Qué relación establece la palabra “o” entre estas dos frases?",
    options: [
      { letter: "A", text: "Permite establecer una relación de oposición, pues el segundo enunciado se opone al primero." },
      { letter: "B", text: "Permite establecer una relación de causa-efecto, pues el primer enunciado es la causa del segundo." },
      { letter: "C", text: "Permite expresar una alternativa, pues el segundo enunciado presenta otra manera de denominar al primero." },
      { letter: "D", text: "Permite expresar una adición, pues el segundo enunciado agrega nuevas ideas al tema presentado por el primero." }
    ],
    correctAnswer: "C",
    explanation: "La palabra “o” introduce una alternativa de denominación: petricor es el nombre técnico, mientras que tierra mojada es una forma común de llamar el mismo olor."
  }
  ,
  {
    uid: "s1-lect-046",
    session: 1,
    block: 2,
    number: 46,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategias discursivas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 46",
    stem: "Responda de acuerdo con la infografía “Petricor: el olor de la lluvia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card petrichor-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 43 A 46 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="petrichor-title">PETRICOR:<span>EL OLOR DE LA LLUVIA</span></div>
            <div class="petrichor-strip">
              <div class="rain-lines" aria-hidden="true"></div>
              <div class="petrichor-bubble left">CUANDO LAS GOTAS DE LLUVIA IMPACTAN CONTRA EL SUELO, SE FORMAN BURBUJAS DE AIRE.</div>
              <div class="puddle splash"><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="petrichor-strip">
              <div class="puddle large"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="petrichor-bubble right">ESTAS BURBUJAS “ATRAPAN” PARTÍCULAS DE LA TIERRA (ACEITES Y QUÍMICOS PRODUCIDOS POR BACTERIAS).</div>
            </div>
            <div class="petrichor-strip">
              <div class="petrichor-bubble left bottom">LAS BURBUJAS HACEN EFERVESCENCIA COMO CHAMPAÑA Y ESPARCEN LAS PARTÍCULAS EN EL AMBIENTE.</div>
              <div class="puddle flat"><span></span><span></span><span></span></div>
              <div class="particles" aria-hidden="true">✦ · ✧ · ✦ ·</div>
            </div>
            <div class="petrichor-close">
              <p>EL CONJUNTO DE PARTÍCULAS ES LO QUE PRODUCE ESE OLOR LLAMADO “PETRICOR”</p>
              <span class="arrow-line">→</span>
              <p>O COMO LO CONOCES TÚ:<br><strong>TIERRA MOJADA</strong></p>
            </div>
            <p class="reading-source">Fuente: “How the Smell of Rain Bubbles from the Ground” - The New York Times. Pictoline.com</p>
          </div>
`
      }
    ],
    prompt: "A partir de la lectura de la infografía, ¿qué tipo de estrategia utiliza el autor del texto para lograr su propósito?",
    options: [
      { letter: "A", text: "Muestra las similitudes y las diferencias entre dos temas con el propósito de demostrar preferencia." },
      { letter: "B", text: "Utiliza detalles y lenguaje figurado con el fin de apoyar una impresión dominante con respecto al tema." },
      { letter: "C", text: "Explica el significado de un término relevante para el texto y así deja claro cómo este se va a entender." },
      { letter: "D", text: "Señala y explica pasos o etapas según sus características." }
    ],
    correctAnswer: "C",
    explanation: "La infografía explica el significado del término petricor y lo relaciona con una expresión conocida por el lector: tierra mojada. Por eso, la estrategia consiste en definir y aclarar un término relevante."
  }

  ,
  {
    uid: "s1-lect-047",
    session: 1,
    block: 2,
    number: 47,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de tesis central",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 47",
    stem: "Responda de acuerdo con el texto “La verdad en la infancia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card infancia-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 47 Y 48 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>La verdad en la infancia</h3>
            <p>En la vasta comedia de los sentimientos y de las pasiones humanas, la infancia representa la única certeza de sinceridad. Nos hacemos hombres adultos, nos hacemos viejos, maduramos principal y casi exclusivamente para mentir, para disimular, para fingir acerca del amor, de la amistad, del aprecio, entre otras cosas. Sobre ninguna de tales categorías morales conoce la infancia el recurso de la hipocresía. Los niños aman y detestan integral, honda y sinceramente con diáfana lealtad. Confiesan su desamor por una cosa o por una persona, con esplendorosa claridad, sin agregar vanas razones al mandato interior que los fuerza a declarar su pueril odio o abominación. Afirman, de la misma manera honesta, su prodigiosa ternura por una persona o un juguete, por un desaprovechado trozo de madera, por un inservible artefacto, resto de un naufragio de cosas domésticas, por un perro de ojos tristes y de estampa maltrecha, por un gato envejecido y cojo, por una piedrecilla minúscula, cuyos hostiles bordes se han ido suavizando al roce de las caricias entre las manos incansables. Los niños aman el viento y la lluvia, la tierra mojada, el agua que brota y que salta en los estanques públicos, el sol y el cielo, la yerba, los árboles, la luz, los colores, todo el universo real y todo el universo irreal de sus sueños.</p>
            <p class="reading-source">Tomado y adaptado de: Téllez, H. (1946). Bagatela sobre la infancia. En Hernando Téllez (Ed.), <em>Luces en el bosque</em> (pp. 141-142). Ediciones Librería Siglo XX.</p>
          </div>
`
      }
    ],
    prompt: "¿Cuál de las siguientes opciones presenta la idea que defiende el texto?",
    options: [
      { letter: "A", text: "Cuando se es viejo siempre se ama con libertad." },
      { letter: "B", text: "Cuando se es niño siempre se ama con claridad." },
      { letter: "C", text: "Cuando se es viejo siempre se miente." },
      { letter: "D", text: "Cuando se es niño siempre se dice la verdad." }
    ],
    correctAnswer: "D",
    explanation: "El texto defiende la idea de que la infancia representa una certeza de sinceridad: los niños aman, detestan y expresan lo que sienten con claridad, sin hipocresía. Por eso, la opción correcta es D."
  }
  ,
  {
    uid: "s1-lect-048",
    session: 1,
    block: 2,
    number: 48,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Estrategia argumentativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 48",
    stem: "Responda de acuerdo con el texto “La verdad en la infancia”",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card infancia-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 47 Y 48 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <h3>La verdad en la infancia</h3>
            <p>En la vasta comedia de los sentimientos y de las pasiones humanas, la infancia representa la única certeza de sinceridad. Nos hacemos hombres adultos, nos hacemos viejos, maduramos principal y casi exclusivamente para mentir, para disimular, para fingir acerca del amor, de la amistad, del aprecio, entre otras cosas. Sobre ninguna de tales categorías morales conoce la infancia el recurso de la hipocresía. Los niños aman y detestan integral, honda y sinceramente con diáfana lealtad. Confiesan su desamor por una cosa o por una persona, con esplendorosa claridad, sin agregar vanas razones al mandato interior que los fuerza a declarar su pueril odio o abominación. Afirman, de la misma manera honesta, su prodigiosa ternura por una persona o un juguete, por un desaprovechado trozo de madera, por un inservible artefacto, resto de un naufragio de cosas domésticas, por un perro de ojos tristes y de estampa maltrecha, por un gato envejecido y cojo, por una piedrecilla minúscula, cuyos hostiles bordes se han ido suavizando al roce de las caricias entre las manos incansables. Los niños aman el viento y la lluvia, la tierra mojada, el agua que brota y que salta en los estanques públicos, el sol y el cielo, la yerba, los árboles, la luz, los colores, todo el universo real y todo el universo irreal de sus sueños.</p>
            <p class="reading-source">Tomado y adaptado de: Téllez, H. (1946). Bagatela sobre la infancia. En Hernando Téllez (Ed.), <em>Luces en el bosque</em> (pp. 141-142). Ediciones Librería Siglo XX.</p>
          </div>
`
      }
    ],
    prompt: "¿Cuál es la estrategia argumentativa usada por el autor?",
    options: [
      { letter: "A", text: "El autor presenta el tema, seguido de una tesis y de una antítesis, y concluye con una síntesis." },
      { letter: "B", text: "El autor emprende la tarea de defender una tesis enumerando evidencias a favor de ella." },
      { letter: "C", text: "El autor presenta diferentes argumentos y concluye refutando esos argumentos." },
      { letter: "D", text: "El autor expone una tesis, pero no presenta argumentos para apoyarla." }
    ],
    correctAnswer: "B",
    explanation: "El autor sostiene la tesis de que la infancia es sincera y la apoya mediante una enumeración de evidencias: los niños aman, detestan, confiesan y afirman sus sentimientos sin hipocresía. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-lect-049",
    session: 1,
    block: 2,
    number: 49,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información textual y paratextual",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 49",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "El texto en árabe al que se refieren en los recuadros está dividido en versículos. Uno podría deducir que se trata de:",
    options: [
      { letter: "A", text: "Un diccionario de una lengua de Oriente Medio." },
      { letter: "B", text: "Un texto religioso como la Biblia." },
      { letter: "C", text: "Una colección de cuentos de los hermanos Grimm." },
      { letter: "D", text: "Una novela como María, de Jorge Isaacs." }
    ],
    correctAnswer: "B",
    explanation: "El texto menciona el Corán y la nota aclara que es el libro sagrado para los musulmanes. Además, se habla de versículos, una forma de organización propia de textos religiosos. Por eso, la opción correcta es B."
  }
  ,
  {
    uid: "s1-lect-050",
    session: 1,
    block: 2,
    number: 50,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre texto verbal y elementos gráficos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 50",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "En el sexto recuadro del cómic, ¿cuál es la relación entre el texto en cursiva debajo de la flecha y el texto dentro del globo?",
    options: [
      { letter: "A", text: "Mediante el texto en cursiva la mujer corrige la pronunciación de la niña, cuyas palabras aparecen en el globo." },
      { letter: "B", text: "Con el texto en el globo la niña busca hacer una pregunta, que la mujer responde con el texto en cursiva." },
      { letter: "C", text: "Mediante el texto en cursiva la niña expresa gusto por la voz de la mujer, cuyas palabras están en el globo." },
      { letter: "D", text: "Con el texto en el globo la mujer responde las observaciones de la niña, que aparecen en cursiva." }
    ],
    correctAnswer: "C",
    explanation: "En el sexto recuadro, el globo presenta las palabras que pronuncia la maestra. El texto en cursiva, debajo de la flecha, corresponde a la voz de la niña narradora, quien expresa que escucharla era agradable. Por eso, la respuesta correcta es C."
  }
  ,
  {
    uid: "s1-lect-051",
    session: 1,
    block: 2,
    number: 51,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Voces narrativas y punto de vista",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 51",
    stem: "Responda de acuerdo con el cómic sobre el Corán.",
    resources: [
      {
        type: "html",
        html: `
          <div class="reading-card comic-card riad-comic-card">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 49 A 51 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <div class="comic-grid" aria-label="Cómic sobre la recuperación de lectura del Corán">
              <section class="comic-panel">
                <div class="caption-box">El director de la escuela y mi padre creían que mi nivel de Corán* era muy deficiente.</div>
                <div class="comic-scene school-scene"><span>Escuela</span><span>Niños en el patio</span></div>
                <span class="panel-number">1</span>
              </section>
              <section class="comic-panel">
                <div class="comic-scene desk-scene"><span>El árabe del Corán no es el mismo que el que se hablaba en clase.</span></div>
                <span class="panel-number">2</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Así que me obligaron a pasarme todos los recreos haciendo recuperación con la maestra.</div>
                <div class="speech teacher">¡Venga, Riad!</div>
                <div class="speech child">Explícame de qué habla este versículo.</div>
                <div class="thought">Como todo el mundo quería matarme a la hora del recreo, me venía bien.</div>
                <span class="panel-number">3</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Yo me preguntaba si iba en serio o disimulaba. Si apenas conseguía leer...</div>
                <div class="speech teacher">Yo... No sé...</div>
                <div class="speech child big">BUAAA</div>
                <span class="panel-number">4</span>
              </section>
              <section class="comic-panel">
                <div class="speech teacher wide">Venga, no pasa nada, volvemos a empezar, escucha bien.</div>
                <div class="comic-scene reading-scene"><span>Libro abierto sobre el pupitre</span></div>
                <span class="panel-number">5</span>
              </section>
              <section class="comic-panel">
                <div class="caption-box">Olía a una fragancia jabonosa y, de fondo, a un sudor embriagador y reconfortante.</div>
                <div class="speech teacher">Bismilá arramán arrahim...</div>
                <div class="thought child-note">Escucharla era muy agradable.</div>
                <span class="panel-number">6</span>
              </section>
            </div>
            <p class="reading-note"><strong>*Corán:</strong> Libro sagrado para los musulmanes.</p>
            <p class="reading-source">Sattouf, R. (2019). <em>El árabe del futuro 4. Una juventud en Oriente Medio (1987-1992)</em>. España: Editorial Salamandra.</p>
          </div>
`
      }
    ],
    prompt: "Los rectángulos de texto que aparecen en la parte superior de los recuadros 1, 3, 4 y 6 corresponden a la voz de:",
    options: [
      { letter: "A", text: "La maestra que aparece en el cómic, que cuenta todo en tercera persona." },
      { letter: "B", text: "El director de la escuela, que no aparece en los recuadros pero conoció la historia." },
      { letter: "C", text: "El padre de la niña del cómic, que recuerda los eventos en segunda persona." },
      { letter: "D", text: "La niña de la historia, que hace su relato en primera persona." }
    ],
    correctAnswer: "D",
    explanation: "Los recuadros superiores usan expresiones como “mi padre”, “me obligaron” y “yo me preguntaba”, por lo que corresponden a una narración en primera persona realizada por la niña de la historia. La respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-052",
    session: 1,
    block: 2,
    number: 52,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados y función argumentativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 52",
    stem: "Responda de acuerdo con el texto sobre los horóscopos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading horoscope-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 52 Y 53 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Me pregunto qué diría un comité de ética si un periódico indujera a sus lectores a cambiar comportamientos, a vender o comprar propiedades, a suspender relaciones amorosas o a cambiar de trabajo. Todo eso con el agravante de que la intromisión proviene de afirmaciones sin base científica o factual, producto de la pluma de alguien que ya ha demostrado estar equivocado y se lucra de la ingenuidad de la gente. Pues eso es exactamente lo que pasa con los horóscopos que nos inundan por esta época, incluso en los medios de la mayor seriedad.</p>
            <p>Horóscopos y cartas astrales se basan en creencias y mitos de diversas culturas, en escritos antiguos que están equivocados y se contradicen en sus predicciones. Los signos del Zodíaco, por ejemplo, no son 12 sino 13, y hay quienes piensan que 14. Los astrólogos esconden ese hecho, que nos obligaría a reubicarnos en signos diferentes al nuestro tradicional, cambiando el análisis de personalidad y las predicciones de toda la vida. ¡Qué oso!</p>
            <p>El nombre y carácter de los signos se derivan de lo que creían ver en las estrellas astrónomos de la Antigüedad. Podrían haber imaginado cosas distintas. Hoy, por ejemplo, no verían una balanza (pieza de museo) en los astros del signo Libra. Quizás verían un brasier, y eso nos daría a los del signo nuestra proverbial fama de equilibrados.</p>
            <p>En los análisis de personalidad hacen afirmaciones generales que le cuadran a cualquiera. Aprovechan lo que en psicología se llama efecto Forer. Forer sometió a sus estudiantes a un test que supuestamente había elaborado para definir la personalidad. Posteriormente, le entregó a cada uno su resultado y le pidió que calificara su precisión de 0 a 5. El test recibió una excelente calificación promedio de 4,2.</p>
            <p>El asunto fue que Forer no leyó los exámenes y entregó a todos los estudiantes el mismo resultado. Este le decía al examinado que tenía gran necesidad de aprecio, pero que era crítico consigo mismo. Que trataba de compensar sus debilidades, y así muchas otras cosas, muy personales e íntimas. El texto les cuadró a todos. Así, la mayoría de astrólogos usan esa técnica, y la gente siente que acertaron.</p>
            <p>Algunos se arriesgan a pronósticos más precisos, y en ellos casi siempre se equivocan, pero nos recuerdan solo sus aciertos. Este año habrá quienes se vanagloriarán de haber predicho la muerte de Fidel Castro; no nos recordarán que llevan 10 años prediciéndola. Busquen en la web las predicciones de sus astrólogos preferidos para el 2016. Una conocida astróloga mexicana pronosticó la caída de Maduro y que Jeb Bush iba a ser presidente. Otro lamentó informarnos que el papa Francisco sufriría una grave enfermedad. Acertó, eso sí, al predecir que en el mundo habría más refugiados.</p>
            <p>A mí, el astrólogo colombiano de cabecera me predijo que iba a participar en eventos al aire libre y me recomendó utilizar mi capacidad creativa para labrarme un buen futuro. Comparto feliz estas buenas predicciones con otros 625 millones de terrícolas.</p>
            <p class="reading-source">Tomado y adaptado de: Wasserman, M. (22 de diciembre de 2016). Otra vez “horoscopeando”. <em>El Tiempo</em>. Recuperado de http://www.eltiempo.com/archivo/documento/CMS-16778742</p>
          </article>
`
      }
    ],
    prompt: "Considere las siguientes predicciones, presentadas en el penúltimo párrafo del texto: 1) El papa Francisco sufrirá una grave enfermedad. 2) En el mundo habrá más refugiados. ¿Cuál es la relación entre estas dos afirmaciones?",
    options: [
      { letter: "A", text: "Son complementarias, puesto que ambas sirven para probar que las predicciones específicas de los astrólogos son ciertas." },
      { letter: "B", text: "Tienen la misma función, ya que ambas prueban que las predicciones generales de los astrólogos suelen resultar falsas." },
      { letter: "C", text: "Son contradictorias, puesto que 1) dice lo contrario que 2), mostrando que los horóscopos son una práctica incoherente." },
      { letter: "D", text: "Tienen funciones opuestas, ya que 1) prueba que las predicciones particulares fallan, y 2) que las generales aciertan." }
    ],
    correctAnswer: "D",
    explanation: "En el penúltimo párrafo, el autor muestra que las predicciones específicas suelen fallar, como la enfermedad grave del papa Francisco, mientras que una predicción general puede parecer acertada, como afirmar que habría más refugiados. Por eso, las dos afirmaciones cumplen funciones opuestas. La respuesta correcta es D."
  }
  ,
  {
    uid: "s1-lect-053",
    session: 1,
    block: 2,
    number: 53,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Uso de evidencia en la argumentación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 53",
    stem: "Responda de acuerdo con el texto sobre los horóscopos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading horoscope-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 52 Y 53 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Me pregunto qué diría un comité de ética si un periódico indujera a sus lectores a cambiar comportamientos, a vender o comprar propiedades, a suspender relaciones amorosas o a cambiar de trabajo. Todo eso con el agravante de que la intromisión proviene de afirmaciones sin base científica o factual, producto de la pluma de alguien que ya ha demostrado estar equivocado y se lucra de la ingenuidad de la gente. Pues eso es exactamente lo que pasa con los horóscopos que nos inundan por esta época, incluso en los medios de la mayor seriedad.</p>
            <p>Horóscopos y cartas astrales se basan en creencias y mitos de diversas culturas, en escritos antiguos que están equivocados y se contradicen en sus predicciones. Los signos del Zodíaco, por ejemplo, no son 12 sino 13, y hay quienes piensan que 14. Los astrólogos esconden ese hecho, que nos obligaría a reubicarnos en signos diferentes al nuestro tradicional, cambiando el análisis de personalidad y las predicciones de toda la vida. ¡Qué oso!</p>
            <p>El nombre y carácter de los signos se derivan de lo que creían ver en las estrellas astrónomos de la Antigüedad. Podrían haber imaginado cosas distintas. Hoy, por ejemplo, no verían una balanza (pieza de museo) en los astros del signo Libra. Quizás verían un brasier, y eso nos daría a los del signo nuestra proverbial fama de equilibrados.</p>
            <p>En los análisis de personalidad hacen afirmaciones generales que le cuadran a cualquiera. Aprovechan lo que en psicología se llama efecto Forer. Forer sometió a sus estudiantes a un test que supuestamente había elaborado para definir la personalidad. Posteriormente, le entregó a cada uno su resultado y le pidió que calificara su precisión de 0 a 5. El test recibió una excelente calificación promedio de 4,2.</p>
            <p>El asunto fue que Forer no leyó los exámenes y entregó a todos los estudiantes el mismo resultado. Este le decía al examinado que tenía gran necesidad de aprecio, pero que era crítico consigo mismo. Que trataba de compensar sus debilidades, y así muchas otras cosas, muy personales e íntimas. El texto les cuadró a todos. Así, la mayoría de astrólogos usan esa técnica, y la gente siente que acertaron.</p>
            <p>Algunos se arriesgan a pronósticos más precisos, y en ellos casi siempre se equivocan, pero nos recuerdan solo sus aciertos. Este año habrá quienes se vanagloriarán de haber predicho la muerte de Fidel Castro; no nos recordarán que llevan 10 años prediciéndola. Busquen en la web las predicciones de sus astrólogos preferidos para el 2016. Una conocida astróloga mexicana pronosticó la caída de Maduro y que Jeb Bush iba a ser presidente. Otro lamentó informarnos que el papa Francisco sufriría una grave enfermedad. Acertó, eso sí, al predecir que en el mundo habría más refugiados.</p>
            <p>A mí, el astrólogo colombiano de cabecera me predijo que iba a participar en eventos al aire libre y me recomendó utilizar mi capacidad creativa para labrarme un buen futuro. Comparto feliz estas buenas predicciones con otros 625 millones de terrícolas.</p>
            <p class="reading-source">Tomado y adaptado de: Wasserman, M. (22 de diciembre de 2016). Otra vez “horoscopeando”. <em>El Tiempo</em>. Recuperado de http://www.eltiempo.com/archivo/documento/CMS-16778742</p>
          </article>
`
      }
    ],
    prompt: "Considere los párrafos 4 y 5 del texto. En ellos, el autor busca mostrar que los análisis de personalidad a veces son engañosos. El experimento realizado por Forer logra apoyar bien esa idea, pues en este se evidencia que",
    options: [
      { letter: "A", text: "la mayoría de la gente es proclive a creer en los test de personalidad, sobre todo si estos afirman cosas positivas." },
      { letter: "B", text: "los estudiantes están sesgados y predispuestos a considerar como verdadero lo que su profesor de psicología les dice." },
      { letter: "C", text: "debido a las diferencias normales entre sus personalidades, los estudiantes no le otorgaron a la prueba una calificación más alta." },
      { letter: "D", text: "a pesar de las diferentes personalidades de los estudiantes, todos ellos se sintieron identificados con una misma descripción general." }
    ],
    correctAnswer: "D",
    explanation: "El experimento de Forer apoya la idea de que ciertas descripciones generales parecen ajustarse a cualquiera: todos los estudiantes recibieron el mismo resultado y, aun así, lo calificaron como preciso. Por eso, la respuesta correcta es D."
  }

  ,
  {
    uid: "s1-lect-054",
    session: 1,
    block: 2,
    number: 54,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Ubicación de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 54",
    stem: "Responda de acuerdo con el texto sobre la firma del armisticio.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con el texto, la firma del armisticio se da en",
    options: [
      { letter: "A", text: "una zona neutral para aliados y alemanes." },
      { letter: "B", text: "un vagón de tren en territorio aliado." },
      { letter: "C", text: "un batallón militar del ejército francés." },
      { letter: "D", text: "una estación de tren en medio de un bosque." }
    ],
    correctAnswer: "B",
    explanation: "El texto indica que tres días después, el 11 de noviembre de 1918, Erzberger firmó la tregua “en el mismo vagón”. Además, ese vagón correspondía al cuartel de Foch, un antiguo coche-cama francés, es decir, en territorio aliado. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-055",
    session: 1,
    block: 2,
    number: 55,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia y caracterización de personajes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 55",
    stem: "Responda de acuerdo con el texto sobre la situación de los delegados alemanes.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "Es posible describir a los alemanes como",
    options: [
      { letter: "A", text: "desesperados, pues hicieron un largo viaje para poder hablar con Foch." },
      { letter: "B", text: "vencidos, pero ignorantes de su situación real." },
      { letter: "C", text: "indecisos, pues les tomó alrededor de tres días decidir firmar el armisticio." },
      { letter: "D", text: "combativos, pero con voluntad de hacer la paz." }
    ],
    correctAnswer: "B",
    explanation: "Los alemanes ya estaban vencidos, pero el texto señala que al escuchar las condiciones quedaron aturdidos y comprendieron por primera vez la magnitud de su derrota. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-056",
    session: 1,
    block: 2,
    number: 56,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 56",
    stem: "Responda de acuerdo con el texto sobre Matthias Erzberger.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con el texto, Matthias Erzberger era",
    options: [
      { letter: "A", text: "un político francés que sirvió como mediador en la negociación entre los alemanes y Foch." },
      { letter: "B", text: "un diplomático alemán encargado de negociar con el supremo comandante de las fuerzas aliadas." },
      { letter: "C", text: "un oficial del ejército aliado que acompañó a los alemanes al momento de negociar con Foch." },
      { letter: "D", text: "un edecán encargado de comandar el grupo de negociación conformado por alemanes y aliados." }
    ],
    correctAnswer: "B",
    explanation: "El texto presenta a Matthias Erzberger como portavoz del grupo de alemanes y muestra que fue quien explicó a Foch que habían ido a recibir las propuestas aliadas para una tregua. Por eso, la respuesta correcta es B."
  },
  {
    uid: "s1-lect-057",
    session: 1,
    block: 2,
    number: 57,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre textos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 57",
    stem: "Responda de acuerdo con el texto principal y el fragmento complementario.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading war-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 54 A 57 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>El tren se detuvo en el interior del bosque. La niebla envolvía los robles alrededor del claro. Eran las 7 a. m. del 8 de noviembre de 1918. Estaba finalizando la Primera Guerra Mundial. Estaba empezando la Segunda.</p>
            <p>Desde el último coche, cuya tapicería de raso verde era una reliquia de los tiempos en que había sido el vagón privado del emperador Napoleón III de Francia, los pasajeros pudieron ver otro coche en un apartadero. Ignoraban dónde estaban, pero sabían que aquella era la última parada de un viaje de pesadilla... un viaje, que esperaban, pondría fin a los combates.</p>
            <p>Un oficial del ejército francés apareció en la puerta para informar a los recién llegados, seis alemanes, que el mariscal Ferdinand Foch, supremo comandante de las fuerzas aliadas, les recibiría a las 9 a. m. Para Matthias Erzberger, portavoz del grupo, la perspectiva de esperar solo podía aumentar su incomodidad. Le dolía el pesado cuerpo, su sombrero estaba aplastado y, en algún lugar del camino había perdido las gafas.</p>
            <p>Unos minutos antes de las 9 a. m., los alemanes cruzaron un caminillo de tablillas que había sido colocado entre las vías y entraron en el cuartel de Foch, un antiguo coche-cama francés. Luego, de porte erguido a la edad de 67 años, apareció Foch, acompañado por el Primer Lord de la Marina de Inglaterra, almirante Rosslyn Wemyss.</p>
            <p>Foch se mostró glacialmente formal:</p>
            <p>— ¿Qué trae a estos caballeros por aquí? ¿Qué quieren de mí?</p>
            <p>Erzberger dijo que habían ido con el fin de recibir las propuestas aliadas para una tregua.</p>
            <p>— No tengo ninguna propuesta que hacer —dijo Foch.</p>
            <p>Hubo un momento de consternación; uno de los alemanes preguntó cómo quería que se expresaran.</p>
            <p>— ¿Desean una tregua? —respondió Foch—. Si es así, les puedo comunicar las condiciones bajo las cuales la pueden obtener.</p>
            <p>Pidieron tregua.</p>
            <p>El silencio fue absoluto mientras un edecán leía las condiciones. Foch permaneció sentado como una estatua. El almirante jugaba con su monóculo. Mientras escuchaban, los alemanes quedaron aturdidos, comprendiendo por primera vez la magnitud de su derrota.</p>
            <p>Tres días más tarde, el 11 de noviembre de 1918, a las 5:20 a. m., en el mismo vagón, Erzberger firmó la tregua y, al hacerlo, su propia sentencia de muerte. Tres años después sería abatido a tiros por compatriotas resentidos, un par de exoficiales del ejército, nacionalistas y fanáticos.</p>
            <p>La intransigencia de Foch y el fatídico destino de Erzberger son vívidos ejemplos de las fuerzas desatadas al final del primer gran conflicto, que condujeron —y hoy nos parece inevitable— al segundo. Estas fuerzas, compuestas de rencor y orgullo, tanto en los alemanes como en sus vencedores, iban a cobrar impulso aún después de que se acallaran las armas.</p>
            <p class="source-note">Tomado y adaptado de: Elson, R. (1995). <em>La Segunda Guerra Mundial. El preludio de la guerra I.</em> Barcelona: Ediciones Folio.</p>
          </article>

          <article class="reading-card prose-reading fragment-reading">
            <p><strong>Considere el siguiente fragmento:</strong></p>
            <p>Las cláusulas territoriales del Tratado de Versalles [el acuerdo de paz firmado en 1919 entre aliados y alemanes tras finalizar la Primera Guerra Mundial] dejaban a Alemania prácticamente intacta. Seguía siendo el más grande de los bloques raciales homogéneos de Europa.</p>
            <p>Cuando el mariscal Foch se enteró de la firma del Tratado de Paz de Versalles, comentó con singular acierto: "Esto no es la paz. Es una tregua por veinte años".</p>
            <p class="source-note">Tomado y adaptado de: Churchill, W. (1986). <em>The Second World War. The Gathering Storm.</em> Mariner Books.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué relación guarda el anterior fragmento con el texto principal?",
    options: [
      { letter: "A", text: "Lo complementa, pues muestra un aspecto desconocido del mariscal Foch que está en contra de aceptar el armisticio." },
      { letter: "B", text: "Lo contradice, pues en el texto principal se advierte que Foch apoyaba las condiciones impuestas a los alemanes para la firma del armisticio." },
      { letter: "C", text: "Lo complementa, pues da más razones para asegurar que el fin de la Primera Guerra Mundial fue el inicio de la Segunda." },
      { letter: "D", text: "Lo contradice, pues en el texto principal se advierte que el fin de la Primera Guerra Mundial solo tuvo consecuencias negativas para Alemania." }
    ],
    correctAnswer: "C",
    explanation: "El fragmento complementa el texto principal porque añade otra razón para sostener que el cierre de la Primera Guerra Mundial no resolvió el conflicto de fondo, sino que dejó condiciones que anticipaban la Segunda Guerra Mundial. Por eso, la respuesta correcta es C."
  }


,
  {
    uid: "s1-lect-058",
    session: 1,
    block: 2,
    number: 58,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 58",
    stem: "Responda de acuerdo con el texto sobre la preservación de las especies.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading ecology-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 58 Y 59 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Existen argumentos en contra de la preservación de las especies, esgrimidos por quienes no consideran fatal que la humanidad colabore en la desaparición del escenario de otras especies. Quizás el más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?</p>
            <p>Cuando en 1859, Charles Darwin expuso la teoría de la evolución, junto a las correspondientes pruebas a su favor, no proponía solo la selección natural como fuerza directriz del proceso evolutivo, sino que reconocía también la inevitabilidad de la extinción. Decía Darwin que "como las nuevas formas se producen lenta y constantemente, a menos que admitamos que el número de formas específicas puede seguir aumentando perpetua y casi indefinidamente, es inevitable que haya grupos que se extingan".</p>
            <p>Antes de Darwin, la idea de la extinción ya había sido tratada por varios geólogos y naturalistas; sin embargo, a mediados del siglo XIX, el concepto resultaba escandaloso para la mayoría de personas. Se creía que todo ser vivo había sido creado por Dios, según una secuencia de complejidad creciente, y que las especies aparecieron en un único acto creador, así que la visión “creacionista” de las especies no contemplaba la extinción. No obstante, actualmente parece haberse cerrado el ciclo; no solo ya no escandaliza la idea de la extinción, sino que se toma el nombre de Darwin en vano cuando se pretende justificar el exterminio de las otras especies a manos del <em>Homo sapiens</em>.</p>
            <p>Es evidente que quienes recurren a este tipo de argumentos pasan por alto un dato importante, y es que la humanidad ya ha elevado la tasa de extinción de especies muy por encima de las tasas históricas de aparición de las mismas. Las especies desaparecen ahora mucho más deprisa de lo que aparecen, y la tasa de desaparición promete seguir aumentando vertiginosamente. El argumento que justifica el exterminio recuerda a aquel hombre que, al ver cómo el agua escapaba por unas grietas cada vez más anchas del muro de una gran presa, decía a las gentes que vivían río abajo: "No hay por qué preocuparse; después de todo, el agua siempre ha salido por el sobradero".</p>
            <p class="source-note">Tomado de: Ehrlich, P. R. y Ehrlich, A. H. (1987). <em>Extinción.</em> Barcelona: Salvat Editores.</p>
          </article>
        `
      }
    ],
    prompt: "Considere el siguiente fragmento del texto: “Quizás el [argumento contra la preservación de las especies] más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?”. ¿Cuál es la relación entre los dos enunciados que componen este fragmento?",
    options: [
      { letter: "A", text: "La pregunta pone en duda la tesis de la frase que la precede." },
      { letter: "B", text: "Los enunciados se oponen entre sí." },
      { letter: "C", text: "La pregunta busca aclarar una idea de la frase que la precede." },
      { letter: "D", text: "Los enunciados apoyan una misma tesis." }
    ],
    correctAnswer: "A",
    explanation: "La pregunta final introduce un cuestionamiento retórico frente a la afirmación anterior: si la extinción se presenta como natural, entonces se pone en duda la necesidad de preocuparse por ella. Por eso, la respuesta correcta es A."
  },
  {
    uid: "s1-lect-059",
    session: 1,
    block: 2,
    number: 59,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre textos y argumentos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 59",
    stem: "Responda de acuerdo con el texto principal y el texto complementario.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading ecology-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 58 Y 59 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Existen argumentos en contra de la preservación de las especies, esgrimidos por quienes no consideran fatal que la humanidad colabore en la desaparición del escenario de otras especies. Quizás el más extendido es el de que la extinción es un proceso evolutivo perfectamente natural, que se ha venido produciendo durante millones de años con o sin la participación humana. ¿Por qué hay que preocuparse si en realidad se está ayudando a la naturaleza a seguir su curso?</p>
            <p>Cuando en 1859, Charles Darwin expuso la teoría de la evolución, junto a las correspondientes pruebas a su favor, no proponía solo la selección natural como fuerza directriz del proceso evolutivo, sino que reconocía también la inevitabilidad de la extinción. Decía Darwin que "como las nuevas formas se producen lenta y constantemente, a menos que admitamos que el número de formas específicas puede seguir aumentando perpetua y casi indefinidamente, es inevitable que haya grupos que se extingan".</p>
            <p>Antes de Darwin, la idea de la extinción ya había sido tratada por varios geólogos y naturalistas; sin embargo, a mediados del siglo XIX, el concepto resultaba escandaloso para la mayoría de personas. Se creía que todo ser vivo había sido creado por Dios, según una secuencia de complejidad creciente, y que las especies aparecieron en un único acto creador, así que la visión “creacionista” de las especies no contemplaba la extinción. No obstante, actualmente parece haberse cerrado el ciclo; no solo ya no escandaliza la idea de la extinción, sino que se toma el nombre de Darwin en vano cuando se pretende justificar el exterminio de las otras especies a manos del <em>Homo sapiens</em>.</p>
            <p>Es evidente que quienes recurren a este tipo de argumentos pasan por alto un dato importante, y es que la humanidad ya ha elevado la tasa de extinción de especies muy por encima de las tasas históricas de aparición de las mismas. Las especies desaparecen ahora mucho más deprisa de lo que aparecen, y la tasa de desaparición promete seguir aumentando vertiginosamente. El argumento que justifica el exterminio recuerda a aquel hombre que, al ver cómo el agua escapaba por unas grietas cada vez más anchas del muro de una gran presa, decía a las gentes que vivían río abajo: "No hay por qué preocuparse; después de todo, el agua siempre ha salido por el sobradero".</p>
            <p class="source-note">Tomado de: Ehrlich, P. R. y Ehrlich, A. H. (1987). <em>Extinción.</em> Barcelona: Salvat Editores.</p>
          </article>

          <article class="reading-card prose-reading fragment-reading">
            <p><strong>Considere el siguiente texto:</strong></p>
            <p>"¡Ah, la madre naturaleza necesita favores! Debió pensarlo cuando nos asoló con inundaciones, sequías y monos enfermos. ¿Ella inició la lucha por sobrevivir y ahora quiere renunciar porque está perdiendo? Pues yo digo, ¡mala noche!" (Montgomery Burns, <em>Los Simpsons</em>).</p>
          </article>
        `
      }
    ],
    prompt: "Quienes están en contra de la preservación de las especies podrían argumentar que la idea del párrafo anterior",
    options: [
      { letter: "A", text: "contradice su tesis, porque favorece el rechazo del autor a quienes dudan de la extinción." },
      { letter: "B", text: "complementa su tesis, porque contradice la defensa del autor de que la extinción es antinatural." },
      { letter: "C", text: "debilita su tesis, porque caricaturiza el argumento de que la extinción es aceptable por tratarse de un proceso natural." },
      { letter: "D", text: "apoya su tesis, porque presenta una nueva manera de comprender la teoría de la inevitabilidad de la extinción." }
    ],
    correctAnswer: "B",
    explanation: "Desde la postura de quienes se oponen a la preservación, el texto de Montgomery Burns podría usarse para reforzar la idea de que la naturaleza funciona por lucha y pérdida, y que no habría que intervenir para proteger especies. Por eso, la respuesta correcta es B."
  }


,
  {
    uid: "s1-lect-060",
    session: 1,
    block: 2,
    number: 60,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Vocabulario en contexto",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 60",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere la siguiente oración del texto:<br><br><em>"Es difícil, por no decir imposible, diseñar un ordenador que sea obedientemente útil y, al mismo tiempo, inmune a la infección".</em><br><br>En la oración anterior, la palabra "inmune" se podría reemplazar por`,
    options: [
      { letter: "A", text: "inatacable." },
      { letter: "B", text: "proclive." },
      { letter: "C", text: "invulnerable." },
      { letter: "D", text: "propenso." }
    ],
    correctAnswer: "C",
    explanation: "En el contexto, 'inmune' significa que no puede ser afectado o vulnerado por la infección. La palabra más cercana es 'invulnerable'. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-061",
    session: 1,
    block: 2,
    number: 61,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Interpretación de sentido local",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 61",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere el siguiente enunciado del texto:<br><br><em>"Simplemente, [los computadores] obedecen, como se supone que lo hacen los soldados".</em><br><br>Lo que el autor quiere decir con este enunciado es que los computadores`,
    options: [
      { letter: "A", text: "siempre están expuestos a los virus." },
      { letter: "B", text: "desconocen si una instrucción es correcta." },
      { letter: "C", text: "siguen las órdenes sin cuestionarlas." },
      { letter: "D", text: "son capaces de tomar decisiones." }
    ],
    correctAnswer: "C",
    explanation: "La comparación con los soldados resalta la obediencia automática de los computadores: ejecutan órdenes sin analizarlas ni cuestionarlas. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-062",
    session: 1,
    block: 2,
    number: 62,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Relación entre enunciados",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 62",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `Considere los siguientes enunciados del texto:<br><br>1. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores.<br><br>2. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos.<br><br>La relación entre los enunciados 1 y 2 puede describirse de la siguiente manera:`,
    options: [
      { letter: "A", text: "El enunciado 1 es una evidencia en contra del enunciado 2." },
      { letter: "B", text: "El enunciado 2 es una evidencia a favor del enunciado 1." },
      { letter: "C", text: "El enunciado 1 es una evidencia a favor del enunciado 2." },
      { letter: "D", text: "El enunciado 2 es una evidencia en contra del enunciado 1." }
    ],
    correctAnswer: "C",
    explanation: "El primer enunciado funciona como ejemplo concreto de la idea general expresada en el segundo: la obediencia de los computadores los hace vulnerables. Por eso, la respuesta correcta es C."
  }
,
  {
    uid: "s1-lect-063",
    session: 1,
    block: 2,
    number: 63,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Identificación de la idea global",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 63",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `¿Cuál es la pregunta principal que busca responder el texto?`,
    options: [
      { letter: "A", text: "¿Por qué los computadores pueden ser invulnerables a los virus?" },
      { letter: "B", text: "¿Cuál es el principal rasgo de los computadores y qué implicaciones tiene dicho rasgo?" },
      { letter: "C", text: "¿Cuál es la principal característica de los computadores y qué ventajas posee dicho rasgo?" },
      { letter: "D", text: "¿Por qué los computadores, a pesar de ser vulnerables, tienen la utilidad de detectar buenos y malos efectos?" }
    ],
    correctAnswer: "B",
    explanation: "El texto explica que el rasgo central de los computadores es su obediencia a las instrucciones, y desarrolla sus implicaciones: utilidad y vulnerabilidad. Por eso, la respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-064",
    session: 1,
    block: 2,
    number: 64,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 64",
    stem: "Responda de acuerdo con el texto sobre los computadores y su obediencia a las instrucciones.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading tech-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 60 A 64 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Los computadores hacen lo que se les manda. Servilmente obedecen cualquier instrucción dada en su propio lenguaje de programación. Así es como hacen cosas útiles como procesar textos y realizar operaciones en hojas de cálculo. Pero, como inevitable subproducto, son igualmente robóticos a la hora de obedecer instrucciones incorrectas. No tienen modo alguno de decir si una instrucción tendrá un buen efecto o uno malo.</p>
            <p>Simplemente, obedecen, como se supone que lo hacen los soldados. Es su incuestionable obediencia lo que hace que los computadores sean útiles, y exactamente eso mismo hace que sean inevitablemente vulnerables a la infección de virus y gusanos. Un programa maliciosamente diseñado que diga «cópiame y envíame a todas las direcciones que puedas encontrar en el disco duro» será simplemente obedecido y vuelto a obedecer por los demás computadores de la línea por la que se está enviando, en una expansión exponencial. Es difícil, por no decir imposible, diseñar un computador que sea obedientemente útil y, al mismo tiempo, inmune a la infección.</p>
            <p class="source-note">Tomado y adaptado de: Dawkins, R. (2007). <em>El espejismo de Dios.</em> P. 190. Madrid: Espasa Calpe.</p>
          </article>
`
      }
    ],
    prompt: `De acuerdo con la información dada en el texto, si su computador es infectado por un programa con las características descritas por el autor,`,
    options: [
      { letter: "A", text: "no podrá obedecer otro tipo de instrucciones dadas en el lenguaje de programación." },
      { letter: "B", text: "enviará el programa a todas las direcciones que encuentre en el disco duro." },
      { letter: "C", text: "no podrá realizar acciones útiles como procesar textos o realizar hojas de cálculo." },
      { letter: "D", text: "será incapaz de ser útil y, al mismo tiempo, invulnerable a diferentes virus." }
    ],
    correctAnswer: "B",
    explanation: "El programa descrito ordena copiarse y enviarse a todas las direcciones encontradas en el disco duro; según el texto, el computador obedecerá esa instrucción. Por eso, la respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-065",
    session: 1,
    block: 2,
    number: 65,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Inferencia a partir de información explícita",
    dificultad: "Básica",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 65",
    stem: "Responda de acuerdo con el fragmento de Frankenstein.",
    resources: [
      {
        type: "html",
        html: `

          <article class="reading-card prose-reading frankenstein-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 65 Y 66 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Con estos sentimientos, empecé la creación de un ser humano. Como la pequeñez de las partes constituía un gran obstáculo para la rapidez de mi trabajo, decidí, en contra de mi primera intención, hacer un ser de estatura gigantesca; es decir, de unos ocho pies de alto, y de una anchura proporcionada. Y tras adoptar esta decisión, y pasar meses recogiendo y ordenando material, emprendí mi trabajo.</p>
            <p>Nadie puede imaginar la diversidad de sentimientos que me empujaron a seguir, como un huracán, desde el primer entusiasmo de éxito. La vida y la muerte me parecían barreras ideales que yo sería el primero en romper, derramando un torrente de luz sobre nuestro mundo en tinieblas. Una nueva especie me bendeciría como su origen y creador; muchas naturalezas excelentes y dichosas me deberían su ser. Ningún padre podría reclamar la gratitud de sus hijos con tanto derecho como yo merecería la de ellos. Siguiendo con estas reflexiones, pensé que si podía infundir animación en la materia inerte, en el curso del tiempo (pues ahora resultaba imposible), podría renovar la vida allí donde la muerte había sometido el cuerpo aparentemente a la corrupción.</p>
            <p>Hoy me tiemblan las piernas y se me humedecen los ojos ante el recuerdo; pero entonces me empujaba un deseo irresistible y casi frenético; parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo.</p>
            <p>La sala de disección y el matadero me proporcionaron muchos de mis materiales; con frecuencia, mi naturaleza abominaba mi empresa mientras, impulsado por una ansiedad perpetuamente en aumento, mi trabajo se acercaba a su fin.</p>
            <p class="source-note">Tomado de: Shelley, Mary. (2018). <em>Frankenstein.</em> p. 74. Madrid: Alianza Editorial.</p>
          </article>
`
      }
    ],
    prompt: `El narrador decide crear un ser de estatura gigantesca porque`,
    options: [
      { letter: "A", text: "su intención era que aquel nuevo ser infundiera terror en quienes lo vieran." },
      { letter: "B", text: "hacer un ser pequeño le iba a tomar más tiempo que hacer uno gigante." },
      { letter: "C", text: "en la sala de disección y en el matadero solo había materiales de gran tamaño." },
      { letter: "D", text: "sentía un deseo irresistible por crear una criatura de esa dimensión." }
    ],
    correctAnswer: "B",
    explanation: "El narrador afirma que la pequeñez de las partes era un obstáculo para la rapidez de su trabajo; por eso decide crear un ser gigantesco. La respuesta correcta es B."
  }
,
  {
    uid: "s1-lect-066",
    session: 1,
    block: 2,
    number: 66,
    area: "Lectura Crítica",
    competencia: "Comprensión lectora",
    componente: "Interpretación de intención comunicativa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Lectura Crítica - Pregunta 66",
    stem: "Responda de acuerdo con el fragmento de Frankenstein.",
    resources: [
      {
        type: "html",
        html: `

          <article class="reading-card prose-reading frankenstein-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 65 Y 66 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Con estos sentimientos, empecé la creación de un ser humano. Como la pequeñez de las partes constituía un gran obstáculo para la rapidez de mi trabajo, decidí, en contra de mi primera intención, hacer un ser de estatura gigantesca; es decir, de unos ocho pies de alto, y de una anchura proporcionada. Y tras adoptar esta decisión, y pasar meses recogiendo y ordenando material, emprendí mi trabajo.</p>
            <p>Nadie puede imaginar la diversidad de sentimientos que me empujaron a seguir, como un huracán, desde el primer entusiasmo de éxito. La vida y la muerte me parecían barreras ideales que yo sería el primero en romper, derramando un torrente de luz sobre nuestro mundo en tinieblas. Una nueva especie me bendeciría como su origen y creador; muchas naturalezas excelentes y dichosas me deberían su ser. Ningún padre podría reclamar la gratitud de sus hijos con tanto derecho como yo merecería la de ellos. Siguiendo con estas reflexiones, pensé que si podía infundir animación en la materia inerte, en el curso del tiempo (pues ahora resultaba imposible), podría renovar la vida allí donde la muerte había sometido el cuerpo aparentemente a la corrupción.</p>
            <p>Hoy me tiemblan las piernas y se me humedecen los ojos ante el recuerdo; pero entonces me empujaba un deseo irresistible y casi frenético; parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo.</p>
            <p>La sala de disección y el matadero me proporcionaron muchos de mis materiales; con frecuencia, mi naturaleza abominaba mi empresa mientras, impulsado por una ansiedad perpetuamente en aumento, mi trabajo se acercaba a su fin.</p>
            <p class="source-note">Tomado de: Shelley, Mary. (2018). <em>Frankenstein.</em> p. 74. Madrid: Alianza Editorial.</p>
          </article>
`
      }
    ],
    prompt: `La intención del narrador cuando dice "parecía haber perdido por completo el alma y la sensibilidad salvo para este objetivo" es:`,
    options: [
      { letter: "A", text: "Hacer una afirmación acerca de la creación del nuevo ser y la manera en que lo hizo." },
      { letter: "B", text: "Manifestar una emoción con respecto a su actitud durante la creación del nuevo ser." },
      { letter: "C", text: "Dirigir una pregunta indirecta al lector sobre su opinión al respecto del nuevo ser." },
      { letter: "D", text: "Comprometerse con el lector a no volver a actuar de la manera en que lo hizo." }
    ],
    correctAnswer: "B",
    explanation: "La frase aparece en una valoración retrospectiva: el narrador recuerda con estremecimiento su obsesión y expresa una emoción frente a la actitud que tuvo durante la creación. La respuesta correcta es B."
  }



,
  {
    uid: "s1-soc-067",
    session: 1,
    block: 3,
    number: 67,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Historia política de Colombia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 67",
    stem: "A continuación, se presentan dos textos escritos por Antonio Nariño sobre la polémica entre centralistas y federalistas durante la independencia de la Nueva Granada. El primero fue escrito en 1811, cuando acababan de ocurrir los primeros gritos de independencia a lo largo de todo el reino. El segundo, mucho más tardío, se publicó en 1823, cuando las últimas acciones militares contra los españoles se estaban librando en lo que entonces era ya Colombia.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p><strong>1.</strong> "[...] el sistema de convertir nuestras provincias en estados soberanos para hacer la federación es una locura hija de la precipitación de nuestros juicios y de una ambición mal entendida. No es la extensión del terreno, no es la población, no son las riquezas ni las luces que forman la fuerza de un imperio por sí solas: la suma total de todas estas cosas forman su fuerza; y si nosotros en lugar de acumular nuestras luces, nuestras riquezas y nuestras fuerzas, las dividimos en otras tantas partes como tenemos de provincias, ¿cuál será el resultado?".</p>
            <p class="source-note">Tomado y adaptado de: Nariño, A. (1811). <em>La Bagatela N.º 5.</em> Imprenta Real de Don Bruno Espinosa de los Monteros.</p>
            <p><strong>2.</strong> "[...] el Gobierno federal es [...] el más adecuado para la libertad y el menos expuesto al abuso por el contrapeso que oponen las partes federadas. De aquí se deduce que, mientras tengamos sobre nosotros el Gobierno español, mientras este no reconozca nuestra independencia, lo que nos conviene es unidad de acción y el sistema centralista; pero que reconocida la independencia por la España, hallándonos sin peligros y con los elementos necesarios, la federación será la llama de la libertad".</p>
            <p class="source-note">Tomado y adaptado de: Nariño, A. (5 de marzo de 1823). <em>Los toros de Fucha.</em> Imprenta Real de Don Bruno Espinosa de los Monteros.</p>
          </article>
        `
      }
    ],
    prompt: "En el plazo de doce años, Antonio Nariño cambió su percepción sobre el sistema federalista: pasó de atacarlo en 1811 a defenderlo en 1823. ¿Qué razón explica el cambio de perspectiva del prócer de la independencia sobre este modelo político?",
    options: [
      { letter: "A", text: "Porque, para Nariño, el modelo centralista garantizaba la unión de fuerzas de todas las provincias en la guerra contra España, algo necesario en 1823." },
      { letter: "B", text: "Porque, para Nariño, el modelo federalista velaba por las libertades individuales, pero imponía límites en el ejercicio del poder de cada provincia federada." },
      { letter: "C", text: "Porque, para Nariño, el modelo centralista era adecuado para la Nueva Granada, ya que se asemejaba al modelo de administración que tenía la Corona española." },
      { letter: "D", text: "Porque, para Nariño, el modelo federalista era útil en países libres y, por tanto, lo rechaza en 1811, pero lo defiende en 1823 con la independencia consolidada." }
    ],
    correctAnswer: "D",
    explanation: "En el primer texto, Nariño critica la federación porque dividir las provincias debilitaba la unidad necesaria en medio de la guerra. En el segundo texto, plantea que, una vez reconocida la independencia y sin peligros, la federación puede ser favorable para la libertad. La respuesta correcta es D."
  }


,
  {
    uid: "s1-soc-068",
    session: 1,
    block: 3,
    number: 68,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Diversidad cultural y jurisdicción especial indígena",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 68",
    stem: "Las autoridades de un cabildo indígena prohibieron la caza del jaguar en su territorio, pues en su cosmovisión este animal tiene un valor espiritual y cumple un papel esencial para el equilibrio ecológico. Pedro, un campesino que no pertenece a la comunidad indígena, fue sorprendido cazando un jaguar en el territorio del cabildo, por lo que fue condenado por las autoridades indígenas a una multa para compensar a la comunidad por el daño causado. Pedro se opone a la condena porque no hace parte de la comunidad indígena y el jaguar atacaba con frecuencia el ganado de su propiedad.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Las autoridades de un cabildo indígena prohibieron la caza del jaguar en su territorio, pues en su cosmovisión este animal tiene un valor espiritual y cumple un papel esencial para el equilibrio ecológico.</p>
            <p>Pedro, un campesino que no pertenece a la comunidad indígena, fue sorprendido cazando un jaguar en el territorio del cabildo, por lo que fue condenado por las autoridades indígenas a una multa para compensar a la comunidad por el daño causado.</p>
            <p>Pedro se opone a la condena porque no hace parte de la comunidad indígena y el jaguar atacaba con frecuencia el ganado de su propiedad.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles dimensiones se encuentran en conflicto en la problemática presentada?",
    options: [
      { letter: "A", text: "La cultural y la ambiental, porque la cosmovisión del cabildo indígena respecto al jaguar se opone al interés de Pedro en el cuidado del medio ambiente." },
      { letter: "B", text: "La jurisdiccional y la cultural, porque al interés de la comunidad indígena de imponer una sanción se opone el hecho de que Pedro no pertenece a esa comunidad." },
      { letter: "C", text: "La ambiental y la religiosa, porque el interés del cabildo indígena en la protección del jaguar se opone a su cosmovisión respecto al valor espiritual de este animal." },
      { letter: "D", text: "La económica y la ambiental, porque el interés del cabildo indígena de imponer una sanción económica va en contra de la protección del jaguar en su territorio." }
    ],
    correctAnswer: "B",
    explanation: "El conflicto principal combina una dimensión jurisdiccional, porque las autoridades indígenas ejercen su facultad de sancionar dentro de su territorio, y una dimensión cultural, porque Pedro cuestiona esa autoridad al no pertenecer a la comunidad. La respuesta correcta es B."
  }



,
  {
    uid: "s1-soc-069",
    session: 1,
    block: 3,
    number: 69,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, libertades y responsabilidad social de la prensa",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 69",
    stem: "Un periodista ha estado divulgando notas de prensa con el fin de acusar de actos de corrupción a la alcaldesa de un municipio, sin haber verificado la credibilidad de las fuentes consultadas para elaborar los señalamientos. Ante el reclamo que le hizo la alcaldesa, el periodista argumentó que podía seguir publicando estas acusaciones porque en el país existe la libertad de prensa y él, como periodista, puede difundir todo lo que considere importante para la opinión pública, así no haya sido verificado.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un periodista ha estado divulgando notas de prensa con el fin de acusar de actos de corrupción a la alcaldesa de un municipio, sin haber verificado la credibilidad de las fuentes consultadas para elaborar los señalamientos.</p>
            <p>Ante el reclamo que le hizo la alcaldesa, el periodista argumentó que podía seguir publicando estas acusaciones porque en el país existe la libertad de prensa y él, como periodista, puede difundir todo lo que considere importante para la opinión pública, así no haya sido verificado.</p>
          </article>
        `
      }
    ],
    prompt: "De las siguientes opciones, ¿cuál representa un argumento que contradice lo señalado por el periodista con respecto a la libertad de prensa en el país?",
    options: [
      { letter: "A", text: "La libertad de prensa en el país protege a los periodistas cuando divulgan información de manera veraz e imparcial." },
      { letter: "B", text: "La libertad de expresión es un derecho constitucional que respalda la actividad periodística en el país sin restricción alguna." },
      { letter: "C", text: "La libertad de prensa sobre hechos políticos es una de las bases que sostiene la libertad y la democracia de cualquier país." },
      { letter: "D", text: "Existe persecución a los periodistas cuando las noticias que publican ellos son cuestionadas por actores políticos." }
    ],
    correctAnswer: "A",
    explanation: "El periodista interpreta la libertad de prensa como una autorización para publicar acusaciones no verificadas. La opción A contradice esa idea, porque señala que la libertad de prensa protege la divulgación de información veraz e imparcial. La respuesta correcta es A."
  }


,
  {
    uid: "s1-soc-070",
    session: 1,
    block: 3,
    number: 70,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones sociales, económicas y ambientales del desarrollo",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 70",
    stem: "Con relación a la construcción de la represa Gibe, un columnista escribió: \"La construcción de la represa Gibe puede convertirse en un evento trascendental para el continente africano. Se espera que esta represa sea la más grande de África y que funcione como una hidroeléctrica que genere grandes ingresos, al brindar empleo y llevar electricidad a muchas partes del continente. Sin embargo, para su construcción, es necesario hacer varias intervenciones en el río Omo, algo que alarma a algunas entidades, pues este río es uno de los más biodiversos del planeta y su intervención podría acabar con miles de animales y plantas nativas\".",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Con relación a la construcción de la represa Gibe, un columnista escribió:</p>
            <blockquote>
              <p>“La construcción de la represa Gibe puede convertirse en un evento trascendental para el continente africano. Se espera que esta represa sea la más grande de África y que funcione como una hidroeléctrica que genere grandes ingresos, al brindar empleo y llevar electricidad a muchas partes del continente. Sin embargo, para su construcción, es necesario hacer varias intervenciones en el río Omo, algo que alarma a algunas entidades, pues este río es uno de los más biodiversos del planeta y su intervención podría acabar con miles de animales y plantas nativas”.</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles de las siguientes dimensiones están presentes en la anterior descripción de la situación?",
    options: [
      { letter: "A", text: "La social y la cultural." },
      { letter: "B", text: "La económica y la social." },
      { letter: "C", text: "La cultural y la ambiental." },
      { letter: "D", text: "La ambiental y la económica." }
    ],
    correctAnswer: "D",
    explanation: "La situación menciona beneficios económicos, como la generación de ingresos, empleo y electricidad, y también efectos ambientales, como la intervención del río Omo y el riesgo para animales y plantas nativas. La respuesta correcta es D."
  }

  
,
  {
    uid: "s1-soc-071",
    session: 1,
    block: 3,
    number: 71,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Relaciones temporales entre hechos y discursos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 71",
    stem: "Los siguientes son reportes periodísticos sobre dos discursos diferentes pronunciados acerca de los atentados terroristas ocurridos en Francia, en 2015. Léalos detenidamente:",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Los siguientes son reportes periodísticos sobre dos discursos diferentes pronunciados acerca de los atentados terroristas ocurridos en Francia, en 2015. Léalos detenidamente:</p>
            <p><strong>Fragmento A.</strong> “Aunque el presidente francés dijo que el Gobierno ha hecho grandes avances aprobando nuevas leyes y reforzando la seguridad, de acuerdo con el Gobierno, el nivel de alerta sigue siendo alto [...] Igualmente, explicó que en el último año [...] se dictaron medidas contra medio centenar de extranjeros a fin de impedir que puedan entrar en territorio francés por sospechas terroristas”.</p>
            <p class="source-note">Tomado y adaptado de: http://www.lanacion.com.ar/1860111franciafrancoishollandecharliehebdoamenazaterrorista</p>
            <p><strong>Fragmento B.</strong> “[...] el presidente francés se dirige por segunda vez en 48 horas a la nación, para condenar los hechos, y llamar a la calma y la unidad sin fisuras. El miércoles calificó a las víctimas como héroes que habían muerto por defender los valores de la República y pidió que los franceses dejaran a un lado sus diferencias (nada puede dividirnos)”.</p>
            <p class="source-note">Tomado y adaptado de: http://www.rtve.es/noticias/20150109/franciaconvulsionadadelataquecharliehebdomarcharepublicana/1081424.shtml</p>
          </article>
        `
      }
    ],
    prompt: "A partir de la información contenida en los dos discursos, es correcto afirmar que se pronunció primero",
    options: [
      { letter: "A", text: "el fragmento A, porque promueve el caos y la confusión inmediata luego de los atentados; el B se refiere a un momento de calma y unidad que solo se logra después de un consenso nacional." },
      { letter: "B", text: "el fragmento B, porque este garantiza el cubrimiento inmediato de la noticia de los atentados; el A se refiere a un momento en el que ya se ha superado la crisis que se desató a raíz de los atentados." },
      { letter: "C", text: "el fragmento A, porque es una respuesta que hace un llamado a la prevención en contra de los extranjeros; el B habla sobre procesos a largo plazo, como fortalecer la sociedad a futuro." },
      { letter: "D", text: "el fragmento B porque es una respuesta inmediata que hace un llamado a la calma y la unidad; el A habla sobre procesos a largo plazo, como la aprobación de leyes y políticas de seguridad." }
    ],
    correctAnswer: "D",
    explanation: "El fragmento B se ubica más cerca del momento inmediato de los atentados porque habla de una segunda intervención en 48 horas, condena los hechos y llama a la calma y la unidad. El fragmento A se refiere a medidas posteriores y de más largo plazo, como nuevas leyes, refuerzo de seguridad y controles a extranjeros. Por eso la respuesta correcta es D."
  }

,
  {
    uid: "s1-soc-072",
    session: 1,
    block: 3,
    number: 72,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Actores, intereses y conflictos sociales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 72",
    stem: "La erradicación de cultivos ilícitos, como la coca, es una de las principales problemáticas que vive Colombia. Este flagelo ha generado un debate sobre la forma correcta de erradicar los cultivos: si se debe hacer de manera manual o a través de aspersión aérea, con químicos que eliminan las plantas. En esta problemática confluyen varios actores e intereses a la hora de buscar soluciones que satisfagan las necesidades del país, entre los cuales se encuentran los siguientes:",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La erradicación de cultivos ilícitos, como la coca, es una de las principales problemáticas que vive Colombia. Este flagelo ha generado un debate sobre la forma correcta de erradicar los cultivos: si se debe hacer de manera manual o a través de aspersión aérea, con químicos que eliminan las plantas.</p>
            <p>En esta problemática confluyen varios actores e intereses a la hora de buscar soluciones que satisfagan las necesidades del país, entre los cuales se encuentran los siguientes:</p>
            <p>Por un lado, está el Estado, que tiene como misión, bajo el mando de la fuerza pública, eliminar los cultivos para disminuir el número de hectáreas cultivadas y mejorar los índices nacionales de erradicación.</p>
            <p>Por otro lado, están los grupos armados organizados —GAO— que promueven la siembra de cultivos para que estos sean usados, posteriormente, en el narcotráfico y financiar sus actividades delictivas.</p>
            <p>Otro actor importante son los campesinos que han sido obligados por los GAO a cultivar coca, y a quienes no se contempla judicializar dentro de la política de erradicación manual.</p>
            <p>Adicionalmente, se encuentran las organizaciones, como las Naciones Unidas, que elaboran informes para mostrar el avance o retroceso de la siembra de cultivos ilícitos.</p>
            <p>Finalmente, existen algunos países, como Estados Unidos, que, a través de recursos internacionales, se encargan de financiar actividades que logren erradicar los cultivos que son usados para actividades ilegales.</p>
          </article>
        `
      }
    ],
    prompt: "Si se lleva a cabo la estrategia de erradicación manual de cultivos ilícitos, ¿entre quiénes es probable que se dé un conflicto?",
    options: [
      { letter: "A", text: "Los campesinos víctimas de los GAO y las Naciones Unidas." },
      { letter: "B", text: "Los Estados Unidos y las Naciones Unidas." },
      { letter: "C", text: "La fuerza pública y los campesinos víctimas de los GAO." },
      { letter: "D", text: "La fuerza pública y los grupos armados organizados." }
    ],
    correctAnswer: "D",
    explanation: "La estrategia de erradicación manual sería ejecutada por el Estado mediante la fuerza pública. El actor que tiene un interés directamente opuesto es el de los grupos armados organizados, porque promueven la siembra de coca para financiar actividades delictivas. Por eso, el conflicto más probable se daría entre la fuerza pública y los grupos armados organizados. La respuesta correcta es D."
  }
,
  {
    uid: "s1-soc-073",
    session: 1,
    block: 3,
    number: 73,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Participación ciudadana y control político",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 73",
    stem: "El clientelismo consiste en un arreglo de intercambios entre gobernantes y terceros, de manera que ambos pueden beneficiarse recíprocamente: los primeros, al recibir apoyo político, y los segundos, al recibir bienes y servicios o un tratamiento privilegiado o excepcional en ciertos asuntos.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>El clientelismo consiste en un arreglo de intercambios entre gobernantes y terceros, de manera que ambos pueden beneficiarse recíprocamente: los primeros, al recibir apoyo político, y los segundos, al recibir bienes y servicios o un tratamiento privilegiado o excepcional en ciertos asuntos.</p>
          </article>
        `
      }
    ],
    prompt: "Teniendo en cuenta esta definición, el clientelismo justifica la creación de entes de control a los gobernantes, porque",
    options: [
      { letter: "A", text: "es antiético que un gobernante o dirigente político busque beneficiarse electoralmente de un grupo de ciudadanos." },
      { letter: "B", text: "es inconveniente que un gobernante haga alianzas políticas con otros dirigentes para mantenerse en el poder." },
      { letter: "C", text: "es necesario evitar que los gobernantes usen su posición privilegiada para ser elegidos con favores, a cambio de votos." },
      { letter: "D", text: "es reprochable que los gobernantes adopten medidas populares para aumentar su aceptación entre los ciudadanos." }
    ],
    correctAnswer: "C",
    explanation: "El clientelismo implica un intercambio indebido de apoyo político por favores, bienes, servicios o tratamientos privilegiados. Los entes de control se justifican porque buscan impedir que quienes gobiernan utilicen su cargo para obtener votos mediante favores. Por eso la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-074",
    session: 1,
    block: 3,
    number: 74,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos, familia e inclusión social",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 74",
    stem: `En el 2011, la Corte Constitucional de Colombia estableció que las parejas conformadas por personas del mismo sexo sí constituyen una familia. Cinco años después, la misma entidad reconoció la validez del matrimonio igualitario para estas mismas parejas. Antes de eso, solo las parejas heterosexuales podían casarse legalmente, mientras que las homosexuales solo podían acceder a una figura contractual llamada "unión solemne", la cual otorgaba solo algunos de los derechos conferidos a los matrimonios. Con esto, la Corte Constitucional busca responder a los nuevos patrones en la conformación de las familias en el país y evitar que los derechos de cerca de cuatro millones de colombianos sigan siendo vulnerados.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En el 2011, la Corte Constitucional de Colombia estableció que las parejas conformadas por personas del mismo sexo sí constituyen una familia. Cinco años después, la misma entidad reconoció la validez del matrimonio igualitario para estas mismas parejas.</p>
            <p>Antes de eso, solo las parejas heterosexuales podían casarse legalmente, mientras que las homosexuales solo podían acceder a una figura contractual llamada "unión solemne", la cual otorgaba solo algunos de los derechos conferidos a los matrimonios.</p>
            <p>Con esto, la Corte Constitucional busca responder a los nuevos patrones en la conformación de las familias en el país y evitar que los derechos de cerca de cuatro millones de colombianos sigan siendo vulnerados.</p>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Rueda, M. (30 de abril de 2005). <em>¿Es fácil ser gay en Colombia?</em> Revista Semana. http://www.semana.com y Redacción Judicial (7 de abril de 2016). Corte Constitucional le da el “Sí” al matrimonio igualitario. <em>El Espectador</em>. http://www.elespectador.com</p>
          </article>
        `
      }
    ],
    prompt: "Con base en la información anterior, ¿cuál de las siguientes afirmaciones es una de las razones por las cuales se modificó el concepto legal de matrimonio y familia en Colombia?",
    options: [
      { letter: "A", text: "Para restringir los derechos de las familias católicas, ya que, al considerar todos los matrimonios como iguales, se reduce la dimensión sagrada del matrimonio." },
      { letter: "B", text: "Para privilegiar los derechos de los homosexuales, ya que estas personas ahora recibirán un trato preferencial por su orientación sexual." },
      { letter: "C", text: "Para facilitar la convivencia en una sociedad cambiante, ya que las normas deben adaptarse a las transformaciones sociales." },
      { letter: "D", text: "Para priorizar los valores de la sociedad, ya que estos son el centro de la vida en comunidad y no deberían modificarse." }
    ],
    correctAnswer: "C",
    explanation: "El texto indica que la Corte Constitucional modificó el reconocimiento legal de matrimonio y familia para responder a nuevos patrones familiares y evitar la vulneración de derechos. Esto muestra que las normas deben adaptarse a las transformaciones sociales. Por eso la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-075",
    session: 1,
    block: 3,
    number: 75,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Derechos colectivos, ambiente y regulación estatal",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 75",
    stem: "En un municipio, un grupo de mineros artesanales ha aumentado sus ingresos al encontrar un punto del río en el cual se puede extraer oro con la ayuda de mercurio. La comunidad del municipio aledaño se ha visto afectada por esta situación, porque el río se ha contaminado con los desechos tóxicos que genera la actividad minera y es la única fuente de agua que tienen los habitantes para el consumo e irrigación de cultivos. Ante esto, la alcaldesa del municipio considera necesario establecer una normatividad que regule este tipo de actividades.",
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En un municipio, un grupo de mineros artesanales ha aumentado sus ingresos al encontrar un punto del río en el cual se puede extraer oro con la ayuda de mercurio.</p>
            <p>La comunidad del municipio aledaño se ha visto afectada por esta situación, porque el río se ha contaminado con los desechos tóxicos que genera la actividad minera y es la única fuente de agua que tienen los habitantes para el consumo e irrigación de cultivos.</p>
            <p>Ante esto, la alcaldesa del municipio considera necesario establecer una normatividad que regule este tipo de actividades.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál es la razón que mejor justifica por qué debería establecerse allí una normatividad que regule las actividades de extracción minera en el municipio?",
    options: [
      { letter: "A", text: "Para que los mineros busquen más lugares de extracción de oro sin tener problemas con las autoridades." },
      { letter: "B", text: "Para garantizar los derechos a la salud y a un ambiente sano de los pobladores y el derecho de los mineros al trabajo." },
      { letter: "C", text: "Para que se pueda subsidiar la compra de agua para los pobladores, por medio de las ganancias que genera la explotación minera." },
      { letter: "D", text: "Para establecer periodos de alternancia en la extracción del oro, para que los mineros descansen y permitan que el agua no se contamine tanto." }
    ],
    correctAnswer: "B",
    explanation: "La situación presenta un conflicto entre la actividad económica de los mineros artesanales y los derechos de la comunidad afectada por la contaminación del río. Una normatividad se justifica porque permite regular la minería para proteger la salud, el acceso al agua y el ambiente sano de los pobladores, sin desconocer el derecho al trabajo de los mineros. Por eso la respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-076",
    session: 1,
    block: 3,
    number: 76,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Contexto histórico, ideologías políticas y análisis de fuentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 76",
    stem: `En la introducción al Manifiesto Comunista, Karl Marx y Friedrich Engels escribieron: "Un fantasma recorre Europa: el fantasma del comunismo. Todas las fuerzas de la vieja Europa se han unido en santa cruzada para acosar a ese fantasma [...] No hay un solo partido de oposición a quien los adversarios gobernantes no motejen de comunista [...] De este hecho, se desprenden dos consecuencias: la primera es que el comunismo se halla ya reconocido como una potencia por todas las potencias europeas. La segunda, que ya es hora de que los comunistas expresen a la luz del día y ante el mundo entero sus ideas, sus tendencias, sus aspiraciones, saliendo así al paso de esa leyenda del espectro comunista, con un manifiesto de su partido [...]".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En la introducción al <em>Manifiesto Comunista</em>, Karl Marx y Friedrich Engels escribieron:</p>
            <blockquote>
              <p>"Un fantasma recorre Europa: el fantasma del comunismo. Todas las fuerzas de la vieja Europa se han unido en santa cruzada para acosar a ese fantasma [...] No hay un solo partido de oposición a quien los adversarios gobernantes no motejen de comunista [...] De este hecho, se desprenden dos consecuencias: la primera es que el comunismo se halla ya reconocido como una potencia por todas las potencias europeas. La segunda, que ya es hora de que los comunistas expresen a la luz del día y ante el mundo entero sus ideas, sus tendencias, sus aspiraciones, saliendo así al paso de esa leyenda del espectro comunista, con un manifiesto de su partido [...]".</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Este texto fue escrito en el siglo XX?",
    options: [
      { letter: "A", text: "No, ya que fue escrito en el siglo XIX como respuesta a las injusticias cometidas en América por las potencias imperialistas de la vieja Europa." },
      { letter: "B", text: "Sí, porque el texto describe cómo el Partido Comunista empezó a obtener el poder en varias potencias europeas y a perseguir cualquier fuerza política opositora." },
      { letter: "C", text: "No, porque el comunismo solo tuvo relevancia después de la segunda mitad del siglo XX, durante el enfrentamiento entre la Unión Soviética y los países capitalistas en la Guerra Fría." },
      { letter: "D", text: "Sí, porque el contexto del escrito es la consolidación del comunismo en Europa como fuerza política y, por tanto, el rechazo del mismo por los regímenes gobernantes y sus aliados." }
    ],
    correctAnswer: "A",
    explanation: "El texto corresponde a una fuente del siglo XIX, no del siglo XX. La opción marcada como correcta es A, porque reconoce que el fragmento no fue escrito en el siglo XX."
  }

  ,
  {
    uid: "s1-soc-077",
    session: 1,
    block: 3,
    number: 77,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Ordenamiento territorial, desarrollo sostenible y planeación",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 77",
    stem: `En Colombia, se debe tener un Plan de Ordenamiento Territorial (POT) en cada uno de los municipios, para organizar y planear el desarrollo físico del territorio. "Un POT se define como el conjunto de objetivos, directrices, políticas, estrategias, metas, programas, actuaciones y normas adoptadas para orientar y administrar el desarrollo físico del territorio y la utilización del suelo. Señala, pues, los derroteros de las diferentes acciones urbanísticas posibles que pueden emprenderse. Las ciudades deben crecer ordenadamente, de manera tal que los recursos con que se cuenta para el desarrollo de la comunidad, se empleen eficientemente y de manera sostenible en el tiempo. El POT nos pone de presente que no todo está permitido y que lo que sí lo está, debe ser en función de la obtención del desarrollo más equitativo posible".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Colombia, se debe tener un Plan de Ordenamiento Territorial (POT) en cada uno de los municipios, para organizar y planear el desarrollo físico del territorio.</p>
            <blockquote>
              <p>"Un POT se define como el conjunto de objetivos, directrices, políticas, estrategias, metas, programas, actuaciones y normas adoptadas para orientar y administrar el desarrollo físico del territorio y la utilización del suelo. Señala, pues, los derroteros de las diferentes acciones urbanísticas posibles que pueden emprenderse. Las ciudades deben crecer ordenadamente, de manera tal que los recursos con que se cuenta para el desarrollo de la comunidad, se empleen eficientemente y de manera sostenible en el tiempo. El POT nos pone de presente que no todo está permitido y que lo que sí lo está, debe ser en función de la obtención del desarrollo más equitativo posible".</p>
            </blockquote>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Fenalco. (2013). <em>¿Qué es un Plan de Ordenamiento Territorial y para qué sirve?</em> http://fenalcobolivar.com/desarrollosectorial/queesunplandeordenamientoterritorialyparaquesirve1687</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de los siguientes conceptos se aplica en la anterior definición de un POT?",
    options: [
      { letter: "A", text: "Desarrollo equitativo y sustentable." },
      { letter: "B", text: "Capital político y social." },
      { letter: "C", text: "Participación política." },
      { letter: "D", text: "Crecimiento económico." }
    ],
    correctAnswer: "A",
    explanation: "La definición del POT indica que las ciudades deben crecer de forma ordenada, usando los recursos de manera eficiente y sostenible en el tiempo, y buscando el desarrollo más equitativo posible. Por eso el concepto que mejor se aplica es desarrollo equitativo y sustentable. La respuesta correcta es A."
  }




  ,
  {
    uid: "s1-soc-078",
    session: 1,
    block: 3,
    number: 78,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Medio ambiente, fuentes de energía y sostenibilidad",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 78",
    stem: `En España, se han instalado miles de generadores de energía eólica (aquellos que producen energía a partir del viento) que, actualmente, ocupan grandes extensiones de tierra. A diferencia de los combustibles fósiles o de las centrales nucleares, los generadores de energía eólica son fuentes de energía limpia y amigable con el medio ambiente. En este momento, se está analizando la posibilidad de instalar este tipo de generadores en una región desértica en el norte de Colombia, para satisfacer las necesidades energéticas de la población del lugar. Esta población produce la mayor parte de la energía que consume a partir de la quema de madera, lo que genera problemas de contaminación y deforestación.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En España, se han instalado miles de generadores de energía eólica (aquellos que producen energía a partir del viento) que, actualmente, ocupan grandes extensiones de tierra.</p>
            <p>A diferencia de los combustibles fósiles o de las centrales nucleares, los generadores de energía eólica son fuentes de energía limpia y amigable con el medio ambiente.</p>
            <p>En este momento, se está analizando la posibilidad de instalar este tipo de generadores en una región desértica en el norte de Colombia, para satisfacer las necesidades energéticas de la población del lugar.</p>
            <p>Esta población produce la mayor parte de la energía que consume a partir de la quema de madera, lo que genera problemas de contaminación y deforestación.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes condiciones NO sería necesaria para implementar esta medida, de energía eólica, en dicha región del territorio colombiano?",
    options: [
      { letter: "A", text: "Que sea posible convencer a la población de los efectos negativos de la quema de madera para que abandone dicha práctica." },
      { letter: "B", text: "Que la población no se vea incomodada por el impacto que tendría la instalación de los generadores en el paisaje." },
      { letter: "C", text: "Que sea posible reforestar las selvas de donde se ha extraído la madera que la población ha utilizado tradicionalmente para generar energía." },
      { letter: "D", text: "Que la capacidad de producción de los generadores eólicos que se instalarían sea suficiente para satisfacer las necesidades energéticas de la población." }
    ],
    correctAnswer: "C",
    explanation: "Para implementar la medida de energía eólica serían necesarias condiciones como que los generadores produzcan suficiente energía, que la población acepte el cambio y que pueda abandonar progresivamente la quema de madera. Reforestar las selvas afectadas sería una acción ambiental valiosa, pero no es una condición indispensable para instalar los generadores eólicos en la región. Por eso la respuesta correcta es C."
  }



  ,
  {
    uid: "s1-soc-079",
    session: 1,
    block: 3,
    number: 79,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Migración, discriminación, convivencia ciudadana y discursos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 79",
    stem: `Un político de una ciudad del país se encuentra muy preocupado por el aumento en la inseguridad que se ha venido presentando en los últimos años. Recientemente, afirma el político, el número de robos y atracos a mano armada se ha intensificado y esta problemática se debería, en gran parte, a la llegada de personas de un país vecino, que migran por la crisis económica y social que viven al interior de su país. En palabras del político: "Ya se han registrado muchos casos de personas atracadas por estos ciudadanos inmigrantes. Recomiendo a la población tener mucho cuidado al momento de relacionarse en la calle con cualquier persona que parezca tener un acento del país vecino. También, hago un llamado a la comunidad para que continúe denunciando los casos de atraco que cometen las personas de ese país".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un político de una ciudad del país se encuentra muy preocupado por el aumento en la inseguridad que se ha venido presentando en los últimos años.</p>
            <p>Recientemente, afirma el político, el número de robos y atracos a mano armada se ha intensificado y esta problemática se debería, en gran parte, a la llegada de personas de un país vecino, que migran por la crisis económica y social que viven al interior de su país.</p>
            <p>En palabras del político:</p>
            <blockquote>
              <p>"Ya se han registrado muchos casos de personas atracadas por estos ciudadanos inmigrantes. Recomiendo a la población tener mucho cuidado al momento de relacionarse en la calle con cualquier persona que parezca tener un acento del país vecino. También, hago un llamado a la comunidad para que continúe denunciando los casos de atraco que cometen las personas de ese país".</p>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "Ahora bien, en esta situación, las palabras pronunciadas por el político",
    options: [
      { letter: "A", text: "promueven el rechazo hacia los inmigrantes del país vecino porque la gente va a tratarlos con sospecha, sean o no atracadores." },
      { letter: "B", text: "ignoran que el origen de la inseguridad puede deberse a las necesidades económicas que atraviesan los inmigrantes." },
      { letter: "C", text: "desconocen que la comunidad no está obligada a participar ni a denunciar los atracos que se cometen en la ciudad." },
      { letter: "D", text: "motivan a que las personas de un país que se encuentran en situaciones de pobreza, decidan irse a vivir a otro país." }
    ],
    correctAnswer: "A",
    explanation: "Las palabras del político generalizan la responsabilidad de los atracos hacia las personas inmigrantes del país vecino y recomiendan sospechar de quienes parezcan tener ese origen. Esto puede promover rechazo y discriminación hacia todos los inmigrantes, independientemente de que hayan cometido o no delitos. Por eso, la respuesta correcta es A."
  }


  ,
  {
    uid: "s1-soc-080",
    session: 1,
    block: 3,
    number: 80,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Democracia representativa, oposición política y garantías electorales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 80",
    stem: `Un líder político afirmó lo siguiente durante una entrevista: "Volveremos a participar en las elecciones cuando: 1. El calendario electoral vuelva a ser estable y no haya intervención por parte del presidente. 2. Aumenten los controles por parte de entes independientes en los puestos de votación. 3. Los ciudadanos no sufran represalias por expresar su preferencia electoral. 4. Se les permita a los ciudadanos crear y pertenecer a partidos políticos diferentes al de Gobierno. 5. Las decisiones tomadas en las urnas se respeten y los candidatos elegidos puedan posesionarse".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p><strong>Un líder político afirmó lo siguiente durante una entrevista:</strong></p>
            <blockquote>
              <p>"Volveremos a participar en las elecciones cuando:</p>
              <ol class="numbered-list">
                <li>El calendario electoral vuelva a ser estable y no haya intervención por parte del presidente.</li>
                <li>Aumenten los controles por parte de entes independientes en los puestos de votación.</li>
                <li>Los ciudadanos no sufran represalias por expresar su preferencia electoral.</li>
                <li>Se les permita a los ciudadanos crear y pertenecer a partidos políticos diferentes al de Gobierno.</li>
                <li>Las decisiones tomadas en las urnas se respeten y los candidatos elegidos puedan posesionarse".</li>
              </ol>
            </blockquote>
          </article>
        `
      }
    ],
    prompt: "¿Cuál es el propósito de las medidas propuestas?",
    options: [
      { letter: "A", text: "Establecer límites a la democracia, modificando el calendario electoral y concentrando el poder en los partidos políticos existentes." },
      { letter: "B", text: "Fortalecer la democracia, priorizando la gobernabilidad del partido político en el poder y creando un consenso nacional, al disminuir la oposición." },
      { letter: "C", text: "Establecer límites a la democracia, controlando el número de partidos que pueden postular candidatos y debilitando la figura presidencial." },
      { letter: "D", text: "Fortalecer la democracia representativa, garantizando condiciones para ejercer la oposición y disminuyendo los límites al ejercicio electoral." }
    ],
    correctAnswer: "D",
    explanation: "Las medidas propuestas buscan garantizar elecciones libres, participación de partidos distintos al gobierno, ausencia de represalias, control independiente y respeto por los resultados. Todo ello fortalece la democracia representativa y las condiciones para ejercer la oposición. Por eso, la respuesta correcta es D."
  }



  ,
  {
    uid: "s1-soc-081",
    session: 1,
    block: 3,
    number: 81,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Conflictos socioambientales, Amazonía y pueblos indígenas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 81",
    stem: `Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas. Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos. La amenaza para estos pueblos aún sigue latente; por ejemplo, en el último año varias comunidades indígenas se han visto seriamente afectadas por cuenta de contagios de gripa y sarampión, producto de encuentros imprevistos con leñadores de grupos madereros ilegales en el Amazonas.

Para tomar una decisión informada sobre este tema, el Gobierno ha pedido la colaboración, tanto de su Ministerio de Minas y Energía, como de los académicos estudiosos de la cultura y la cosmovisión de estos pueblos indígenas del Amazonas. Los académicos argumentan que, teniendo en cuenta la gran vulnerabilidad que estos pueblos antiguos presentan frente a las enfermedades más comunes de Occidente, es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados y protegiendo el gran patrimonio cultural, espiritual y natural que ellos poseen. Por otra parte, desde el Ministerio de Minas y Energía se argumenta que la solución está en que se reúnan los gremios minero, petrolero y maderero con las comunidades indígenas del Amazonas, incluyendo a las comunidades indígenas en aislamiento voluntario, para así poder negociar qué partes de la selva amazónica pueden ser explotadas legalmente para beneficio del desarrollo económico del país.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 81 Y 82 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas.</p>
            <p>Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos. La amenaza para estos pueblos aún sigue latente; por ejemplo, en el último año varias comunidades indígenas se han visto seriamente afectadas por cuenta de contagios de gripa y sarampión, producto de encuentros imprevistos con leñadores de grupos madereros ilegales en el Amazonas.</p>
            <p>Para tomar una decisión informada sobre este tema, el Gobierno ha pedido la colaboración, tanto de su Ministerio de Minas y Energía, como de los académicos estudiosos de la cultura y la cosmovisión de estos pueblos indígenas del Amazonas.</p>
            <p>Los académicos argumentan que, teniendo en cuenta la gran vulnerabilidad que estos pueblos antiguos presentan frente a las enfermedades más comunes de Occidente, es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados y protegiendo el gran patrimonio cultural, espiritual y natural que ellos poseen.</p>
            <p>Por otra parte, desde el Ministerio de Minas y Energía se argumenta que la solución está en que se reúnan los gremios minero, petrolero y maderero con las comunidades indígenas del Amazonas, incluyendo a las comunidades indígenas en aislamiento voluntario, para así poder negociar qué partes de la selva amazónica pueden ser explotadas legalmente para beneficio del desarrollo económico del país.</p>
            <p class="source-note"><strong>Tomado y adaptado de:</strong> Calle, H. (2 de noviembre de 2017). Una política de buen vecino para los pueblos aislados colombianos. <em>El Espectador.</em> https://www.elespectador.com/noticias/medio-ambiente/una-politica-de-buen-vecino-para-los-pueblos-aislados-colombianos-articulo-721038</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con los intereses involucrados en la situación descrita, ¿entre quiénes sería más probable que se genere un conflicto?",
    options: [
      { letter: "A", text: "Entre los pueblos indígenas y los académicos." },
      { letter: "B", text: "Entre el gremio minero y los pueblos indígenas." },
      { letter: "C", text: "Entre el Ministerio de Minas y Energía y el gremio petrolero." },
      { letter: "D", text: "Entre los grupos madereros ilegales y el gremio petrolero." }
    ],
    correctAnswer: "B",
    explanation: "El conflicto más probable se daría entre quienes buscan intervenir o explotar la selva amazónica, como los gremios minero y petrolero, y los pueblos indígenas que piden protección de sus territorios y respeto por su aislamiento voluntario. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-soc-082",
    session: 1,
    block: 3,
    number: 82,
    area: "Sociales y Ciudadanas",
    competencia: "Interpretación y análisis de perspectivas",
    componente: "Decisiones públicas, participación y pueblos indígenas en aislamiento voluntario",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 82",
    stem: `Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas. Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading compact-reading">
            <div class="reading-instruction">RESPONDA LAS PREGUNTAS 81 Y 82 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN</div>
            <p>Representantes de los gremios minero y petrolero han enviado un comunicado al Gobierno con la intención de obtener los permisos necesarios para intervenir la selva amazónica. Estos gremios argumentan que esta intervención les permitirá mejorar la competitividad de este sector del mercado y generar empleos para las comunidades de la región del Amazonas.</p>
            <p>Por otra parte, los líderes de algunos pueblos indígenas del Amazonas llevan varios meses pidiendo la ayuda del Gobierno para proteger los territorios de sus "hermanos aislados", pueblos indígenas que han decidido voluntariamente aislarse en las selvas huyendo de la esclavitud, la violencia y las enfermedades que la civilización occidental ha traído consigo durante los últimos cinco siglos.</p>
            <p>Los académicos argumentan que es necesario crear estructuras legales que protejan los territorios en donde podrían habitar los pueblos indígenas en aislamiento voluntario, respetando su autodeterminación a no ser contactados. Desde el Ministerio de Minas y Energía se propone reunir a los gremios minero, petrolero y maderero con las comunidades indígenas, incluyendo a las comunidades en aislamiento voluntario, para negociar qué partes de la selva amazónica pueden ser explotadas legalmente.</p>
          </article>
        `
      }
    ],
    prompt: "En relación con la propuesta planteada por el Ministerio de Minas y Energía, ¿cuál de las siguientes opciones describe una posible reacción o respuesta que NO se tuvo en cuenta en dicha propuesta?",
    options: [
      { letter: "A", text: "Que los gremios petroleros y mineros solo quieran beneficiarse de la extracción legal de la mayor cantidad de recursos del Amazonas." },
      { letter: "B", text: "Que los académicos no tengan en cuenta los beneficios que conlleva el modelo extractivo legal que busca el desarrollo económico del país." },
      { letter: "C", text: "Que los pueblos indígenas aislados voluntariamente no acepten entablar ningún tipo de relación con la sociedad occidental." },
      { letter: "D", text: "Que los grupos madereros ilegales no tengan las vías para poder negociar la explotación legal de los bosques amazónicos." }
    ],
    correctAnswer: "C",
    explanation: "La propuesta del Ministerio supone que todas las comunidades indígenas, incluso las que viven en aislamiento voluntario, podrían reunirse y negociar con los gremios. Sin embargo, no considera que esos pueblos hayan decidido no establecer contacto con la sociedad occidental. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-083",
    session: 1,
    block: 3,
    number: 83,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones económica, cultural y social de los conflictos rurales",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 83",
    stem: `Un grupo de campesinos productores de papa se ha visto afectado por la entrada en vigencia de un tratado de libre comercio que ha permitido el ingreso al país de alimentos extranjeros, que son más económicos, incluyendo la papa. La situación se ha complicado tanto para ellos, que sus ingresos se han reducido considerablemente y se ha puesto en riesgo su permanencia como agricultores. Esto afecta aspectos esenciales de su vida, dado que muchas de sus tradiciones y elementos culturales están relacionados con el cultivo de la tierra. Los campesinos mencionan que los políticos prometieron, en sus campañas, que los tratados no los afectarían, pues sus cultivos y productos serían protegidos.

Ante esta situación, deciden rescatar una antigua tradición: los mercados campesinos, donde pueden vender sus productos sin intermediarios y a precios más bajos. Con esto se busca mejorar la calidad de vida de los productores, que más personas accedan a alimentos de alta calidad y que sus productos compitan en mejores condiciones frente a los productos extranjeros. Ahora bien, se busca ampliar este tipo de mercados a todo el país, pues la medida ha sido altamente beneficiosa para los cultivadores de papa, para los consumidores y para la tradición, pues se rescatan prácticas olvidadas.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Un grupo de campesinos productores de papa se ha visto afectado por la entrada en vigencia de un tratado de libre comercio que ha permitido el ingreso al país de alimentos extranjeros, que son más económicos, incluyendo la papa.</p>
            <p>La situación se ha complicado tanto para ellos, que sus ingresos se han reducido considerablemente y se ha puesto en riesgo su permanencia como agricultores. Esto afecta aspectos esenciales de su vida, dado que muchas de sus tradiciones y elementos culturales están relacionados con el cultivo de la tierra.</p>
            <p>Los campesinos mencionan que los políticos prometieron, en sus campañas, que los tratados no los afectarían, pues sus cultivos y productos serían protegidos.</p>
            <p>Ante esta situación, deciden rescatar una antigua tradición: los mercados campesinos, donde pueden vender sus productos sin intermediarios y a precios más bajos.</p>
            <p>Con esto se busca mejorar la calidad de vida de los productores, que más personas accedan a alimentos de alta calidad y que sus productos compitan en mejores condiciones frente a los productos extranjeros.</p>
            <p>Ahora bien, se busca ampliar este tipo de mercados a todo el país, pues la medida ha sido altamente beneficiosa para los cultivadores de papa, para los consumidores y para la tradición, pues se rescatan prácticas olvidadas.</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuáles de las siguientes dimensiones se privilegiaron en la solución propuesta por los campesinos?",
    options: [
      { letter: "A", text: "Social y política." },
      { letter: "B", text: "Cultural y social." },
      { letter: "C", text: "Económica y cultural." },
      { letter: "D", text: "Política y comercial." }
    ],
    correctAnswer: "C",
    explanation: "La solución propuesta privilegia la dimensión económica, porque busca mejorar los ingresos de los campesinos y permitir que sus productos compitan en mejores condiciones; y la dimensión cultural, porque rescata la tradición de los mercados campesinos y prácticas vinculadas al cultivo de la tierra. Por eso, la respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-084",
    session: 1,
    block: 3,
    number: 84,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Dimensiones económica, social y ambiental de proyectos públicos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 84",
    stem: `Para llevar agua a varios municipios, el gobernador de un departamento propone la extensión del sistema de acueducto con presupuesto del Gobierno nacional. Después de varios estudios, un equipo de ingenieros entrega el diseño del proyecto.

Este diseño contempla el trazado que tendrá el acueducto, el presupuesto general que se requiere para construirlo, el plan para proteger la flora y la fauna de la región, y la reubicación temporal de algunas familias que viven donde se llevarán a cabo las obras. Ahora bien, cuando el gobernador pretende dar inicio al proyecto, el Gobierno nacional le comunica que, si se considera el diseño entregado por los ingenieros, no habrá dinero suficiente para ejecutar la obra.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Para llevar agua a varios municipios, el gobernador de un departamento propone la extensión del sistema de acueducto con presupuesto del Gobierno nacional. Después de varios estudios, un equipo de ingenieros entrega el diseño del proyecto.</p>
            <p>Este diseño contempla el trazado que tendrá el acueducto, el presupuesto general que se requiere para construirlo, el plan para proteger la flora y la fauna de la región, y la reubicación temporal de algunas familias que viven donde se llevarán a cabo las obras.</p>
            <p>Ahora bien, cuando el gobernador pretende dar inicio al proyecto, el Gobierno nacional le comunica que, si se considera el diseño entregado por los ingenieros, no habrá dinero suficiente para ejecutar la obra.</p>
          </article>
        `
      }
    ],
    prompt: "¿Qué aspecto descrito anteriormente obstaculiza el desarrollo del acueducto?",
    options: [
      { letter: "A", text: "El aspecto social, pues las familias que viven en la zona de la obra no podrán ser reubicadas permanentemente." },
      { letter: "B", text: "El aspecto económico, pues los requerimientos de diseño de la obra no se ajustan al presupuesto del Gobierno." },
      { letter: "C", text: "El aspecto ambiental, pues el diseño no especifica qué sucederá con la flora y la fauna presente en la zona." },
      { letter: "D", text: "El aspecto logístico, pues los ingenieros no especifican el trazado definitivo del acueducto." }
    ],
    correctAnswer: "B",
    explanation: "El obstáculo señalado en el caso es la falta de dinero suficiente para ejecutar la obra si se mantiene el diseño presentado. Por tanto, el problema corresponde al aspecto económico, porque los requerimientos del proyecto no se ajustan al presupuesto disponible. La respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-085",
    session: 1,
    block: 3,
    number: 85,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Acuerdos de paz, transición a la vida civil y funciones de las Fuerzas Armadas",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 85",
    stem: `Como resultado del acuerdo de paz firmado por un Gobierno y un grupo armado al margen de la ley, se establecieron zonas veredales transitorias de normalización (ZVTN), las cuales consisten en locaciones rurales donde se concentran los militantes del grupo armado para iniciar su transición a la vida civil. En estas zonas, el ejército del país debe custodiar a los miembros del grupo armado, en lugar de combatirlo.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Como resultado del acuerdo de paz firmado por un Gobierno y un grupo armado al margen de la ley, se establecieron zonas veredales transitorias de normalización (ZVTN), las cuales consisten en locaciones rurales donde se concentran los militantes del grupo armado para iniciar su transición a la vida civil.</p>
            <p>En estas zonas, el ejército del país debe custodiar a los miembros del grupo armado, en lugar de combatirlo.</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con lo expuesto, ¿por qué es posible que se dé esta situación?",
    options: [
      { letter: "A", text: "Porque el Gobierno nacional quiere que el grupo armado conviva con el Ejército, para que en el futuro haga parte de él." },
      { letter: "B", text: "Porque el Gobierno nacional ha dado un giro hacia el socialismo y ha decidido poner a su Ejército al servicio del grupo armado." },
      { letter: "C", text: "Porque el grupo armado ahora controla las ZVTN y tiene miembros del Ejército a su disposición." },
      { letter: "D", text: "Porque la función de las Fuerzas Armadas se adecuó al nuevo contexto sociopolítico del país." }
    ],
    correctAnswer: "D",
    explanation: "La situación se explica porque, después del acuerdo de paz, el papel de las Fuerzas Armadas cambia frente al grupo armado: ya no se centra en combatirlo, sino en custodiar el proceso de transición a la vida civil dentro de las ZVTN. Por eso, la respuesta correcta es D."
  }



  ,
  {
    uid: "s1-soc-086",
    session: 1,
    block: 3,
    number: 86,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Cambio climático, intereses políticos y confiabilidad de fuentes",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 86",
    stem: `En Estados Unidos existe un debate sobre el cambio climático, definido como variaciones del clima atribuidas directa o indirectamente a la actividad humana, que alteran la composición de la atmósfera mundial y que se suman a la variabilidad natural del clima observada durante periodos de tiempo comparables. Este debate ha llevado a que algunos Gobiernos se resistan a suscribir acuerdos internacionales que comprometan a los Estados a reducir la emisión de gases. El ejemplo más reciente fue el retiro de los Estados Unidos del Acuerdo de París. Esta situación ha generado que grupos ambientalistas protesten e insistan en que el desarrollo económico no puede seguir poniendo en peligro la existencia misma del planeta.

Al respecto, el presidente de un país, escéptico del cambio climático, escribió en su red social de internet las siguientes dos frases:

1. "Por el cambio climático que deberíamos estar preocupados es el provocado por las armas nucleares que están en las manos de líderes locos o incompetentes".
2. "Hace frío afuera. ¿Dónde demonios está el cambio climático?"`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Estados Unidos existe un debate sobre el cambio climático, definido como variaciones del clima atribuidas directa o indirectamente a la actividad humana, que alteran la composición de la atmósfera mundial y que se suman a la variabilidad natural del clima observada durante periodos de tiempo comparables.</p>
            <p>Este debate ha llevado a que algunos Gobiernos se resistan a suscribir acuerdos internacionales que comprometan a los Estados a reducir la emisión de gases. El ejemplo más reciente fue el retiro de los Estados Unidos del Acuerdo de París.</p>
            <p>Esta situación ha generado que grupos ambientalistas protesten e insistan en que el desarrollo económico no puede seguir poniendo en peligro la existencia misma del planeta.</p>
            <p>Al respecto, el presidente de un país, escéptico del cambio climático, escribió en su red social de internet las siguientes dos frases:</p>
            <ol class="numbered-text-list">
              <li>"Por el cambio climático que deberíamos estar preocupados es el provocado por las armas nucleares que están en las manos de líderes locos o incompetentes".</li>
              <li>"Hace frío afuera. ¿Dónde demonios está el cambio climático?"</li>
            </ol>
            <p class="source-note">Tomado y adaptado de: http://www.minambiente.gov.co/index.php/cambio-climatico y de http://www.elfinanciero.com.mx/</p>
          </article>
        `
      }
    ],
    prompt: "A partir de la información anterior, ¿resultan confiables las afirmaciones del presidente en su red social acerca del cambio climático?",
    options: [
      { letter: "A", text: "Sí, porque, como presidente, tiene acceso a información precisa sobre los aspectos relevantes del planeta." },
      { letter: "B", text: "No, porque, como presidente, tiene intereses en que el país que gobierna siga siendo competitivo en la economía mundial." },
      { letter: "C", text: "No, porque, al ser un político, los temas de las ciencias naturales le son ajenos a sus conocimientos de la vida diaria." },
      { letter: "D", text: "Sí, porque, al ser difundido en una red social con tantos seguidores, lo expresado tiene un impacto a nivel de la economía internacional." }
    ],
    correctAnswer: "B",
    explanation: "Las afirmaciones no resultan confiables porque provienen de una autoridad política que puede tener intereses económicos y políticos vinculados con la competitividad del país y con la resistencia a compromisos internacionales de reducción de emisiones. Además, sus frases no se apoyan en evidencia científica. Por eso, la respuesta correcta es B."
  }



  ,
  {
    uid: "s1-soc-087",
    session: 1,
    block: 3,
    number: 87,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Teoría de la dependencia y relaciones centro-periferia",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 87",
    stem: `La teoría de la dependencia argumenta que la pobreza que existe en los países del sur se debe a condiciones históricas que han estructurado el mercado global de tal manera que favorece a los países del norte y mantiene a los países del sur en un estado constante de pobreza. Es así como, desde sus inicios, los países del sur han servido como proveedores de materia prima para los países del norte y a cambio, han sido receptores de aquellos productos terminados que ya han cumplido su ciclo en los mercados del norte. De esta manera, se crea un vínculo de dependencia, en el que las economías del sur dependen de la voluntad de compra de materias primas por parte de los países del norte.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La teoría de la dependencia argumenta que la pobreza que existe en los países del sur se debe a condiciones históricas que han estructurado el mercado global de tal manera que favorece a los países del norte y mantiene a los países del sur en un estado constante de pobreza.</p>
            <p>Es así como, desde sus inicios, los países del sur han servido como proveedores de materia prima para los países del norte y a cambio, han sido receptores de aquellos productos terminados que ya han cumplido su ciclo en los mercados del norte.</p>
            <p>De esta manera, se crea un vínculo de dependencia, en el que las economías del sur dependen de la voluntad de compra de materias primas por parte de los países del norte.</p>
            <p class="source-note">Tomado y adaptado de: Subgerencia Cultural del Banco de la República. (2015). <em>Teoría de la dependencia</em>. http://www.banrepcultural.org/blaavirtual/ayudadetareas/politica/teoria_de_la_dependencia</p>
          </article>
        `
      }
    ],
    prompt: "¿Cuál de las siguientes situaciones se ajusta al modelo teórico descrito?",
    options: [
      { letter: "A", text: "Un país latinoamericano desarrolla tecnología industrial que le permite procesar materias primas para generar productos con valor añadido, que se venden dentro del mismo país." },
      { letter: "B", text: "Una compañía multinacional adquiere, en un país pobre, materias primas a bajo costo, las procesa e incrementa su valor añadido para, luego, vender sus productos en el país pobre." },
      { letter: "C", text: "Un país desarrollado de Europa genera riquezas gracias a sus adelantos tecnológicos y, luego, impulsa el avance de la industria de países en desarrollo, porque comparte con ellos esta nueva tecnología." },
      { letter: "D", text: "Una organización internacional regula las relaciones comerciales entre países, para asegurarse de que los países que venden materias primas no cobren de más a los países que más las necesitan." }
    ],
    correctAnswer: "B",
    explanation: "La situación que mejor se ajusta a la teoría de la dependencia es aquella en la que un país pobre suministra materias primas de bajo costo y luego recibe productos con mayor valor añadido, lo que reproduce la dependencia económica frente a actores externos. Por eso, la respuesta correcta es B."
  }

  ,
  {
    uid: "s1-soc-088",
    session: 1,
    block: 3,
    number: 88,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Desarrollo sostenible",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 88",
    stem: `La Organización de las Naciones Unidas (ONU) define el "desarrollo sostenible" como

"[...] la satisfacción de las necesidades de la generación presente sin comprometer la capacidad de las generaciones futuras para satisfacer sus propias necesidades". El desarrollo sostenible ha emergido como el principio rector para el desarrollo mundial a largo plazo. Consta de tres pilares: el desarrollo sostenible trata de lograr, de manera equilibrada, el desarrollo económico, el desarrollo social y la protección del medio ambiente. [A partir de lo anterior] la Conferencia de las Naciones Unidas sobre el Desarrollo Sostenible, o Cumbre de la Tierra de Río 20, se centrará en dos temas: 1) la economía verde en el contexto del desarrollo sostenible y la erradicación de la pobreza y 2) el marco institucional para el desarrollo sostenible.` ,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>La Organización de las Naciones Unidas (ONU) define el <strong>"desarrollo sostenible"</strong> como</p>
            <blockquote>
              <p>"[...] la satisfacción de las necesidades de la generación presente sin comprometer la capacidad de las generaciones futuras para satisfacer sus propias necesidades". El desarrollo sostenible ha emergido como el principio rector para el desarrollo mundial a largo plazo. Consta de tres pilares: el desarrollo sostenible trata de lograr, de manera equilibrada, el desarrollo económico, el desarrollo social y la protección del medio ambiente. [A partir de lo anterior] la Conferencia de las Naciones Unidas sobre el Desarrollo Sostenible, o Cumbre de la Tierra de Río 20, se centrará en dos temas: 1) la economía verde en el contexto del desarrollo sostenible y la erradicación de la pobreza y 2) el marco institucional para el desarrollo sostenible.</p>
            </blockquote>
            <p class="source-note">Tomado y adaptado de: Asamblea General de las Naciones Unidas (s. f.). <em>Desarrollo Sostenible</em>. http://www.un.org/es/ga/president/65/issues/sustdev.shtml</p>
          </article>
        `
      }
    ],
    prompt: "De acuerdo con la anterior definición, una política económica es sostenible cuando",
    options: [
      { letter: "A", text: "privilegia la industrialización para generar empleo por encima de la necesidad de disminuir los gases de efecto invernadero." },
      { letter: "B", text: "le da la misma importancia a la generación de riqueza y a la explotación ilimitada de los recursos naturales." },
      { letter: "C", text: "le da la misma importancia a la generación de riqueza para las personas y a la protección del medio ambiente." },
      { letter: "D", text: "prohíbe totalmente aprovechar económicamente los bienes y servicios ecosistémicos de lagos, ríos y bosques para lograr su conservación." }
    ],
    correctAnswer: "C",
    explanation: "La definición de desarrollo sostenible plantea un equilibrio entre el desarrollo económico, el desarrollo social y la protección ambiental. Por eso, una política económica sostenible debe promover la generación de riqueza sin descuidar la protección del medio ambiente. La respuesta correcta es C."
  }


  ,
  {
    uid: "s1-soc-089",
    session: 1,
    block: 3,
    number: 89,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "División del trabajo y mercado",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 89",
    stem: `Para Adam Smith, economista y filósofo escocés del siglo XVIII, la división del trabajo aumenta la productividad, pues cada persona se enfoca en producir aquello en lo que es mejor y, luego, lo intercambia de forma mercantil por los otros bienes y servicios que necesita. Si cada uno dependiera del autosuministro, tendría menos posibilidades de fabricar la misma cantidad de bienes que le es posible conseguir en el intercambio.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>Para Adam Smith, economista y filósofo escocés del siglo XVIII, la división del trabajo aumenta la productividad, pues cada persona se enfoca en producir aquello en lo que es mejor y, luego, lo intercambia de forma mercantil por los otros bienes y servicios que necesita.</p>
            <p>Si cada uno dependiera del autosuministro, tendría menos posibilidades de fabricar la misma cantidad de bienes que le es posible conseguir en el intercambio.</p>
          </article>
        `
      }
    ],
    prompt: "Según el concepto de división del trabajo, para Smith, el mercado",
    options: [
      { letter: "A", text: "genera injusticias sociales al separar a las personas en clases sociales según sus ingresos." },
      { letter: "B", text: "lleva la economía al fracaso, pues no hay coordinación entre productores y consumidores." },
      { letter: "C", text: "hace que las personas se vuelvan más ignorantes, pues no saben cómo producir ciertos bienes." },
      { letter: "D", text: "es una forma eficiente de repartir los bienes que se han producido mediante la especialización." }
    ],
    correctAnswer: "D",
    explanation: "El texto plantea que la división del trabajo aumenta la productividad y que el intercambio permite conseguir más bienes y servicios que el autosuministro. Por eso, para Smith, el mercado funciona como un mecanismo eficiente de distribución de los bienes producidos mediante la especialización. La respuesta correcta es D."
  }


  ,
  {
    uid: "s1-soc-090",
    session: 1,
    block: 3,
    number: 90,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Ecosistemas, especies invasoras e investigación pública",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 90",
    stem: `El Gobierno está investigando el impacto que tiene el pez león en los ecosistemas marítimos colombianos y las formas de combatirlo. El pez león, especie originaria de Asia, se ha convertido en una amenaza o "plaga" para los ecosistemas marítimos y se ha extendido a las costas del Caribe colombiano. Según un artículo de prensa, este pez genera dos tipos de peligro: "Por un lado, es una amenaza para el hombre, que puede sufrir accidentes al pisar o tocar sus nocivas púas venenosas, y, por otro, es una amenaza para las especies nativas, pues se alimenta de peces jóvenes que sirven de alimentación para el hombre, como el pargo y el mero".`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>El Gobierno está investigando el impacto que tiene el <strong>pez león</strong> en los ecosistemas marítimos colombianos y las formas de combatirlo.</p>
            <p>El pez león, especie originaria de Asia, se ha convertido en una amenaza o <strong>"plaga"</strong> para los ecosistemas marítimos y se ha extendido a las costas del Caribe colombiano.</p>
            <p>Según un artículo de prensa, este pez genera dos tipos de peligro: <em>"Por un lado, es una amenaza para el hombre, que puede sufrir accidentes al pisar o tocar sus nocivas púas venenosas, y, por otro, es una amenaza para las especies nativas, pues se alimenta de peces jóvenes que sirven de alimentación para el hombre, como el pargo y el mero".</em></p>
            <p class="source-note">Tomado y adaptado de: Agencia de Noticias de la Universidad Nacional. (15 de diciembre de 2009). <em>Pez león ataca en el Caribe colombiano</em>. Revista Semana. https://www.semana.com/-vida-moderna/ciencia/articulo/pez-leon-ataca-caribe-colombiano/111041-3/</p>
          </article>
        `
      }
    ],
    prompt: "¿Para cuál de los siguientes objetivos de investigación del Gobierno sería útil la anterior información?",
    options: [
      { letter: "A", text: "Establecer el impacto económico que provocan las plagas en la fauna y flora del Caribe colombiano." },
      { letter: "B", text: "Promover la caza del pez león para fortalecer la economía de las zonas pesqueras en el Caribe." },
      { letter: "C", text: "Determinar los factores que han provocado una disminución de la fauna en algunas costas colombianas." },
      { letter: "D", text: "Establecer la cantidad de especies nativas existentes antes de la aparición del pez león." }
    ],
    correctAnswer: "C",
    explanation: "La información del texto muestra que el pez león amenaza a las especies nativas porque se alimenta de peces jóvenes. Por ello, resulta útil para investigar factores que pueden haber provocado disminución de fauna en algunas costas colombianas. La respuesta correcta es C."
  }



  ,
  {
    uid: "s1-soc-091",
    session: 1,
    block: 3,
    number: 91,
    area: "Sociales y Ciudadanas",
    competencia: "Pensamiento social",
    componente: "Participación ciudadana y mecanismos democráticos",
    dificultad: "Media",
    type: "single-choice",
    scored: true,
    sourceLabel: "Sección 1 - Sociales y Ciudadanas - Pregunta 91",
    stem: `En Colombia, una importante firma encuestadora reveló que, desde hace cuatro años, la corrupción es percibida por la ciudadanía como uno de los problemas más graves que afecta al país. En la versión más reciente de la encuesta aplicada, se muestra que el 84 % de los encuestados piensa que el problema está empeorando. Al respecto, un grupo de jóvenes decide promover el aumento de las penas para los delitos de corrupción y fortalecer a las entidades de control como la Procuraduría General de la Nación y la Contraloría General de la República.

Sin embargo, al buscar apoyo para promover su ley, los jóvenes se dan cuenta de que en todos los partidos políticos hay escándalos de corrupción, por lo que reciben poco apoyo para su iniciativa. Ante esta situación, los jóvenes deciden promover un referendo aprobatorio de iniciativa ciudadana.`,
    resources: [
      {
        type: "html",
        html: `
          <article class="reading-card prose-reading sociales-reading">
            <div class="reading-instruction">SOCIALES Y CIUDADANAS</div>
            <p>En Colombia, una importante firma encuestadora reveló que, desde hace cuatro años, la corrupción es percibida por la ciudadanía como uno de los problemas más graves que afecta al país. En la versión más reciente de la encuesta aplicada, se muestra que el <strong>84 %</strong> de los encuestados piensa que el problema está empeorando.</p>
            <p>Al respecto, un grupo de jóvenes decide promover el aumento de las penas para los delitos de corrupción y fortalecer a las entidades de control como la Procuraduría General de la Nación y la Contraloría General de la República.</p>
            <p>Sin embargo, al buscar apoyo para promover su ley, los jóvenes se dan cuenta de que en todos los partidos políticos hay escándalos de corrupción, por lo que reciben poco apoyo para su iniciativa. Ante esta situación, los jóvenes deciden promover un <strong>referendo aprobatorio de iniciativa ciudadana</strong>.</p>
            <p class="source-note">Tomado y adaptado de: Ávila, R. (4 de octubre de 2020). <em>La corrupción en Colombia: un mal más grave que el coronavirus</em>. Portafolio. https://www.portafolio.co/economia/la-corrupcion-en-colombia-un-mal-mas-grave-que-el-coronavirus-545299</p>
          </article>
        `
      }
    ],
    prompt: "En esta situación, y teniendo en cuenta la Constitución Política de Colombia, ¿pueden los jóvenes continuar con su propuesta de referendo?",
    options: [
      { letter: "A", text: "No, pues solo pueden proponer leyes de la República los integrantes del Congreso de la República y del Gobierno nacional." },
      { letter: "B", text: "No, pues solo pueden pronunciarse sobre temas políticos los expertos y los representantes elegidos popularmente." },
      { letter: "C", text: "Sí, pues en Colombia existen los referendos como mecanismos para que los ciudadanos propongan cambios normativos de manera directa." },
      { letter: "D", text: "Sí, pues en Colombia existen los referendos para que cada una de las decisiones públicas en el país sea consultada a la ciudadanía." }
    ],
    correctAnswer: "C",
    explanation: "El referendo es un mecanismo de participación ciudadana que permite a la ciudadanía intervenir directamente en decisiones normativas. En el caso presentado, los jóvenes pueden continuar con una propuesta de referendo de iniciativa ciudadana para promover cambios frente a la corrupción. La respuesta correcta es C."
  }


];
