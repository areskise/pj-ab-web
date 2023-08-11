export default function partKhui(num, type, startDate, endDate) {
    let part = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
        if(type===1) {
            for (let date = start; date <= end; date = new Date(date.setDate(date.getDate() + 1))) {
                if (date.getDate() === num) {
                    part=[...part, new Date(date)];
                }
            }
        }
        if(type===2) {
            for (let date = start; date <= end; date = new Date(date.setDate(date.getDate() + 1))) {
                
                if (date.getDay() === num-1) {
                    part=[...part, new Date(date)];
                }
            }
        }
        if(type===3) {
            for (let date = start; date <= end; date = new Date(date.setHours(date.getHours() + 1))) {
                if (date.getHours() === num) {
                    part=[...part, new Date(date)];
                }
            }
        }
    return part;
}