import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { lastValueFrom } from 'rxjs';
import { ReportsService } from '../../core/services/reports/reports.service';
import { ReportGroupBy, ReportPeriod, SalesReportResponse } from '../../core/models/reports/reports.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    SelectModule,
    ButtonModule,
    ChartModule,
    PanelModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService],

})
export class DashboardComponent implements OnInit{
  frm!: FormGroup;

    pieData: any;
    pieOptions: any;
    barData: any;
    barOptions: any;

    loading = false;

    groupByOptions: { value: ReportGroupBy; label: string }[] = [
      { value: 'producto', label: 'Producto' },
      { value: 'categoria', label: 'Categoría' },
      { value: 'color', label: 'Color' },
      { value: 'talla', label: 'Talla' },
    ];

    periodOptions: { value: ReportPeriod; label: string }[] = [
      { value: 'dia', label: 'Día' },
      { value: 'semana', label: 'Semana' },
      { value: 'mes', label: 'Mes' },
      { value: 'año', label: 'Año' },
    ];

    constructor(
      private fb: FormBuilder,
      private messageService: MessageService,
      private reportsService: ReportsService
    ) {}

    ngOnInit(): void {
      this.frm = this.fb.group({
        start: [this.defaultStart(), Validators.required],
        end: [new Date(), Validators.required],
        groupBy: ['producto', Validators.required],
        period: ['mes', Validators.required],
      });
      this.setupChartOptions();
      this.loadReport();
    }

    defaultStart(): Date {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      return d;
    }

    async loadReport() {
      if (this.frm.invalid) {
        this.frm.markAllAsTouched();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los filtros' });
        return;
      }
      this.loading = true;
      const { start, end, groupBy, period } = this.frm.getRawValue();
      const startISO = new Date(start).toISOString();
      const endISO = new Date(end).toISOString();

      const resp = await lastValueFrom(
        this.reportsService.getSalesReport({ start: startISO, end: endISO, groupBy, period })
      ).catch((e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message || 'No se pudo cargar el reporte' });
        return null;
      });

      if (resp?.status === 200 && resp.data) {
        this.bindCharts(resp.data);
      }
      this.loading = false;
    }

    bindCharts(data: SalesReportResponse) {
      const labels = data.byDimension.map(d => d.label);
      const values = data.byDimension.map(d => Number(d.total.toFixed(2)));

      this.pieData = {
        labels,
        datasets: [{ data: values, backgroundColor: ['#42A5F5','#66BB6A','#FFA726','#AB47BC','#FF7043','#26C6DA','#7E57C2','#EC407A'] }],
      };

      const x = data.byPeriod.map(p => p.period);
      const y = data.byPeriod.map(p => Number(p.total.toFixed(2)));

      this.barData = {
        labels: x,
        datasets: [
          { type: 'bar', label: 'Total vendido', backgroundColor: '#42A5F5', data: y },
          { type: 'line', label: 'Tendencia', borderColor: '#66BB6A', fill: false, tension: 0.3, data: y },
        ],
      };
    }

    setupChartOptions() {
      this.pieOptions = { plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false };
      this.barOptions = {
        plugins: { legend: { position: 'bottom' } },
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { ticks: { callback: (v: any) => `$ ${v}` } } },
      };
    }

}
