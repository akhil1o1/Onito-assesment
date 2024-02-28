import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import users from "../data/users"
import type { User } from "../data/users"

interface PersonalDetails {
  name: string
  age: number
  sex: string
  mobile: string
  govtIssuedIdType: string
  govtIssuedId: string
}

interface AddressDetails {
  address?: string
  state?: string
  city?: string
  country?: string
  pincode?: string
}

interface InitialState {
  stage: number
  personalDetails: PersonalDetails
  addressDetails: AddressDetails
  users: User[]
}

const initialState: InitialState = {
  stage: 1,
  personalDetails: {
    name: "",
    age: 0,
    sex: "",
    mobile: "",
    govtIssuedIdType: "",
    govtIssuedId: "",
  },
  addressDetails: {
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
  },
  users: users,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateStage(state, action: PayloadAction<number>) {
      state.stage = action.payload
    },
    updatePersonalDetails(state, action: PayloadAction<PersonalDetails>) {
      return {
        ...state,
        personalDetails: { ...state.personalDetails, ...action.payload },
      }
    },
    updateAddressDetails(state, action: PayloadAction<AddressDetails>) {
      const userData = {
        ...state.personalDetails,
        ...action.payload,
      }

      // Set the ID for the newly added user
      const id = (state.users.length + 1).toString()

      // Create a new user object with the ID and userData
      const newUser: User = {
        id,
        ...userData,
      }

      // Update the users array with the new user
      state.users.push(newUser)

      // Reset the personalDetails and addressDetails
      state.personalDetails = initialState.personalDetails
      state.addressDetails = initialState.addressDetails
      state.stage = 0
    },
    resetDetails() {
      return initialState
    },
  },
})

export const {
  updatePersonalDetails,
  updateAddressDetails,
  resetDetails,
  updateStage,
} = appSlice.actions

export default appSlice.reducer
