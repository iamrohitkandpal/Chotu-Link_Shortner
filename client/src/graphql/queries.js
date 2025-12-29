import { gql } from '@apollo/client';

export const ME_QUERY = gql `
    query Me {
        me {
            id
            email
            name
        }
    }
`

export const MY_URLS_QUERY = gql `
    query myUrls {
        myUrls {
            id
            shortCode
            originalUrl
            clickCount
            createdAt
        }
    }
`