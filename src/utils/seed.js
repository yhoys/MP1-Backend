import { connectDB } from '../config/database.js';
import { Usuario, Role, DocumentType } from '../models/index.js';
import sequelize from '../config/database.js';

const seed = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    // Conectar a la base de datos
    await connectDB();

    // Limpiar datos existentes (en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: true });
      console.log('🗑️  Base de datos limpiada');
    }

    // Crear roles
    console.log('📝 Creando roles...');
    const [roleSuperAdmin, roleAdmin] = await Promise.all([
      Role.create({
        nombre: 'Super Administrador',
        descripcion: 'Acceso total al sistema',
        permisos: [
          'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
          'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
          'ver_tipos_documento', 'crear_tipos_documento', 'editar_tipos_documento', 'eliminar_tipos_documento'
        ],
        estado: true
      }),
      Role.create({
        nombre: 'Administrador',
        descripcion: 'Administrador del sistema sin acceso total',
        permisos: [
          'ver_usuarios', 'crear_usuarios', 'editar_usuarios',
          'ver_roles', 'ver_tipos_documento'
        ],
        estado: true
      })
    ]);
    console.log('✅ Roles creados');

    // Crear tipos de documento
    console.log('📝 Creando tipos de documento...');
    const [tipoCC, tipoPASS, tipoCE] = await Promise.all([
      DocumentType.create({
        codigo: 'CC',
        nombre: 'Cédula de Ciudadanía',
        estado: true,
        tipoAccion: 'create',
        usuarioAccion: 'system',
        fechaHoraEvento: new Date()
      }),
      DocumentType.create({
        codigo: 'PASS',
        nombre: 'Pasaporte',
        estado: true,
        tipoAccion: 'create',
        usuarioAccion: 'system',
        fechaHoraEvento: new Date()
      }),
      DocumentType.create({
        codigo: 'CE',
        nombre: 'Cédula de Extranjería',
        estado: true,
        tipoAccion: 'create',
        usuarioAccion: 'system',
        fechaHoraEvento: new Date()
      })
    ]);
    console.log('✅ Tipos de documento creados');

    // Crear usuarios
    console.log('📝 Creando usuarios...');
    await Promise.all([
      Usuario.create({
        nombres: 'Carlos',
        apellidos: 'García Pérez',
        tipoDocumentoId: tipoCC.id,
        numeroDocumento: '1234567890',
        genero: 'Masculino',
        email: 'carlos.garcia@example.com',
        telefono: '3101234567',
        rolId: roleSuperAdmin.id,
        fechaNacimiento: '1990-05-15',
        direccion: 'Calle 10 No 20-30',
        estado: true,
        password: 'admin123'
      }),
      Usuario.create({
        nombres: 'Pedro',
        apellidos: 'Perez',
        tipoDocumentoId: tipoCC.id,
        numeroDocumento: '123456789',
        genero: 'Masculino',
        email: 'pedro.perez@example.com',
        telefono: '3123456789',
        rolId: roleAdmin.id,
        fechaNacimiento: '1995-04-12',
        direccion: 'Calle 15 No 10-50',
        estado: true,
        password: 'pass123'
      })
    ]);
    console.log('✅ Usuarios creados');

    console.log('\n✅ Seed completado exitosamente!');
    console.log('\n📋 Credenciales de prueba:');
    console.log('Super Admin:');
    console.log('  Email: carlos.garcia@example.com');
    console.log('  Password: admin123');
    console.log('\nAdmin:');
    console.log('  Email: pedro.perez@example.com');
    console.log('  Password: pass123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
};

seed();
