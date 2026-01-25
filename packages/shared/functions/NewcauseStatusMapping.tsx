let NewcauseStatusMapping = (causeStatus, intl) => {
  switch (causeStatus) {
    case "NewCause":
    case 1:
      return {
        name: `${intl.formatMessage({
          id: "New",
        })}`,
        statusEnum: 1,
      };
    case "InProgress":
    case 2:
      return {
        name: `${intl.formatMessage({
          id: "InTheSessions",
        })}`,
        statusEnum: 2,
      };

    case "JudgmentWasIssued":
    case 3:
      return {
        name: `${intl.formatMessage({
          id: "JudgmentWasIssued",
        })}`,
        statusEnum: 3,
      };
  }
};

export default NewcauseStatusMapping;
