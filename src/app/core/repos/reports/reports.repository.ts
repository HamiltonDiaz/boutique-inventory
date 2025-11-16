import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment.dev';
import { ResponseModel } from '../../models/common/response.model';
import {ReportGroupBy, ReportPeriod, SalesReportResponse} from '../../models/reports/reports.model';
import { ReportRepositoryInterface } from './report.repository.interface';

@Injectable({ providedIn: 'root' })
export class ReportRepository implements ReportRepositoryInterface {
  API_URL = `${environment.url}report/ventas`;

  constructor(private http: HttpClient) {}

  getSalesReport(params: {
    start: string;
    end: string;
    groupBy: ReportGroupBy;
    period: ReportPeriod;
  }): Observable<ResponseModel<SalesReportResponse>> {
    const httpParams = new HttpParams()
      .set('start', params.start)
      .set('end', params.end)
      .set('groupBy', params.groupBy)
      .set('period', params.period);

    return this.http.get<ResponseModel<SalesReportResponse>>(this.API_URL, {
      params: httpParams,
    });
  }
  }
