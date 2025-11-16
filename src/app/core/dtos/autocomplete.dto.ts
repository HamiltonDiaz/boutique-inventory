export interface AutocompleteDto<T = unknown> {
  id: string | number;
  label: string;
  data?: T
}