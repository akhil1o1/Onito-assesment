import { useEffect, useState } from "react"
import {
  Box,
  TextField,
  Stack,
  Autocomplete,
  Typography,
  Divider,
} from "@mui/material"
import states from "../data/states"

type Country = {
   name : {
      common : string
   }
}

function AddressDetails() {
  const [countries, setCountries] = useState<Array<string>>([])

  useEffect(() => {
   const fetchCountries = async () => {
     try {
       const response = await fetch("https://restcountries.com/v3.1/all");
       if (response.ok) {
         const data: Country[] = await response.json();
         const countryNames: string[] = data.map((country: Country) => country.name.common);
         setCountries(countryNames);
       } else {
         throw new Error("Failed to fetch countries");
       }
     } catch (error) {
       console.error("Error fetching countries:", error);
     }
   };

   fetchCountries();
 }, []);


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
          />
          <Autocomplete
            disablePortal
            id="country"
            fullWidth
            options={countries}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Enter country"
                label="Country"
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
            />
            <Autocomplete
              disablePortal
              id="state"
              fullWidth
              options={states}
              renderInput={params => (
                <TextField
                  {...params}
                  label="State"
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
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default AddressDetails
