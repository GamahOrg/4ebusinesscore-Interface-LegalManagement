import { FC } from "react";
import { Link } from "react-router-dom";
type ActionProps = {
  id?: number;
  status?: string;
};
interface Action {
  id: string;
  label: string;
  icon: string;
  className: string;
  handler: ActionHandler;
  isLink?: boolean;
  linkTo?: string;
}

interface ActionHandler {
  action: () => void;
  usePopup?: boolean;
}

export const OutgoingClaimsFirstCoulmnLink: FC<ActionProps> = ({
  id,
  status,
}) => {
  return (
    <>
      <Link
        to={{
          pathname: `/view-claims-2`,
          search: `?status=${status}`,
        }}
      >
        <h6 className="text-primary fs-8">23435356</h6>
      </Link>
    </>
  );
};

export default OutgoingClaimsFirstCoulmnLink;
