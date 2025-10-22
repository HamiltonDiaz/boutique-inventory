import { Observable } from "rxjs";
import { CustomersModel } from "../../models/customers/customers.model";
import { ResponseModel } from "../../models/common/response.model";
import { CreateCustomerDto } from "../../dtos/create-customer.dto";
import { UpdateCustomerDto } from "../../dtos/update-customer.dto";

export interface CustomersServiceInterface {
  findAll(): Observable<ResponseModel<CustomersModel[]>>;
  // findAll(): Observable<CustomersModel[]>;
  findById(id: string): Observable<ResponseModel<CustomersModel>>;
  create(data: CreateCustomerDto): Observable<ResponseModel<CustomersModel>>;
  update(data: UpdateCustomerDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}