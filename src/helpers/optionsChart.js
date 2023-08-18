export const money = (reports, userId) => {
    const user = reports.filter(rs=>rs.userId===userId)
    const sum = user.map(rs=>rs.money).reduce((a, b) => a + b)
    return sum;
};

export const options = (reports) => {
    const array = reports.map(r=>{return {userId: r.userId, name:r.name, money: money(reports, r.userId), insureStaff: r.insureStaff}})
    
    let newArry = []
    for (let i = 0; i < array.length; i++) {
        if (!newArry.map(r=>r.userId).includes(array[i].userId)) {
            newArry.push(array[i]);
        }
    }
    return newArry;
}