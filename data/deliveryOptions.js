import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2', 
    deliveryDays: 3, 
    priceCents: 499
}, {
    id: '3', 
    deliveryDays: 1, 
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    // here we generate deliveryOption id (which when first launched)
    // returns 1 by default
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId) {
        deliveryOption = option; 
      }
    });

    return deliveryOption; 
}

export function calculateDeliveryDate(deliveryOption) { 
    let today = dayjs(); 
    function isWeekend(day) {
      const dayOfWeek = day.day(); 
      if(dayOfWeek === 0 || dayOfWeek === 6) {
        return true; 
      }
    }
    
    for(let i = 0; i < deliveryOption.deliveryDays; i++) { 
      today = today.add(1, 'day'); 
      while(isWeekend(today)) {
        today = today.add(1, 'day'); 
      }
    }

    const deliveryDate = today; 

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    ); 

    return dateString; 
}

export function isValidDeliveryOptionId(deliveryOptionId) {
  let found = false; 
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      found = true; 
    }
  });

  return found;
}
// function addBusinessDays(daysToAdd) {
//   let currentDate = dayjs();

//   // checks if a date is a weekend
//   const isWeekend = (date) => {
//     const dayOfWeek = date.day(); 
//     return dayOfWeek === 0 || dayOfWeek === 6; 
//   }

//   // loop through the array of days to add (3, 7, 1)
//   // and while i is less than days to add, increase day by one
//   for(let i = 0; i < daysToAdd; i++) {
//     currentDate.add(1, 'day'); 
//     if(isWeekend(currentDate)) {
//       currentDate.add(1, 'day'); 
//     }
//   }
//   return currentDate; 
// }