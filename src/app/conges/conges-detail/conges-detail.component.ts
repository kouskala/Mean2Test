import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Subject } from 'rxjs/Subject';
import { DocumentNode } from 'graphql';
import { client } from '../graphql.client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { CongeByIdInterface } from '../graphql/schema';
import { GetCongesDetailQuery } from '../graphql/queries';


@Component({
    templateUrl: './conges-detail.component.html',
      styleUrls: ['./conges-detail.component.scss']

})

export class congesDetailComponent implements OnInit, OnDestroy {
    public pageTitle: string = 'Conges detail:';
    public conges: any;
    public errorMessage: string;
    private apollo: Apollo;
    public postControl = new FormControl();
    // Observable variable of the graphql query
    public nameFilter: Subject<string> = new Subject<string>();
    private sub: Subscription;
    public id;
    // Inject Angular2Apollo service
    constructor(apollo: Apollo, private route: ActivatedRoute) {
        this.apollo = apollo;
    }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.apollo.watchQuery<CongeByIdInterface>({
            query: GetCongesDetailQuery,
            variables: { "id": this.id }
        }).subscribe(({ data }) => {
            this.conges = data.conges;
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}