export class Book {
    constructor(bookData) {
        this.bk_nm = bookData.bk_nm;    // 도서명
        this.aut_nm = bookData.aut_nm;  // 저자명
        this.pblshr = bookData.pblshr;  // 출판사
        this.pblcn_yr = bookData.pblcn_yr;  // 발행연도
        this.callno = bookData.callno;  // 청구기호
        this.lib = bookData.lib;    // 소장 도서관
        this.refrm = bookData.refrm;    // 소장 자료실
        this.loan_yn = bookData.loan_yn;    // 대출여부
        this.rtn_ed = bookData.rtn_ed;  // 반납 예정일
        this.bk_rsvt = bookData.bk_rsvt;    // 도석예약 여부
        this.mutl_loan = bookData.mutl_loan;    // 상호대차 여부
    }

    static fromJSON(bookData) {
        return new Book(bookData);
    }

    toJSON() {
        return {
            bk_nm: this.bk_nm,
            aut_nm: this.aut_nm,
            pblshr: this.pblshr,
            pblcn_yr: this.pblcn_yr,
            callno: this.callno,
            lib: this.lib,
            refrm: this.refrm,
            loan_yn: this.loan_yn,
            rtn_ed: this.rtn_ed,
            bk_rsvt: this.bk_rsvt,
            mutl_loan: this.mutl_loan
        };
    }
}