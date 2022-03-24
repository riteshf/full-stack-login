module.exports = (permittedRoles) => async (req, res, next) => {
  const user = req.user;

  let isPermitted = false;
  // check if users roles and the permitted roles matches
  permittedRoles.map((role) => {
    if (user.roles.includes(role)) {
      isPermitted = true;
    }
  });

  // if it does not matches then return 403: Permission Denied
  if (!isPermitted) {
    return res.status(403).json({ message: "Permission Denied" });
  }

  // else next();
  return next();
};
