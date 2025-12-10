# Backend - Sistema de Gestión de Usuarios

API REST desarrollada con **Node.js**, **Express.js** y **PostgreSQL** para el sistema de gestión de usuarios, roles y tipos de documento con autenticación JWT y auditoría completa.

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelos de Datos](#-modelos-de-datos)
- [API Endpoints](#-api-endpoints)
- [Autenticación y Autorización](#-autenticación-y-autorización)
- [Sistema de Auditoría](#-sistema-de-auditoría)
- [Middleware](#-middleware)
- [Ejecución y Comandos](#-ejecución-y-comandos)
- [Testing](#-testing)
- [Solución de Problemas](#-solución-de-problemas)

---

## 🚀 Características Principales

### Seguridad

- ✅ **Autenticación JWT**: Tokens seguros con expiración configurable
- ✅ **Bcrypt**: Hash de contraseñas con salt rounds
- ✅ **CORS configurado**: Control de orígenes permitidos
- ✅ **Validación de entrada**: Sanitización de datos
- ✅ **Control de acceso basado en roles (RBAC)**: Permisos granulares por endpoint

### Funcionalidades

- ✅ **CRUD completo**: Usuarios, Roles y Tipos de Documento
- ✅ **Auditoría automática**: Registro de todas las operaciones
- ✅ **Soft delete**: Los registros no se eliminan físicamente
- ✅ **Paginación**: Soporte para grandes volúmenes de datos
- ✅ **Búsqueda y filtrado**: Queries optimizadas
- ✅ **Relaciones**: Foreign keys y asociaciones entre modelos

### Arquitectura

- ✅ **RESTful API**: Diseño siguiendo mejores prácticas
- ✅ **Separación de responsabilidades**: Modelos, Controladores, Rutas
- ✅ **ORM**: Sequelize para abstracción de base de datos
- ✅ **ES6 Modules**: Imports/exports modernos
- ✅ **Manejo de errores centralizado**: Middleware de error handling

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                         Cliente                              │
│                    (Frontend React)                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ JSON + JWT Token
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Server                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware Stack                         │  │
│  │  • CORS          • Body Parser    • Auth             │  │
│  │  • Error Handler • Audit Logger   • Validator        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Routes Layer                       │  │
│  │  /api/auth  /api/usuarios  /api/roles                │  │
│  │  /api/document-types  /api/audit                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Controllers Layer                      │  │
│  │  • authController    • usuarioController             │  │
│  │  • roleController    • documentTypeController        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Models Layer (ORM)                   │  │
│  │  • Usuario  • Role  • DocumentType  • AuditLog       │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ Sequelize ORM
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  Tables: usuarios, roles, document_types, audit_logs        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

### Core

- **Node.js** (v18+): Runtime de JavaScript
- **Express.js** (v4.21+): Framework web
- **PostgreSQL** (v16): Base de datos relacional

### ORM y Base de Datos

- **Sequelize** (v6.37+): ORM para PostgreSQL
- **pg** (v8.13+): Driver de PostgreSQL
- **pg-hstore**: Serialización de datos

### Seguridad y Autenticación

- **jsonwebtoken** (v9.0+): Generación y verificación de JWT
- **bcryptjs** (v2.4+): Hashing de contraseñas

### Utilidades

- **dotenv** (v16.4+): Gestión de variables de entorno
- **cors**: Configuración de CORS
- **express-async-handler**: Manejo de async/await

---

## 📋 Requisitos Previos

### Software Necesario

```bash
# Node.js v18 o superior
node --version  # v18.x.x o superior

# PostgreSQL 16
psql --version  # 16.x

# npm
npm --version   # 10.x.x o superior
```

### Sistema Operativo

- **Linux** (Ubuntu 20.04+, Debian 11+)
- **WSL2** (Windows Subsystem for Linux)
- **macOS** (10.15+)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
cd /path/to/project/backend
```

### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará:

- express, sequelize, pg, pg-hstore
- jsonwebtoken, bcryptjs
- dotenv, cors
- Todas las dependencias listadas en `package.json`

### 3. Configurar PostgreSQL

#### Iniciar PostgreSQL (WSL/Linux)

```bash
# Verificar estado
sudo service postgresql status

# Iniciar si no está corriendo
sudo service postgresql start

# Habilitar inicio automático
sudo systemctl enable postgresql
```

#### Crear Base de Datos

```bash
# Conectarse a PostgreSQL
sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE usuarios_db;

# Verificar
\l

# Salir
\q
```

### 4. Configurar Variables de Entorno

El archivo `.env` debe contener:

```env
# Entorno
NODE_ENV=development

# Servidor
PORT=3001
HOST=0.0.0.0

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usuarios_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=tu-secreto-super-seguro-cambialo-en-produccion-123456789
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

⚠️ **IMPORTANTE**:

- Cambia `JWT_SECRET` en producción
- Usa contraseñas seguras para PostgreSQL
- Nunca subas el archivo `.env` a Git

### 5. Inicializar Base de Datos

El servidor creará automáticamente las tablas al iniciar (Sequelize sync), pero también puedes usar el script de seed:

```bash
# Poblar con datos iniciales
node src/utils/seed.js
```

Esto creará:

- ✅ 2 roles (Super Admin, Admin)
- ✅ 3 tipos de documento (CC, TI, CE)
- ✅ 2 usuarios de prueba

### 6. Iniciar el Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor tardará ~10-15 segundos en iniciar debido a la inicialización de Sequelize.

Deberías ver:

```
🔧 Configurando Sequelize...
✅ Sequelize configurado
🔄 Conectando a PostgreSQL...
✅ PostgreSQL conectado correctamente
📦 Importando rutas...
🚀 Servidor ejecutándose en http://localhost:3001
📝 Ambiente: development
💾 Base de datos: PostgreSQL
```

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js           # Configuración de Sequelize
│   │
│   ├── models/
│   │   ├── index.js              # Registro de modelos y relaciones
│   │   ├── Usuario.js            # Modelo de Usuario
│   │   ├── Role.js               # Modelo de Rol
│   │   ├── DocumentType.js       # Modelo de Tipo de Documento
│   │   └── AuditLog.js           # Modelo de Auditoría
│   │
│   ├── controllers/
│   │   ├── authController.js     # Login y autenticación
│   │   ├── usuarioController.js  # CRUD de usuarios
│   │   ├── roleController.js     # CRUD de roles
│   │   ├── documentTypeController.js  # CRUD de tipos de documento
│   │   └── auditController.js    # Consulta de logs
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # Rutas de autenticación
│   │   ├── usuarioRoutes.js      # Rutas de usuarios
│   │   ├── roleRoutes.js         # Rutas de roles
│   │   ├── documentTypeRoutes.js # Rutas de tipos de documento
│   │   └── auditRoutes.js        # Rutas de auditoría
│   │
│   ├── middleware/
│   │   ├── auth.js               # Protección y autorización JWT
│   │   ├── audit.js              # Registro automático de auditoría
│   │   └── errorHandler.js       # Manejo centralizado de errores
│   │
│   ├── utils/
│   │   └── seed.js               # Script de datos iniciales
│   │
│   └── server.js                 # Punto de entrada de la aplicación
│
├── .env                          # Variables de entorno (NO subir a Git)
├── .gitignore                    # Archivos ignorados por Git
├── package.json                  # Dependencias y scripts
├── package-lock.json             # Lock de dependencias
└── README.md                     # Este archivo
```

### Descripción de Componentes

#### **Config**

- `database.js`: Configuración de Sequelize con pool de conexiones

#### **Models**

- Definición de esquemas usando Sequelize
- Hooks de pre-save para hashing de contraseñas
- Métodos de instancia (ej: `comparePassword`)
- Validaciones a nivel de modelo

#### **Controllers**

- Lógica de negocio
- Validación de entrada
- Respuestas HTTP estandarizadas
- Manejo de errores

#### **Routes**

- Definición de endpoints
- Aplicación de middleware (auth, audit)
- Agrupación lógica de rutas

#### **Middleware**

- `auth.js`: Verifica JWT y carga usuario
- `audit.js`: Registra operaciones CRUD
- `errorHandler.js`: Respuestas de error uniformes

---

## 💾 Modelos de Datos

### Usuario

```javascript
{
  id: UUID (PK),
  nombres: STRING(100) NOT NULL,
  apellidos: STRING(100) NOT NULL,
  email: STRING(100) UNIQUE NOT NULL,
  password: STRING(255) NOT NULL (hashed),
  numeroDocumento: STRING(20) NOT NULL,
  estado: BOOLEAN DEFAULT true,
  roleId: UUID (FK → roles.id),
  documentTypeId: UUID (FK → document_types.id),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Relaciones:**

- `belongsTo(Role)` - Un usuario tiene un rol
- `belongsTo(DocumentType)` - Un usuario tiene un tipo de documento

**Métodos:**

- `comparePassword(password)`: Compara password en texto plano con hash

**Hooks:**

- `beforeSave`: Hashea la contraseña si cambió

---

### Role

```javascript
{
  id: UUID (PK),
  nombre: STRING(50) UNIQUE NOT NULL,
  descripcion: TEXT,
  permisos: JSON ARRAY,
  estado: BOOLEAN DEFAULT true,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Permisos disponibles:**

```javascript
[
  "ver_usuarios",
  "crear_usuarios",
  "editar_usuarios",
  "eliminar_usuarios",
  "ver_roles",
  "crear_roles",
  "editar_roles",
  "eliminar_roles",
  "ver_tipos_documento",
  "crear_tipos_documento",
  "editar_tipos_documento",
  "eliminar_tipos_documento",
];
```

**Relaciones:**

- `hasMany(Usuario)` - Un rol tiene muchos usuarios

---

### DocumentType

```javascript
{
  id: UUID (PK),
  codigo: STRING(10) UNIQUE NOT NULL,
  nombre: STRING(100) NOT NULL,
  estado: BOOLEAN DEFAULT true,
  tipoAccion: STRING(50),      // create, edit, delete, reactivate
  usuarioAccion: STRING(100),  // Usuario que realizó la acción
  fechaHoraEvento: TIMESTAMP,  // Cuándo se realizó
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Relaciones:**

- `hasMany(Usuario)` - Un tipo de documento tiene muchos usuarios

---

### AuditLog

```javascript
{
  id: UUID (PK),
  accion: STRING(50) NOT NULL,     // CREATE, UPDATE, DELETE, LOGIN, etc.
  entidad: STRING(50) NOT NULL,    // Usuario, Role, DocumentType
  entidadId: UUID,                 // ID del registro afectado
  detalles: JSON,                  // Información adicional
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Ejemplo de registro:**

```json
{
  "accion": "CREATE",
  "entidad": "Usuario",
  "entidadId": "uuid-here",
  "detalles": {
    "usuario": "admin@example.com",
    "cambios": { "nombres": "Juan", "email": "juan@example.com" }
  }
}
```

---

## 🌐 API Endpoints

### Base URL

```
http://localhost:3001/api
```

### Autenticación

#### `POST /auth/login`

Iniciar sesión y obtener token JWT.

**Request:**

```json
{
  "email": "carlos.garcia@example.com",
  "password": "admin123"
}
```

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "nombres": "Carlos",
    "apellidos": "García Pérez",
    "email": "carlos.garcia@example.com",
    "rol": {
      "id": "uuid",
      "nombre": "Super Administrador",
      "permisos": ["ver_usuarios", "crear_usuarios", ...]
    },
    "tipoDocumento": {
      "codigo": "CC",
      "nombre": "Cédula de Ciudadanía"
    }
  }
}
```

**Errores:**

- `401`: Email o contraseña incorrectos
- `404`: Usuario no encontrado
- `400`: Datos faltantes

---

### Usuarios

#### `GET /usuarios`

Obtener lista de usuarios (con paginación).

**Headers:**

```
Authorization: Bearer <token>
```

**Query Params:**

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Registros por página (default: 10)
- `search` (opcional): Búsqueda por nombre o email

**Response (200):**

```json
{
  "usuarios": [
    {
      "id": "uuid",
      "nombres": "Carlos",
      "apellidos": "García",
      "email": "carlos@example.com",
      "numeroDocumento": "1234567890",
      "estado": true,
      "rol": { "nombre": "Admin" },
      "tipoDocumento": { "nombre": "CC" }
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalUsuarios": 47
}
```

**Permisos requeridos:** `ver_usuarios`

---

#### `POST /usuarios`

Crear nuevo usuario.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**

```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "numeroDocumento": "9876543210",
  "roleId": "uuid-del-rol",
  "documentTypeId": "uuid-del-tipo"
}
```

**Response (201):**

```json
{
  "message": "Usuario creado exitosamente",
  "usuario": { ... }
}
```

**Validaciones:**

- Email único
- Password mínimo 6 caracteres
- Todos los campos requeridos

**Permisos requeridos:** `crear_usuarios`

---

#### `PUT /usuarios/:id`

Actualizar usuario existente.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**

```json
{
  "nombres": "Juan Carlos",
  "email": "juancarlos@example.com",
  "estado": true
}
```

**Response (200):**

```json
{
  "message": "Usuario actualizado exitosamente",
  "usuario": { ... }
}
```

**Permisos requeridos:** `editar_usuarios`

---

#### `DELETE /usuarios/:id`

Eliminar usuario (soft delete - marca como inactivo).

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "message": "Usuario eliminado exitosamente"
}
```

**Permisos requeridos:** `eliminar_usuarios`

---

### Roles

#### `GET /roles`

Obtener todos los roles.

**Response (200):**

```json
[
  {
    "id": "uuid",
    "nombre": "Super Administrador",
    "descripcion": "Acceso total",
    "permisos": ["ver_usuarios", "crear_usuarios", ...],
    "estado": true
  }
]
```

#### `POST /roles`

Crear nuevo rol.

**Request:**

```json
{
  "nombre": "Editor",
  "descripcion": "Puede editar contenido",
  "permisos": ["ver_usuarios", "editar_usuarios"]
}
```

#### `PUT /roles/:id`

Actualizar rol.

#### `DELETE /roles/:id`

Eliminar rol (soft delete).

**Permisos:** `ver_roles`, `crear_roles`, `editar_roles`, `eliminar_roles`

---

### Tipos de Documento

#### `GET /document-types`

Obtener todos los tipos de documento.

**Response (200):**

```json
[
  {
    "id": "uuid",
    "codigo": "CC",
    "nombre": "Cédula de Ciudadanía",
    "estado": true
  }
]
```

#### `POST /document-types`

Crear nuevo tipo.

**Request:**

```json
{
  "codigo": "PA",
  "nombre": "Pasaporte"
}
```

#### `PUT /document-types/:id`

Actualizar tipo.

#### `DELETE /document-types/:id`

Eliminar tipo (soft delete).

**Permisos:** `ver_tipos_documento`, `crear_tipos_documento`, etc.

---

### Auditoría

#### `GET /audit`

Obtener logs de auditoría.

**Query Params:**

- `page`: Página (default: 1)
- `limit`: Registros por página (default: 50)
- `entidad`: Filtrar por entidad (Usuario, Role, etc.)
- `accion`: Filtrar por acción (CREATE, UPDATE, etc.)

**Response (200):**

```json
{
  "logs": [
    {
      "id": "uuid",
      "accion": "CREATE",
      "entidad": "Usuario",
      "entidadId": "uuid",
      "detalles": { ... },
      "createdAt": "2025-12-10T10:30:00.000Z"
    }
  ],
  "totalPages": 10,
  "currentPage": 1
}
```

---

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

1. **Login**: Cliente envía email/password a `POST /api/auth/login`
2. **Validación**: Backend verifica credenciales con bcrypt
3. **Token**: Se genera JWT con payload: `{ id: usuario.id }`
4. **Respuesta**: Token y datos del usuario se devuelven al cliente
5. **Almacenamiento**: Cliente guarda token (localStorage/sessionStorage)
6. **Requests**: Cliente incluye token en header: `Authorization: Bearer <token>`
7. **Verificación**: Middleware `protect` valida token en cada request protegido

### Middleware de Protección

#### `protect`

Verifica que el request tenga un token JWT válido.

```javascript
// Uso en rutas
router.get("/usuarios", protect, getUsuarios);
```

**Proceso:**

1. Extrae token del header `Authorization: Bearer <token>`
2. Verifica token con `jwt.verify()`
3. Busca usuario en BD por ID del payload
4. Agrega `req.user` con datos del usuario
5. Continúa al siguiente middleware/controller

**Errores:**

- Sin token: `401 No autorizado`
- Token inválido: `401 Token inválido`
- Usuario no existe: `401 Usuario no encontrado`

---

#### `authorize(...permisos)`

Verifica que el usuario tenga los permisos necesarios.

```javascript
// Uso en rutas
router.post("/usuarios", protect, authorize("crear_usuarios"), createUsuario);
```

**Proceso:**

1. Lee `req.user.rol.permisos` (array)
2. Verifica que todos los permisos requeridos estén en el array
3. Si falta alguno: error `403 Forbidden`

**Ejemplo:**

```javascript
// Usuario con permisos: ["ver_usuarios", "editar_usuarios"]
authorize("ver_usuarios"); // ✅ Permitido
authorize("crear_usuarios"); // ❌ Bloqueado (403)
authorize("ver_usuarios", "editar_usuarios"); // ✅ Permitido
```

---

### Configuración JWT

**Variables en `.env`:**

```env
JWT_SECRET=clave-secreta-muy-larga-y-segura
JWT_EXPIRE=7d
```

**Estructura del Token:**

```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "id": "uuid-del-usuario",
  "iat": 1702123456,  // Issued at
  "exp": 1702728256   // Expiration
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

---

## 📊 Sistema de Auditoría

### Middleware de Auditoría

El middleware `auditLog` registra automáticamente todas las operaciones CRUD.

**Uso:**

```javascript
router.post(
  "/usuarios",
  protect,
  authorize("crear_usuarios"),
  auditLog,
  createUsuario
);
```

**Qué registra:**

- Acción realizada (CREATE, UPDATE, DELETE)
- Entidad afectada (Usuario, Role, DocumentType)
- ID del registro
- Usuario que realizó la acción
- Timestamp

**Ejemplo de log:**

```javascript
{
  accion: 'CREATE',
  entidad: 'Usuario',
  entidadId: 'uuid-nuevo-usuario',
  detalles: {
    usuario: 'admin@example.com',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  }
}
```

### Acciones Auditadas

| Acción | Entidad      | Cuándo                  |
| ------ | ------------ | ----------------------- |
| CREATE | Usuario      | Al crear usuario        |
| UPDATE | Usuario      | Al editar usuario       |
| DELETE | Usuario      | Al marcar como inactivo |
| LOGIN  | Auth         | Al iniciar sesión       |
| CREATE | Role         | Al crear rol            |
| UPDATE | Role         | Al editar rol           |
| DELETE | Role         | Al eliminar rol         |
| CREATE | DocumentType | Al crear tipo           |
| UPDATE | DocumentType | Al editar tipo          |
| DELETE | DocumentType | Al eliminar tipo        |

### Consultar Auditoría

```bash
# Desde PostgreSQL
sudo -u postgres psql -d usuarios_db

# Ver últimos 10 registros
SELECT accion, entidad, "createdAt"
FROM audit_logs
ORDER BY "createdAt" DESC
LIMIT 10;

# Filtrar por entidad
SELECT * FROM audit_logs WHERE entidad = 'Usuario';

# Filtrar por acción
SELECT * FROM audit_logs WHERE accion = 'CREATE';
```

---

## 🔧 Middleware

### 1. CORS

Permite requests desde el frontend.

```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
```

### 2. Body Parser

Parsea JSON y URL-encoded.

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### 3. Auth Middleware (`protect`)

- Verifica JWT token
- Carga datos del usuario
- Requiere autenticación

### 4. Authorization Middleware (`authorize`)

- Verifica permisos específicos
- Control de acceso granular

### 5. Audit Middleware (`auditLog`)

- Registra operaciones CRUD
- Logs automáticos

### 6. Error Handler

- Manejo centralizado de errores
- Respuestas uniformes
- Logging de errores

**Tipos de errores:**

```javascript
// 400 Bad Request
{
  error: "Datos inválidos";
}

// 401 Unauthorized
{
  error: "No autorizado - Token inválido";
}

// 403 Forbidden
{
  error: "No tienes permisos para esta acción";
}

// 404 Not Found
{
  error: "Recurso no encontrado";
}

// 500 Internal Server Error
{
  error: "Error del servidor";
}
```

---

## 🚀 Ejecución y Comandos

### Scripts Disponibles

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js",
    "seed": "node src/utils/seed.js"
  }
}
```

### Iniciar Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

**Output esperado:**

```
🔧 Configurando Sequelize...
DB_NAME: usuarios_db
DB_USER: postgres
✅ Sequelize configurado
🔄 Conectando a PostgreSQL...
✅ PostgreSQL conectado correctamente
📦 Importando rutas...
🚀 Servidor ejecutándose en http://localhost:3001
📝 Ambiente: development
💾 Base de datos: PostgreSQL
```

⏱️ **Nota**: La inicialización tarda ~10-15 segundos debido a Sequelize.

### Poblar Base de Datos

```bash
npm run seed
```

Crea:

- **2 roles**: Super Administrador, Administrador
- **3 tipos de documento**: CC, TI, CE
- **2 usuarios**:
  - carlos.garcia@example.com (Super Admin)
  - pedro.perez@example.com (Admin)

### Verificar Estado

```bash
# Verificar servidor corriendo
curl http://localhost:3001/api/health

# Respuesta esperada
{"status":"ok","message":"API funcionando correctamente"}
```

### Detener Servidor

```bash
# Encontrar proceso
ps aux | grep "node src/server.js"

# Matar proceso
pkill -f "node src/server.js"

# O si conoces el PID
kill -9 <PID>
```

---

## 🧪 Testing

### Testing Manual con cURL

#### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos.garcia@example.com",
    "password": "admin123"
  }'
```

#### Obtener Usuarios (requiere token)

```bash
# Primero obtén el token del login anterior
TOKEN="<tu-token-aqui>"

curl -X GET http://localhost:3001/api/usuarios \
  -H "Authorization: Bearer $TOKEN"
```

#### Crear Usuario

```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Test",
    "apellidos": "Usuario",
    "email": "test@example.com",
    "password": "password123",
    "numeroDocumento": "1111111111",
    "roleId": "<uuid-del-rol>",
    "documentTypeId": "<uuid-del-tipo>"
  }'
```

### Testing con Postman

1. Importa la colección (crear archivo JSON con endpoints)
2. Configura variable de entorno `baseUrl = http://localhost:3001/api`
3. Configura variable `token` después del login
4. Usa `{{baseUrl}}` y `{{token}}` en requests

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Problema:** Error al conectar a PostgreSQL

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solución:**

```bash
# Verificar que PostgreSQL esté corriendo
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start

# Verificar puerto
sudo netstat -tuln | grep 5432
```

---

**Problema:** Error de variables de entorno

```
Error: JWT_SECRET is not defined
```

**Solución:**

```bash
# Verificar que .env existe
ls -la .env

# Verificar contenido
cat .env

# Crear .env si no existe
cp .env.example .env
nano .env
```

---

### Errores de autenticación

**Problema:** Token inválido

```
401 Unauthorized - Token inválido
```

**Solución:**

- Verificar que el token sea válido (no expirado)
- Verificar formato: `Bearer <token>` (espacio después de Bearer)
- Hacer login nuevamente para obtener token fresco

---

**Problema:** Sin permisos

```
403 Forbidden - No tienes permisos
```

**Solución:**

```bash
# Verificar permisos del usuario en BD
sudo -u postgres psql -d usuarios_db

SELECT u.email, r.permisos
FROM usuarios u
JOIN roles r ON u."roleId" = r.id
WHERE u.email = 'tu@email.com';
```

---

### Problemas con Sequelize

**Problema:** Tablas no se crean

```
Executing (default): SELECT 1+1 AS result
# Pero no se crean tablas
```

**Solución:**

```bash
# Forzar sincronización
# En database.js cambiar temporalmente:
await sequelize.sync({ force: true });  # ⚠️ BORRA DATOS

# O crear manualmente
sudo -u postgres psql -d usuarios_db
# Ejecutar CREATE TABLE statements
```

---

**Problema:** Error de relaciones

```
Error: Usuario is not associated to Role!
```

**Solución:**

- Verificar que `src/models/index.js` esté importando todos los modelos
- Verificar orden de imports
- Reiniciar servidor

---

### Puerto en uso

**Problema:**

```
Error: listen EADDRINUSE :::3001
```

**Solución:**

```bash
# Encontrar proceso usando puerto 3001
lsof -i :3001

# Matar proceso
kill -9 <PID>

# O usar otro puerto en .env
PORT=3002
```

---

### Logs y Debugging

```bash
# Ver logs en tiempo real
tail -f server.log

# Ver logs de PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-16-main.log

# Habilitar modo debug de Sequelize
# En database.js:
const sequelize = new Sequelize(..., {
  logging: console.log  // Ver todas las queries SQL
});
```

---

## 📝 Notas Importantes

### Seguridad en Producción

⚠️ **ANTES DE DESPLEGAR:**

1. **Cambiar JWT_SECRET**: Usa una cadena aleatoria larga

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. **Cambiar contraseña de PostgreSQL**

```bash
sudo -u postgres psql
ALTER USER postgres PASSWORD 'nueva-contraseña-segura';
```

3. **Configurar CORS correctamente**

```javascript
cors({
  origin: "https://tu-dominio.com",
  credentials: true,
});
```

4. **Usar HTTPS**: Nunca JWT sobre HTTP en producción

5. **Variables de entorno**: Usar servicios como AWS Secrets Manager

6. **Rate limiting**: Implementar para prevenir ataques

```bash
npm install express-rate-limit
```

7. **Helmet**: Seguridad de headers HTTP

```bash
npm install helmet
```

---

### Performance

**Índices en PostgreSQL:**

```sql
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_role ON usuarios("roleId");
CREATE INDEX idx_audit_entidad ON audit_logs(entidad);
CREATE INDEX idx_audit_fecha ON audit_logs("createdAt");
```

**Pool de conexiones** (ya configurado en `database.js`):

```javascript
pool: {
  max: 10,
  min: 0,
  acquire: 30000,
  idle: 10000
}
```

---

### Backup de Base de Datos

```bash
# Hacer backup
pg_dump -U postgres usuarios_db > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql -U postgres usuarios_db < backup_20251210.sql
```

---

## 📚 Recursos Adicionales

- [Documentación de Sequelize](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 👥 Usuarios de Prueba

| Email                     | Contraseña | Rol         | Permisos  |
| ------------------------- | ---------- | ----------- | --------- |
| carlos.garcia@example.com | admin123   | Super Admin | Todos     |
| pedro.perez@example.com   | pass123    | Admin       | Limitados |

---

## 📄 Licencia

Este proyecto es privado y de uso académico.

---

## ✉️ Soporte

Para reportar problemas o solicitar características, contacta al equipo de desarrollo.

---

**Última actualización:** Diciembre 10, 2025
