import { DocumentType } from '../models/index.js';

export const getDocumentTypes = async (req, res) => {
  try {
    const { estado } = req.query;
    const where = estado !== undefined ? { estado: estado === 'true' } : {};

    const documentTypes = await DocumentType.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(documentTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocumentTypeById = async (req, res) => {
  try {
    const documentType = await DocumentType.findByPk(req.params.id);

    if (!documentType) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    res.json(documentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.create({
      ...req.body,
      tipoAccion: 'create',
      usuarioAccion: req.usuario.email,
      fechaHoraEvento: new Date()
    });

    res.status(201).json(documentType);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El código ya existe' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const updateDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.findByPk(req.params.id);

    if (!documentType) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    await documentType.update({
      ...req.body,
      tipoAccion: 'update',
      usuarioAccion: req.usuario.email,
      fechaHoraEvento: new Date()
    });

    res.json(documentType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.findByPk(req.params.id);

    if (!documentType) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    await documentType.update({
      estado: false,
      tipoAccion: 'delete',
      usuarioAccion: req.usuario.email,
      fechaHoraEvento: new Date()
    });

    res.json({ message: 'Tipo de documento desactivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
