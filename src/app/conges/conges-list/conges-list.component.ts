import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Subject } from 'rxjs/Subject';
import { DocumentNode } from 'graphql';
import { CongesService } from '../conges.service';
import { MdSnackBar } from '@angular/material';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { CongesInterface } from '../graphql/schema';
@Component({
  selector: 'conges-list',
  templateUrl: './conges-list.component.html',
  styleUrls: ['./conges-list.component.scss']
})
export class CongesListComponent implements OnInit {
  // Observable with GraphQL result


  public conges: ApolloQueryObservable<CongesInterface>;
  public listCongesFilter: string;
  public congesControl = new FormControl();
  private nameFilter: Subject<string> = new Subject<string>();

  // Inject Angular2Apollo service
  constructor(private _postService: CongesService, public snackBar: MdSnackBar) {
  }

  public ngOnInit() {
    console.log("plih");
    this.conges = this._postService.get();
    // Add debounce time to wait 300 ms for a new change instead of keep hitting the server
    this.congesControl.valueChanges.debounceTime(300).subscribe(name => {
      this.nameFilter.next(name);
    });
  }
  public deletePost(id: string) {
    this._postService.delete(id)
      .then((response) => {
        this.openSnackBar(response.message, 'Delete');
        this.conges.refetch();
      })
      .catch((error) => {
        this.openSnackBar(error.message, 'Delete');

      })
  }
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}