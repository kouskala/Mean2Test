import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routes } from './conges.routes';
import { CongesListComponent } from './conges-list/conges-list.component';
import { congesDetailComponent } from './conges-detail/conges-detail.component';
import { NewCongesComponent } from './new-conges/new-conges.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { CongesFilterPipe } from './conges-filter/conges-filter.pipe'

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    CongesListComponent,
    NewCongesComponent,
    EditCongesComponent,
    CongesFilterPipe,
    congesDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterialModule,
    // ApolloModule.forRoot(client)
  ],
})
export class CongesModule {
  public static routes = routes;
}