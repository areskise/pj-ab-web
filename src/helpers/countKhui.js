export default function countKhui(num, type, startDate, endDate) {
    let count = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date()
    if(start<now) {
        return count;
    }
    if(now<end) {
        for (let date = start; date <= now; date++) {
            switch(type) {
                case 1:
                    if (date.getDate() === num) {
                      count++;
                    }
                    break
                case 2:
                    if (date.getDay() === num-1) {
                        count++;
                    }
                    break
                case 3:
                    if (date.getHours() === num) {
                        count++;
                    }
                    break
            }
        }
        return count;
    }

    if(now>end) {
        for (let date = start; date <= end; date++) {
            switch(type) {
                case 1:
                    if (date.getDate() === num) {
                      count++;
                    }
                    break
                case 2:
                    if (date.getDay() === num-1) {
                        count++;
                    }
                    break
                case 3:
                    if (date.getHours() === num) {
                        count++;
                    }
                    break
            }
        }
        return count;
    }
}