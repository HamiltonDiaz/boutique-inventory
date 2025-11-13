import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { PasswordModule } from 'primeng/password';
import { lastValueFrom } from 'rxjs';
import { ICols } from '../../core/dtos/icos.dto';
import { HelpersService } from '../../core/services/common/helper.service';
import { ListElementDto } from '../../core/dtos/list-element.dto';
import { SizeModel } from '../../core/models/size/size.model';
import { SizeService } from '../../core/services/size/size.services';
import { CreateSizeDto } from '../../core/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../core/dtos/size/update-size.dto';

@Component({
  selector: 'app-size',
    standalone: true,
  imports: [
    TableModule,
    Dialog,
    SelectModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    CommonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class SizeComponent implements OnInit {
@ViewChild('table_custom') table_custom!: Table;
  componentTitle: string = 'Tallas';
  dataForTable: SizeModel[] = [];
  selectedRegister!: SizeModel[] | null;
  public frm!: FormGroup;
  createRegister: boolean = true;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  optionsCountries: ListElementDto[] = [];
  columns: ICols[] = [
    {
      field: 'id_talla',
      header: 'id',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'talla',
      header: 'Nombre',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'actions',
      header: 'Acciones',
      class: 'text-center w-10rem',
      minWidth: '10rem',
      order: false,
      filterable: true,
    },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _sizeService: SizeService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    this.loadForm();
    await this.loadDataForTable();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      talla: [
        { value: null, disabled: false },
        Validators.compose([Validators.required]),
      ]
    });
  }

  hideDialog(): void {
    this.createEditDialog = false;
    this.createRegister = true;
  }

  async loadDataForTable(): Promise<void> {
    const response = await lastValueFrom(this._sizeService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los registros:', response.message);
      return;
    }
    this.dataForTable = response.data;
  }

  /**
   * Obtiene las claves de campo que permiten filtrado en la tabla.
   *
   * @returns Array de cadenas con los nombres de campo en `cols` donde `filterable === true`.
   */
  getFilterFields(): string[] {
    return this.columns.filter((col) => col.filterable).map((col) => col.field);
  }

  openModalNew() {
    this.createRegister = true;
    this.titleDialog = 'Crear nuevo registro';
    this.idRegisterToEdit = 0;
    this.createEditDialog = true;
  }

  buildDataToSave(): CreateSizeDto | UpdateSizeDto {

    const formValues = this.frm.getRawValue();
    return {
      id_talla: this.idRegisterToEdit,
      talla: formValues.talla,
      
    };
  }

  buildDataToUpdate(item: SizeModel): void {
    this.frm.controls['talla'].setValue(item.talla);    
  }

  async save() {
    if (this.frm.invalid) {
      this.frm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Llenar todos los campos obligatorios',
        life: 3000,
      });
      return;
    }
    this.loadingButtonSave = true;
    const data: CreateSizeDto | UpdateSizeDto = this.buildDataToSave();

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._sizeService.create(data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el registro: ' + error.message,
          life: 3000,
        });
      });
      if (response?.status == 200 || response?.status == 201) {
        this.messageService.add({
          severity: 'success',
          summary: 'Mensaje del sistema',
          detail: 'Registro creado exitosamente',
          life: 3000,
        });
      }
    }

    if (!this.createRegister) {
      const response = await lastValueFrom(
        this._sizeService.update(this.idRegisterToEdit, data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el registro: ' + error.message,
          life: 3000,
        });
      });
      if (response?.status == 200 || response?.status == 201) {
        this.messageService.add({
          severity: 'success',
          summary: 'Mensaje del sistema',
          detail: 'Registro actualizado exitosamente',
          life: 3000,
        });
      }
    }

    this.loadingButtonSave = false;
    await this.loadDataForTable();
    this.clearForm();
    this.hideDialog();
  }

  clearForm() {
    this.frm.reset();
  }

  editRegister(item: SizeModel) {
    this.idRegisterToEdit = item.id_talla;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  deleteRegister(item: SizeModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo ' +
        `${item.talla}`.toUpperCase().trim() +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._sizeService.delete(item.id_talla)
        ).catch((error) => {
          console.error('Error al eliminar el registro:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el registro',
            life: 3000,
          });
        });
        if (response?.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Registro eliminado',
            life: 3000,
          });
        }
        await this.loadDataForTable();
      },
    });
  }

  deleteAllRegisters() {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar los registros seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
    });
  }
  exportDataCSV(event?: Event) {
    this.table_custom.exportCSV();
  }
}
