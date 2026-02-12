# API IngeCiencia - Divulgación Científica FIM UAS

**Autor:** Apodaca Concha Orlando Armando

## 📋 Descripción

API REST para la plataforma web de divulgación científica de la Facultad de Ingeniería Metalúrgica (FIM) de la Universidad Autónoma de Sinaloa. Proporciona endpoints para gestionar artículos, preguntas, recursos, usuarios y autenticación.

## 🛠️ Tecnologías

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MySQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Containerización:** Docker

## ✅ Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- MySQL (v5.7 o superior)
- Docker (opcional)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd API-IngeCiencia
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Copiar el archivo template
cp .env.template .env

# Completar las variables en el archivo .env
```

## ⚙️ Configuración

Las variables de entorno se definen en el archivo `.env`. Consulta [.env.template](.env.template) para ver todos los parámetros disponibles.

### Variables Principales

- `PORT` - Puerto del servidor (por defecto: 3000)
- `DB_HOST` - Host de la base de datos
- `DB_USER` - Usuario de MySQL
- `DB_PASS` - Contraseña de MySQL
- `DB_DATABASE` - Nombre de la base de datos
- `DB_PORT` - Puerto de MySQL (por defecto: 3306)
- `JWT_SECRET` - Clave secreta para tokens JWT
- `JWT_REFRESH_SECRET` - Clave secreta para refresh tokens

## �️ Base de Datos

### Sincronización Automática

La base de datos se sincroniza automáticamente al iniciar el servidor. Sequelize creará todas las tablas según los modelos definidos en `src/database/models/`.

**El archivo `DB.sql` ya no es necesario para el setup**.

### Datos Iniciales (Seed Manual)

Para ejecutar el seed que completa la base de datos con datos de ejemplo, usa:

```bash
pnpm seed
```

El seed crea:

- ✓ **Roles:** `lector`, `autor`, `editor`, `admin`
- ✓ **Categorías:** Ingeniería Metalúrgica, Ciencia de Materiales, etc.
- ✓ **Usuarios:** Admin y autor de ejemplo con sus perfiles
- ✓ **Artículos:** Ejemplos de artículos científicos
- ✓ **Preguntas:** Preguntas iniciales
- ✓ **Recursos:** Guías, talleres y convocatorias de ejemplo

**Salida en consola:**

```
🌱 Iniciando seed de la base de datos...

↳ Verificando datos iniciales...
↳ Creando datos de prueba...
  ✓ 4 roles creados
  ✓ 7 categorías creadas
  ✓ 2 usuarios creados con perfiles
  ✓ 2 artículos creados
  ✓ 2 preguntas creadas
  ✓ 2 recursos creados
✓ Seed completado correctamente
```

**Usuarios de Prueba:**

- **Admin:** `admin` / `admin123`
- **Autor:** `autor1` / `author123`

### Personalizar los Datos Iniciales

Edita el archivo [src/database/seed.js](src/database/seed.js) para modificar o agregar más datos iniciales.

## �🚀 Uso

### Iniciar el servidor en desarrollo

```bash
pnpm dev
```

### Ejecutar el Seed (Datos Iniciales)

```bash
pnpm seed
```

### Build para producción

```bash
pnpm build
```

### Iniciar servidor en producción

```bash
pnpm start
```

### Con Docker

```bash
docker build -t api-ingeciencia .
docker run -p 3000:3000 --env-file .env api-ingeciencia
```

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Lógica de negocio
├── database/
│   ├── connection.js    # Configuración de conexión
│   └── models/          # Modelos de datos
├── middlewares/         # Middlewares personalizados
├── routes/              # Definición de rutas
├── utils/               # Funciones utilitarias
├── app.js              # Configuración de Express
├── jwtconfig.js        # Configuración JWT
└── index.js            # Punto de entrada
```

## 🔌 Endpoints Principales

### Autenticación

- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/refresh` - Renovar token JWT

### Artículos

- `GET /api/articles` - Obtener artículos
- `POST /api/articles` - Crear artículo
- `GET /api/articles/:id` - Obtener artículo por ID
- `PUT /api/articles/:id` - Actualizar artículo
- `DELETE /api/articles/:id` - Eliminar artículo

### Categorías

- `GET /api/categories` - Obtener categorías
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

### Usuarios

- `GET /api/users` - Obtener usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Preguntas

- `GET /api/questions` - Obtener preguntas
- `POST /api/questions` - Crear pregunta
- `GET /api/questions/:id` - Obtener pregunta por ID

### Recursos

- `GET /api/resources` - Obtener recursos
- `POST /api/resources` - Crear recurso
- `GET /api/resources/:id` - Obtener recurso por ID

### Proyectos de Investigación

- `GET /api/research-projects` - Obtener proyectos
- `POST /api/research-projects` - Crear proyecto

## Autenticación

La API utiliza JWT para la autenticación. Los tokens deben enviarse en el header `Authorization`:

```
Authorization: Bearer <token>
```

## 📝 Archivos de Solicitud HTTP

En la carpeta `requests/` se encuentran archivos `.http` para probar los endpoints con clientes HTTP como REST Client de VS Code:

- `articles.http` - Endpoints de artículos
- `users.http` - Endpoints de usuarios
- `categories.http` - Endpoints de categorías
- `questions.http` - Endpoints de preguntas
- `recursos.http` - Endpoints de recursos
- `custom.http` - Solicitudes personalizadas

## 📧 Contacto

Para consultas o reportar problemas, contactar al autor del proyecto.
