import gql from 'graphql-tag';

export const GetCongesDetailQuery= gql`
     query GetCongesDetailQuery($id: ID!) {
        post(id: $id) {
            id
            title
            dateDeb
        }
    }
`;

export const GetCongesQuery = gql`
  query Conges {
    post {
        id
        title
        dateDeb
    }
  }
`;