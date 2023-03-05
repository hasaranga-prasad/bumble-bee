import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/main/main.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'products',
    component: MainComponent,
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'categories',
    component: MainComponent,
    loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'brands',
    component: MainComponent,
    loadChildren: () => import('./modules/brands/brands.module').then(m => m.BrandsModule),
  },
  {
    path: 'users',
    component: MainComponent,
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
