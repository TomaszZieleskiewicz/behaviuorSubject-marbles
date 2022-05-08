import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestObservableService } from './app.testObservableService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TestObservableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
