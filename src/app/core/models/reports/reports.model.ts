export type ReportGroupBy = 'producto' | 'categoria' | 'color' | 'talla';
export type ReportPeriod = 'dia' | 'semana' | 'mes' | 'año';

export interface SalesReportResponse {
  range: { start: string; end: string };
  groupBy: ReportGroupBy;
  period: ReportPeriod;
  byDimension: { label: string; total: number }[];
  byPeriod: { period: string; total: number }[];
}
