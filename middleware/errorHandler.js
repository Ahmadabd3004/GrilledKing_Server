const errorHandler = (error, req, res, next) => {
  if (error.name == "SequelizeUniqueConstraintError") {
    res.status(400).json({
      message: "Email already used",
    });
  } else if (error.name == "SequelizeValidationError") {
    let errors = error.errors.map((e) => e.message);
    res.status(400).json({
      message: errors,
    });
  } else if (
    error.name == "User Not Found" ||
    error.name == "password invalid"
  ) {
    res.status(401).json({
      message: " error invalid username or email or password",
    });
  } else if (error.name == "No token") {
    res.status(401).json({ message: "No token" });
  } else if (
    error.name == "Unauthorized" ||
    error.name == "JsonWebTokenError"
  ) {
    res.status(401).json({ message: "Invalid Token" });
  } else if (error.name == "Forbidden") {
    res.status(403).json({ message: "You dont have access" });
  } else if (error.name == "Data not Found") {
    res.status(404).json({
      message: "Data Not Found",
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = errorHandler;
