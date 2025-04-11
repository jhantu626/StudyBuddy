const isValidIndianMobile = number => {
  // Remove country code or spaces
  const cleanedNumber = number.replace(/^\+91|^91|\s+/g, '');

  // Check if it's exactly 10 digits and starts with 6-9
  const pattern = /^[6-9]\d{9}$/;

  return pattern.test(cleanedNumber);
};


export {isValidIndianMobile}