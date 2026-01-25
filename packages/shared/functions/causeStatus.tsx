const causeStatus = (causeStatus, intl) => {
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
    case "UnderStudy":
    case 6:
      return {
        name: `${intl.formatMessage({
          id: "New",
        })}`,
        statusEnum: 6,
      };
  }
};

export const causeStageStatus = (causeStatus, intl) => {
  switch (causeStatus) {
    case "IsActive":
    case 1:
      return {
        name: `${intl.formatMessage({
          id: "Perspective",
        })}`,
        statusEnum: 1,
      };
    case "Judgement":
    case 2:
      return {
        name: `${intl.formatMessage({
          id: "Finished",
        })}`,
        statusEnum: 2,
      };
    case "Pending":
    case 3:
      return {
        name: `${intl.formatMessage({
          id: "Pending1",
        })}`,
        statusEnum: 3,
      };

    case "CrossedOut":
    case 4:
      return {
        name: `${intl.formatMessage({
          id: "CrossedOut",
        })}`,
        statusEnum: 4,
      };

    case "UnderStudy":
    case 5:
      return {
        name: `${intl.formatMessage({
          id: "New",
        })}`,
        statusEnum: 5,
      };
  }
};

export default causeStatus;
