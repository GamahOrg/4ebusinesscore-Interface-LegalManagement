import { DeletePopup } from '@4eplatform/shared/src/popups/DeletePopup'
import React, { useState } from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { useIntl } from "react-intl";
import OpponentslawyersEditPopup from '../popups/OpponentslawyersEditPopup';
import { useAppDispatch } from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { deleteCauseLawyer } from "../../../features/cause-layer";
import { fetchAllLawyers } from "../../../features/lawyer";
import { GetAllLawyerType } from '../../../models/LegalEnums';



function OpponentslawyersActions({item , id,pageSize,pageIndex}:{item?:any , id?:any,  pageIndex?:number;
    pageSize?:number}) {
    const intl = useIntl();
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<any>(null); 
    let dispatch = useAppDispatch();
    let handleDeleteLawer = (lawyerId) => {
      let body = { lawyerId };
      dispatch(deleteCauseLawyer(body) as any).then((response) => {
        if (
          response?.payload?.statusEnum == 1 ||
          response?.payload?.message == "Deleted Successfully"
        ) {
          showAlert(true, "DeletedSuccessfully", intl, () => {});
        let params = {
            pageNumber:pageIndex,
            pageSize,
            litigantStatus: 2,
            lawyerTypeDto: GetAllLawyerType.Internal,
            lawyerStateDto: 2,
        };
        dispatch(fetchAllLawyers(params) as any);
        } else if (response?.payload?.message) {
          showAlert(false, response?.payload?.message, intl);
        }
      });
    };

return (
    <div>
    <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
            split
            variant="none"
            className="p-0 text-center"
            id="dropdown-custom-2"
        >
            <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item
                as="button"
                onClick={() => {
                    setSelectedId(id);
                    setModalEdit(true);
                }}
            >
                <div
                    className="menu-link p-3 text-primary text-left"
                    style={{ textAlign: "right" }}
                >
                    <i className="fa-solid fa-pen mx-2 fs-4"></i>
                    {intl.formatMessage({ id: "Edit" })}
                </div>
            </Dropdown.Item>

            <Dropdown.Item
                as="button"
                onClick={() => setShowDeletePopup(true)}
            >
                <div
                    className="menu-link p-3 text-danger text-left"
                    style={{ textAlign: "right" }}
                >
                    <i className="fa-solid fa-trash mx-2 fs-4"></i>
                    {intl.formatMessage({ id: "Delete" })}
                </div>
            </Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown>
    <div className="modal fade" id="Rega_modal_Reject">
        <OpponentslawyersEditPopup
            handleCloseAdd={() => setModalEdit(false)}
            showAdd={modalEdit}
            id={selectedId}
        />
    </div> 

    <div className="modal fade" id="Rega_modal_Accept">
        <DeletePopup
            showDelete={showDeletePopup}
            handleCloseDelete={() => setShowDeletePopup(false)}
            handleDelete={()=>{handleDeleteLawer(id)}}
        />
    </div>
</div>
    )
}

export default OpponentslawyersActions