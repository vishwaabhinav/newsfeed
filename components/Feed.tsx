import { FeedRow } from 'graphql/db'
import Link from 'next/link'
import Card, { SecondaryAvatar, SecondaryColumnLeft, SecondaryColumnRight, SecondaryContainer } from './Card'

type Props = {
    feed: FeedRow[] | undefined
    isLoading: Boolean
}

export default function Feed({ feed, isLoading }: Props) {
    if (isLoading || !feed) {
        return (
            <Card>
                <SecondaryContainer>
                    <SecondaryColumnLeft>
                        <SecondaryAvatar src="https://avatars.dicebear.com/api/bottts/Loading.svg" />
                    </SecondaryColumnLeft>
                    <SecondaryColumnRight>
                        <p>Loading...</p>
                    </SecondaryColumnRight>
                </SecondaryContainer>
            </Card>
        )
    }

    return (
        <>
            {feed.map((feedrow, i) => {
                return (
                    <Card key={i} className={feedrow.type}>
                        <SecondaryContainer className={feedrow.type}>
                            {feedrow.type !== "announcement" &&
                                <SecondaryColumnLeft>
                                    <SecondaryAvatar src={feedrow.dp}></SecondaryAvatar>
                                </SecondaryColumnLeft>
                            }
                            <SecondaryColumnRight>
                                {getFeedCardContent(feedrow)}
                            </SecondaryColumnRight>
                            {feedrow.type !== "announcement" && <SecondaryColumnRight className="right-align">
                                {feedrow.created_ts}
                            </SecondaryColumnRight>}
                        </SecondaryContainer>
                    </Card>
                )
            })}
        </>
    )
}

function getFeedCardContent(feedrow: FeedRow): JSX.Element {
    switch (feedrow.type) {
        case "user":
            return (
                <p>
                    <Link href={"/users/" + feedrow.id}>{feedrow.name}</Link> just joined {feedrow.fellowship} fellowship
                </p>
            )
        case "project":
            return (
                <p> <Link href={"/projects/" + feedrow.id}>{feedrow.name}</Link> just got announced {feedrow.fellowship}</p>
            )
        case "announcement":
            return (
                <div>
                    <SecondaryContainer>
                        <SecondaryColumnLeft>
                            <h3>Announcement [{feedrow.fellowship}]</h3>
                        </SecondaryColumnLeft>
                        <SecondaryColumnRight className="right-align">
                            {feedrow.created_ts}
                        </SecondaryColumnRight>
                    </SecondaryContainer>
                    <h4>{feedrow.announcement_title}</h4>
                    <div>{feedrow.announcement_body}</div>
                </div>
            )
        default:
            return (
                <p>Dummy Node</p>
            )
    }
}