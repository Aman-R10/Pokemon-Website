import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MovesTable = ({ movesList }) => {
  const columns = [
    { title: "Move", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Power", dataIndex: "power", key: "power" },
    { title: "PP", dataIndex: "pp", key: "pp" },
    { title: "Accuracy", dataIndex: "accuracy", key: "accuracy" },
  ];

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 426.6, overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {movesList.map((move, index) => (
            <TableRow key={index}>
              <TableCell>{move.name || "-"}</TableCell>
              <TableCell>{move.power !== null ? move.power : "-"}</TableCell>
              <TableCell>{move.pp !== null ? move.pp : "-"}</TableCell>
              <TableCell>
                {move.accuracy !== null ? move.accuracy : "-"}
              </TableCell>
              <TableCell>{move.category || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovesTable;
