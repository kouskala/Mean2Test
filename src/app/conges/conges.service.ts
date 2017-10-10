import { Injectable } from '@angular/core';
import { IConges } from './conges.interface';
import { GetCongesQuery } from './graphql/queries';
import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { DeleteCongeInterface, UpdateCongeInterface, CongesInterface } from './graphql/schema';
import { RemoveCongesMutation, UpdateCongesMutation } from './graphql/mutations';

@Injectable()
export class CongesService {
    private conges: ApolloQueryObservable<CongesInterface>;
    private apollo: Apollo;

    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }

    get(): ApolloQueryObservable<CongesInterface> {
        // Query conges data with observable variables
        this.conges = this.apollo.watchQuery<CongesInterface>({
            query: GetCongesQuery,
        })
            // Return only conges, not the whole ApolloQueryResult
            .map(result => result.data.conges) as any;
        return this.conges;
    }
    delete(id: string): Promise<any> {
        // Call the mutation called deletePost
        return new Promise((resolve, reject) => {
            this.apollo.mutate<DeleteCongeInterface>({
                mutation: RemoveCongesMutation,
                variables: {
                    "id": id
                },
            })
                .take(1)
                .subscribe({
                    next: ({ data }) => {
                        console.log('delete conge', data.removeConges);
                        // update data
                        resolve({
                            success: true,
                            message: `Conges #${id} deleted successfully  `
                        });
                    },
                    error: (errors) => {
                        console.log('there was an error sending the query', errors);
                        reject({
                            success: false,
                            message: errors
                        })
                    }
                });
        });
    }


}