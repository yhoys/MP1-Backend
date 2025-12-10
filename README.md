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

## 🎯 Uso

### Modo desarrollo:

```bash
npm run dev
```

### Modo producción:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints Principales

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario autenticado

### Usuarios

- `GET /api/usuarios` - Listar usuarios (con paginación y búsqueda)
- `GET /api/usuarios/:id` - Obtener un usuario
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar (desactivar) usuario

### Roles

- `GET /api/roles` - Listar roles
- `GET /api/roles/:id` - Obtener un rol
- `POST /api/roles` - Crear rol
- `PUT /api/roles/:id` - Actualizar rol
- `DELETE /api/roles/:id` - Eliminar (desactivar) rol

### Tipos de Documento

- `GET /api/document-types` - Listar tipos de documento
- `GET /api/document-types/:id` - Obtener un tipo
- `POST /api/document-types` - Crear tipo
- `PUT /api/document-types/:id` - Actualizar tipo
- `DELETE /api/document-types/:id` - Eliminar (desactivar) tipo

### Auditoría

- `GET /api/audit` - Consultar logs de auditoría

## 🔑 Credenciales de Prueba

Después de ejecutar `npm run seed`:

**Super Administrador:**

- Email: carlos.garcia@example.com
- Password: admin123

**Administrador:**

- Email: pedro.perez@example.com
- Password: pass123

## 📦 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de Sequelize
│   ├── controllers/             # Controladores de las rutas
│   │   ├── authController.js
│   │   ├── usuarioController.js
│   │   ├── roleController.js
│   │   ├── documentTypeController.js
│   │   └── auditController.js
│   ├── middleware/              # Middlewares personalizados
│   │   ├── auth.js             # Autenticación y autorización
│   │   ├── audit.js            # Auditoría automática
│   │   └── errorHandler.js     # Manejo de errores
│   ├── models/                  # Modelos de Sequelize
│   │   ├── index.js
│   │   ├── Usuario.js
│   │   ├── Role.js
│   │   ├── DocumentType.js
│   │   └── AuditLog.js
│   ├── routes/                  # Rutas de la API
│   │   ├── authRoutes.js
│   │   ├── usuarioRoutes.js
│   │   ├── roleRoutes.js
│   │   ├── documentTypeRoutes.js
│   │   └── auditRoutes.js
│   ├── utils/                   # Utilidades
│   │   ├── jwt.js              # Generación y verificación de JWT
│   │   └── seed.js             # Script de poblado de BD
│   └── server.js                # Punto de entrada de la aplicación
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **Express.js**: Framework web
- **Sequelize**: ORM para PostgreSQL
- **PostgreSQL**: Base de datos relacional
- **JWT**: Autenticación basada en tokens
- **bcryptjs**: Hash de contraseñas
- **CORS**: Manejo de CORS
- **Express Validator**: Validación de datos

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Control de acceso basado en permisos
- Validación de datos de entrada
- CORS configurado
- Auditoría de todas las operaciones

## 📝 Notas

- El servidor tarda unos segundos en iniciar mientras conecta a PostgreSQL
- Todos los endpoints (excepto `/api/auth/login`) requieren autenticación
- Los permisos se verifican mediante el middleware `authorize()`
- Las operaciones de modificación se auditan automáticamente
