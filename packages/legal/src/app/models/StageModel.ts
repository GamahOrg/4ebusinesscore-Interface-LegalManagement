export class StageModel {
  id: number;
  causeRank: number;
  nameAr: string;
  nameEn: string;

  constructor(
    id: number = 0,
    causeRank: number = 0,
    nameAr: string = "",
    nameEn: string = ""
  ) {
    this.id = id;
    this.causeRank = causeRank;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
