import Head from 'next/head'
import Layout from 'components/Layout'
import { useQuery, gql } from '@apollo/client'
import Feed from 'components/Feed'
import { FeedRow } from 'graphql/db'
import { ColumnLeft, ColumnRight, Columns } from 'components/Card'
import { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import moment from 'moment'

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
  let [feed, setFeed] = useState<FeedRow[]>([])
  let [loading, setLoading] = useState(true)
  let [lastCreatedAt, setLastCreatedAt] = useState(moment().format('YYYY-MM-DD hh:mm'))

  let { error } = useQuery<QueryData, QueryVars>(
    query,
    {
      variables: { lastCreatedAt, fellowship },
      onCompleted: (data) => {
        setFeed([...feed, ...(data?.feed || [])])
        setLoading(false)
      }
    },
  )


  if (error) {
    return <p>Error</p>
  }

  useEffect(() => {
    window.onscroll = debounce(function () {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        setLastCreatedAt(feed[feed.length - 1].created_ts)
      }
    }, 100)
  }, [feed])

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <Columns>
        <ColumnLeft> <h2>On Deck </h2></ColumnLeft>
        <ColumnRight>
          <select defaultValue={fellowship} onChange={evt => {
            setLastCreatedAt(moment().format('YYYY-MM-DD hh:mm'))
            setFeed([])
            setFellowship(evt.target.value)
          }}>
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
