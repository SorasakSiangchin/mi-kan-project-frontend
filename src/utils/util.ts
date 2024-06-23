

export const findMatchOptionAutocompleteSingle = <T>(item: Array<T>, selectedValue: T | undefined | string, keyToMap: keyof T): T => {

    let newT: T;

    const filteredItem = item?.find(i => i[keyToMap] === selectedValue);

    if (filteredItem) newT = filteredItem;
    else newT = selectedValue as T;

    return newT;
}

export function formatDateForMUIDatePicker(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // return `${day}-${month}-${year}`;

    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

export const screenWidth = "90rem";