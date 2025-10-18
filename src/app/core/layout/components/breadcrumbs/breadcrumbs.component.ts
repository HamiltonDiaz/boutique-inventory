import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * Componente para mostrar la navegación tipo "pan miga" (breadcrumbs).
 * Utiliza el módulo Breadcrumb de PrimeNG para crear la interfaz.
 * El componente se actualiza automáticamente con cada cambio de ruta.
 * 
 * @export
 * @class BreadcrumbsComponent
 */
@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnDestroy {
  /**
   * Lista de elementos del menú que conforman las migas de pan.
   * Cada elemento es de tipo MenuItem de PrimeNG.
   * 
   * @type {MenuItem[]}
   * @memberof BreadcrumbsComponent
   */
  items: MenuItem[] = [];

  /**
   * Elemento de inicio del breadcrumb, que es el enlace al dashboard.
   * 
   * @type {MenuItem}
   * @memberof BreadcrumbsComponent
   */
  home: MenuItem = { icon: 'pi pi-home', routerLink: ['/dashboard'] };

  private destroy$ = new Subject<void>();

  /**
   * Crea una instancia de BreadcrumbsComponent.
   * Configura la suscripción a los eventos de navegación para actualizar los breadcrumbs.
   * 
   * @param {Router} router - El servicio de enrutamiento de Angular para manejar las rutas.
   * @param {ActivatedRoute} route - El servicio que proporciona información sobre la ruta activa.
   * @memberof BreadcrumbsComponent
   */
  constructor(private router: Router, private route: ActivatedRoute) {
    // Suscripción a los eventos de navegación. Solo se ejecuta cuando se termina una navegación.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.items = this.createBreadcrumbs(this.route.root);
      });

    // Inicializa breadcrumbs en la carga inicial (por si NavigationEnd ya ocurrió)
    this.items = this.createBreadcrumbs(this.route.root);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Crea la lista de "breadcrumbs" basada en la ruta activa y sus hijos.
   * 
   * @private
   * @param {ActivatedRoute} route - La ruta activa actual.
   * @param {string} [url=''] - La URL parcial acumulada para la ruta.
   * @param {MenuItem[]} [breadcrumbs=[]] - El acumulador para los elementos del breadcrumb.
   * @returns {MenuItem[]} - Lista de elementos de tipo MenuItem que representan los breadcrumbs.
   * @memberof BreadcrumbsComponent
   */
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    // Se obtiene la lista de hijos de la ruta actual.
    const children = route.children;
    
    // Si no hay hijos, se devuelve la lista de breadcrumbs acumulados.
    if (!children || children.length === 0) {
      return breadcrumbs;
    }

    // Se recorre cada hijo de la ruta para crear su breadcrumb.
    for (const child of children) {
      // Se obtiene la URL del hijo en formato string.
      const routeURL = child.snapshot.url.map((seg) => seg.path).join('/');
      // Se crea la URL completa acumulando la ruta base.
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;
      // Se obtiene el dato 'breadcrumb' del snapshot de la ruta.
      const label = child.snapshot.data['breadcrumb'];
      
      // Si existe una etiqueta para el breadcrumb, se agrega a la lista.
      if (label) {
        breadcrumbs.push({ label, routerLink: nextUrl });
      }
      
      // Se continúa recursivamente con los posibles hijos de esta ruta.
      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }
    
    // Finalmente, se devuelve la lista de breadcrumbs generada.
    return breadcrumbs;
  }
}
