export function intersectionArrayOfSets(arrSets) {
    if (arrSets.length === 0) return new Set();

    // Start with the elements of the first set
    let result = new Set(arrSets[0]);

    // Iterate over each set in the array
    for (let i = 1; i < arrSets.length; i++) {
        let currentSet = arrSets[i];
        // Create a new set to hold the intersection
        let newSet = new Set();
        // Iterate over the elements of the current set
        for (let elem of currentSet) {
            // If the element exists in the result set, add it to the new set
            if (result.has(elem)) {
                newSet.add(elem);
            }
        }
        // Replace the result set with the new set
        result = newSet;
    }
    return result;
}

export function unionArrayOfSets(arrSets) {
    let result = new Set();

    // Iterate over each set in the array
    for (let currentSet of arrSets) {
        // Add all elements of the current set to the result set
        for (let elem of currentSet) {
            result.add(elem);
        }
    }

    return result;
}

export function differenceArrayOfSets(arrSets) {
    if (arrSets.length === 0) return new Set();
    
    // Start with the elements of the first set
    let result = new Set(arrSets[0]);

    // Iterate over each set in the array starting from the second set
    for (let i = 1; i < arrSets.length; i++) {
        let currentSet = arrSets[i];
        // Create a new set to hold the difference
        let newSet = new Set();
        // Iterate over the elements of the result set
        for (let elem of result) {
            // If the element doesn't exist in the current set, add it to the new set
            if (!currentSet.has(elem)) {
                newSet.add(elem);
            }
        }
        // Replace the result set with the new set
        result = newSet;
    }

    return result;
}

export function symmetricDifferenceArrayOfSets(arrSets) {
    let result = new Set();

    // Iterate over each set in the array
    for (let currentSet of arrSets) {
        // Create a new set to hold elements unique to the current set
        let uniqueToCurrentSet = new Set(currentSet);
        
        // Remove elements that are common with the result set
        for (let elem of result) {
            uniqueToCurrentSet.delete(elem);
        }
        
        // Add elements unique to the current set to the result set
        for (let elem of uniqueToCurrentSet) {
            result.add(elem);
        }
        
        // Remove elements that are common with the current set
        for (let elem of currentSet) {
            if (result.has(elem)) {
                result.delete(elem);
            } else {
                result.add(elem);
            }
        }
    }

    return result;
}