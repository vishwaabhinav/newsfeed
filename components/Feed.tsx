import { FeedRow } from 'graphql/db'
import FeedCard from './FeedCard'

type Props = {
    feed: FeedRow[] | undefined
    isLoading: Boolean
}

export default function Feed({ feed, isLoading }: Props) {
    if (isLoading || !feed) {
        return (
            <FeedCard isLoading></FeedCard>
        )
    }

    return (
        <>
            {feed.map((feedrow, i) => {
                return (
                    <FeedCard feedRow={feedrow}></FeedCard>
                )
            })}
        </>
    )
}