export default function customerList(selectCustomer, action) {
    let result = []
    switch(action) {
        case 'Add':
            for (let i = 0; i <= selectCustomer.length; i++) {
                for (let j = 1; j <= selectCustomer[i]?.num; j++) {
                    result.push(selectCustomer[i])
                }
            }
            break
        case 'Update':
            result = selectCustomer.filter((obj) => selectCustomer.indexOf(obj) === selectCustomer.findIndex(o => o.customerId === obj.customerId));
            break
    }
    return result;
}
