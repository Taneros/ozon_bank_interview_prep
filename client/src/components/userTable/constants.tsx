import { type ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  profession: string;
  age: number;
  joinDate: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'firstName',
    header: 'First Name'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  {
    accessorKey: 'profession',
    header: 'Profession'
  },
  {
    accessorKey: 'age',
    header: 'Age'
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date'
  }
];