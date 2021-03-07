import Head from 'next/head'
import Layout from 'components/Layout'
import { useQuery, gql } from '@apollo/client'
import Feed from 'components/Feed'
import { FeedRow } from 'graphql/db'
import { ColumnLeft, ColumnRight, Columns } from 'components/Card'
import { useState } from 'react'

const query = gql`
  query feed($lastCreatedAt: String!, $fellowship: String!) {
    feed(lastCreatedAt: $lastCreatedAt, fellowship: $fellowship) {
      id
      name
      dp
      fellowship
      type
      announcement_title
      announcement_body      
      created_ts
      updated_ts
    }
  }
`

type QueryData = {
  feed: FeedRow[];
}

type QueryVars = {
  lastCreatedAt: String;
  fellowship: String;
}

export default function Home() {

  let [fellowship, setFellowship] = useState('founders')

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    query,
    {
      variables: { lastCreatedAt: '2021-02-14 17:23', fellowship },
    },
  )

  const feed = data?.feed
  if (error) {
    return <p>Error</p>
  }

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <Columns>
        <ColumnLeft> <h2>On Deck </h2></ColumnLeft>
        <ColumnRight>
          <select defaultValue={fellowship} onChange={evt => setFellowship(evt.target.value)}>
            <option value="founders">Founders</option>
            <option value="angels">Angels</option>
            <option value="writers">Writers</option>
          </select>
        </ColumnRight>
      </Columns>

      <Feed feed={feed} isLoading={loading}></Feed>

    </Layout>
  )
}
