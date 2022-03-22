import {apolloClient} from '../apollo-client';
import { gql } from '@apollo/client'

function TestQuery() {
  const handleClick = async () => {
    const query  = `
      query {
        ping
      }
    `
    const response = await apolloClient.query({
      query: gql(query),
    })
    console.log('Lens example data: ', response)
  }
  
  return (
    <div>
        <button onClick={handleClick}>Ping API</button>
    </div>
  )
}

export default TestQuery