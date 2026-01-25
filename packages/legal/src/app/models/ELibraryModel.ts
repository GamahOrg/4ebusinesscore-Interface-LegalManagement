export class ELibraryModel {
  id: string;
  nameAr: string;
  nameEn: string;
  url: string;
  imagePath: string;
  filePath: string;
  constructor(
    nameEn: string = "",
    nameAr: string = "",
    id: string = "",
    url: string = "",
    filePath: string = "",
    imagePath: string = ""
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.url = url;
    this.filePath = filePath;
    this.imagePath = imagePath;
  }
}
