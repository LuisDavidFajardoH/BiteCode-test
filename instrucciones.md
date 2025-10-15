Estructura del Proyecto
Desarrolla un "Recetario de Cocina" full-stack utilizando Node.js con Express para el backend, React con Chakra UI para el frontend, y una base de datos SQL (recomendamos MySQL o PostgreSQL para simplicidad; usa MySQL si no especificas otra). Usa pnpm como gestor de paquetes para ambas partes. Estructura el proyecto en un monorepo o carpetas separadas (por ejemplo, /backend y /frontend) para claridad, con un README.md que incluya pasos de setup, como inicializar la BD y correr los servidores. El backend debe exponer una API RESTful para todas las operaciones CRUD, y el frontend debe consumirla vía Axios o Fetch, integrando Chakra UI para componentes responsivos y accesibles como botones, formularios, tablas y modales.

Escribe código limpio y conciso, sin comentarios en el código fuente (ni en archivos JS/TS/SQL), sin emojis en ningún archivo, y optimizado para trabajar con Cursor (el editor AI-assisted): usa nombres de variables descriptivos, estructuras modulares claras, y patrones estándar sin redundancias para facilitar la generación y edición asistida por IA.

Configuración Técnica Inicial
Backend (Node.js + Express): Crea una carpeta /backend, inicializa con pnpm init. Instala dependencias clave: pnpm add express cors dotenv mysql2 body-parser (o pg para PostgreSQL), y pnpm add -D nodemon para desarrollo. Configura un servidor en server.js o app.js que escuche en puerto 5000 (o similar), habilita CORS para el frontend (puerto 3000), y usa un ORM como Sequelize para interactuar con la BD (instala pnpm add sequelize). Crea un archivo .env para credenciales de BD (DB_HOST, DB_USER, etc.). Implementa rutas en /routes con endpoints como GET/POST/PUT/DELETE para cada entidad.

Frontend (React + Chakra UI): Crea /frontend con pnpm create vite@latest . --template react (o Create React App si prefieres), luego pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion para UI, y pnpm add axios react-router-dom para routing y peticiones HTTP. Envuelve la app en ChakraProvider para theming global (soporte dark mode opcional). Usa componentes como Box, Button, FormControl, Table y Modal de Chakra para una interfaz moderna y accesible. Configura proxy en vite.config.js o package.json para evitar CORS en desarrollo.

Base de Datos: Usa SQL estándar; crea el esquema en un archivo schema.sql. Conecta el backend vía Sequelize o queries raw. Para pruebas locales, configura MySQL con XAMPP o Docker.

General: Asegura que el proyecto sea modular (separar models, controllers, routes en backend; components y hooks en frontend). Usa TypeScript opcionalmente si lo dominas para mejor validación. Prueba la API con Postman antes de integrar el frontend. Mantén el código sin comentarios ni emojis para compatibilidad óptima con Cursor.

1. Estructura de la Base de Datos
Implementa el siguiente esquema SQL en tu archivo .sql, incluyendo índices y constraints para FKs. Usa DECIMAL(10,2) para cantidades y VARCHAR(255) para nombres/descripciones si no se especifica. Agrega una tabla opcional "Categorias" si implementas el filtrado: id_categoria (INT, PK), nombre (VARCHAR) , y FK en Recetas: id_categoria (INT).

Tabla Ingredientes:

id_ingrediente (INT, PRIMARY KEY, AUTO_INCREMENT)

nombre (VARCHAR(255))

unidad_medida (VARCHAR(50))

Tabla Recetas:

id_receta (INT, PRIMARY KEY, AUTO_INCREMENT)

nombre (VARCHAR(255))

descripcion (TEXT)

id_categoria (INT, FOREIGN KEY a Categorias, opcional para filtrado)

Tabla Ingredientes_Recetas: (Muchos a muchos)

id_ingrediente (INT, FOREIGN KEY)

id_receta (INT, FOREIGN KEY)

cantidad (DECIMAL(10,2))

PRIMARY KEY (id_ingrediente, id_receta)

Tabla Compras:

id_compra (INT, PRIMARY KEY, AUTO_INCREMENT)

id_ingrediente (INT, FOREIGN KEY)

fecha_compra (DATE)

cantidad (DECIMAL(10,2))

Crea scripts de migración en backend (usando Sequelize migrations) para inicializar la BD en desarrollo.

2. Funcionalidades del Sistema
Implementa CRUD completo vía API en backend y UI intuitiva en frontend. Asegura validaciones (por ejemplo, cantidades positivas) y manejo de errores (status 400/404). El frontend debe navegar entre secciones con React Router (rutas como /recetas, /ingredientes, etc.).

Consultar recetas disponibles: En frontend, crea un formulario Chakra con Input para listar ingredientes disponibles (separados por comas). Envía POST a /api/recetas/disponibles con array de IDs de ingredientes. Backend query: Une tablas para encontrar recetas donde todos los ingredientes requeridos estén en la lista del usuario (usa JOIN y subqueries para matching exacto). Muestra resultados en una Table Chakra con nombre, descripción y lista de ingredientes/cantidades faltantes si aplica.

Gestionar ingredientes: API endpoints: GET /api/ingredientes, POST /api/ingredientes (body: {nombre, unidad_medida}), PUT /api/ingredientes/:id, DELETE /api/ingredientes/:id. Frontend: Página con Table para listar/editar/eliminar, y Modal para agregar con FormControl y validación.

Gestionar recetas: API: GET /api/recetas (con query param ?categoria= para filtrado), POST /api/recetas (body: {nombre, descripcion, ingredientes: [{id_ingrediente, cantidad}]}), PUT/DELETE similares. Backend: En POST/PUT, inserta/actualiza en Ingredientes_Recetas. Frontend: Formulario multi-step en Modal para seleccionar ingredientes y cantidades (usa Select y NumberInput de Chakra), lista en Accordion para claridad.

Gestionar compras: API: GET /api/compras, POST /api/compras (body: {id_ingrediente, fecha_compra, cantidad}), PUT/DELETE. Frontend: Table con filtros por fecha, InputDate para agregar.

3. Interfaz de Usuario
Usa Chakra UI para una interfaz sencilla, responsiva y moderna: layouts con Flex/Grid, colores temáticos (azul/verde para cocina), y accesibilidad (labels en forms). Incluye navegación con Chakra Menu o SimpleGrid para secciones. Para mostrar recetas: Cards con imagen placeholder (opcional via Unsplash API) y botón para ver detalles en Modal. Asegura mobile-first con breakpoints de Chakra.

4. Consideraciones Adicionales
Lógica de cantidades: En backend, para consultar recetas, calcula si la cantidad disponible del usuario >= requerida (agrega campo cantidad_usuario en el request si extiendes). En gestión de recetas, valida que ingredientes existan antes de relacionar.

Filtrar por categoría: Agrega dropdown en frontend para seleccionar categoría (desayuno, etc.) y query param en API GET /api/recetas?categoria=1. Implementa tabla Categorias con seed data (INSERTs en .sql).

Opcionales: Autenticación básica (JWT) si tiempo permite, paginación en listas (query params limit/offset), y error handling con Toasts de Chakra. Asegura que el código sea limpio, sin comentarios ni emojis, y probado end-to-end: inserta datos sample en .sql para demo. Optimiza para Cursor: usa patrones como hooks personalizados y funciones puras donde sea posible.

vamos a ir paso a paso, no puedes ejecutar nada sin mi permiso, nada de emojis en el codigo ni comentarios, vamos a hacer codigo limpio