const permit = (allowedRoles) => {
  return async (req, res, next) => {
    const {user} = req;
    // If no user or user role is not in allowedRoles, forbid
    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        const err = new Error("Forbidden: Insufficient permissions");
        err.status = 403;
        return next(err);
    }
    next();
  };
};

export default permit;