import { inject } from "@angular/core"
import { AuthService } from "../services/auth/auth.services"
import { Router } from "@angular/router"



export const authGuard = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if(!authService.isAuthenticated()){
        router.navigate(['/auth'])
        return false
    }
    return true
}