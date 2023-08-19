export default function mapCusOne(array) {   
    let newArry = []
    for (let i = 0; i < array.length; i++) {
        if (!newArry.map(r=>r.customerId).includes(array[i].customerId)) {
            newArry.push(array[i]);
        }
    }
    return newArry;
}