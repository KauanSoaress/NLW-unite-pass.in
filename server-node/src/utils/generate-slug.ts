export function generateSlug(text: string): string {
  return text
    .normalize('NFD') // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase() // converte para minúsculas
    .trim() // remove espaços no início e no fim
    .replace(/\s+/g, '-') // substitui espaços por hifens
    .replace(/[^\w\-]+/g, ''); // remove caracteres não alfanuméricos
}