const SUCCESS = 200;

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class InternalServerError extends Error {
  constructor(message = "Server Error") {
    super(message);
    this.name = "ServerError";
    this.statusCode = 409;
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

module.exports = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  SUCCESS,
};
