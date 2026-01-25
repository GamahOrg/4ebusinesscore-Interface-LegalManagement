import { useState,Suspense ,lazy } from "react";
import LiabilityManagementHome from "./components/LiabilityManagementHome";
import LiabilityManagementToolbar from "./components/LiabilityManagementToolbar";

function LiabilityManagement() {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClientTypes, setSelectedClientTypes] = useState<number[]>([1, 2]);
  const [clientType, setClientType] = useState<string>("");
  return (
    <div>
      <LiabilityManagementToolbar 
       pageIndex = {pageIndex} 
       pageSize ={pageSize}
       searchQuery = {searchQuery}
       clientType = {clientType}
        />
      <LiabilityManagementHome 
             pageIndex = {pageIndex} 
             pageSize ={pageSize}
             setPageIndex = {setPageIndex}
             setPageSize ={setPageSize}
             searchQuery = {searchQuery}
             setSearchQuery = {setSearchQuery}
             selectedClientTypes = {selectedClientTypes}
             setSelectedClientTypes = {setSelectedClientTypes}
             clientType = {clientType}
             setClientType = {setClientType}
             />
    </div>
  );
}

export default LiabilityManagement;
