export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const mobileValidate = (number) => {
  const regexpMobile = /^[0-9\b]+$/;
  if (number === "" || regexpMobile.test(number)) {
    return true;
  }
  return false;
};
export const emailValidate = (emailid) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(emailid)) {
    return true;
  }
  return false;
};
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
export const getUniqueValuesHome = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return [...new Set(unique)];
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

/**
 * Parses the number of months from a product name.
 * @param {string} productName
 * @returns {number}
 */
export const getSupplyMonthsFromProductName = (productName) => {
  if (!productName || typeof productName !== "string") {
    return 1;
  }

  const match = productName.match(/(\d+)\s*months?/i);
  if (!match) {
    return 1;
  }

  const months = parseInt(match[1], 10);
  return Number.isNaN(months) ? 1 : months;
};

/**
 * Returns disclaimer copy derived from a product name.
 * @param {string} productName
 * @returns {{
 *   months: number,
 *   isMonthly: boolean,
 *   supplyLabel: string,
 *   packageLabel: string,
 *   starterKitLabel: string,
 *   checkInLabel: string,
 * }}
 */
export const getDisclaimerSupplyCopy = (productName) => {
  const months = getSupplyMonthsFromProductName(productName);
  const isMonthly = months === 1;

  return {
    months,
    isMonthly,
    supplyLabel: isMonthly ? "1 month supply" : `${months} months supply`,
    packageLabel: isMonthly ? "monthly package" : `${months}-month package`,
    starterKitLabel: isMonthly ? "1 month starter kit" : `${months} month starter kit`,
    checkInLabel: isMonthly
      ? "Each month,"
      : "At the end of your current supply period,",
  };
};

/**
 * Returns the billing renewal sentence for the checkout disclaimer.
 * @param {number} months
 * @param {string} priceDisplay
 * @returns {string}
 */
export const getDisclaimerBillingSentence = (months, priceDisplay) => {
  if (months === 1) {
    return `Your new billing will continue at ${priceDisplay} per month after the first 28 days.`;
  }

  return `Your next billing of ${priceDisplay} will occur after your initial ${months}-month supply.`;
};
