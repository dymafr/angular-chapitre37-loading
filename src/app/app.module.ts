import { LayoutModule } from './shared/modules/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './shared/modules/core.module';
import { FormsModule } from '@angular/forms';
import { DragDirective } from './shared/directives/drag.directive';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DragDirective,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    CoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
