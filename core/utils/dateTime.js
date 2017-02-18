export const dateDiff = (fromDate, to2Date) => {
    if (!fromDate) {
        throw new Error('Date should be specified');
    }
    let startDate= new Date(1970, 0, 1, 0).getTime(),
        now = new Date(),
        toDate= to2Date && to2Date instanceof Date ? to2Date : now,
        diff = toDate - fromDate,
        date = new Date(startDate + diff),
        years = date.getFullYear() - 1970,
        months = date.getMonth(),
        days = date.getDate() - 1,
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        diffDate= {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

    if (years < 0) {
        return diffDate;
    }
    diffDate.years = years > 0 ? years : 0;
    diffDate.months = months > 0 ? months : 0;
    diffDate.days = days > 0 ? days : 0;
    diffDate.hours = hours > 0 ? hours : 0;
    diffDate.minutes = minutes > 0 ? minutes : 0;
    diffDate.seconds = seconds > 0 ? seconds : 0;
    return diffDate;
}





// 将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// Format(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// Format(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 

export const dateTimeFormat = (dateTime, fmt) => {
    if ( !dateTime ) {
        return
    }
    if ( !fmt ) {
        console.log('缺少格式化占位符，如Format(new Date(), "yyyy-MM-dd hh:mm:ss.S")')
        return
    }
    if (typeof dateTime == "number") {
        dateTime = new Date(dateTime);
    } else {
        dateTime = dateTime instanceof Date ? dateTime : new Date(dateTime.time * 1000);
    }
    const weekDay= ['日', '一', '二', '三', '四', '五', '六']
    let week = '星期';
    week = week + weekDay[dateTime.getDay() || 0];
    const o= {
        "M+": (dateTime.getMonth() + 1), // 月份 
        "d+": dateTime.getDate(), // 日 
        "h+": dateTime.getHours(), // 小时 
        "m+": dateTime.getMinutes(), // 分 
        "s+": dateTime.getSeconds(), // 秒 
        "S": dateTime.getMilliseconds(), // 毫秒 
        "w": week  // 星期几
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export const getPastDayName = (dateTimeStr) => {
    if (!dateTimeStr || dateTimeStr.length === 0) {
        return dateTimeStr;
    }
    const dateTime = new Date(dateTimeStr);
    const passDay= dateDiff(dateTime, new Date);
    const passName = ['今天', '昨天', '前天', '一周前']
    return passName[passDay.days] ? passName[passDay.days] + ' ' + dateTimeFormat(dateTime, 'hh:mm') : dateTimeStr;
}

