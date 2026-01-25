export class StageModel {
  id: number;
  nameEn: string;
  nameAr: string;
  causeRank:number;
  isStudy:boolean;
  constructor(nameEn: string = "", nameAr: string = "", id: number = 0 ,causeRank:number=0 , isStudy:boolean =true ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.causeRank = causeRank;
    this.isStudy = isStudy;
  }
}

