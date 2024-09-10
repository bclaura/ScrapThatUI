import { Routes } from '@angular/router';
import { LaptopsListComponent } from './features/laptops/laptops-list/laptops-list.component';
import { BluetoothHeadsetsListComponent } from './features/bluetooth-headsets/bluetooth-headsets-list/bluetooth-headsets-list.component';
import { FitnessBraceletsListComponent } from './features/fitness/fitness-bracelets-list/fitness-bracelets-list.component';
import { PhonesListComponent } from './features/phones/phones-list/phones-list.component';
import { SmartwatchListComponent } from './features/smartwatch/smartwatch-list/smartwatch-list.component';
import { TabletsListComponent } from './features/tablets/tablets-list/tablets-list.component';
import { AllListComponent } from './features/all/all-list/all-list.component';

export const routes: Routes = [
    {
        path: 'laptops',
        component: LaptopsListComponent
    },
    {
        path: 'bluetooth-headsets',
        component: BluetoothHeadsetsListComponent
    },
    {
        path: 'fitness',
        component: FitnessBraceletsListComponent
    },
    {
        path: 'phones',
        component: PhonesListComponent
    },
    {
        path: 'smartwatch',
        component: SmartwatchListComponent
    },
    {
        path: 'tablets',
        component: TabletsListComponent
    },
    {
        path: 'all',
        component: AllListComponent
    }

];
