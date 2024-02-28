import { useRef, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Stack,
  Divider,
  MenuItem,
  Button,
} from "@mui/material"
import { object, string, number } from "yup"
import type { InferType } from "yup"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { RootState } from "../store/store"
import { updateStage, updatePersonalDetails } from "../store/createAppSlice"

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

interface Errors {
  name?: string
  age?: string
  sex?: string
  mobile?: string
  govtIssuedIdType?: string
  govtIssuedId?: string
}

const personalDetailsSchema = object({
  name: string().required().min(3, "Name must be at least 3 characters"),
  age: number()
    .required()
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  sex: string()
    .required()
    .oneOf(["male", "female"] as const, "Invalid sex value"),
  mobile: string()
    .required()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
  govtIssuedIdType: string()
    .required()
    .oneOf(["aadhar", "pan"] as const, "Invalid ID type"),
  govtIssuedId: string().required().min(10).max(12),
})

type UserPersonalDetails = InferType<typeof personalDetailsSchema>

function PersonalDetails() {
  // ---------------------- STATES ---------------------
  const [errors, setErrors] = useState<Errors>({})
  const personalDetails = useAppSelector(
    (state: RootState) => state.app.personalDetails,
  )

  const dispatch = useAppDispatch()

  // ---------------------- REFS ---------------------
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const sexRef = useRef<HTMLSelectElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const govtIssuedIdTypeRef = useRef<HTMLSelectElement>(null)
  const govtIssuedIdRef = useRef<HTMLInputElement>(null)

  // ---------------------- FUNCTIONS ---------------------
  const handleClick = async () => {
    const details: UserPersonalDetails = {
      name: nameRef.current?.value || "",
      age: parseAge(ageRef.current?.value || "0"),
      sex: (sexRef.current?.value || "") as "male" | "female",
      mobile: mobileRef.current?.value || "",
      govtIssuedIdType: (govtIssuedIdTypeRef.current?.value || "") as
        | "aadhar"
        | "pan",
      govtIssuedId: govtIssuedIdRef.current?.value || "",
    }

    try {
      // Validate other fields using Yup
      await personalDetailsSchema.validate(details, { abortEarly: false })

      // Manual validation for Govt Issued Id
      if (details.govtIssuedIdType === "aadhar") {
        if (
          !/^[0-9]{12}$/.test(details.govtIssuedId) ||
          details.govtIssuedId.startsWith("0") ||
          details.govtIssuedId.startsWith("1")
        ) {
          throw new Error("Invalid Aadhar number")
        }
      } else if (details.govtIssuedIdType === "pan") {
        if (!/^[A-Za-z0-9]{10}$/.test(details.govtIssuedId)) {
          throw new Error("Invalid PAN number")
        }
      }

      // If all validations pass
      dispatch(updateStage(2))
      dispatch(updatePersonalDetails(details))
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message
        })
      } else {
        newErrors["govtIssuedId"] = error.message // For manual validation errors
      }
      setErrors(newErrors)
    }
  }

  // Parse age from number or date of birth string
  const parseAge = (input: string): number => {
    // Check if input is a valid date of birth in DD/MM/YYYY format
    const dobPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    const match = input.match(dobPattern)
    if (match) {
      // Extract day, month, and year from the matched groups
      const [_, day, month, year] = match
      // Calculate age from the birth year
      const today = new Date()
      const birthDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      )
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--
      }
      return age
    } else {
      // If input is not in DOB format, parse it as a number
      return parseInt(input) || 0
    }
  }

  console.log(errors)

  // ---------------------- MARKUP ---------------------
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
            size="small"
            error={!!errors.name}
            helperText={errors.name || ""}
            inputRef={nameRef}
            defaultValue={personalDetails?.name || ""}
          />
          <TextField
            id="mobile"
            label="Mobile"
            placeholder="Enter Mobile no."
            required
            variant="outlined"
            size="small"
            error={!!errors.mobile}
            helperText={errors.mobile || ""}
            inputRef={mobileRef}
            defaultValue={personalDetails?.mobile || ""}
          />
        </Stack>
        <Stack spacing={3} width={"50%"}>
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="age"
              label="Enter date of birth or Age"
              placeholder="DD/MM/YYYY or Age in years"
              required
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.age}
              helperText={errors.age || ""}
              inputRef={ageRef}
              defaultValue={personalDetails?.age || ""}
            />
            <TextField
              id="sex"
              fullWidth
              label="Sex"
              select
              placeholder="Enter Sex"
              required
              variant="outlined"
              size="small"
              error={!!errors.sex}
              helperText={errors.sex || ""}
              inputRef={sexRef}
              defaultValue={personalDetails?.sex || ""}
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
              size="small"
              error={!!errors.govtIssuedIdType}
              helperText={errors.govtIssuedIdType || ""}
              inputRef={govtIssuedIdTypeRef}
              defaultValue={personalDetails?.govtIssuedIdType || ""}
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
              size="small"
              error={!!errors.govtIssuedId}
              helperText={errors.govtIssuedId || ""}
              inputRef={govtIssuedIdRef}
              defaultValue={personalDetails?.govtIssuedId || ""}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" my={"2rem"} justifyContent="flex-end">
        <Button variant="contained" type={"button"} onClick={handleClick}>
          Next
        </Button>
      </Stack>
    </Box>
  )
}

export default PersonalDetails
