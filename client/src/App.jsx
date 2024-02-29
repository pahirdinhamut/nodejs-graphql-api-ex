import {useState} from 'react'
import {ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";
import Clients from "./component/Clients.jsx";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: cache

})

function App() {
    return (
        <ApolloProvider client={client}>
            <div className={"container"}>
                <h1>Client Management System</h1>
                <Clients/>
            </div>
        </ApolloProvider>
    )
}

export default App
