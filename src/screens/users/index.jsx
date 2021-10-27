import axios from "axios";
import Lottie from "react-lottie";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "../../components/globalFilter";
import loading from "../../assets/loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`

`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`;

function Users(props) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios
      .get("https://api.github.com/users")
      .catch((err) => console.log(err));

    if (response) {
      const users = response?.data?.slice(0,5);
      const newUsers = await Promise.all(users.map( async user => {
        const userResponse = await axios.get(`https://api.github.com/users/${user?.id}`);
        return userResponse.data;
      }))
      console.log("Products: ", newUsers);
      setUsers(newUsers);
    }
    setLoading(false);
  };

  const columns = useMemo(() => [
    {Header: 'id', accessor: 'id'},
    {Header: 'Name', accessor: 'name'},
    {Header: 'Company', accessor: 'company'},
    {Header: 'Followers', accessor: 'followers'},
    {Header: 'Following', accessor: 'following'}
  ], []);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "View",
        Header: "View",
        Cell: ({ row }) => {
          const data = row.original;
          console.log(row)
          return (
          <Link to={{
              pathname:`/users/${data.id}`,
              state: { data }
            }} >
            <Button>
              View
            </Button>
          </Link>
        )},
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: columns,
      data: users,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchUsers();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  if(loading) return (
      <Lottie options={defaultOptions} height={"60%"} width={"60%"} />
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <h3 style={{color: 'red', fontSize: 12}}>**To sort click on column header</h3>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default Users;
