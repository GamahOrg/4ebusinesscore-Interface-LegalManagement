let NewcauseStageStatusMapping = (causeStageStatus, intl) => {
  switch (causeStageStatus) {
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
          id: "Perspective",
        })}`,
        statusEnum: 2,
      };

     case "Judgement":
    case 3:
      return {
        name: `${intl.formatMessage({
          id: "Finished",
        })}`,
        statusEnum: 3,
      };
      case "Pending":
    case 4:
      return {
        name: `${intl.formatMessage({
          id: "Pending1",
        })}`,
        statusEnum: 4,
      };

     case "CrossedOut":
    case 5:
      return {
        name: `${intl.formatMessage({
          id: "CrossedOut",
        })}`,
        statusEnum: 5,
      };
  }
  }


export default NewcauseStageStatusMapping;








let causeStatus = (causeStatus, intl) => {
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
          id: "Perspective",
        })}`,
        statusEnum: 2,
      };
    case "Judgement":
    case 3:
      return {
        name: `${intl.formatMessage({
          id: "Finished",
        })}`,
        statusEnum: 3,
      };

    case "Pending":
    case 4:
      return {
        name: `${intl.formatMessage({
          id: "Pending1",
        })}`,
        statusEnum: 4,
      };

    case "CrossedOut":
    case 5:
      return {
        name: `${intl.formatMessage({
          id: "CrossedOut",
        })}`,
        statusEnum: 5,
      };
  }
};