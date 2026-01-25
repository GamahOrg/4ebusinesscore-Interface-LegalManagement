import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import SessionDetails from "./components/SessionDetails";

function SessionDetailsHome() {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ManagingSessions", value: "/sessions-view" },
          { key: "SessionDetails", value: "" },
        ]}
      />
      <SessionDetails />
    </>
  );
}

export default SessionDetailsHome;
