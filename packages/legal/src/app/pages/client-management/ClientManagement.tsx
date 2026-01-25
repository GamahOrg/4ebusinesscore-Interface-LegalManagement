import { useState } from "react";
import ClientManagementContent from "./components/ClientManagementContent";
import ClientManagementToolbar from "./Toolbar/ClientManagementToolbar";

function ListOfCases() {
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedClientTypes, setSelectedClientTypes] = useState<number[]>([1, 2]);
    const [clientType, setClientType] = useState<string>("");
  return (
    <div>
      <ClientManagementToolbar 
          pageIndex = {pageIndex} 
          pageSize ={pageSize}
          clientType = {clientType}
          searchQuery = {searchQuery}
       />
      <ClientManagementContent 
          pageIndex = {pageIndex} 
          pageSize ={pageSize}
          setPageIndex = {setPageIndex}
          setPageSize ={setPageSize}
          searchQuery = {searchQuery}
          setSearchQuery = {setSearchQuery}
          selectedClientTypes = {selectedClientTypes}
          setSelectedClientTypes = {setSelectedClientTypes}
          clientType = {clientType}
          setClientType = {setClientType} />
    </div>
  );
}

export default ListOfCases;
