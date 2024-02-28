import { Typography, Button, Stack } from "@mui/material"
import PersonalDetails from "./PersonalDetails"
import AddressDetails from "./AddressDetails"
import type { RootState } from "../store/store"

import { useAppSelector, useAppDispatch } from "../store/hooks"
import { resetDetails } from "../store/createAppSlice"

function RegistrationForm() {
   // ---------------------- STATES ---------------------
  const stage = useAppSelector((state: RootState) => state.app.stage)
  const dispatch = useAppDispatch()

   // ---------------------- MARKUP ---------------------
  return (
    <>
      <form className="registration-form">
        {stage === 1 && <PersonalDetails />}
        {stage === 2 && <AddressDetails />}
        {stage === 0 && (
          <Stack alignItems={"center"} gap={"2rem"}>
            <Typography variant="h4" textAlign={"center"}>
              Congratulations, your submission was successful!
            </Typography>
            <Button onClick={() => dispatch(resetDetails())}>Restart</Button>
          </Stack>
        )}
      </form>
    </>
  )
}

export default RegistrationForm
