export const getStyleByStatusToJudgements = (status: number) => {
  switch (status) {
    case 2:
      return "light-success text-success";
    case 1:
      return "light-danger text-danger";
    case 3:
      return "light-warning text-warning";
    default:
      return "light-primary text-primary";
  }
};
