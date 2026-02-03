/**
 * Base de datos de Patentes (Mock)
 * Idioma: Español
 * Cantidad: 30 patentes simuladas
 */

export const INITIAL_PATENTS = [
    {
        id: "ES-2024-001",
        title: "Sistema de Propulsión Electromagnética de Alta Eficiencia",
        abstract: "Dispositivo de propulsión para vehículos aéreos que utiliza campos electromagnéticos rotatorios para generar empuje vectorial sin partes móviles mecánicas. El sistema optimiza el consumo energético mediante superconductores de alta temperatura.",
        claims: "1. Un sistema de propulsión que comprende un núcleo superconductor... 2. El método de modulación de campo...",
        cpc_class: "B64G",
        subclass: "B64G 1/40",
        assignee: "AeroSpace Future S.L.",
        date: "2024-01-15",
        status: "Activo",
        score: 0
    },
    {
        id: "MX-2023-089",
        title: "Paneles Solares Transparentes con Nanotecnología de Grafeno",
        abstract: "Células fotovoltaicas integrables en ventanas y superficies de vidrio que mantienen una transparencia del 90% mientras generan electricidad. Utiliza una capa monoatómica de grafeno dopado para capturar el espectro ultravioleta.",
        claims: "1. Estructura fotovoltaica transparente... 2. Uso de grafeno dopado con...",
        cpc_class: "H02S",
        subclass: "H02S 20/23",
        assignee: "Innovación Solar Méx",
        date: "2023-11-20",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2023-112",
        title: "Fertilizante Bio-Orgánico de Liberación Controlada",
        abstract: "Composición fertilizante encapsulada en polímeros biodegradables que libera nutrientes en respuesta a la humedad del suelo. Incrementa el rendimiento de cultivos de secano en un 30% reduciendo la lixiviación.",
        claims: "1. Composición fertilizante granular... 2. Método de encapsulación mediante...",
        cpc_class: "C05G",
        subclass: "C05G 3/00",
        assignee: "AgroTech Iberia",
        date: "2023-09-05",
        status: "Activo",
        score: 0
    },
    {
        id: "WO-2024-004",
        title: "Interfaz Neuronal Directa para Control de Prótesis",
        abstract: "Sistema de interfaz cerebro-computadora (BCI) no invasivo que permite el control motor fino de extremidades robóticas utilizando decodificación de señales EEG asistida por inteligencia artificial.",
        claims: "1. Dispositivo de captación de señales cerebrales... 2. Algoritmo de filtrado espacial...",
        cpc_class: "A61F",
        subclass: "A61F 2/72",
        assignee: "NeuroLink Corp",
        date: "2024-02-01",
        status: "Pendiente",
        score: 0
    },
    {
        id: "US-2023-555",
        title: "Batería de Estado Sólido con Electrolito Cerámico",
        abstract: "Batería recargable de iones de litio que sustituye el electrolito líquido por un compuesto cerámico, eliminando el riesgo de incendio y duplicando la densidad energética de las baterías convencionales.",
        claims: "1. Batería secundaria de litio... 2. Composición del electrolito sólido...",
        cpc_class: "H01M",
        subclass: "H01M 10/056",
        assignee: "Energy Storage Solutions",
        date: "2023-10-12",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2022-777",
        title: "Sistema de Purificación de Agua por Ósmosis Inversa Portátil",
        abstract: "Dispositivo compacto de desalinización y purificación de agua alimentado por energía solar, capaz de procesar 50 litros diarios. Diseñado para zonas de emergencia y comunidades aisladas.",
        claims: "1. Unidad de filtración portátil... 2. Membrana semipermeable compuesta...",
        cpc_class: "C02F",
        subclass: "C02F 1/44",
        assignee: "AquaVida Global",
        date: "2022-06-18",
        status: "Expirado",
        score: 0
    },
    {
        id: "MX-2024-012",
        title: "Recubrimiento Comestible para Extensión de Vida Útil de Frutas",
        abstract: "Película protectora invisible y sin sabor hecha a base de proteínas vegetales y cera de abeja que retrasa la oxidación y deshidratación de frutas frescas post-cosecha.",
        claims: "1. Emulsión para recubrimiento de alimentos... 2. Método de aplicación por aspersión...",
        cpc_class: "A23B",
        subclass: "A23B 7/16",
        assignee: "FoodSafe Bio",
        date: "2024-01-30",
        status: "Activo",
        score: 0
    },
    {
        id: "WO-2023-999",
        title: "Motor de Plasma para Satélites de Órbita Baja",
        abstract: "Propulsor de efecto Hall miniaturizado que utiliza gas xenón ionizado para maniobras orbitales precisas en microsatélites. Reduce el peso del combustible en un 60%.",
        claims: "1. Propulsor de plasma tipo Hall... 2. Cátodo hueco de bajo consumo...",
        cpc_class: "B64G",
        subclass: "B64G 1/40",
        assignee: "SpaceDynamics Lda",
        date: "2023-12-05",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2023-333",
        title: "Hormigón Autorreparable con Bacterias Calcificantes",
        abstract: "Material de construcción cementoso que incorpora esporas bacterianas encapsuladas capaces de precipitar calcita para sellar grietas y fisuras automáticamente al contacto con el agua.",
        claims: "1. Composición de cemento autorreparable... 2. Cápsulas de liberación controlada...",
        cpc_class: "C04B",
        subclass: "C04B 28/02",
        assignee: "Constructora Futuro",
        date: "2023-08-22",
        status: "Activo",
        score: 0
    },
    {
        id: "US-2023-101",
        title: "Algoritmo Cuántico de Encriptación Post-RSA",
        abstract: "Método de criptografía resistente a computación cuántica basado en retículos matemáticos multidimensionales, asegurando comunicaciones bancarias y gubernamentales futuras.",
        claims: "1. Método de generación de claves... 2. Protocolo de intercambio seguro...",
        cpc_class: "H04L",
        subclass: "H04L 9/00",
        assignee: "Quantum Shield Inc",
        date: "2023-03-14",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2024-022",
        title: "Dron Agrícola Autónomo para Polinización Artificial",
        abstract: "Vehículo aéreo no tripulado de tamaño micro equipado con visión artificial para identificar flores y realizar polinización mecánica precisa en invernaderos.",
        claims: "1. Sistema robótico de polinización... 2. Mecanismo de dispensación de polen...",
        cpc_class: "A01G",
        subclass: "A01G 7/00",
        assignee: "AgroDron Tech",
        date: "2024-02-10",
        status: "Pendiente",
        score: 0
    },
    {
        id: "MX-2023-045",
        title: "Bioplástico Biodegradable a partir de Cáscara de Aguacate",
        abstract: "Proceso de síntesis de polímeros bioplásticos utilizando residuos de la industria del aguacate. El material es compostable y tiene propiedades mecánicas similares al polietileno.",
        claims: "1. Método de extracción de polímeros... 2. Composición de bioplástico...",
        cpc_class: "C08L",
        subclass: "C08L 99/00",
        assignee: "EcoPlast México",
        date: "2023-05-11",
        status: "Activo",
        score: 0
    },
    {
        id: "WO-2023-222",
        title: "Dispositivo de Levitación Acústica para Manipulación de Muestras",
        abstract: "Aparato que utiliza ondas estacionarias ultrasónicas para suspender y mover pequeñas partículas líquidas o sólidas sin contacto físico, ideal para química analítica.",
        claims: "1. Transductor ultrasónico en fase... 2. Cámara de levitación controlada...",
        cpc_class: "B01L",
        subclass: "B01L 3/00",
        assignee: "SonicLabs Ltd",
        date: "2023-07-29",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2023-901",
        title: "Red Neuronal para Predicción de Incendios Forestales",
        abstract: "Sistema de alerta temprana que analiza datos satelitales, meteorológicos y sensores IoT en tiempo real para predecir la probabilidad y propagación de incendios forestales.",
        claims: "1. Sistema de monitoreo ambiental... 2. Motor de inferencia predictiva...",
        cpc_class: "G08B",
        subclass: "G08B 17/00",
        assignee: "ForestGuard AI",
        date: "2023-09-30",
        status: "Activo",
        score: 0
    },
    {
        id: "US-2024-005",
        title: "Exoesqueleto Activo para Rehabilitación de Marcha",
        abstract: "Estructura robótica vestible ligera que asiste el movimiento de las piernas en pacientes con lesiones medulares. Incorpora sensores EMG para detectar la intención de movimiento.",
        claims: "1. Dispositivo ortésico motorizado... 2. Sistema de control mioeléctrico...",
        cpc_class: "A61H",
        subclass: "A61H 3/00",
        assignee: "RehabRobotics",
        date: "2024-01-05",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2024-055",
        title: "Catalizador para Producción de Hidrógeno Verde",
        abstract: "Nuevo material catalítico basado en aleaciones de níquel-hierro que reduce el sobrepotencial en la electrólisis del agua, haciendo la producción de hidrógeno 40% más eficiente.",
        claims: "1. Electrodo para electrólisis alcalina... 2. Proceso de deposición electroquímica...",
        cpc_class: "C25B",
        subclass: "C25B 11/04",
        assignee: "GreenH2 Spain",
        date: "2024-02-15",
        status: "Pendiente",
        score: 0
    },
    {
        id: "MX-2023-011",
        title: "Vacuna de ARNm Termoestable",
        abstract: "Formulación de nanopartículas lipídicas que permite conservar vacunas de ARN mensajero a temperatura ambiente durante 6 meses, facilitando la distribución en zonas cálidas.",
        claims: "1. Composición farmacéutica estable... 2. Método de liofilización...",
        cpc_class: "A61K",
        subclass: "A61K 39/00",
        assignee: "BioMex Pharma",
        date: "2023-04-22",
        status: "Activo",
        score: 0
    },
    {
        id: "WO-2023-159",
        title: "Sistema de Cultivo Vertical Aeropónico Inteligente",
        abstract: "Torres de cultivo modular con nebulización de nutrientes controlada por sensores de crecimiento radicular. Maximiza la producción por metro cuadrado en entornos urbanos.",
        claims: "1. Aparato de cultivo sin suelo... 2. Sistema de inyección de nutrientes...",
        cpc_class: "A01G",
        subclass: "A01G 31/00",
        assignee: "UrbanFarms Intl",
        date: "2023-06-10",
        status: "Activo",
        score: 0
    },
    {
        id: "ES-2022-888",
        title: "Pavimento Piezoeléctrico para Generación Urbana",
        abstract: "Baldosas compuestas que convierten la energía cinética de los peatones y vehículos en electricidad para alimentar el alumbrado público circundante.",
        claims: "1. Módulo generador de suelo... 2. Transductores piezoeléctricos de cerámica...",
        cpc_class: "H02N",
        subclass: "H02N 2/18",
        assignee: "CityPower S.L.",
        date: "2022-11-05",
        status: "Activo",
        score: 0
    },
    {
        id: "US-2024-333",
        title: "Sensor Cuántico de Gravedad",
        abstract: "Dispositivo de gravimetría basado en interferometría atómica de rubidio para detección de cavidades subterráneas y prospección minera de alta resolución.",
        claims: "1. Interferómetro de átomos fríos... 2. Método de medición de gradiente...",
        cpc_class: "G01V",
        subclass: "G01V 7/00",
        assignee: "QuantumSensing",
        date: "2024-01-28",
        status: "Activo",
        score: 0
    }
];
