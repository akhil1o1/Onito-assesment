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
  address: string
  state: string
  city: string
  country: string
  pincode: string
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
    updatePersonalDetails(state, action: PayloadAction<PersonalDetails>) {
      return {
        ...state,
        personalDetails: { ...state.personalDetails, ...action.payload },
      }
    },
    updateAddressDetails(state, action: PayloadAction<AddressDetails>) {
      return {
        ...state,
        addressDetails: { ...state.addressDetails, ...action.payload },
      }
    },
    resetDetails(state) {
      return initialState
    },
  },
})

export const { updatePersonalDetails, updateAddressDetails, resetDetails } =
  appSlice.actions

export default appSlice.reducer
