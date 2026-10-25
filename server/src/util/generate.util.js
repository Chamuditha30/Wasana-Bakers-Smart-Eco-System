//generate unique slug
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

//generate unique ref - WB/POS
export const generateRef = (prefix) => {
  const time = Date.now().toString().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-${time}-${random}`;
};
