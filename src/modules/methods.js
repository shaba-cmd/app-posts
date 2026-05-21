export const replaceMethod = (el) => {
  if (typeof el !== 'string') return '';
  return el.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};