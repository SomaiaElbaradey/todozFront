import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { RegisterService } from './register.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: RegisterService,
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (!this.authService.isLogged()) {
            this.router.navigate(['/login'])
        }
        return this.authService.isLogged();
    }
}