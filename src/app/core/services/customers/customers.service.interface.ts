import { Observable } from "rxjs";
import { ResponseTableModel } from "../../models/common/response-table.model";
import { CustomersModel } from "../../models/customers/customers.model";
import { ResponseModel } from "../../models/common/response.model";
import { CreateCustomerDto } from "../../dtos/create-customer.dto";
import { UpdateCustomerDto } from "../../dtos/update-customer.dto";

export interface CustomersServiceInterface {
  // findAll(): Observable<ResponseTableModel<CustomersModel>>;
  findAll(): Observable<CustomersModel[]>;
  findById(id: number): Observable<ResponseModel<CustomersModel>>;
  create(data: CreateCustomerDto): Observable<ResponseModel<CustomersModel>>;
  update(data: UpdateCustomerDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}