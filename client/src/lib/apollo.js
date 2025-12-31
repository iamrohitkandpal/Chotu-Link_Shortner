import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

// GraphQL endpoint
const httpLink = new HttpLink({
    uri: "http://localhost:3333/graphql",
});

const authLink = new SetContextLink((_, {headers}) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Instance of Apollo Client 
export const client = new ApolloClient({
    link: authLink.concat(httpLink), // Auth ko main link se chain kar diya
    cache: new InMemoryCache(), // Cache ko initialize kar diya
});