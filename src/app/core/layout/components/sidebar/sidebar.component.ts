import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RoutesEnum } from '../../../../shared/routes.enum';

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
        {
          label: 'Países',
          icon: 'pi pi-map',
          routerLink: [RoutesEnum.COUNTRY],
        },
        {
          label: 'Categorías',
          icon: 'pi pi-list',
          routerLink: [RoutesEnum.CATEGORY],
        },
        {
          label: 'Colores',
          icon: 'pi pi-palette',
          routerLink: [RoutesEnum.COLOR],
        },
        {
          label: 'Tallas',
          icon: 'pi pi-arrows-h',
          routerLink: [RoutesEnum.SIZE],
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          routerLink: [RoutesEnum.USER],
        },
      ],
    },
    {
      label: 'Gestión',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Clientes',
          icon: 'pi pi-id-card',
          routerLink: [RoutesEnum.CUSTOMERS],
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-box',
          routerLink: [RoutesEnum.SUPPLIER],
        },
        {
          label: 'Productos',
          icon: 'pi pi-truck',
          routerLink: [RoutesEnum.PRODUCTS],
        },
        {
          label: 'Compras',
          icon: 'pi pi-cart-plus',
          routerLink: [RoutesEnum.PURCHASE],
        },
        {
          label: 'Ventas',
          icon: 'pi pi-qrcode',
          routerLink: [RoutesEnum.SALES],
        },
      ],
    },
  ];
}
