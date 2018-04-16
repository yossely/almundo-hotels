import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HotelsService } from './core/hotels.service';

import { HotelsModule } from './hotels/hotels.module';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HotelsModule,
    FlexLayoutModule,
    // Material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [HotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
