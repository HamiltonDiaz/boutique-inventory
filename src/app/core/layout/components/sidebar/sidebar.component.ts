import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,  
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;

  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: ['/dashboard'] },
    {
      label: 'Parámetros',
      icon: 'pi pi-cog',
      items: [
        { label: 'Países', icon: 'pi pi-map', routerLink: ['/country'] },
        { label: 'Categorías', icon: 'pi pi-box', routerLink: ['/category'] },
        { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/user'] },
      ],
    },
    {
      label: 'Gestión',
      icon: 'pi pi-briefcase',
      items: [
        { label: 'Clientes', icon: 'pi pi-id-card', routerLink: ['/customers'] },
        { label: 'Productos', icon: 'pi pi-box', routerLink: ['/products'] },
      ],
    },
  ];
}
