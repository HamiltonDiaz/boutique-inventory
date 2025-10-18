import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, TopbarComponent, SidebarComponent, RouterOutlet, BreadcrumbsComponent, CardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutsComponent {
  // estado global del layout (ej. sidebar colapsado)
  collapsed: boolean = false;
}
