import { type ColumnDef } from "@tanstack/react-table";
import { HeaderButton } from "@/components/UserTable/components/HeaderButton";
import { useMemo } from "react";

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

export const useColumns = (): ColumnDef<User>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <HeaderButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting()}
            >
              First Name
            </HeaderButton>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <HeaderButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting()}
            >
              Last Name
            </HeaderButton>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "city",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();

          return (
            <HeaderButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting()}
            >
              City
            </HeaderButton>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "profession",
        header: "Profession",
        enableSorting: true,
      },
      {
        accessorKey: "age",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();

          return (
            <HeaderButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting()}
            >
              Age
            </HeaderButton>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();

          return (
            <HeaderButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting()}
            >
              Join Date
            </HeaderButton>
          );
        },
        enableSorting: true,
      },
    ],
    []
  );
};
