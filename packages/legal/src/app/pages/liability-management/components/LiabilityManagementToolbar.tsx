import { useIntl } from "react-intl";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useState, lazy, Suspense } from "react";
import { FC } from "react";

const AddDiscountPopup = lazy(() => import("../popups/AddDiscountPopup"));

interface LiabilityManagementToolbarProps {
  pageIndex?: number;
  pageSize?: number;
  searchQuery?: any;
  clientType?: any;
}
const LiabilityManagementToolbar: FC<LiabilityManagementToolbarProps> = ({
  pageIndex,
  pageSize,
  searchQuery,
  clientType,
}) => {
  const intl = useIntl();
  const [showAddDiscount, setShowAddDiscount] = useState<boolean>(false);

  return (
    <>
      <div
        id="kt_toolbar_container"
        className="container d-flex flex-stack flex-wrap p-0"
      >
        <GenericToolbar list={[{ key: "LiabilityManagement", value: "" }]} />
        <div
          className="btn btn-light text-gray-800 mb-sm-0 mb-3"
          onClick={() => setShowAddDiscount(true)}
        >
          {intl.formatMessage({ id: "AddOpponent" })}
        </div>
      </div>
      <div className="modal fade">
        {showAddDiscount && (
          <Suspense fallback={<div>...loading</div>}>
            <AddDiscountPopup
              show={showAddDiscount}
              handleClose={() => setShowAddDiscount(false)}
              pageIndex={pageIndex}
              pageSize={pageSize}
              searchQuery={searchQuery}
              clientType={clientType}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default LiabilityManagementToolbar;
