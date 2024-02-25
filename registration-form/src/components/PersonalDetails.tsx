import {
  Box,
  Typography,
  TextField,
  Stack,
  Divider,
  MenuItem,
} from "@mui/material"

export type Option = {
  value: string
  label: string
}

const SEX_OPTIONS: Option[] = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
]

const ID_OPTIONS: Option[] = [
  {
    value: "aadhar",
    label: "Aadhar",
  },
  {
    value: "pan",
    label: "PAN",
  },
]

function PersonalDetails() {
  return (
    <Box>
      <Typography
        variant={"h2"}
        fontWeight={"500"}
        fontSize={"1.5rem"}
        sx={{ textDecoration: "underline" }}
      >
        Personal Details
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
            id="name"
            label="Name"
            required
            placeholder="Enter Name"
            variant="outlined"
          />
          <TextField
            id="mobile"
            label="Mobile"
            placeholder="Enter Mobile no."
            required
            variant="outlined"
          />
        </Stack>
        <Stack spacing={3} width={"50%"}>
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="date of birth"
              label="Enter date of birth or Age"
              placeholder="DD/MM/YYYY or Age in years"
              required
              variant="outlined"
              fullWidth
            />
            <TextField
              id="sex"
              fullWidth
              label="Sex"
              select
              placeholder="Enter Sex"
              required
              variant="outlined"
            >
              {SEX_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="id type"
              label="Govt issued ID"
              select
              variant="outlined"
              sx={{ width: "30%" }}
            >
              {ID_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="identity"
              label="Govt ID"
              placeholder="Enter Govt ID"
              required
              variant="outlined"
              fullWidth
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PersonalDetails
