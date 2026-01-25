import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import InputField from "./input-field";
import DragCover from "./drag-cover";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookValidationSchema } from "../validations/BookValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { postELibrary } from "../../../features/e-library";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { RootState } from "../../../store/store";
import { Button, Spinner } from "react-bootstrap";
import { fetchAllLK_ClassificationTypeElibrary } from "../../../features/LK_ClassificationTypeElibrarySlice";

const AddBookContent = () => {
const intl = useIntl();
const dispatch = useDispatch();
const navigate = useNavigate();
// const [add, setAdd] = useState(false);
const [image, setImage] = useState<string | null>(null);
const [file, setFile] = useState<string | null>(null);

const {
  register,
  handleSubmit,
  setValue,
  trigger,
  formState: { errors },
} = useForm({
  resolver: yupResolver(BookValidationSchema),
});

useEffect(() => {
  setValue("imagePath", image);
  if (image != null) {
    trigger("imagePath");
  }
}, [image]);

useEffect(() => {
  setValue("filePath", file);
  if (file != null) {
    trigger("filePath");
  }
}, [file]);

const onSubmit = async (formValues: any) => {
  let formData = new FormData();
  formData.append("NameAr", formValues?.nameAr);
  formData.append("NameEn", formValues?.nameEn);
  formData.append("Url", formValues?.url);
  formData.append("LK_ClassificationTypeELibraryId", formValues?.LK_ClassificationTypeELibraryId);
  if (image) {
    formData.append("Image", image);
    // formData.append("ImageName", image.name);
  }
  if (file) {
    formData.append("Attachment", file);
    // formData.append("FileName", file.name);
  }

  await dispatch(postELibrary(formData) as any).then((res: any) => {
    if (res.payload.message === "newLibraryAddedSuccessfully") {
      showAlert(true, "AddedSuccessfully", intl);
      navigate("/electronic-library");
    // window.location.replace("/legalmanagement/electronic-library")   
 } else if (
      res.payload.message &&
      res.payload.message.includes(
        "The combination of NameAr and NameEn must be unique."
      )
    )
      showAlert(false, "TheDataAlreadyExists", intl);
    else if (
      res.payload.message &&
      res.payload.message.includes(
        "Name in Arabic must be written in Arabic."
      )
    )
      showAlert(false, "NameMustBeInArabicWords", intl);
    else if (
      res.payload.message &&
      res.payload.message.includes(
        "Name in English must be written in English."
      )
    )
      showAlert(false, "NameMustBeInEnglishWords", intl);
    else showAlert(false, "AnErrorOccurred", intl);
  });
  console.log(formValues);
};

const loading = useSelector((state: RootState) => {
  return state?.eLibrary?.loading;
});

const [pageIndex , setPageIndex]=useState<any>(1)
const [pageSize , setPageSize]=useState<any>(10)


useEffect(() => {
  let params = {
    PageSize: pageSize,
    pageNumber :pageIndex ,
  }
dispatch(fetchAllLK_ClassificationTypeElibrary(params) as any )
  } , [dispatch])

const AllLK_ClassificationTypeElibrary = useSelector((state: RootState) => {
return state?.LK_ClassificationTypeElibrary?.libraries;
}) 

return (
  <div className="card py-5 px-10">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row book-data pt-10 px-2 gy-6">
        <div className="col-12 col-sm-6">
          <DragCover setImage={setImage} />
          {errors?.imagePath &&
            DisplayErrorMessage("InputFieldIsRequried", intl, intl.locale)}
        </div>

        <div className="col-12 col-sm-6">
          <div className="bg-fix-dark bg-light p-4 border border-secondary rounded">
            <div className="d-flex flex-column gap-5">
              <h3 className="title fw-bolder">
                {intl.formatMessage({ id: "BookInformation" })}
              </h3>
              <div>
                <InputField
                  icon={<i className="special fas fa-user"></i>}
                  label="NameInArabic"
                  placeholder="NameInArabic"
                  required="true"
                  register={register("nameAr")}
                />
                {errors?.nameAr && (
                  <div className="error text-danger">
                    {intl.formatMessage({ id: errors.nameAr.message })}
                  </div>
                )}
              </div>
              <div>
                <InputField
                  icon={<i className="special fas fa-user" />}
                  label="NameInEnglish"
                  placeholder="NameInEnglish"
                  required="true"
                  register={register("nameEn")}
                />
                {errors?.nameEn && (
                  <div className="error text-danger">
                    {" "}
                    {intl.formatMessage({ id: errors.nameEn.message })}
                  </div>
                )}
              </div>
              <div>
                <InputField
                  icon={<i className="special fas fa-book-open" />}
                  label="BookURL"
                  placeholder="EnterBookURL"
                  required="true"
                  register={register("url")}
                />
                {errors?.url &&
                  DisplayErrorMessage(
                    errors?.url?.message,
                    intl,
                    intl.locale
                  )}
              </div>

              <div>
                <label className="form-label text-gray-700 mb-3 px-1 fs-6 required">{intl.formatMessage({ id: "Type" })}  </label>
                <select className="form-control" {...register('LK_ClassificationTypeELibraryId')} >
        <option disabled>{intl.formatMessage({ id: "Select" })}</option>
        {AllLK_ClassificationTypeElibrary.map((opt, index) => (
          <option key={index} value={opt.id}>
            {intl.locale === "en" ? opt.nameEn : opt.nameAr}
          </option>
        ))}
      </select>
                  <div className="error text-danger">
                    {errors.LK_ClassificationTypeELibraryId?.message &&
                    typeof errors.LK_ClassificationTypeELibraryId?.message === "string"
                      ? intl.formatMessage({ id: errors.LK_ClassificationTypeELibraryId.message })
                      : null}
                  </div>
                
              </div>
              
              <div>
                <InputField
                  label="DownloadTheBook"
                  placeholder="UploadBook"
                  type="file"
                  required="true"
                  file={file}
                  setFile={setFile}
                />
                {errors?.filePath && (
                  // DisplayErrorMessage(
                  //   "InputFieldIsRequried",
                  //   intl,
                  //   intl.locale
                  // )
                  <div className="error text-danger">
                    {errors.filePath?.message &&
                    typeof errors.filePath.message === "string"
                      ? intl.formatMessage({ id: errors.filePath.message })
                      : null}
                  </div>
                )}
              </div>

              
            </div>
          </div>
        </div>
      </div>
      <div className="actions d-flex gap-1 justify-content-center justify-content-sm-end mt-5 mt-sm-10 mb-5 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary btn-block px-20 mb-3"
        >
          {intl.formatMessage({ id: "Cancel" })}
        </button>

        {!loading ? (
          <button
            type="submit"
            className="btn btn-success text-center px-20 mb-3"
          >
            {intl.formatMessage({ id: "Add" })}
          </button>
        ) : (
          <Button variant="success" disabled className="px-20 mb-3">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mx-2"
            />
            <span>{intl.formatMessage({ id: "Adding" })}</span>
          </Button>
        )}
      </div>
    </form>
    {/* <div className="popup">
      <AddPopup show={add} handleClose={() => setAdd(false)} />
    </div> */}
  </div>
);
};

export default AddBookContent;
