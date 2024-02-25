import { Typography } from "@mui/material"

function Header() {
  return (
    <header>
      <Typography
        fontSize={"3rem"}
        fontWeight={"700"}
        my={"2rem"}
        textAlign={"center"}
        variant="h1"
      >
        User Registration Form
      </Typography>
      <Typography textAlign={"center"} variant="h6" component={"p"} my={"1rem"}>
        Please fill the registration form below
      </Typography>
    </header>
  )
}

export default Header
