export default function periodics(date) {
    let periodics = []
    for (let i = 1; i <= date.length; i++) {
        periodics = [...periodics, {
            periodic: i,
            date: new Date(date[i-1])
        }]
    }
    return periodics;
}