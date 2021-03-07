import Link from 'next/link'
import Card, { Avatar, ColumnLeft, ColumnRight, Columns, SecondaryAvatar, SecondaryColumnLeft, SecondaryColumnRight, SecondaryContainer } from './Card'
import Markdown from './Markdown'

type Props = {
  project: Project;
}

type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

type User = {
  id: number;
  name: string;
  avatar_url: string;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Avatar src={project.icon_url} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{project.name}</h2>
          <Markdown>{project.description}</Markdown>
          {!!project.users.length && (
            <>
              <h3>Participants:</h3>
              {project.users.map(u => (
                <Participant key={u.id} user={u} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  )
}

function Participant({ user }: { user: User }) {
  return (
    <SecondaryContainer>
      <SecondaryColumnLeft>
        <SecondaryAvatar src={user.avatar_url} />
      </SecondaryColumnLeft>
      <SecondaryColumnRight>
        <Link href={`/users/${user.id}`}>
          {user.name}
        </Link>
      </SecondaryColumnRight>
    </SecondaryContainer>
  )
}
