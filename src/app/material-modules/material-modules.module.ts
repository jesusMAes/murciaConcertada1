import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';



import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    NgxChartsModule
  ],
  exports: [ 
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    NgxChartsModule
  ]
})
export class MaterialModulesModule { }
