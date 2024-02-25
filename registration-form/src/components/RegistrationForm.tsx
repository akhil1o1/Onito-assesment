import { Stack, Button } from "@mui/material"
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";


function RegistrationForm() {
  return (
    <form className="registration-form">
      {/* <PersonalDetails/> */}
      <AddressDetails/>
      <Stack direction="row" my={"2rem"} justifyContent="flex-end">
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Stack>
    </form>
  )
}


export default RegistrationForm;