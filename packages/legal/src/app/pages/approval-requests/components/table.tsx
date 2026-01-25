import React from "react";
import { useIntl } from "react-intl";
import { tableData, TempData } from "../data";

interface TableProps {
  columns: (keyof TempData)[];
}
const Table = ({ columns }: TableProps) => {
  const intl = useIntl();
  const getStatusStyle = (status: string | undefined) => {
    const baseStyle = {
      padding: "0.8em 1em",
      borderRadius: "4px",
      width: "80%",
      display: "inline-block",
      minWidth: "max-content",
    };

    switch (status) {
      case "InWaiting":
        return { ...baseStyle, backgroundColor: "#F6CD001A", color: "#F6CD00" };
      case "Approve":
        return { ...baseStyle, backgroundColor: "#4CBA5D1A", color: "#4CBA5D" };
      case "Reject":
        return { ...baseStyle, backgroundColor: "#F141411A", color: "#F14141" };
      default:
        return {};
    }
  };
  return (
    <table className="data-table">
      <thead className="bg-light">
        <tr>
          {columns.map((column, index: number) => (
            <th key={index}>{intl.formatMessage({ id: column })}</th>
          ))}
          <th className="actions">
            {intl.formatMessage({ id: "TheActions" })}
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index: number) => (
          <tr key={index}>
            {columns.map((column, index: number) => {
              const style =
                column === "Status"
                  ? getStatusStyle(row[column] as string)
                  : {};

              return (
                <td key={index}>
                  {["Status", "CompetentCourt", "DocumentType"].includes(
                    column
                  ) ? (
                    <span style={style}>
                      {intl.formatMessage({ id: row[column] as string })}
                    </span>
                  ) : (
                    <span
                      className={`${
                        column === "MemoText" ? "text-primary" : ""
                      }`}
                    >
                      {row[column]}
                    </span>
                  )}
                </td>
              );
            })}
            <td>
              <i className="bi bi-three-dots fs-2 text-gray-500"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
