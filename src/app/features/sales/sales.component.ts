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
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
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
import { CustomersService } from '../../core/services/customers/customers.services';
import { CustomersModel } from '../../core/models/customers/customers.model';
import { AutocompleteDto } from '../../core/dtos/autocomplete.dto copy';
import { ArticleSalesDto } from '../../core/dtos/sales/article-sales-dto';
import { FullProductService } from '../../core/services/product/full-product.services';
import { FullProductModel } from '../../core/models/product/full-product.model';
import { CreateSalesDto } from '../../core/dtos/sales/create-sales.dto';
import { UpdateSalesDto } from '../../core/dtos/sales/update-sales.dto';
import { SalesService } from '../../core/services/sales/sales.services';
import { SalesModel } from '../../core/models/sales/sales.model';
import { ArticleSalesModel } from '../../core/models/sales/article-sales.model';

@Component({
  selector: 'app-sales',
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
    AutoCompleteModule,
    FloatLabelModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class SalesComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  dataForTable: SalesModel[] = [];
  selectedRegister!: SalesModel[] | null;
  componentTitle: string = 'Clientes';
  public frm!: FormGroup;
  createRegister: boolean = true;
  visualizationMode: boolean = false;
  createEditDialog: boolean = false;
  titleDialog: string = '';
  loadingButtonSave: boolean = false;
  idRegisterToEdit: number = 0;
  listClients: AutocompleteDto[] = [];
  filteredListClients: AutocompleteDto[] = [];
  listProducts: AutocompleteDto<FullProductModel>[] = [];
  filteredListProducts: AutocompleteDto[] = [];
  articleSalesList: ArticleSalesDto[] = [];

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
      field: 'id_venta',
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
    private _customersService: CustomersService,
    private _salesService: SalesService,
    private _fullProductService: FullProductService,
    private readonly formBuilder: FormBuilder,
    readonly _helperService: HelpersService
  ) {}

  async ngOnInit() {
    this.loadForm();
    await this.loadCustomers();
    await this.loadProducts();
    await this.loadDataForTable();
  }

  loadForm(): void {
    this.frm = this.formBuilder.group({
      id_pxc: [{ value: null, disabled: false }],
      id_cliente: [{ value: null, disabled: false }, Validators.required],
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
  }

  async loadDataForTable(): Promise<void> {
    const response = await lastValueFrom(this._salesService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar datos de tabla:', response.message);
      return;
    }
    console.log(response.data);
    this.dataForTable = response.data;
  }

  async loadCustomers(): Promise<void> {
    const response = await lastValueFrom(this._customersService.findAll());
    if (response.status !== 200) {
      console.error('Error al cargar los clientes:', response.message);
      return;
    }
    this.listClients = response.data.map((item: CustomersModel) => ({
      id: item.id_cliente, // Este será el valor que se guarde
      label:
        `${item.persona.cedula} - ${item.persona.nombre} ${item.persona.apellido}`.toUpperCase(),
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
    this.idRegisterToEdit =0;
    this.createEditDialog = true;
  }

  editRegister(item: SalesModel) {
    this.idRegisterToEdit = item.id_venta;
    this.titleDialog = 'Editar registro';
    this.createRegister = false;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  openModalSee(item: SalesModel) {
    this.createRegister = false;
    this.visualizationMode = true;
    this.titleDialog = 'Ver registro';
    this.idRegisterToEdit = 0;
    this.createEditDialog = true;
    this.buildDataToUpdate(item);
  }

  buildDataToSave(): CreateSalesDto | UpdateSalesDto {
    const formValues = this.frm.getRawValue();
    return {
      id_venta: Number(this.idRegisterToEdit),
      id_cliente: formValues.id_cliente,
      id_usuario: localStorage.getItem('user_id') ?? '',
      fecha: Date.now().toString(),
      articulosVenta: this.articleSalesList,
    };
  }

  buildDataToUpdate(item: SalesModel): void {
    //TODO: Pendiente asignar cliente

    const products: ArticleSalesDto[] = item.articulosVenta.map(
      (article: ArticleSalesModel) => {
        const productoCompleto = this.listProducts.find(
          (item) => item.id === article.id_pxc.toString()
        );
        
        return {
          id_pxc: article.id_axv.toString(),
          cantidad_vendida: article.cantidad_vendida,
          nombre_producto: productoCompleto?.label ?? '',
        };
      }
    );

    this.articleSalesList = products;
    
  }

  async save() {
    console.log(this.visualizationMode);
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

    if (this.articleSalesList.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail: 'Debe agregar artículos a la venta',
        life: 3000,
      });
      return;
    }
    this.loadingButtonSave = true;
    const data: CreateSalesDto | UpdateSalesDto = this.buildDataToSave();

    if (this.createRegister) {
      const response = await lastValueFrom(
        this._salesService.create(data)
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
        this._salesService.update(this.idRegisterToEdit, data)
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
    this.articleSalesList = [];
  }

  deleteRegister(item: SalesModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._salesService.delete(item.id_venta)
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

  filterCustomers(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredListClients = this.listClients.filter((item) =>
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

    const stock = product?.data?.cantidad ?? 0;
    if (stock == 0 || stock < quantity) {
      this.messageService.add({
        severity: 'error',
        summary: 'Mensaje del sistema.',
        detail:
          'Stock insuficiente para ' +
          product?.label +
          ' - ' +
          'Disponible: ' +
          product?.data?.cantidad,
        life: 3000,
      });
      return;
    }

    const isDuplicate = this.articleSalesList.some(
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

    this.articleSalesList.push({
      id_pxc: product.id.toString(),
      nombre_producto: product?.label,
      cantidad_vendida: quantity,
    });
  }

  deleteRow(event: ArticleSalesDto) {
    this.articleSalesList = this.articleSalesList.filter(
      (item) => item.id_pxc !== event.id_pxc
    );
  }
}
