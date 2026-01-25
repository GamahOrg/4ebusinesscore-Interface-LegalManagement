import { FC } from "react";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import SystemSettingsContent from "./system-settings-content";
const SystemSettings: FC = () => {
  return (
    <>
      <GenericToolbar list={[{ key: "LegalSystemSettings", value: "" }]} />
      <SystemSettingsContent />
    </>
  );
};
export default SystemSettings;
