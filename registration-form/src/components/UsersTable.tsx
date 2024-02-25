import { useAppSelector } from "../store/hooks"
import type { RootState } from "../store/store"
import { Box } from "@mui/material"
import type { GridColDef } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"

// name: string;
//    age: number;
//    sex: string;
//    mobile: string;
//    govtIssuedIdType: string;
//    govtIssuedId: string;
//    address: string;
//    city: string;
//    state: string;
//    country: string;
//    pincode: string;

const columns: GridColDef[] = [
{ field: 'id', headerName: 'ID', width: 70 },
  { field: "name", headerName: "First name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  { field: "sex", headerName: "Sex", width: 130, sortable: false },
  {
    field: "mobile",
    headerName: "Mobile",
    sortable: false,
    width: 160,
  },
  {
    field: "govtIssuedId",
    headerName: "Govt ID",
    sortable: false,
    width: 130,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 130,
  },
  {
    field: "state",
    headerName: "State",
    width: 130,
  },
  {
    field: "country",
    headerName: "Country",
    width: 130,
  },
  {
    field: "pincode",
    headerName: "Pincode",
    sortable: false,
    width: 130,
  },
]

function UsersTable() {
  const users = useAppSelector((state: RootState) => state.app.users);

  return (
    <Box className="users-table">
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  )
}

export default UsersTable
