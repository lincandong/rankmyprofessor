function daysAfterNow(days: number): Date {
    return daysAfter(new Date(), days)
}

function daysAfter(date: Date, days: number): Date {
    let res = new Date()
    res.setTime(date.getTime() + 1000 * 60 * 60 * 24 * days)
    return res
}

function formatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let monthStr = ""
    let strDateStr = ""
    if (month >= 1 && month <= 9) {
        monthStr = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDateStr = "0" + strDate;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}



export {
    daysAfter, daysAfterNow, formatDate
}