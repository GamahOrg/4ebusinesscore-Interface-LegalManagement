import { FC } from "react";
import StudyMyClaimsToolbar from "./Toolbar/StudyMyClaimsToolbar";
import StudyClaimsTableList from "./components/StudyClaimsTableList";

const StudyOfLawsuits: FC = () => {
  return (
    <>
      <StudyMyClaimsToolbar />
      <StudyClaimsTableList />
    </>
  );
};
export default StudyOfLawsuits;
