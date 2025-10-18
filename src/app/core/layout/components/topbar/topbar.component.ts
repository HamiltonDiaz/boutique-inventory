import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-topbar',
  standalone: true,  
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  collapsed = false;

  items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/dashboard'] },
    { label: 'Clientes', icon: 'pi pi-users', routerLink: ['/customers'] },
  ];

  toggle() {
    this.collapsed = !this.collapsed;    
    this.toggleSidebar.emit(this.collapsed);
  }
}
