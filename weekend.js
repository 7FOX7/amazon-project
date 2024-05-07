function isWeekend(date) {
    if(date === 0 || date === 6) {
        return 'Weekend'; 
    } 
    else {
        return 'NOT Weekend'; 
    }
}

export default isWeekend; 