import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HelpersService } from '../../../core/services/common/helper.service';
import { AuthService } from '../../../core/services/auth/auth.services';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from '../../../core/dtos/auth/login.dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { Router } from '@angular/router';
import { RoutesEnum } from '../../../shared/routes.enum';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    CardModule,
    FormsModule,
    ToastModule
],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public frm!: FormGroup;
  

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService,
    private _authService: AuthService,
    private messageService: MessageService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // Aquí iría la lógica para recuperar contraseña
  }

  async login(): Promise<void> {


    if (this.frm.invalid) {
      this.frm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor completa todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    const data: LoginDto = this.frm.value;
    const response = await lastValueFrom(this._authService.login(data)).catch(
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo iniciar sesión: ',
          life: 3000,
        });
      }
    );

    if (response?.status == 200) {     
      this.messageService.add({
        severity: 'success',
        summary: 'Mensaje del sistema',
        detail: 'Inicio de sesión exitoso',
        life: 3000,
      });
      setTimeout(() => {        
        this._router.navigate([RoutesEnum.DASHBOARD]);
      }, 700);
    }
  }
}
