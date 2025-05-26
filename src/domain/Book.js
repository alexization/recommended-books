export class Book {
    constructor(bookData) {
        this.title = bookData.title || '';
        this.alternativeTitle = bookData.alternativeTitle || '';
        this.creator = bookData.creator || '';    // 주된 책임을 진 개체
        this.regDate = bookData.regDate || '';   // 등록일
        this.collectionDb = bookData.collectionDb || '';  // 소속 DB
        this.subjectCategory = bookData.subjectCategory || '';
        this.subjectKeyword = bookData.subjectKeyword || '';
        this.extent = bookData.extent || '';
        this.description = bookData.description || '';
        this.spatialCoverage = bookData.spatialCoverage || '';
        this.temporal = bookData.temporal || '';
        this.person = bookData.person || '';
        this.language = bookData.language || '';
        this.sourceTitle = bookData.sourceTitle || '';
        this.rights = bookData.rights || '';
        this.copyrightOthers = bookData.copyrightOthers || '';
        this.contributor = bookData.contributor || '';
    }

    static fromJSON(bookData) {
        return new Book(bookData);
    }

    toJSON() {
        return {
            title: this.title,
            alternativeTitle: this.alternativeTitle,
            creator: this.creator,
            regDate: this.regDate,
            collectionDb: this.collectionDb,
            subjectCategory: this.subjectCategory,
            subjectKeyword: this.subjectKeyword,
            extent: this.extent,
            description: this.description,
            spatialCoverage: this.spatialCoverage,
            temporal: this.temporal,
            person: this.person,
            language: this.language,
            sourceTitle: this.sourceTitle,
            rights: this.rights,
            copyrightOthers: this.copyrightOthers,
            contributor: this.contributor,
        };
    }
}