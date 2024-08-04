function checkRole(rolesAllowed, rolesGiven) {
  for (const role of rolesGiven) {
    if (rolesAllowed.includes(role)) {
      return true;
    }
  }
  return false;
}

export { checkRole };
