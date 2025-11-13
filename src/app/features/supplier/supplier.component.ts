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

import { lastValueFrom } from 'rxjs';
import { ICols } from '../../core/dtos/icos.dto';
import { HelpersService } from '../../core/services/common/helper.service';
import { ListElementDto } from '../../core/dtos/list-element.dto';
import { SupplierModel } from '../../core/models/supplier/supplier.model';
import { SupplierService } from '../../core/services/supplier/supplier.services';
import { CountryService } from '../../core/services/country/country.services';
import { CountryModel } from '../../core/models/country/country.model';
import { CreateSupplierDto } from '../../core/dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../../core/dtos/supplier/update-supplier.dto';

@Component({
  selector: 'app-supplier',
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
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class SupplierComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  componentTitle: string = 'Proveedores';
  customersTable: SupplierModel[] = [];
  selectedRegister!: SupplierModel[] | null;
  public frm!: FormGroup;
  createRegister: boolean = true;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  optionsCountries: ListElementDto[] = [];
  columns: ICols[] = [
    {
      field: 'persona.cedula',
      header: 'Identificación',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'razon_social',
      header: 'Razón social',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'marca',
      header: 'Marca',
      class: 'text-center w-5rem',
      minWidth: '8rem',
      order: true,
      filterable: true,
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
    private _supplierService: SupplierService,
    private _countryService: CountryService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    this.loadForm();
    await this.loadCountriesOptions();
    await this.loadDatForTable();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      razon_social: [{ value: null, disabled: false }, Validators.required],
      marca: [{ value: null, disabled: false }, Validators.required],
      cedula: [
        { value: null, disabled: false },
        Validators.compose([
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(6),
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      nombre: [{ value: null, disabled: false }, ],
      apellido: [{ value: null, disabled: false }, ],
      correo: [
        { value: null, disabled: false },
        Validators.compose([Validators.required, Validators.email]),
      ],
      telefono: [
        { value: null, disabled: false },
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(6),
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      genero: [{ value: null, disabled: false }, Validators.required],
      ciudad: [{ value: null, disabled: false }, Validators.required],
      edad: [{ value: null, disabled: false }, Validators.required],
      id_pais: [{ value: null, disabled: false }, Validators.required],
    });
  }

  async loadCountriesOptions(): Promise<void> {
    const response = await lastValueFrom(this._countryService.findAll());
    if (response.status !== 200 && response.status !== 204) {
      console.error('Error al cargar los países:', response.message);
      return;
    }
    this.optionsCountries = response.data.map((country: CountryModel) => ({
      value: country.id_pais,
      name: country.nombre
  }));
  }


  hideDialog(): void {
    this.createEditDialog = false;
    this.createRegister = true;
  }

  async loadDatForTable(): Promise<void> {
    const response = await lastValueFrom(this._supplierService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los clientes:', response.message);
      return;
    }
    this.customersTable = response.data;
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

  buildDataToSave(): CreateSupplierDto | UpdateSupplierDto {
    const formValues = this.frm.getRawValue();
    return {
      proveedor: {
        razon_social: formValues.razon_social,
        marca: formValues.marca,
      },
      persona: {
        cedula: formValues.cedula,
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        correo: formValues.correo,
        telefono: formValues.telefono,
        genero: formValues.genero,
        ciudad: formValues.ciudad,
        edad: formValues.edad,
        id_pais: formValues.id_pais,
      },
    };
  }

  buildDataToUpdate(item: SupplierModel):void {  
    this.frm.controls['razon_social'].setValue(item.razon_social);
    this.frm.controls['marca'].setValue(item.marca);
    this.frm.controls['cedula'].setValue(item.persona.cedula);
    this.frm.controls['nombre'].setValue(item.persona.nombre);
    this.frm.controls['apellido'].setValue(item.persona.apellido);
    this.frm.controls['correo'].setValue(item.persona.email);
    this.frm.controls['telefono'].setValue(item.persona.telefono);
    this.frm.controls['genero'].setValue(item.persona.genero);
    this.frm.controls['ciudad'].setValue(item.persona.ciudad);
    this.frm.controls['edad'].setValue(item.persona.edad);
    this.frm.controls['id_pais'].setValue( item.persona.pais.id_pais);    
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
    const data: CreateSupplierDto | UpdateSupplierDto = this.buildDataToSave();

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._supplierService.create(data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el registro: ',
          life: 3000,
        });
      });
      if (response?.status == 200 || response?.status == 201 ){
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
        this._supplierService.update(this.idRegisterToEdit,data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el registro: ' + error.message,
          life: 3000,
        });
      });
      if (response?.status == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Registro actualizado exitosamente',
          life: 3000,
        });
      }
    }

    this.loadingButtonSave = false;
    await this.loadDatForTable();
    this.clearForm()
    this.hideDialog();
  }


  clearForm() {
    this.frm.reset();
  }
  
  editRegister(item: SupplierModel) {    
    this.idRegisterToEdit = item.id_proveedor;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }



  deleteRegister(item: SupplierModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo ' +
        `${item.persona.nombre} ${item.persona.apellido}`.toUpperCase().trim() +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._supplierService.delete(item.id_proveedor)
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
        await this.loadDatForTable();
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
