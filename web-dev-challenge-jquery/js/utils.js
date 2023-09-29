export function formatBrandUrl(id, brand) {
  return `/${id}${brand.toLowerCase().replace(/\s/g, "")}`;
}

export function centToDollar(cents) {
  return cents / 100;
}
