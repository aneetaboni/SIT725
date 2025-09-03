export function attachUserToLocals(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  req.session.success = null;
  req.session.error = null;
  next();
}

export function ensureAuth(req, res, next) {
  if (req.session?.user) return next();
  req.session.error = "Please log in first.";
  res.redirect("/login");
}

export function ensureAdmin(req, res, next) {
  if (req.session?.user?.role === "admin") return next();
  req.session.error = "Admin access required.";
  res.redirect("/login");
}
