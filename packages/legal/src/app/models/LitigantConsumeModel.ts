export class LitigantConsume {
    find(arg0: (item: any) => boolean) {
      throw new Error("Method not implemented.");
    }
    id: string;
    name: string;
    identityType: string;
    identityNumber: string;
    litigantStatus: number;
    count: number;
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    message: string;
    statusEnum: number;
  
    constructor(
      id: string = "",
      name: string = "",
      identityType: string = "",
      identityNumber: string = "",
      litigantStatus: number = 0,
      count: number = 0,
      pageIndex: number = 0,
      totalPages: number = 0,
      totalItems: number = 0,
      pageSize: number = 0,
      message: string = "",
      statusEnum: number = 0
    ) {
      this.id = id;
      this.name = name;
      this.identityType = identityType;
      this.identityNumber = identityNumber;
      this.litigantStatus = litigantStatus;
      this.count = count;
      this.pageIndex = pageIndex;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
      this.pageSize = pageSize;
      this.message = message;
      this.statusEnum = statusEnum;
    }
  }



  export class IdentityTypes {
    filter(arg0: (item: any) => boolean): import("react").ReactNode {
      throw new Error("Method not implemented.");
    }
    id: number;
    nameAr: string;
    nameEn: string;
    length: any;
  
    constructor(id: number = 0, nameAr: string = "", nameEn: string = "") {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
    }
  }
  
  export class IdentityTypesResponse {
    result: IdentityTypes[];
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    message: string;
    statusEnum: number;
  
    constructor(
      result: IdentityTypes[] = [],
      pageIndex: number = 0,
      totalPages: number = 0,
      totalItems: number = 0,
      pageSize: number = 0,
      message: string = "",
      statusEnum: number = 0
    ) {
      this.result = result;
      this.pageIndex = pageIndex;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
      this.pageSize = pageSize;
      this.message = message;
      this.statusEnum = statusEnum;
    }
  }
  
  