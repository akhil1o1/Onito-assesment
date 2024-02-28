import { useEffect, useState, useRef } from "react"
import {
  Box,
  TextField,
  Stack,
  Autocomplete,
  Typography,
  Button,
  Divider,
} from "@mui/material"
import { object, string } from "yup"
import type { InferType } from "yup"
import states from "../data/states"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { RootState } from "../store/store"
import { updateAddressDetails, updateStage } from "../store/createAppSlice"

type Country = {
  name: {
    common: string
  }
}

interface Errors {
  pincode?: string
}

const addressDetailsSchema = object({
  address: string(),
  state: string(),
  city: string(),
  country: string(),
  pincode: string().matches(/^\d+$/, "Pincode must contain only numerics"),
})

type UserAddressDetails = InferType<typeof addressDetailsSchema>

function AddressDetails() {
  // ---------------------- STATES ---------------------
  const [errors, setErrors] = useState<Errors>({})
  const [countries, setCountries] = useState<Array<string>>([])

  const state = useAppSelector((state: RootState) => state.app)
  console.log(state)
  const dispatch = useAppDispatch()

  // ---------------------- REFS ---------------------
  const addressRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<HTMLInputElement>(null)
  const pincodeRef = useRef<HTMLInputElement>(null)

  // ---------------------- EFFECTS ---------------------
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        if (response.ok) {
          const data: Country[] = await response.json()
          const countryNames: string[] = data.map(
            (country: Country) => country.name.common,
          )
          setCountries(countryNames)
        } else {
          throw new Error("Failed to fetch countries")
        }
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchCountries()
  }, [])

  // ---------------------- FUNCTIONS ---------------------

  const handleClick = async () => {
    const details: UserAddressDetails = {
      address : addressRef.current?.value || "",
      state : stateRef.current?.value || "",
      city : cityRef.current?.value || "",
      country : countryRef.current?.value || "",
      pincode : pincodeRef.current?.value || ""
    }

    console.log(details);

    try {
      // Validate fields using Yup
      await addressDetailsSchema.validate(details, { abortEarly: false })

      // If all validations pass
      dispatch(updateAddressDetails(details))
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message
        })
      } 
      setErrors(newErrors)
    }
  }


  console.log(errors);



  // ---------------------- MARKUP ---------------------
  return (
    <Box>
      <Typography
        variant={"h2"}
        fontWeight={"500"}
        fontSize={"1.5rem"}
        sx={{ textDecoration: "underline" }}
      >
        Address Details
      </Typography>
      <Stack
        direction={"row"}
        width={"100%"}
        mt={3}
        spacing={4}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack spacing={3} width={"50%"}>
          <TextField
            id="address"
            label="Address"
            placeholder="Enter address"
            variant="outlined"
            size="small"
            inputRef={addressRef}
          />
          <Autocomplete
            disablePortal
            id="country"
            fullWidth
            size="small"
            options={countries}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Enter country"
                label="Country"
                inputRef={countryRef}
              />
            )}
          />
        </Stack>
        <Stack spacing={3} width={"50%"}>
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="city"
              label="City"
              placeholder="Enter city/town/village"
              variant="outlined"
              fullWidth
              size="small"
              inputRef={cityRef}
            />
            <Autocomplete
              disablePortal
              id="state"
              fullWidth
              size="small"
              options={states}
              renderInput={params => (
                <TextField
                  {...params}
                  label="State"
                  inputRef={stateRef}
                  placeholder="Enter state"
                />
              )}
            />
          </Stack>
          <TextField
            id="pincode"
            label="Pincode"
            placeholder="Enter pincode"
            variant="outlined"
            fullWidth
            size="small"
            error={!!errors.pincode}
            helperText={errors.pincode || ""}
            inputRef={pincodeRef}
          />
        </Stack>
      </Stack>
      <Stack direction="row" my={"2rem"} gap={"1rem"} justifyContent="flex-end">
        <Button
          variant="text"
          type="button"
          onClick={() => dispatch(updateStage(1))}
        >
          Back
        </Button>
        <Button variant="contained" type={"button"} onClick={handleClick}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default AddressDetails
