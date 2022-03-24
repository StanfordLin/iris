import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_TIMELINE } from '../utils/queries'
import Follow from "../components/Follow"
import Card from "../components/Card"

function User({ profile }) {
    const [notFound, setNotFound] = useState(false)
    const [publications, setPublications] = useState([])
    const { loading, error, data } = useQuery(GET_TIMELINE, {
      variables: {
        request: {
          profileId: profile.id,
        }
      }
    })

    useEffect(() => {
      if (!data) return;

      if (data.timeline.items.length < 1) {
        setNotFound(true)
        return
      }
      
      setPublications(data.timeline.items)
    
    }, [data])
    
    if (notFound) {
      return <>
        <h2>Feed</h2>
        <h3>No posts, go follow some profiles!</h3>
      </>
    }

    return (
      <>
        <main>
          <h2>Feed</h2>
          {
            publications.map((post) => {
              return <Card key={post.id}>
                <h3>{post.metadata.name}</h3>
                {post.metadata.description}
                </Card>
            })
          }
        </main>
      </>
    );
  }

export default User