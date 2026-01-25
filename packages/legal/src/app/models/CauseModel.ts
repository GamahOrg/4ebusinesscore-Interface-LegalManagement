import { CauseLigitantModel } from "./CauseLigitantModel";
import { CauseStatus } from "./LegalEnums";
import { NewCauseStageModel} from './NewCauseStagesModel'
export class CauseModel {
  id: string;
  causeNumber: string;
  title: string;
  subject: string;
  incidentDate: string;
  incidentLocation: string;
  nextSessionDate?: string;
  causeDate: string;
  lK_TypeJudiciaryNameAr: string;
  lK_TypeJudiciaryNameEn: string;
  causeStageNumber?: number;
  causeStatus: number;
  lK_CauseCategories: { id: number; nameAr: string; nameEn: string } ;
  clientType: string;
  causeLitigants: CauseLigitantModel[];
  opponent: string[];
  client: string[];
  lawyers: { userId: string; firstName: string; secondName: string }[];
  owner: { userId: string; firstName: string; secondName: string }[];
  dataEntries: { userId: string; firstName: string; secondName: string }[];
  superVisor: SuperVisor[];
  causeStages: NewCauseStageModel[]

  constructor(
    id: string = "",
    causeNumber: string = "",
    title: string = "",
    subject: string = "",
    causeStageNumber?: number,
    lK_CauseCategories: { id: number; nameAr: string; nameEn: string } = {
      id: 0,
      nameAr: "",
      nameEn: "",
    },
    incidentLocation: string = "",
    causeDate: string = "",
    incidentDate: string = "",
    causeStatus: number  = 0,
    lK_TypeJudiciaryNameAr: string = "",
    nextSessionDate: string = "",
    lK_TypeJudiciaryNameEn: string = "",
    clientType: string = "",
    opponent: string[] = [],
    client: string[] = [],
    lawyers: { userId: string; firstName: string; secondName: string }[] = [],
    owner: { userId: string; firstName: string; secondName: string }[] = [],
    dataEntries: {
      userId: string;
      firstName: string;
      secondName: string;
    }[] = [],
    superVisor: SuperVisor[] = [],
    causeLitigants: CauseLigitantModel[] = [],
    causeStages: NewCauseStageModel[] = []
  ) {
    this.id = id;
    this.causeNumber = causeNumber;
    this.title = title;
    this.subject = subject;
    this.causeDate = causeDate;
    this.lK_TypeJudiciaryNameAr = lK_TypeJudiciaryNameAr;
    this.lK_TypeJudiciaryNameEn = lK_TypeJudiciaryNameEn;
    this.causeStageNumber= causeStageNumber;
    this.causeStatus = causeStatus;
    this.incidentDate = incidentDate;
    this.nextSessionDate = nextSessionDate;
    this.lK_CauseCategories = lK_CauseCategories;
    this.clientType = clientType;
    this.opponent = opponent;
    this.client = client;
    this.lawyers = lawyers;
    this.incidentLocation = incidentLocation;
    this.owner = owner;
    this.dataEntries = dataEntries;
    this.superVisor = superVisor;
    this.causeLitigants = causeLitigants;
    this.causeStages = causeStages;
  }
}

export class SuperVisor {
  userId: string | null;
  firstName: string | null;
  secondName: string | null;

  constructor(
    userId: string | null = null,
    firstName: string | null = null,
    secondName: string | null = null
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.secondName = secondName;
  }
}
