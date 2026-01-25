import { Row } from "react-bootstrap";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import { FC } from "react";


type ClientsSectionProps = {
  setClients ?:any;
  clients ?:any;
  setOpponents?:any;
  setClientStatus?:any;
  clientStatus?:any;
  setValue?:any;
  trigger?:any;
  documents?:any;
  setDocuments?:any;
  errors?:any;
  opponents?:any;
};
 const  ClientsSection : FC<ClientsSectionProps> =({setClients , clients  , setOpponents , setClientStatus ,clientStatus ,
  setValue,
  trigger,
  documents,
  setDocuments,
  errors,
  opponents,
 })=> {
 
  return (
    <>
      <div className="d-flex w-100">
        <Row className="g-5 w-100 px-8 my-5 cleint-section-responsive">
          <RightSection setClients ={setClients} clients={clients}  opponents = {opponents}
          setOpponents={setOpponents} setClientStatus={setClientStatus} clientStatus={clientStatus}/>
          <LeftSection setValue={setValue} trigger = {trigger} 
             documents={documents}
            setDocuments={setDocuments}
            errors={errors} />
        </Row>
      </div>
    </>
  );
}
export default ClientsSection ;