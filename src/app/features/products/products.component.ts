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
import { lastValueFrom } from 'rxjs';
import { ICols } from '../../core/dtos/icos.dto';
import { HelpersService } from '../../core/services/common/helper.service';
import { ListElementDto } from '../../core/dtos/list-element.dto';
import { ProductModel } from '../../core/models/product/product.model';
import { ProductService } from '../../core/services/product/product.services';
import { CreateProductDto } from '../../core/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../core/dtos/product/update-product.dto';
import { CategoryService } from '../../core/services/category/category.services';
import { CategoryModel } from '../../core/models/category/category.model';


@Component({
  selector: 'app-products',
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
    ToggleSwitchModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  customersTable: ProductModel[] = [];
  selectedCustomers!: ProductModel[] | null;
  public frm!: FormGroup;
  createRegister: boolean = true;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  categories: ListElementDto[] = [];

  columns: ICols[] = [
    {
      field: 'persona.instrucciones_de_cuidado',
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
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    this.loadForm();
    await this.loadDatForTable();
    await this.loadCategories();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      nombre: [{ value: null, disabled: false }, Validators.required],
      descripcion: [{ value: null, disabled: false }, Validators.required],
      instrucciones_de_cuidado: [
        { value: null, disabled: false },
        Validators.required,
      ],
      cantidad_stock: [{ value: null, disabled: false }, 
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      id_categoria: [{ value: null, disabled: false }, Validators.required],
    });
  }

  async loadCategories(): Promise<void> {
    const response = await lastValueFrom(this._categoryService.findAll());
    
    if (response.status !== 200) {
      console.error('Error al cargar los clientes:', response.message);
      return;
    }

     this.categories = response.data.map((item: CategoryModel) => ({
          value: item.id_categoria,
          name: item.nombre
      }));
  }

  hideDialog(): void {
    this.createEditDialog = false;
    this.createRegister = true;
  }

  async loadDatForTable(): Promise<void> {
    const response = await lastValueFrom(this._productService.findAll());
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

  buildDataToSave(): CreateProductDto | UpdateProductDto {
    const formValues = this.frm.getRawValue();
    return {
      id_producto: this.idRegisterToEdit,
      nombre: formValues.nombre,
      descripcion: formValues.descripcion,
      instrucciones_de_cuidado: formValues.instrucciones_de_cuidado,
      cantidad_stock: formValues.cantidad_stock,
      id_categoria: formValues.id_categoria,
    };
  }

  buildDataToUpdate(item: ProductModel): void {
    this.frm.controls['nombre'].setValue(item.nombre);
    this.frm.controls['descripcion'].setValue(item.descripcion);
    this.frm.controls['instrucciones_de_cuidado'].setValue(
      item.instrucciones_de_cuidado
    );
    this.frm.controls['cantidad_stock'].setValue(item.cantidad_stock);
    this.frm.controls['id_categoria'].setValue(item.id_categoria);
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
    const data: CreateProductDto | UpdateProductDto = this.buildDataToSave();

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._productService.create(data)
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
        this._productService.update(this.idRegisterToEdit, data)
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
    this.clearForm();
    this.hideDialog();
  }

  clearForm() {
    this.frm.reset();
  }

  editRegister(item: ProductModel) {
    this.idRegisterToEdit = item.id_producto;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  deleteRegister(item: ProductModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo ' +
        `${item.nombre}`.toUpperCase().trim() +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._productService.delete(item.id_producto)
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
