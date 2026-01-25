
 


export const getAdByStatus = (status: number, intl: any) => {
  switch (status) {
    case 1:
      return { text: intl.formatMessage({ id: 'AjudgmentIssued'}), className: "success" };
    case 2:
      return { text: intl.formatMessage({ id: 'AdjudmentExpired'}), className: "danger" };
    case 3:
      return { text: intl.formatMessage({ id: 'InSessions'}), className: "warning" };
    case 4:
      return { text: "", className: "secondary" };
    default:
      return { text: "", className: "primary" };
  }
};

export const getJudgmentStatus = (status: number, intl: any) => {
  switch (status) {
    case 1:
      return { text: intl.formatMessage({ id: 'AjudgmentIssued' }), className: "success" };
    case 2:
      return { text: intl.formatMessage({ id: 'Postponement' }), className: "warning" };
    default:
      return { text:intl.formatMessage({ id: 'Postponement' }), className: "primary" };
  }
};


export const getAdjudmentdByStatus = (status: number, intl: any) => {
  switch (status) {
    case 3:
      return { text: intl.formatMessage({ id: 'AjudgmentIssued'}), className: "warning" };
    case 2:
      return { text: intl.formatMessage({ id: 'InSessions'}), className: "danger" };
  }
};