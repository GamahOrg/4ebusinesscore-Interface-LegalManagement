export class LKIdentityTypeModel {
    id?: number;
    nameEn: string;
    nameAr: string;
    constructor(nameEn: string = "", nameAr: string = "", id: number = 0) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
    }
  }
  