export default function countKhui(num, type, startDate, endDate, loading) {
    let count = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date()
    
    if(start > now) {
        return count;
    }
    if(now <= end) {
        if(type===1) {
            for (let date = start; date <= now; date = new Date(date.setDate(date.getDate() + 1))) {
                if (date.getDate() === num) {
                    count++;
                }
            }
        }
        if(type===2) {
            for (let date = start; date <= now; date = new Date(date.setDate(date.getDate() + 1))) {
                if (date.getDay() === num) {
                    count++;
                }
            }
        }
        if(type===3) {
            for (let date = start; date <= now; date = new Date(date.setHours(date.getHours() + 1))) {
                if (date.getHours() === num) {
                    count++;
                }
            }
        }
    }

    if(now > end) {
        if(type===1) {
            for (let date = start; date <= end; date = new Date(date.setDate(date.getDate() + 1))) {
                if (date.getDate() === num) {
                    count++;
                }
            }
        }
        if(type===2) {
            for (let date = start; date <= end; date = new Date(date.setDate(date.getDate() + 1))) {
                if (date.getDay() === num) {
                    count++;
                }
            }
        }
        if(type===3) {
            for (let date = start; date <= end; date = new Date(date.setHours(date.getHours() + 1))) {
                if (date.getHours() === num) {
                    count++;
                }
            }
        }
    }
    return count;
}