import gql from 'graphql-tag';

export const RemoveCongesMutation = gql`
    mutation removeConges($id: ID!) {
        removeConges(id: $id) {
            id
            title
        }
    }
`;

export const UpdateCongesMutation = gql`
    mutation updateConges($id: ID!, $data: PostInput) { 
        updateConges(id: $id, data: $data) { 
            id  
            title 
            dateDeb
        }
    }
`;

export const AddCongesMutation = gql`
    mutation addConges($data: PostInput!) {
    addConges(data: $data)
    }
`;