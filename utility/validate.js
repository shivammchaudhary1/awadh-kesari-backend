function isValidEmail(email) {
  // Regular expression pattern for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

function checkPassStrength(pass) {
  // Regular expression to check for at least one uppercase letter, one number, and minimum 6 characters
  const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (regex.test(pass)) {
    return true;
  } else {
    return false;
  }
}

export { isValidEmail, checkPassStrength };
