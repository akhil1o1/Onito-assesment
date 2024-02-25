import Header from "./components/Header"
import RegistrationForm from "./components/RegistrationForm"
import UsersTable from "./components/UsersTable"

function App() {
  return (
    <>
      <Header />
      <main>
        <RegistrationForm />
        <UsersTable/>
      </main>
    </>
  )
}

export default App
