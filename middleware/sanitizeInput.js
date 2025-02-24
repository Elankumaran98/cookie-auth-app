import sanitize from "../utils/sanitizer.js";

const sanitizeInput = (req, _res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        req.body[key] = sanitize(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        req.query[key] = sanitize(req.query[key]);
      }
    }
  }

  if (req.params) {
    for (const key in req.params) {
      if (Object.prototype.hasOwnProperty.call(req.params, key)) {
        req.params[key] = sanitize(req.params[key]);
      }
    }
  }

  next();
};

export default sanitizeInput;
