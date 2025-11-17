import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import {
  ReportGroupBy,
  ReportPeriod,
  SalesReportResponse,
} from '../../models/reports/reports.model';

export interface ReportRepositoryInterface {
  getSalesReport(params: {
    start: string;
    end: string;
    groupBy: ReportGroupBy;
    period: ReportPeriod;
  }): Observable<ResponseModel<SalesReportResponse>>;
}
