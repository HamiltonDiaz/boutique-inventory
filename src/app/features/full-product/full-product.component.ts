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
import { MessageModule } from 'primeng/message';
import { lastValueFrom } from 'rxjs';
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
import {
  FileSelectEvent,
  FileUpload,
  FileUploadModule,
} from 'primeng/fileupload';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { ImageModule } from 'primeng/image';

import { ICols } from '../../core/dtos/icos.dto';
import { SizeService } from '../../core/services/size/size.services';
import { ColorService } from '../../core/services/color/color.services';
import { HelpersService } from '../../core/services/common/helper.service';
import { ListElementDto } from '../../core/dtos/list-element.dto';
import { SizeModel } from '../../core/models/size/size.model';
import { ColorModel } from '../../core/models/color/color.model';
import { FullProductModel } from '../../core/models/product/full-product.model';
import { CreateFullProductDto } from '../../core/dtos/product/create-full-product.dto';
import { UpdateFullProductDto } from '../../core/dtos/product/update-full-product.dto';
import { FullProductService } from '../../core/services/product/full-product.services';
import { ProductService } from '../../core/services/product/product.services';
import { ProductModel } from '../../core/models/product/product.model';

@Component({
  selector: 'app-full-product',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    ToggleSwitchModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    Dialog,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MessageModule,
    ImageModule,
  ],
  templateUrl: './full-product.component.html',
  styleUrl: './full-product.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class FullProductComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  componentTitle: string = 'Productos completos';
  @ViewChild('foto') foto!: FileUpload;
  selectedFile?: File;
  imagePreviewUrl: string | null = null;

  public frm!: FormGroup;
  sizesList: ListElementDto[] = [];
  colorsList: ListElementDto[] = [];
  productList: ListElementDto[] = [];

  dataForTable: FullProductModel[] = [];
  selectedRegister!: FullProductModel[] | null;

  createRegister: boolean = true;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  categoriesList: ListElementDto[] = [];
  alertImageVisible: boolean = false;

  columns: ICols[] = [
    {
      field: 'producto.nombre',
      header: 'Nombre',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'talla.talla',
      header: 'Talla',
      order: true,
      filterable: true,
      class: 'text-left w-5rem',
      minWidth: '5rem',
    },
    {
      field: 'color.color',
      header: 'Color',
      class: ' w-5rem',
      minWidth: '8rem',
      order: true,
      filterable: true,
    },
    {
      field: 'precio',
      header: 'Precio',
      class: 'text-center w-5rem',
      minWidth: '8rem',
      order: true,
      filterable: true,
    },
    {
      field: 'activo',
      header: 'Activo',
      class: ' w-5rem',
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
    private _fullProductService: FullProductService,
    private _productService: ProductService,
    private _sizeService: SizeService,
    private _colorService: ColorService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    await this.loadSizes();
    await this.loadColors();
    await this.loadProducts();
    await this.loadDataForTable();
    this.loadForm();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      id_talla: [{ value: null, disabled: false }, Validators.required],
      id_producto: [{ value: null, disabled: true }, Validators.required],
      id_color: [{ value: null, disabled: false }, Validators.required],
      precio: [
        { value: null, disabled: false },
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+(\\.[0-9]+)?$'),
        ]),
      ],
      cantidad: [
        { value: null, disabled: false },
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      activo: [{ value: true, disabled: false }],
      foto: [{ value: null, disabled: false }],
    });
  }

  async loadSizes() {
    const response = await lastValueFrom(this._sizeService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar tallas:', response.message);
      return;
    }
    this.sizesList = response.data.map((item: SizeModel) => ({
      value: item.id_talla,
      name: item.talla,
    }));
  }

  async loadColors() {
    const response = await lastValueFrom(this._colorService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar tallas:', response.message);
      return;
    }
    this.colorsList = response.data.map((item: ColorModel) => ({
      value: item.id_color,
      name: item.color,
    }));
  }

  async loadProducts() {
    const response = await lastValueFrom(this._productService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar productos:', response.message);
      return;
    }
    this.productList = response.data.map((item: ProductModel) => ({
      value: item.id_producto,
      name: item.nombre,
    }));
  }

  async loadDataForTable(): Promise<void> {
    const response = await lastValueFrom(this._fullProductService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los clientes:', response.message);
      return;
    }
    this.dataForTable = response.data;
  }
  hideDialog(): void {
    this.frm.get('id_producto')?.disable();
    this.createEditDialog = false;
    this.createRegister = true;
    this.clearForm();
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
    this.frm.get('id_producto')?.enable();
    this.createRegister = true;
    this.titleDialog = 'Crear nuevo registro';
    this.idRegisterToEdit = 0;
    this.createEditDialog = true;
  }

  buildDataToSave(): CreateFullProductDto | UpdateFullProductDto {
    const formValues = this.frm.getRawValue();
    return {
      id_pxc: this.idRegisterToEdit,
      id_producto: formValues.id_producto,
      id_talla: formValues.id_talla,
      id_color: formValues.id_color,
      precio: formValues.precio,
      foto: formValues.foto,
      cantidad: formValues.cantidad,
      activo: formValues.activo,
    };
  }

  buildDataToUpdate(item: FullProductModel): void {
    this.frm.controls['id_producto'].setValue(item.id_producto);
    this.frm.controls['id_talla'].setValue(item.id_talla);
    this.frm.controls['id_color'].setValue(item.id_color);
    this.frm.controls['precio'].setValue(item.precio);
    this.frm.controls['foto'].setValue(item.foto);
    this.frm.controls['cantidad'].setValue(item.cantidad);
    this.frm.controls['activo'].setValue(item.activo);
  }

  createFormdata(data: CreateFullProductDto | UpdateFullProductDto): FormData {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    } else if (data.foto) {
      // Si se edita y existe valor (ruta / nombre) conservarlo como string
      formData.append('foto', data.foto);
    }
    formData.append('id_pxc', data.id_pxc.toString());
    formData.append('id_producto', data.id_producto.toString());
    formData.append('id_talla', data.id_talla.toString());
    formData.append('id_color', data.id_color.toString());
    formData.append('precio', data.precio.toString());
    formData.append('cantidad', data.cantidad.toString());
    formData.append('activo', data.activo.toString());
    return formData;
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

    this.alertImageVisible = false;
    this.loadingButtonSave = true;
    const data: CreateFullProductDto | UpdateFullProductDto =
      this.buildDataToSave();

    const formData = this.createFormdata(data);

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._fullProductService.create(formData)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el registro: ',
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
        this._fullProductService.update(this.idRegisterToEdit, formData)
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
    await this.loadDataForTable();
    this.clearForm();
    this.hideDialog();
  }

  clearForm() {
    this.frm.reset();
    this.frm.controls['activo'].setValue(true);
    this.idRegisterToEdit = 0;
    this.alertImageVisible = false;
    this.imagePreviewUrl = null;
    this.selectedFile = undefined;
    if (this.foto) {
      this.foto.clear();
    }
  }

  editRegister(item: FullProductModel) {
    this.idRegisterToEdit = item.id_pxc;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  deleteRegister(item: FullProductModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo ' +
        `${item.producto.nombre}`.toUpperCase().trim() +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._fullProductService.delete(item.id_producto)
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

  onSelectImage(event: FileSelectEvent) {
    const file = event.files[0];
    this.selectedFile = file;

    if (this.selectedFile) {
      this.alertImageVisible = false;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  get currentImageUrl(): string | null {
    // Prioridad: imagen nueva > imagen del servidor > null
    return this.imagePreviewUrl || this.frm?.controls['foto'].value || null;
  }

  get dialogStyle() {
    return this.currentImageUrl
      ? { width: '75vw' }
      : { width: '75vw', height: '55vh' };
  }
}
