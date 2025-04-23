export const toPercentage = (
  number: number,
  precision = 0,
  locale = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: precision,
  }).format(number);
};
