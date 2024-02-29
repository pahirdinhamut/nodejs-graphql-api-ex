import {gql} from "@apollo/client";

const GET_Clients = gql`
    query GetClients {
        clients {
        id,
        name,
        email,
        phone,
    }
    }
`

export {
    GET_Clients
}
