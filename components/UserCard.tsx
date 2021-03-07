import Link from 'next/link'
import Card, { Avatar, ColumnLeft, ColumnRight, Columns, SecondaryAvatar, SecondaryColumnLeft, SecondaryColumnRight, SecondaryContainer } from './Card'
import Markdown from './Markdown'

type Props = {
  user: User;
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
}

export default function UserCard({ user }: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Avatar src={user.avatar_url} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{user.name}</h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
          {!!user.projects.length && (
            <>
              <h3>Projects:</h3>
              {user.projects.map(p => (
                <Project key={p.id} project={p} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  )
}

function Project({ project }: { project: Project }) {
  return (
    <SecondaryContainer>
      <SecondaryColumnLeft>
        <SecondaryAvatar src={project.icon_url} />
      </SecondaryColumnLeft>
      <SecondaryColumnRight>
        <Link href={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </SecondaryColumnRight>
    </SecondaryContainer>
  )
}
