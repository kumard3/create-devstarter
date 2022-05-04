import { Link } from 'react-router-dom'

const navData = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'about',
    href: '/about',
  },
]

export default function NavComponent() {
  return (
    <div className="w-full bg-black border-b">
      <div className="flex justify-between items-center   py-6 sm:justify-between sm:space-x-10">
        <Link to="/">
          <h1>Hello</h1>
        </Link>

        <nav className="flex justify-around w-1/2">
          {navData.map((n) => {
            return (
              <Link key={n.name} to={n.href} className="hover:text-gray-300 ">
                {n.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
