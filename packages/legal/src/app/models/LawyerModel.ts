import { LawyerStatus, LawyerType } from "./LegalEnums";

export class LawyerModel {
  id: string;
  lawyerName: string;
  phone: string;
  isInternal: boolean;
  causeCount: number;
  lawyerStatus: number;
  litigantStatus: number;
  lawyerType: number;
  userId: string;

  constructor(
    id: string = "",
    lawyerName: string = "",
    phone: string = "",
    isInternal: boolean = false,
    causeCount: number = 0,
    lawyerStatus: number = 0,
    litigantStatus: number = 0,
    lawyerType: number = 0,
    userId: string = ""
  ) {
    this.id = id;
    this.lawyerName = lawyerName;
    this.phone = phone;
    this.isInternal = isInternal;
    this.causeCount = causeCount;
    this.lawyerStatus = lawyerStatus;
    this.litigantStatus = litigantStatus;
    this.lawyerType = lawyerType;
    this.userId = userId;
  }
}
