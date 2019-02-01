import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryView } from './secondary.view';
import { SecondaryRoutingModule } from './secondary-routing.module';
import { SecondaryService } from './secondary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';

@NgModule({
  declarations: [
    SecondaryView
  ],
  imports: [
    CommonModule,
    SecondaryRoutingModule,
    DataSourcePropertiesModule
  ],
  providers: [
    SecondaryService
  ]
})
export class SecondaryModule { }
