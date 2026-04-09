

import zxcvbn from "zxcvbn";

export const validatePassword = (password) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least 1 number', met: /[0-9]/.test(password) },
    { label: 'At least 1 lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least 1 special character', met: /[!-/:-@[-`{-~]/.test(password) },
  ];

  if (!password) {
    return {
      isValid: false,
      requirements: requirements.map(r => ({ ...r, met: false }))
    };
  }

  // Final check: All 5 requirements met + zxcvbn entropy check for safety
  const metCount = requirements.filter(req => req.met).length;
  const entropy = zxcvbn(password).score;

  return {
    requirements,
    // Valid only when all 5 boxes are green
    isValid: metCount === 5 && entropy >= 2 
  };
};