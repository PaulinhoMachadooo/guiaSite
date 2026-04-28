// Utilitários para busca avançada
export const removeAccents = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const normalizeSearchTerm = (term: string): string => {
  if (!term || typeof term !== "string") return "";
  return removeAccents(term.trim());
};

export const searchMatch = (text: string, searchTerm: string): boolean => {
  if (
    !text ||
    !searchTerm ||
    typeof text !== "string" ||
    typeof searchTerm !== "string"
  ) {
    return false;
  }
  const normalizedText = normalizeSearchTerm(text);
  const normalizedSearch = normalizeSearchTerm(searchTerm);
  return normalizedText.includes(normalizedSearch);
};
