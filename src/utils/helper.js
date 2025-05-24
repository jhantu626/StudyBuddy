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

function isValidBatchName(name) {
  const validPattern = /^[a-zA-Z0-9\s\(\)\-]+$/;
  return validPattern.test(name);
}

function convertTo24HourFormat(time12h) {
  // Replace any unusual whitespace characters (like U+202F or U+00A0) with a regular space
  time12h = time12h.replace(/[\u202F\u00A0]/g, ' ').trim();

  const [time, modifier] = time12h.split(' ');
  let [hours, minutes, seconds] = time.split(':');

  hours = parseInt(hours, 10);

  if (modifier.toUpperCase() === 'AM') {
    if (hours === 12) hours = 0;
  } else if (modifier.toUpperCase() === 'PM') {
    if (hours !== 12) hours += 12;
  }

  // Pad with leading zeros
  hours = String(hours).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function convertTo12Hour(time24) {
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

export {
  isValidIndianMobile,
  validateName,
  isValidBatchName,
  convertTo24HourFormat,
  convertTo12Hour,
};
