import { inject, Injectable} from "@angular/core"
import { AuthServiceInterface } from "./auth.service.interface";
import { Observable, tap } from "rxjs";
import { LoginDto } from "../../dtos/auth/login.dto";
import { ResponseModel } from "../../models/common/response.model";
import { AuthRepository } from "../../repos/auth/auth.repository";
import { AuthModel } from "../../models/auth/auth.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

    private repository = inject(AuthRepository);

    constructor() { }
    login(dto: LoginDto): Observable<ResponseModel<AuthModel>> {
        return this.repository.login(dto).pipe(
            tap((response) => {
                if ((response.status === 201 || response.status === 200) && response.data?.token) {
                    localStorage.setItem('token', response.data.token);
                }
            })
        );
    }

    isAuthenticated(): boolean {
       return this.repository.isAuthenticated();
    }

    logout(): boolean {
        localStorage.removeItem('token')
        return this.repository.logout();
    }
}