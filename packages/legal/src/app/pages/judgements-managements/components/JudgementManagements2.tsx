import JudgementsManagementsTable from "./JudgementsManagementsTable";
import JudgementsManagementsToolbar from "../toolbar/JudgementsManagementsToolbar";
import {useState} from "react";
function JudgementManagements2() {

   const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCause, setSelectedCause] = useState("");
     const [selectedDegree, setSelectedDegree] = useState("");
  return (
    <>
      <JudgementsManagementsToolbar 
                              pageNumber={pageNumber}
                              pageSize={pageSize}
                              searchTerm={searchTerm}
                              selectedCause ={selectedCause}
                              selectedDegree ={selectedDegree}
       />

      <div className="container table-dark card card-xl-stretch mb-xl-8">
        <div className="mb-3 mt-5">
          <JudgementsManagementsTable  
                              pageNumber={pageNumber}
                              pageSize={pageSize}
                              searchTerm={searchTerm}
                              selectedCause ={selectedCause}
                              selectedDegree ={selectedDegree}
                              setPageNumber={setPageNumber}
                              setSelectedDegree = {setSelectedDegree}
                              setSelectedCause = {setSelectedCause}
                              setSearchTerm={setSearchTerm}
                              setPageSize={setPageSize}
                               />
        </div>

        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}></div>
      </div>
    </>
  );
}

export default JudgementManagements2;
