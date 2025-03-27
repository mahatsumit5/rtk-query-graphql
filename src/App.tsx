import { useAllPostQuery } from "./services/users"

const App = () => {
  useAllPostQuery({
    page: 1,
    take: 10,
  })

  return <></>
}

export default App
