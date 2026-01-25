import { useIntl } from "react-intl";
import { KTSVG, toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteELibrary, fetchAllELibrary } from "../../../features/e-library";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";

const BookCard = ({
  image,
  title,
  bookId,
  bookUrl,
  bookFilePath,
  pageSize,
  pageNumber,
}: {
  image: string;
  title: string;
  bookId: string;
  bookUrl: string;
  bookFilePath: string;
  pageSize?: number;
  pageNumber?: number;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const language = intl.locale;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteELibrary(bookId) as any).then((res: any) => {
      if (res.payload.message === "LibraryDeletedSuccessfully") {
        showAlert(true, "DeletedSuccessfully", intl);
        let params = { PageSize: pageSize, pageNumber };
        dispatch(fetchAllELibrary(params) as any);
      }
    });
  };

  const handleDownload = async () => {
    // const fileURL = `${LegalRootUrl}${bookFilePath}`;
    const fileURL = `${LegalRootUrl}${
      typeof bookFilePath === "string" && bookFilePath.startsWith("wwwroot/")
        ? bookFilePath.slice(8)
        : bookFilePath
    }`;

    try {
      const response = await fetch(fileURL, {});
      // if (!response.ok) {
      //   throw new Error(`Server responded ${response.status}`);
      // }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const filename = bookFilePath.split("/").pop() || "download";

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {}
  };

  const processBookUrl = (url: string) => {
    if(url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
      }
      return url;
    }else{
      return "";
    }
  };
  // console.log(bookUrl);
  

  return (
    <div className="book-card d-flex align-items-center flex-column h-100">
      <img
        src={image}
        alt="book cover"
        className="book-cover-img"
        onError={(e: any) => (e.target.src =toAbsoluteUrl(`/media/img/book-cover1.webp`))}
      />
      <h3 className="title fw-bolder fs-5 lh-lg px-5 text-truncate  w-80">
        {title}
      </h3>
      <div className={`${intl.locale === "en" ? "end-0" : ""} book-card-actions`}>
        <Dropdown>
          <Dropdown.Toggle
            split
            variant="none"
            className="p-0 text-center "
            id="dropdown-custom-2"
          >
            <i className="bi bi-three-dots fs-2 text-gray-600"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
              <Link to={processBookUrl(bookUrl)} target="_blank">
                <div
                  className="menu-link p-3 text-left"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  <i className="fa-solid fa-eye mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "Show" })}
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted"
                style={{ textAlign: language == "ar" ? "right" : "left" }}
                onClick={handleDownload}
              >
                <i className="fas fa-download mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "Download" })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() =>
                navigate(`/electronic-library/edit-book/${bookId}`)
              }
            >
              <div
                className="menu-link p-3 text-primary "
                style={{ textAlign: language == "ar" ? "right" : "left" }}
              >
                <KTSVG className="svg-icon svg-icon-3 mx-2" path="/media/icons/duotune/general/gen087.svg" />
                {intl.formatMessage({ id: "Edit" })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setModalDShow(true)}>
              <div
                className="menu-link p-3 text-danger "
                style={{ textAlign: language == "ar" ? "right" : "left" }}
              >
                <i className="fas fa-trash  mx-2 fs-4"></i>
                {intl.formatMessage({ id: "Delete" })}
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {modalDShow && (
        <div className="modal fade" id="Rega_modal_Delete">
          <DeletePopup
            handleCloseDelete={() => setModalDShow(false)}
            showDelete={modalDShow}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default BookCard;
