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
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PurchaseModel } from '../../core/models/purchase/purchase.model';
import { AutocompleteDto } from '../../core/dtos/autocomplete.dto';
import { FullProductModel } from '../../core/models/product/full-product.model';
import { ArticlePurchaseDto } from '../../core/dtos/purchase/article-purchase-dto';
import { FullProductService } from '../../core/services/product/full-product.services';
import { SupplierService } from '../../core/services/supplier/supplier.services';
import { PurchaseService } from '../../core/services/purchase/purchase.services';
import { SupplierModel } from '../../core/models/supplier/supplier.model';
import { CreatePurchaseDto } from '../../core/dtos/purchase/create-purchase.dto';
import { UpdatePurchaseDto } from '../../core/dtos/purchase/update-purchase.dto';
import { ArticlePurchaseModel } from '../../core/models/purchase/article-purchase.model';

@Component({
  selector: 'app-purchase',
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
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FloatLabelModule,
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class PurchaseComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  dataForTable: PurchaseModel[] = [];
  selectedRegister!: PurchaseModel[] | null;
  componentTitle: string = 'Compras';
  public frm!: FormGroup;
  createRegister: boolean = true;
  visualizationMode: boolean = false;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  listSuppliers: AutocompleteDto[] = [];
  filteredListSuppliers: AutocompleteDto[] = [];
  listProducts: AutocompleteDto<FullProductModel>[] = [];
  filteredListProducts: AutocompleteDto[] = [];
  articlePurchaseList: ArticlePurchaseDto[] = [];

  columnsArticles: ICols[] = [
    {
      field: 'nombre_producto',
      header: 'Nombre',
      order: true,
      filterable: true,
      class: 'text-left',
      minWidth: '25rem',
    },
    {
      field: 'cantidad_vendida',
      header: 'Cantidad',
      order: true,
      filterable: true,
      class: 'text-left 7rem',
      minWidth: '7rem',
    },
    {
      field: 'actions',
      header: 'Acciones',
      class: 'text-center 7rem',
      minWidth: '7rem',
      order: false,
      filterable: true,
    },
  ];

  columns: ICols[] = [
    {
      field: 'id_compra_inventario',
      header: 'Id',
      order: true,
      filterable: true,
      class: 'text-left w-7rem',
      minWidth: '7rem',
    },
    {
      field: 'cliente.persona.cedula',
      header: 'Cédula',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'cliente.persona.nombre',
      header: 'Nombre',
      class: 'text-left w-20rem',
      minWidth: '20rem',
      order: true,
      filterable: true,
    },
    {
      field: 'valor_total',
      header: 'Total',
      class: 'text-center w-15rem',
      minWidth: '15rem',
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
    private _supplierServices: SupplierService,
    private _purchaseServices: PurchaseService,
    private _fullProductService: FullProductService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    this.loadForm();
    await this.loadSuppliers();
    await this.loadProducts();
    await this.loadDataForTable();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      id_pxc: [{ value: null, disabled: false }],
      id_proveedor: [{ value: null, disabled: false }, Validators.required],
      cantidad: [
        { value: null, disabled: false },
        Validators.compose([Validators.pattern('^[0-9]*$')]),
      ],
    });
  }

  hideDialog(): void {
    this.createEditDialog = false;
    this.visualizationMode = false;
    this.createRegister = true;
    this.clearForm();
    this.frm.controls['id_proveedor'].enable();
    this.frm.controls['id_pxc'].enable();
    this.frm.controls['cantidad'].enable();
  }

  async loadDataForTable(): Promise<void> {
    const response = await lastValueFrom(this._purchaseServices.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar datos de tabla:', response.message);
      return;
    }
    this.dataForTable = response.data;
  }

  async loadSuppliers(): Promise<void> {
    const response = await lastValueFrom(this._supplierServices.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los proveedores:', response.message);
      return;
    }
    this.listSuppliers = response.data.map((item: SupplierModel) => ({
      id: item.id_proveedor, // Este será el valor que se guarde
      label: `${item.persona.cedula} - ${item.razon_social}`.toUpperCase(),
      data: item,
    }));
  }

  async loadProducts(): Promise<void> {
    const response = await lastValueFrom(this._fullProductService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los productos:', response.message);
      return;
    }
    this.listProducts = response.data.map((item: FullProductModel) => ({
      id: item.id_pxc.toString(), // Este será el valor que se guarde
      label:
        `${item.producto.nombre} - ${item.color.color}/${item.talla.talla}`.toUpperCase(),
      data: item,
    }));
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
    this.visualizationMode = false;
    this.createRegister = true;
    this.titleDialog = 'Crear nuevo registro';
    this.idRegisterToEdit = 0;
    this.createEditDialog = true;
  }

  editRegister(item: PurchaseModel) {
    this.idRegisterToEdit = item.id_compra_inventario;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  openModalSee(item: PurchaseModel) {
    this.createRegister = false;
    this.visualizationMode = true;
    this.titleDialog = 'Ver registro';
    this.idRegisterToEdit = 0;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);

    // Luego deshabilitar los campos
    this.frm.controls['id_proveedor'].disable();
    this.frm.controls['id_pxc'].disable();
    this.frm.controls['cantidad'].disable();
  }

  buildDataToSave(): CreatePurchaseDto | UpdatePurchaseDto {
    const formValues = this.frm.getRawValue();
    return {
      id_compra_inventario: this.idRegisterToEdit,
      id_proveedor: formValues.id_proveedor.data.id_proveedor,
      id_usuario: localStorage.getItem('user_id') ?? '',
      fecha: Date.now().toString(),
      articulosCompra: this.articlePurchaseList,
    };
  }

  buildDataToUpdate(item: PurchaseModel): void {
    // Buscar el objeto completo del cliente
    const selectedSupplier = this.listSuppliers.find(
      (cliente) => cliente.id === item.id_proveedor
    );

    // Establecer el objeto completo en el FormControl
    this.frm.controls['id_proveedor'].setValue(selectedSupplier);
    const products: ArticlePurchaseDto[] = item.articulosCompra.map(
      (article: ArticlePurchaseModel) => {
        const productoCompleto = this.listProducts.find(
          (item) => item.id === article.id_pxc.toString()
        );

        return {
          id_pxc: article.id_axv,
          cantidad: article.cantidad,
          nombre_producto: productoCompleto?.label ?? '',
        };
      }
    );
    this.articlePurchaseList = products;
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

    if (this.articlePurchaseList.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Debe agregar artículos a la venta',
        life: 3000,
      });
      return;
    }
    this.loadingButtonSave = true;
    const data: CreatePurchaseDto | UpdatePurchaseDto = this.buildDataToSave();

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._purchaseServices.create(data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el registro: ' + error.error.message,
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
        this._purchaseServices.update(this.idRegisterToEdit, data)
      ).catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el registro: ' + error.error.message,
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
    this.articlePurchaseList = [];
  }

  deleteRegister(item: PurchaseModel) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar el registo?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._purchaseServices.delete(item.id_compra_inventario)
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

  filterSuppliers(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredListSuppliers = this.listSuppliers.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  }
  filterProducts(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredListProducts = this.listProducts.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  }
  addRow() {
    const quantity = this.frm.controls['cantidad'].value;
    const product = this.listProducts.find(
      (item) => item.id === this.frm.controls['id_pxc'].value
    );

    if (!product) {
      this.frm.controls['id_pxc'].setErrors({ required: true });
      this.frm.controls['id_pxc'].markAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Seleccione un producto.',
        life: 3000,
      });
      return;
    }

    if (!quantity) {
      this.frm.controls['cantidad'].setErrors({ required: true });
      this.frm.controls['cantidad'].markAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Ingrese una cantidad.',
        life: 3000,
      });
      return;
    }

    const isDuplicate = this.articlePurchaseList.some(
      (item) => item.nombre_producto === product?.label
    );

    if (isDuplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Ya agregó una registro con el mismo nombre.',
        life: 3000,
      });
      return;
    }

    this.frm.controls['cantidad'].setValue('');
    this.frm.controls['id_pxc'].setValue('');

    this.articlePurchaseList.push({
      id_pxc: product.id as number,
      nombre_producto: product?.label,
      cantidad: quantity,
    });
  }

  deleteRow(event: ArticlePurchaseDto) {
    this.articlePurchaseList = this.articlePurchaseList.filter(
      (item) => item.id_pxc !== event.id_pxc
    );
  }
}
