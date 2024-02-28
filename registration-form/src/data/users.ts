export interface User {
  id: string
  name: string
  age: number
  sex: string
  mobile: string
  govtIssuedIdType: string
  govtIssuedId: string
  address?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
}

const users: User[] = [
  {
    id: "1",
    name: "Arvind",
    age: 26,
    sex: "Male",
    mobile: "9658356565",
    govtIssuedIdType: "Aadhar",
    govtIssuedId: "325658964568",
    address: "Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    country: "India",
    pincode: "248001",
  },
  {
    id: "2",
    name: "Ramesh",
    age: 32,
    sex: "Male",
    mobile: "9876543210",
    govtIssuedIdType: "Aadhar",
    govtIssuedId: "456712349876",
    address: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400001",
  },
  {
    id: "3",
    name: "Sunita",
    age: 28,
    sex: "Female",
    mobile: "9876543211",
    govtIssuedIdType: "Aadhar",
    govtIssuedId: "789065432178",
    address: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600001",
  },
  {
    id: "4",
    name: "Anil",
    age: 35,
    sex: "Male",
    mobile: "9876543212",
    govtIssuedIdType: "Aadhar",
    govtIssuedId: "654321789032",
    address: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    pincode: "700001",
  },
]

export default users
