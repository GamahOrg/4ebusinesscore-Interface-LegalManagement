import { LitigantStatus } from "./LegalEnums";

export class CauseLigitantModel {
  id: string;
  compliment: string;
  litigant: {
    id: string;
    name: string;
    lK_IdentityTypeId: number;
    lK_IdentityType: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
    identityNumber: number;
    litigantStatus: LitigantStatus;
  };

  constructor(
    id: string = "",
    compliment: string = "",
    litigant: {
      id: string;
      name: string;
      lK_IdentityTypeId: number;
      lK_IdentityType: {
        id: number;
        nameAr: string;
        nameEn: string;
      };
      identityNumber: number;
      litigantStatus: LitigantStatus;
    } = {
      id: "",
      name: "",
      lK_IdentityTypeId: 0,
      lK_IdentityType: {
        id: 0,
        nameAr: "",
        nameEn: "",
      },
      identityNumber: 0,
      litigantStatus: LitigantStatus.Client,
    }
  ) {
    this.id = id;
    this.compliment = compliment;
    this.litigant = litigant;
  }
}
