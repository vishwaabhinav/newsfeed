import db, { FeedRow } from '../../db';

type Args = {
    lastCreatedAt: string;
    fellowship: string
}

export default async function feed(parent: unknown, { lastCreatedAt, fellowship }: Args): Promise<FeedRow[]> {
    const latestEvents: FeedRow[] = await db.getAll(buildFeedQuery(fellowship), [lastCreatedAt])
    return latestEvents;
}

function buildFeedQuery(fellowship: string): string {
    const SELECT = `
    SELECT 
        id,
        name, 
        dp,
        announcement_title,
        announcement_body,
        fellowship,
        type,
        created_ts,
        updated_ts
    FROM newsfeed`;

    const TIME_CLAUSE = `created_ts < ?`
    let FELLOWSHIP_CLAUSE = `(type = "user" and fellowship = "${fellowship}") OR 
    (type == "announcement" and (fellowship == "all" OR fellowship == "${fellowship}"))`;

    if (fellowship === 'founders' || fellowship === 'angels') {
        FELLOWSHIP_CLAUSE += ` OR (type = "user" and (fellowship = "founders" OR fellowship = "angels")) OR 
        (type = "project")`;
    }

    const WHERE = `WHERE 1=1 AND ${TIME_CLAUSE} AND (${FELLOWSHIP_CLAUSE})`

    return `${SELECT}  ${WHERE} ORDER BY created_ts DESC LIMIT 10`
}