import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { Product } from '@/domain/product';
// import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from './productservice';
import { CustomersService } from '../../core/services/customers/customers.services';
import { lastValueFrom } from 'rxjs';
import { CustomersModel } from '../../core/models/customers/customers.model';
import { ICols } from '../../core/dtos/icos.dto';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-customers',
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
    FileUpload,
    DropdownModule,
    Tag,
    RadioButton,
    Rating,
    InputTextModule,
    FormsModule,
    InputNumber,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
  ],
  providers: [MessageService, ConfirmationService, ProductService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  @ViewChild('table_custom') table_custom!: Table;
  customersTable: CustomersModel[] = [];
  selectedCustomers!: CustomersModel[] | null;

  columns: ICols[] = [
    {
      field: 'persona.cedula',
      header: 'Cédula',
      order: true,
      filterable: true,
      class: 'text-left w-10rem',
      minWidth: '10rem',
    },
    {
      field: 'persona.nombre',
      header: 'Nombre',
      order: true,
      filterable: true,
      class: 'text-left w-25rem',
      minWidth: '25rem',
    },
    {
      field: 'persona.genero',
      header: 'Género',
      class: 'text-center w-5rem',
      minWidth: '8rem',
      order: true,
      filterable: true,
    },
    {
      field: 'persona.edad',
      header: 'Edad',
      class: 'text-center w-5rem',
      minWidth: '8rem',
      order: true,
      filterable: true,
    },
    {
      field: 'activo',
      header: 'Activo',
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

  @ViewChild('dt') dt!: Table;
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private _customersService: CustomersService
  ) {}

  exportCSV(event?: Event) {
    this.dt.exportCSV();
  }

  async ngOnInit() {
    this.loadDemoData();
    await this.loadCustomers();
  }

  loadDemoData() {
    this.productService.getProducts().then((data) => {
      this.products = data;
      this.cd.markForCheck();
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string): string | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  //||||||||||||||||||||||||||||||| DATOS REALES DEL COMPONENTE |||||||||||||||||||||||||||||||

  async loadCustomers(): Promise<void> {
    const response = await lastValueFrom(this._customersService.findAll());
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
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editRegister(item: CustomersModel) {
    console.log('Editar cliente:', item);
    this.productDialog = true;
  }

  deleteRegister(item: CustomersModel) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar el registo ' +
        `${item.persona.nombre} ${item.persona.apellido}5656`
          .toUpperCase()
          .trim() +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await lastValueFrom(
          this._customersService.delete(item.id_cliente)
        ).catch((error) => {
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
        await this.loadCustomers();
      },
    });
  }

  deleteAllRegisters() {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar los registros seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => {
          console.log(val); // 👈 imprime cada elemento de this.products
          return !this.selectedProducts?.includes(val);
        });

        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }
    exportDataCSV(event?: Event) {
        this.table_custom.exportCSV();
    }

}
