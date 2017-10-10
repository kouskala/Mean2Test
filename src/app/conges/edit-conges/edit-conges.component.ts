import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { CongeByIdInterface } from '../graphql/schema';
import { GetCongesDetailQuery } from '../graphql/queries';
import { UpdateCongesMutation } from '../graphql/mutations';


@Component({
  selector: 'edit-conges',
  templateUrl: './edit-conges.component.html',
  styleUrls: ['./edit-conges.component.scss']
})
export class EditCongesComponent {
 form: FormGroup;
  private sub: Subscription;
  public id;
  public conges: any;

  constructor(
  formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

  public ngOnInit(): void {
    const that = this
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.apollo.watchQuery<CongeByIdInterface>({
      query: GetCongesDetailQuery,
      variables: { "id": this.id }
    }).subscribe(({ data }) => {
      that.conges = data.conges;
       this.form.setValue({title: data.conges.title, content: data.conges.dateDeb});
    });
  }

  public save() {
    if (!this.form.valid) 
      return;
    this.apollo.mutate({
      mutation: UpdateCongesMutation,
      variables: {
        "id": this.conges.id,
        "data": {
          "title": this.form.value.title,
          "dateDeb": this.form.value.dateDeb
        }
      },
    })
      .take(1)
      .subscribe({
        next: ({ data }) => {
          console.log('edit conges', data);
          // get edit data      
          this.router.navigate(['/conges']);
        }, error: (errors) => {
          console.log('there was an error sending the query', errors);
        }
      });
  }
}
