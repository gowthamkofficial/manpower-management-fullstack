import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Loader } from './components/loader/loader';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, RouterModule, Loader],
  exports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // ApexCharts,
    NgApexchartsModule,
    Loader,
  ],
})
export class SharedModule {}
