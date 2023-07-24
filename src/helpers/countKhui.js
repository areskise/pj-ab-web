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
            // Check if the current date is a Tuesday.
            if (date.getDay() === 2) {
              // Increment the count of third days.
              count++;
            }
          }
    }
}