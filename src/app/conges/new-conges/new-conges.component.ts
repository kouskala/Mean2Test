import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { GetCongesQuery } from '../graphql/queries';
import { AddCongesMutation } from '../graphql/mutations';


@Component({
  selector: 'new-conges',
  templateUrl: './new-conges.component.html',
  styleUrls: ['./new-conges.component.scss']
})
export class NewCongesComponent {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {
    this.form = formBuilder.group({
      title: ['', [
        Validators.required,
      ]],
      content: ['']
    });
    this.apollo = apollo;
  }
  public save() {
    if (!this.form.valid) return;
    this.apollo.mutate({
      mutation: AddCongesMutation,
      variables: {
        "data": {
          "title": this.form.value.title,
          "dateDeb" :this.form.value.dateDeb
        }
      },
      refetchQueries: [{
        query: GetCongesQuery,
      }],
    })
    .take(1)
      .subscribe({
        next: ({ data }) => {
          console.log('got a new Conges', data);
          // get new data      
          this.router.navigate(['/conges']);
        }, error: (errors) => {
          console.log('there was an error sending the query', errors);
        }
      });
  }
}
