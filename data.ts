
import { Intervention } from './types';

export const interventions: Intervention[] = [
  { 
    id: "gt-1954",
    country: "Guatemala", 
    years: [1954, 1960, 1966, 1967, 1968, 1969, 1970, 1982], 
    type: 'operation', 
    description: "Operación PBSUCCESS y campañas de contrainsurgencia.",
    expandedDescription: "1954: Derrocamiento de Árbenz. 1960-70s: Bombardeos sistemáticos en zonas rurales y apoyo a 'escuadrones de la muerte' bajo asesoría de la CIA, resultando en un genocidio de poblaciones indígenas.",
    coordinates: [15.78, -90.23] 
  },
  { 
    id: "br-1964",
    country: "Brasil", 
    years: [1964, 1968, 1971], 
    type: 'coup', 
    description: "Operación Brother Sam y apoyo a la dictadura militar.",
    expandedDescription: "Instauración y sostenimiento de una dictadura de 21 años. EE.UU. proveyó apoyo naval y financiamiento para estabilizar el régimen tras el golpe contra Goulart.",
    coordinates: [-14.23, -51.92] 
  },
  { 
    id: "rd-1965",
    country: "República Dominicana", 
    years: [1961, 1965, 1966], 
    type: 'operation', 
    description: "Operación Power Pack e intervención post-Trujillo.",
    expandedDescription: "Invasión de 42,000 marines en 1965 para aplastar la revolución constitucionalista. Anteriormente, apoyo logístico para la eliminación de Trujillo en 1961.",
    coordinates: [18.73, -70.16] 
  },
  { 
    id: "uy-1973",
    country: "Uruguay", 
    years: [1969, 1973], 
    type: 'coup', 
    description: "Plan Cóndor y asesoría en represión.",
    expandedDescription: "Asesoramiento de la CIA a las fuerzas de seguridad en métodos de tortura y desaparición forzada para el control de la disidencia política.",
    coordinates: [-32.52, -55.76] 
  },
  { 
    id: "cl-1973",
    country: "Chile", 
    years: [1970, 1971, 1972, 1973], 
    type: 'coup', 
    description: "Intervención de la CIA y dictadura de Pinochet.",
    expandedDescription: "Plan de desestabilización económica y política que culminó en el bombardeo de La Moneda. Posterior apoyo total a la DINA y el Plan Cóndor.",
    coordinates: [-35.67, -71.54] 
  },
  { 
    id: "ar-76",
    country: "Argentina", 
    years: [1976, 1977, 1978, 2024, 2025], 
    type: 'coup', 
    description: "Guerra Sucia y presiones soberanas contemporáneas.",
    expandedDescription: "Apoyo explícito de Kissinger a la Junta Militar. En la actualidad, presiones diplomáticas para el control de recursos energéticos y litio.",
    coordinates: [-38.41, -63.61] 
  },
  { 
    id: "ni-81",
    country: "Nicaragua", 
    years: [1912, 1926, 1933, 1981, 1986, 1990], 
    type: 'operation', 
    description: "Guerra de los 'Contras' y ocupaciones históricas.",
    expandedDescription: "Diferentes periodos de ocupación de marines a inicios de siglo y la guerra paramilitar de los 80 financiada ilegalmente por la administración Reagan.",
    coordinates: [12.86, -85.20] 
  },
  { 
    id: "gr-83",
    country: "Granada", 
    years: [1983], 
    type: 'operation', 
    description: "Operación Furia Urgente.",
    expandedDescription: "Invasión militar total para derrocar al gobierno socialista de Hudson Austin tras el asesinato de Maurice Bishop.",
    coordinates: [12.11, -61.67] 
  },
  { 
    id: "pa-89",
    country: "Panamá", 
    years: [1903, 1918, 1964, 1989], 
    type: 'operation', 
    description: "Invasión 'Causa Justa' y control del Canal.",
    expandedDescription: "1989: Bombardeo masivo de zonas civiles para capturar a Noriega. Históricamente, múltiples intervenciones para asegurar el enclave colonial del Canal.",
    coordinates: [8.53, -80.78] 
  },
  { 
    id: "ht-91",
    country: "Haití", 
    years: [1915, 1934, 1991, 1994, 2004, 2024], 
    type: 'operation', 
    description: "Ocupaciones y golpes contra Aristide.",
    expandedDescription: "Sucesión de invasiones para mantener el control geopolítico y depositar gobiernos afines a los intereses de las corporaciones estadounidenses.",
    coordinates: [18.97, -72.28] 
  },
  { 
    id: "ve-02",
    country: "Venezuela", 
    years: [2002, 2013, 2017, 2019, 2020, 2025], 
    type: 'coup', 
    description: "Guerra económica y ciberataques.",
    expandedDescription: "Intentos constantes de cambio de régimen mediante bloqueos financieros, sabotaje a la red eléctrica y apoyo a figuras políticas paralelas.",
    coordinates: [6.42, -66.58] 
  },
  { 
    id: "hn-09",
    country: "Honduras", 
    years: [1911, 1912, 1924, 2009], 
    type: 'coup', 
    description: "Golpe contra Zelaya y 'República Bananera'.",
    expandedDescription: "Apoyo logístico al golpe de 2009. Históricamente, intervenciones militares para proteger los intereses de la United Fruit Company.",
    coordinates: [15.19, -86.24] 
  },
  { 
    id: "bo-19",
    country: "Bolivia", 
    years: [1971, 2019], 
    type: 'coup', 
    description: "Golpe contra Morales y dictadura de Banzer.",
    expandedDescription: "2019: Uso de la OEA para deslegitimar elecciones y forzar la renuncia de Evo Morales. 1971: Apoyo al golpe del General Banzer.",
    coordinates: [-16.29, -63.58] 
  },
  { 
    id: "sv-80",
    country: "El Salvador", 
    years: [1932, 1980, 1981, 1982, 1983, 1984, 1989], 
    type: 'operation', 
    description: "Financiamiento de escuadrones de la muerte.",
    expandedDescription: "Miles de millones en ayuda militar para sostener un gobierno responsable de masacres como la de El Mozote durante la guerra civil.",
    coordinates: [13.79, -88.89] 
  },
  { 
    id: "py-54",
    country: "Paraguay", 
    years: [1954, 2012], 
    type: 'coup', 
    description: "Apoyo a Stroessner y golpe parlamentario contra Lugo.",
    expandedDescription: "Sostenimiento de la dictadura más larga de Sudamérica y participación en el 'golpe suave' de 2012.",
    coordinates: [-23.44, -58.44] 
  },
  { 
    id: "de-45",
    country: "Alemania", 
    years: [1945, 1948], 
    type: 'operation', 
    description: "Bombardeos de Dresde y Operación Paperclip.",
    expandedDescription: "Bombardeos masivos de ciudades alemanas y posterior reclutamiento secreto de científicos nazis para el complejo militar industrial de EE.UU.",
    coordinates: [51.16, 10.45] 
  },
  { 
    id: "gr-47",
    country: "Grecia", 
    years: [1947, 1948, 1949, 1967, 1973], 
    type: 'operation', 
    description: "Doctrina Truman y Golpe de los Coroneles.",
    expandedDescription: "Intervención masiva en la guerra civil y apoyo a la dictadura militar que torturó a miles de ciudadanos griegos.",
    coordinates: [39.07, 21.82] 
  },
  { 
    id: "tr-80",
    country: "Turquía", 
    years: [1960, 1971, 1980], 
    type: 'coup', 
    description: "Apoyo a los sucesivos golpes militares del Kemalist.",
    expandedDescription: "Intervenciones para mantener a Turquía como bastión de la OTAN, ignorando sistemáticamente violaciones de derechos humanos.",
    coordinates: [38.96, 35.24] 
  },
  { 
    id: "pl-81",
    country: "Polonia", 
    years: [1981, 1982], 
    type: 'operation', 
    description: "Operaciones psicológicas y apoyo a Solidaridad.",
    expandedDescription: "Financiamiento encubierto masivo para desestabilizar el bloque soviético desde el interior.",
    coordinates: [51.91, 19.14] 
  },
  { 
    id: "yu-99",
    country: "Yugoslavia", 
    years: [1999], 
    type: 'operation', 
    description: "Bombardeos de la OTAN.",
    expandedDescription: "Campaña de bombardeos de 78 días que fragmentó el país y causó miles de víctimas civiles.",
    coordinates: [44.01, 21.00] 
  },
  { 
    id: "ua-14",
    country: "Ucrania", 
    years: [2004, 2014, 2022, 2024], 
    type: 'coup', 
    description: "Revolución Naranja y EuroMaidán.",
    expandedDescription: "Intervención directa en cambios de gobierno para alejar al país de la órbita rusa y expandir la influencia de la OTAN.",
    coordinates: [50.45, 30.52] 
  },
  { 
    id: "jp-1945",
    country: "Japón", 
    years: [1945, 1946], 
    type: 'operation', 
    description: "Bombas atómicas y ocupación militar.",
    expandedDescription: "Uso de armas de destrucción masiva contra Hiroshima y Nagasaki.",
    coordinates: [36.20, 138.25] 
  },
  { 
    id: "ir-53",
    country: "Irán", 
    years: [1953, 1979, 1980, 1988, 2020, 2025], 
    type: 'coup', 
    description: "Operación Ajax y guerra asimétrica.",
    expandedDescription: "Derrocamiento de Mossadegh, apoyo al Sha, derribo de avión civil y asesinatos selectivos de generales.",
    coordinates: [32.42, 53.68] 
  },
  { 
    id: "vn-63",
    country: "Vietnam", 
    years: [1945, 1954, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973], 
    type: 'operation', 
    description: "Guerra de Vietnam y bombardeos masivos.",
    expandedDescription: "Uso sistemático de Napalm y Agente Naranja sobre población civil y ecosistemas.",
    coordinates: [14.05, 108.27] 
  },
  { 
    id: "la-64",
    country: "Laos", 
    years: [1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973], 
    type: 'operation', 
    description: "Guerra Secreta.",
    expandedDescription: "Dos millones de toneladas de bombas lanzadas sobre un país que no estaba oficialmente en guerra.",
    coordinates: [19.85, 102.49] 
  },
  { 
    id: "kh-69",
    country: "Camboya", 
    years: [1969, 1970, 1971, 1972, 1973], 
    type: 'operation', 
    description: "Operación Menú y bombardeos secretos.",
    expandedDescription: "Campaña aérea secreta ordenada por Nixon que pavimentó el camino al ascenso de Pol Pot.",
    coordinates: [12.56, 104.99] 
  },
  { 
    id: "af-79",
    country: "Afganistán", 
    years: [1979, 1980, 1998, 2001, 2002, 2003, 2005, 2010, 2021, 2025], 
    type: 'operation', 
    description: "Operación Ciclón y ocupación de 20 años.",
    expandedDescription: "Financiamiento de extremistas seguido de una invasión total que terminó en un estado fallido.",
    coordinates: [33.93, 67.71] 
  },
  { 
    id: "iq-63",
    country: "Irak", 
    years: [1963, 1991, 1992, 1993, 1996, 1998, 2003, 2004, 2005, 2014, 2025], 
    type: 'operation', 
    description: "Bombardeos constantes e invasiones ilegales.",
    expandedDescription: "Desde el apoyo al golpe del Baaz hasta la invasión de 2003 basada en pruebas falsas.",
    coordinates: [33.22, 43.67] 
  },
  { 
    id: "cu-61",
    country: "Cuba", 
    years: [1898, 1906, 1912, 1917, 1933, 1961, 1962, 2024], 
    type: 'operation', 
    description: "Bahía de Cochinos y bloqueo permanente.",
    expandedDescription: "Intentos de invasión militar y sabotajes constantes para asfixiar la revolución cubana.",
    coordinates: [23.13, -82.38] 
  },
  { 
    id: "mx-14",
    country: "México", 
    years: [1846, 1847, 1914, 1917], 
    type: 'operation', 
    description: "Guerra de Intervención y ocupación de Veracruz.",
    expandedDescription: "Robo de más de la mitad del territorio nacional y ocupaciones militares durante la revolución.",
    coordinates: [19.17, -96.13] 
  },
  { 
    id: "ec-63",
    country: "Ecuador", 
    years: [1963, 2000, 2010], 
    type: 'coup', 
    description: "Golpes militares y bases extranjeras.",
    expandedDescription: "Derrocamiento de gobiernos que se oponían a las políticas económicas de Washington.",
    coordinates: [-1.83, -78.18] 
  },
  { 
    id: "ly-86",
    country: "Libia", 
    years: [1981, 1986, 1989, 2011, 2015, 2019], 
    type: 'operation', 
    description: "Bombardeos de la OTAN y ataques selectivos.",
    expandedDescription: "Destrucción de la infraestructura estatal libia resultando en una guerra civil perpetua.",
    coordinates: [31.22, 16.51] 
  },
  { 
    id: "ao-75",
    country: "Angola", 
    years: [1975, 1976, 1986, 1991], 
    type: 'operation', 
    description: "Apoyo a la UNITA y guerra civil.",
    expandedDescription: "Financiamiento de grupos armados para frenar la influencia de movimientos anticoloniales.",
    coordinates: [-11.20, 17.87] 
  },
  { 
    id: "ru-18",
    country: "Rusia", 
    years: [1918, 1919, 1920, 1991, 2024], 
    type: 'operation', 
    description: "Intervención tras la Revolución Rusa y asedio moderno.",
    expandedDescription: "Expedición militar para apoyar al bando blanco y políticas de cerco contemporáneas.",
    coordinates: [64.53, 40.54] 
  },
  { 
    id: "pr-37",
    country: "Puerto Rico", 
    years: [1898, 1937, 1950, 1954], 
    type: 'operation', 
    description: "Masacre de Ponce y bombardeo de Jayuya.",
    expandedDescription: "Represión violenta de los movimientos de independencia en la colonia caribeña.",
    coordinates: [18.22, -66.59] 
  },
  { 
    id: "ne-23",
    country: "Níger", 
    years: [2023, 2024], 
    type: 'coup', 
    description: "Inestabilidad por bases de drones.",
    expandedDescription: "Presiones para mantener instalaciones militares estratégicas tras cambios de gobierno.",
    coordinates: [17.60, 8.08] 
  },
  { 
    id: "ti-51",
    country: "Tíbet", 
    years: [1951, 1956, 1957, 1958, 1959, 1960], 
    type: 'operation', 
    description: "Apoyo armado a la insurgencia tibetana.",
    expandedDescription: "Entrenamiento de guerrillas por la CIA para desestabilizar el control chino en la región.",
    coordinates: [31.70, 86.85] 
  },
  { 
    id: "ss-24",
    country: "Sudán del Sur", 
    years: [2011, 2014, 2024], 
    type: 'operation', 
    description: "Intervenciones tácticas por recursos.",
    expandedDescription: "Control de enclaves energéticos mediante la manipulación de conflictos internos.",
    coordinates: [6.87, 31.30] 
  },
  { 
    id: "ns-2022",
    country: "Nord Stream", 
    years: [2022], 
    type: 'operation', 
    description: "Sabotaje a gasoductos europeos.",
    expandedDescription: "Ataque submarino contra infraestructura civil energética crítica para Europa.",
    coordinates: [55.35, 15.55] 
  },
  { 
    id: "pk-07",
    country: "Pakistán", 
    years: [1958, 1977, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015], 
    type: 'operation', 
    description: "Guerra de drones y golpes militares.",
    expandedDescription: "Ataques constantes en zonas tribales causando cientos de víctimas civiles colaterales.",
    coordinates: [30.33, 71.38] 
  },
  { 
    id: "gy-64",
    country: "Guyana", 
    years: [1953, 1964], 
    type: 'coup', 
    description: "Operaciones para deponer a Cheddi Jagan.",
    expandedDescription: "Sabotaje y huelgas financiadas para evitar un gobierno socialista en la región.",
    coordinates: [6.80, -58.15] 
  },
  {
    id: "lb-58",
    country: "Líbano",
    years: [1958, 1982, 1983, 1984, 2006],
    type: "operation",
    description: "Intervenciones de los Marines y bombardeos navales.",
    expandedDescription: "Presencia militar para influir en el equilibrio de poder en el Levante.",
    coordinates: [33.85, 35.86]
  },
  {
    id: "cd-60",
    country: "Congo (RDC)",
    years: [1960, 1961, 1964, 1965, 1997],
    type: "coup",
    description: "Asesinato de Lumumba y apoyo a Mobutu.",
    expandedDescription: "Eliminación del líder independentista para asegurar el control de recursos minerales estratégicos.",
    coordinates: [-4.03, 21.75]
  },
  {
    id: "sy-49",
    country: "Siria",
    years: [1949, 1956, 1957, 2011, 2014, 2015, 2016, 2017, 2018, 2019, 2025],
    type: "operation",
    description: "Guerra por delegación y ataques directos.",
    expandedDescription: "Apoyo a grupos armados y bombardeos directos contra objetivos estatales y civiles.",
    coordinates: [34.80, 38.99]
  },
  {
    id: "ps-2023",
    country: "Palestina (Gaza)",
    years: [1948, 1967, 1973, 2008, 2012, 2014, 2021, 2023, 2024, 2025],
    type: 'operation',
    description: "Apoyo militar masivo y bombardeos conjuntos.",
    expandedDescription: "Suministro de armamento y cobertura diplomática para la destrucción sistemática del territorio.",
    coordinates: [31.35, 34.30]
  },
  {
    id: "eg-52",
    country: "Egipto",
    years: [1952, 1956, 1967, 2011, 2013],
    type: 'coup',
    description: "Intervenciones para el control del Canal de Suez.",
    expandedDescription: "Apoyo y posterior presión a regímenes militares según conveniencia geopolítica.",
    coordinates: [26.82, 30.80]
  },
  {
    id: "gh-66",
    country: "Ghana",
    years: [1966],
    type: 'coup',
    description: "Golpe contra Nkrumah.",
    expandedDescription: "Operación encubierta para eliminar el liderazgo del panafricanismo.",
    coordinates: [7.94, -1.02]
  },
  {
    id: "sd-98",
    country: "Sudán",
    years: [1998, 2019, 2024],
    type: 'operation',
    description: "Bombardeo de fábrica farmacéutica.",
    expandedDescription: "Ataque con misiles contra Al-Shifa bajo falsas acusaciones de armas químicas.",
    coordinates: [15.60, 32.53]
  },
  {
    id: "so-93",
    country: "Somalia",
    years: [1992, 1993, 1994, 2007, 2008, 2010, 2025],
    type: 'operation',
    description: "Intervenciones militares fallidas y drones.",
    expandedDescription: "Guerra permanente en el Cuerno de África con graves consecuencias humanitarias.",
    coordinates: [2.04, 45.34]
  },
  {
    id: "ye-15",
    country: "Yemen",
    years: [2002, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2024, 2025],
    type: 'operation',
    description: "Guerra asimétrica y apoyo a coalición.",
    expandedDescription: "Participación en la creación de una de las peores crisis humanitarias modernas.",
    coordinates: [15.36, 44.19]
  },
  {
    id: "id-58",
    country: "Indonesia",
    years: [1958, 1965, 1966],
    type: 'coup',
    description: "Masacres anticomunistas y golpe contra Sukarno.",
    expandedDescription: "EE.UU. proporcionó listas de objetivos para la masacre de más de 500,000 personas en 1965.",
    coordinates: [-0.78, 113.92]
  },
  {
    id: "ph-1899",
    country: "Filipinas",
    years: [1899, 1900, 1901, 1902, 1946, 1972],
    type: 'operation',
    description: "Guerra Filipino-Americana y apoyo a Marcos.",
    expandedDescription: "Guerra de conquista colonial a inicios de siglo y apoyo a la dictadura militar de Ferdinand Marcos.",
    coordinates: [12.87, 121.77]
  },
  {
    id: "it-48",
    country: "Italia",
    years: [1948, 1970],
    type: 'coup',
    description: "Operación Gladio e interferencia electoral.",
    expandedDescription: "Financiamiento clandestino y redes 'stay-behind' para evitar gobiernos de izquierda.",
    coordinates: [41.87, 12.56]
  },
  {
    id: "kr-50",
    country: "Corea",
    years: [1945, 1950, 1951, 1952, 1953],
    type: 'operation',
    description: "Guerra de Corea y bombardeos de saturación.",
    expandedDescription: "Destrucción de casi toda la infraestructura industrial del norte mediante bombardeos masivos.",
    coordinates: [35.90, 127.76]
  },
  {
    id: "th-60",
    country: "Tailandia",
    years: [1960, 1973, 1976],
    type: 'coup',
    description: "Apoyo a dictaduras anticomunistas.",
    expandedDescription: "Uso del territorio como base logística para la guerra en Indochina.",
    coordinates: [15.87, 100.99]
  },
  {
    id: "be-61",
    country: "Bélgica",
    years: [1961],
    type: 'coup',
    description: "Interferencia en el Congo Belga.",
    expandedDescription: "Coordinación con servicios belgas para eliminar líderes africanos independentistas.",
    coordinates: [50.50, 4.46]
  },
  {
    id: "fr-50",
    country: "Francia",
    years: [1950, 1954],
    type: 'operation',
    description: "Apoyo en Indochina y planes de defensa.",
    expandedDescription: "Financiamiento del esfuerzo colonial francés antes de la intervención directa de EE.UU.",
    coordinates: [46.22, 2.21]
  }
];
