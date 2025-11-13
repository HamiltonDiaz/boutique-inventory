export interface AutocompleteDto<T = unknown> {
  id: string;
  label: string;
  data?: T
}