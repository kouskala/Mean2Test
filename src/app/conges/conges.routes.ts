import { CongesListComponent } from './conges-list/conges-list.component';
import { NewCongesComponent } from './new-conges/new-conges.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { congesDetailComponent } from './conges-detail/conges-detail.component';



export const routes = [
    {
        path: '', children: [
            { path: '', component: CongesListComponent },
            { path: 'conges-detail/:id', component: congesDetailComponent },
            { path: 'new', component: NewCongesComponent },
            { path: 'edit/:id', component: EditCongesComponent }

        ]
    },
];