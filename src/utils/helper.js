const isValidIndianMobile = number => {
  // Remove country code or spaces
  const cleanedNumber = number.replace(/^\+91|^91|\s+/g, '');

  // Check if it's exactly 10 digits and starts with 6-9
  const pattern = /^[6-9]\d{9}$/;

  return pattern.test(cleanedNumber);
};

// In this function `false` means `true` and `true` meand `false`
function validateName(name) {
  if (typeof name !== 'string') {
    return {status: true, target: 'name', msg: 'Name must be a string.'};
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 6) {
    return {
      status: true,
      target: 'name',
      msg: 'Name must be at least 6 characters long.',
    };
  }

  if (trimmedName.length > 30) {
    return {
      status: true,
      target: 'name',
      msg: 'Name is too long. Maximum 30 characters allowed.',
    };
  }

  const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

  if (!nameRegex.test(trimmedName)) {
    return {
      status: true,
      target: 'name',
      msg: 'Name contains invalid characters.',
    };
  }

  return {status: false};
}

export {isValidIndianMobile, validateName};
