import { FeedRow } from 'graphql/db'
import Link from 'next/link'
import Card, { SecondaryAvatar, SecondaryColumnLeft, SecondaryColumnRight, SecondaryContainer } from './Card'

type Props = {
    feedRow?: FeedRow
    isLoading?: boolean
}

const ANNOUNCEMENT_TYPE: string = "announcement"
const PROJECT_TYPE: string = "project"
const USER_TYPE: string = "user"

export default function FeedCard({ feedRow, isLoading }: Props) {
    const dp = isLoading ? "https://avatars.dicebear.com/api/bottts/Loading.svg" : feedRow?.dp
    const isAnnouncement = feedRow?.type === ANNOUNCEMENT_TYPE

    return (
        <Card className={feedRow?.type}>
            <SecondaryContainer>
                {!isAnnouncement && <SecondaryColumnLeft>
                    <SecondaryAvatar src={dp} />
                </SecondaryColumnLeft>}
                {getContent(feedRow)}
            </SecondaryContainer>
        </Card>
    )
}

function getContent(feedrow: FeedRow | undefined): JSX.Element | undefined {
    switch (feedrow?.type) {
        case ANNOUNCEMENT_TYPE:
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
        case PROJECT_TYPE:
            return (
                <>
                    <SecondaryColumnRight>
                        <p>
                            Project <Link href={"/projects/" + feedrow.id}>{feedrow.name}</Link> just got announced {feedrow.fellowship}
                        </p>
                    </SecondaryColumnRight>
                    <SecondaryColumnRight className="right-align">
                        {feedrow.created_ts}
                    </SecondaryColumnRight>
                </>
            )
        case USER_TYPE:
            return (
                <>
                    <SecondaryColumnRight>
                        <p>
                            <Link href={"/users/" + feedrow.id}>{feedrow.name}</Link> just joined <b>{feedrow.fellowship}</b> fellowship
                        </p>
                    </SecondaryColumnRight>
                    <SecondaryColumnRight className="right-align">
                        {feedrow.created_ts}
                    </SecondaryColumnRight>
                </>
            )
        default:
            (
                <p>Loading...</p>
            )
    }
}