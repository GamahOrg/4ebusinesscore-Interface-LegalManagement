import { FC } from "react";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";

import { LegalIndicator } from "./Components/LegalIndicator";

const LegalIndicators: FC = () => {
  return (
    <>
      <GenericToolbar list={[{ key: "LegalIndicators", value: "" }]} />

      <LegalIndicator />
    </>
  );
};

export default LegalIndicators;
