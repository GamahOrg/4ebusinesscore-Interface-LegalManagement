import { useIntl } from "react-intl";
import BookCard from "./book-card";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllELibrary } from "../../../features/e-library";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../../store/store";
import { ELibraryModel } from "../../../models/ELibraryModel";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import Spinner from "react-bootstrap/esm/Spinner";

const LibraryContent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState<number>(10);
  // const [pageIndex, setPageIndex] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    let params = { 
      PageSize: pageSize,
      pageNumber,
      ...(searchTerm ? { SearchWord: searchTerm } : {})
    };

    dispatch(fetchAllELibrary(params) as any);
  }, [pageSize, pageNumber, searchTerm ]);

  const allELibrary = useSelector((state: RootState) => {
    return state?.eLibrary?.libraries;
  });
  const totalItems = useSelector((state: RootState) => {
    return state?.eLibrary?.pagination?.totalItems;
  });
  const totalPages = useSelector((state: RootState) => {
    return state?.eLibrary?.pagination?.totalPages;
  });
  const loading = useSelector((state: RootState) => {
    return state?.eLibrary?.loading;
  });
    const prevSearchTermRef = useRef<string | undefined>();
  
  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      setPageSize(10);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);

  return (
    <div className="card table-dark p-12">
      <div className="d-flex justify-content-between align-items-center flex-sm-nowrap flex-wrap">
        <div>
          <h3>{intl.formatMessage({ id: "ElectronicLibrary" })}</h3>
          <p className="text-gray-500 mt-5">
            {intl.formatMessage({ id: "ShowAllBooksForYou" })}
          </p>
        </div>

        <div className="d-flex align-items-center position-relative mb-5">
          <span className="svg-icon svg-icon-2 position-absolute text-muted mx-6">
            <i className="bi bi-search fs-3 text-gray-500"></i>
          </span>
          <input
            type="text"
            data-kt-filemanager-table-filter="search"
            className="form-control form-control-solid px-14 searchBorder"
            placeholder={intl.formatMessage({ id: "Search" })}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      {
        <div>
          {!loading ? (
            Array.isArray(allELibrary) && allELibrary.length > 0 ? (
              <div className="row g-9 p-0 py-10">
                {allELibrary.map((book: ELibraryModel) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                    key={book?.id}
                    style={{ height: "330px"}}
                  >
                    <BookCard
                      bookId={book?.id}
                      bookUrl={book?.url}
                      bookFilePath={book?.filePath}
                      // image={LegalRootUrl + book.imagePath}
                      image={
                        LegalRootUrl +
                        (typeof book.imagePath === "string" &&
                        book.imagePath.startsWith("wwwroot/")
                          ? book.imagePath.slice(8)
                          : book.imagePath)
                      }
                      title={intl.locale === "ar" ? book?.nameAr : book?.nameEn}
                      pageSize={pageSize}
                      pageNumber={pageNumber}
                    />
                  </div>
                ))}
                <div className="w-100">
                  <SystemPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageNumber}
                    pageSize={pageSize}
                    setPageIndex={setPageNumber}
                    setPageSize={setPageSize}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center fw-bolder mt-8 fs-4">
                {intl.formatMessage({ id: "NoDataYet" })}
              </div>
            )
          ) : (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default LibraryContent;
