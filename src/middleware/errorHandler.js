export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Error de validación",
      errors,
    });
  }

  // Error de duplicado (unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `El ${field} ya existe`,
    });
  }

  // Error de cast (ID inválido)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "ID inválido",
    });
  }

  // Error de JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expirado",
    });
  }

  // Error genérico
  res.status(err.statusCode || 500).json({
    message: err.message || "Error del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
