import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            accessToken
            user {
                id
                email
                name
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            accessToken
            user {
                id
                email
                name
            }
        }
    }
`;

export const CREATE_URL_MUTATION = gql`
    mutation CreateUrl($input: CreateUrlInput!) {
        createUrl(input: $input) {
            id
            shortCode
            originalUrl
            createdAt
        }
    }
`;


export const DELETE_URL_MUTATION = gql`
    mutation DeleteUrl($urlId: String!) {
        deleteUrl(urlId: $urlId)
    }
`