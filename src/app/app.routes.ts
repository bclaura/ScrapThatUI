import { Routes } from '@angular/router';
import { LaptopsListComponent } from './features/laptops/laptops-list/laptops-list.component';
import { BluetoothHeadsetsListComponent } from './features/bluetooth-headsets/bluetooth-headsets-list/bluetooth-headsets-list.component';
import { FitnessBraceletsListComponent } from './features/fitness/fitness-bracelets-list/fitness-bracelets-list.component';
import { PhonesListComponent } from './features/phones/phones-list/phones-list.component';
import { SmartwatchListComponent } from './features/smartwatch/smartwatch-list/smartwatch-list.component';
import { TabletsListComponent } from './features/tablets/tablets-list/tablets-list.component';
import { AllListComponent } from './features/all/all-list/all-list.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path: 'laptops',
        component: LaptopsListComponent
    },
    {
        path: 'laptops/:page',
        component: LaptopsListComponent
    },
    {
        path: 'laptops',
        redirectTo: 'laptops/1',
        pathMatch: "full"
    },
    {
        path: 'laptops/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'bluetooth-headsets',
        component: BluetoothHeadsetsListComponent
    },
    {
        path: 'bluetooth-headsets/:page',
        component: BluetoothHeadsetsListComponent
    },
    {
        path: 'bluetooth-headsets',
        redirectTo: 'bluetooth-headsets/1',
        pathMatch: 'full'
    },
    {
        path: 'bluetooth-headsets/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'fitness',
        component: FitnessBraceletsListComponent
    },
    {
        path: 'fitness/:page',
        component: FitnessBraceletsListComponent
    },
    {
        path: 'fitness',
        redirectTo: 'fitness/1',
        pathMatch: 'full'
    },
    {
        path: 'fitness/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'phones',
        component: PhonesListComponent
    },
    {
        path: 'phones/:page',
        component: PhonesListComponent
    },
    {
        path: 'phones',
        redirectTo: 'phones/1',
        pathMatch: 'full'
    },
    {
        path: 'phones/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'smartwatch',
        component: SmartwatchListComponent
    },
    {
        path: 'smartwatch/:page',
        component: SmartwatchListComponent
    },
    {
        path: 'smartwatch',
        redirectTo: 'smartwatch/1',
        pathMatch: 'full'
    },
    {
        path: 'smartwatch/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'tablets',
        component: TabletsListComponent
    },
    {
        path: 'tablets/:page',
        component: TabletsListComponent
    },
    {  path: 'tablets', 
        redirectTo: 'tablets/1', 
        pathMatch: 'full' 
    },
    {
        path: 'tablets/p/:id',
        component: ProductDetailComponent
    },
    {
        path: 'all',
        component: AllListComponent
    },
    {
        path: 'all/:page', 
        component: AllListComponent 
    },
    {  path: 'all', 
        redirectTo: 'all/1', 
        pathMatch: 'full' 
    },
    {
        path: 'all/p/:id',
        component: ProductDetailComponent
    },


];
