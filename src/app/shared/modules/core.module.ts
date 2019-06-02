import { HttpLoadingInterceptor } from './../interceptors/http-loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from './layout.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpLoadingInterceptor
    }
  ],
  declarations: []
})
export class CoreModule { }
