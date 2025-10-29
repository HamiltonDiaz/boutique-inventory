import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../services/auth/auth.services';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-topbar',
  standalone: true,  
  imports: [CommonModule, MenubarModule, ButtonModule,MenuModule,ToastModule],
  providers: [MessageService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private messageService: MessageService,
    ) { }
  ngOnInit(): void {
     this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout(),
                    }
                ]
            }
        ];
  }
  @Output() toggleSidebar = new EventEmitter<boolean>();
  collapsed = false;

  items: MenuItem[] | undefined;

  logout() {
    if(!this._authService.logout()){

    this.messageService.add({
        severity: 'success',
        summary: 'Mensaje del sistema',
        detail: '¡Hasta pronto!',
        life: 3000,
      });
      setTimeout(() => {        
        this._router.navigate(['auth']);
      }, 700);
        
    }
  }

  toggle() {
    this.collapsed = !this.collapsed;    
    this.toggleSidebar.emit(this.collapsed);
  }
}
