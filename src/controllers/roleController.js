import { Role } from '../models/index.js';

export const getRoles = async (req, res) => {
  try {
    const { estado } = req.query;
    const where = estado !== undefined ? { estado: estado === 'true' } : {};

    const roles = await Role.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El rol ya existe' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await role.update({ estado: false });
    res.json({ message: 'Rol desactivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
