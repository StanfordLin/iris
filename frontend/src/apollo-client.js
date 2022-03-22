// import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
// //   import fetch from 'cross-fetch';
// //   import { LENS_API } from './config';
// //   import { getAuthenticationToken } from './state';
  
// function apolloClient() {
//     const LENS_API = 'https://api-mumbai.lens.dev/';
    
//     // const httpLink = new HttpLink({
//     //     uri: LENS_API,
//     //     fetch,
//     // });
        
//     // example how you can pass in the x-access-token into requests using `ApolloLink`
//     // const authLink = new ApolloLink((operation, forward) => {
//     //     const token = getAuthenticationToken();
//     //     console.log('jwt token:', token);
            
//     //     // Use the setContext method to set the HTTP headers.
//     //     operation.setContext({
//     //         headers: {
//     //         'x-access-token': token ? `Bearer ${token}` : '',
//     //         },
//     //     });
        
//     //     // Call the next link in the middleware chain.
//     //     return forward(operation);
//     // });
    
//     // const apolloClient = new ApolloClient({
//     //     link: authLink.concat(httpLink),
//     //     cache: new InMemoryCache(),
//     // });
    
//     const apolloClient = new ApolloClient({
//         uri: LENS_API,
//         cache: new InMemoryCache(),
//     });
    
//     return apolloClient
// }
  
// export default apolloClient

import { ApolloClient, InMemoryCache } from '@apollo/client'

const APIURL = 'https://api-mumbai.lens.dev/';

export const apolloClient= new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})