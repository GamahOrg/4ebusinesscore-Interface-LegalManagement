import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

type CoverProps = {
  image?: any;
  setImage?: any;
};
const DragCover = ({ image, setImage }: CoverProps) => {
  const intl = useIntl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isReset, setIsReset] = useState(false);
  useEffect(() => {
    if (image && previewImage !== image && !isReset) {
      setPreviewImage(image);
    }
  }, [image, isReset]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleReset = () => {
    setIsReset(true);
    setPreviewImage(null);
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="main-container-followLawsuits2 mx-auto p-7 bg-fix-dark">
      <h3 className="title fw-bolder mb-8 required">
        {intl.formatMessage({ id: "BookImage" })}
      </h3>
      <div
        className={`book-cover py-10 mb-sm-0 mb-10 h-86 position-relative ${
          isDragging ? "dragging" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <>
            <img
              alt="Preview"
              src={previewImage}
              className="img-fluid m-3 rounded h-100"
              // onError={(e: any) =>
              //   (e.target.src = `/media/img/book-cover1.webp`)
              // }
            />
            <i
              className="fas fa-window-close text-danger reset-image position-absolute"
              onClick={handleReset}
            ></i>
          </>
        ) : (
          <>
            <div>
              <i className="far fa-image fs-5x text-primary"></i>
            </div>
            <span className="text-center p-3">
              <span className="text-gray-600">
                {intl.formatMessage({ id: "DragDropHereOr" })}
              </span>
              <b
                className="cursor-pointer px-1 text-primary"
                onClick={handleFileClick}
              >
                {intl.formatMessage({ id: "ClickHere" })}
              </b>
            </span>

            <span className="text-gray-400 text-center">
              {`${intl.formatMessage({
                id: "SupportFollowingFormats",
              })} jpg, png, jpeg`}
            </span>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default DragCover;
