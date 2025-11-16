import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { ReportRepository } from '../../repos/reports/reports.repository';
import { ReportGroupBy, ReportPeriod, SalesReportResponse } from '../../models/reports/reports.model';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private repo = inject(ReportRepository);

  getSalesReport(params: {
    start: string;
    end: string;
    groupBy: ReportGroupBy;
    period: ReportPeriod;
  }): Observable<ResponseModel<SalesReportResponse>> {
    return this.repo.getSalesReport(params);
  }
}
