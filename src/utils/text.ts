
export const formatPrice = (min: number | null, max: number | null) => {
  if (!min && !max) return null;
  if (min && max) return `R$ ${min} - R$ ${max}`;
  if (min) return `A partir de R$ ${min}`;
  if (max) return `Até R$ ${max}`;
  return null;
};
