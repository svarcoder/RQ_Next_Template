import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href='/useQueries' passHref>
              useQueriesExample
            </Link>
          </li>
          <li>
            <Link href='useInfiniteQuery' passHref>
              useInfiniteQueryExample
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
