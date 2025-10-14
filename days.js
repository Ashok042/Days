function solution(D) {
    // Step 1: Define day names in correct order
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Step 2: Initialize output dictionary
    let result = {
        "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0,
        "Fri": 0, "Sat": 0, "Sun": 0
    };

    // Step 3: Fill known values from D (input dictionary)
    for (let dateStr in D) {
        let date = new Date(dateStr);
        // getDay() gives 0=Sun, 1=Mon, ...
        let jsDay = date.getDay();
        let day = days[(jsDay + 6) % 7]; // shift to make Mon=0, Sun=6
        result[day] += D[dateStr];
    }

    // Step 4: Handle missing days using mean of previous and next
    const values = days.map(day => result[day]);

    for (let i = 0; i < 7; i++) {
        if (values[i] === 0) {
            // find previous non-zero
            let prevIndex = i - 1;
            while (prevIndex >= 0 && values[prevIndex] === 0) prevIndex--;
            // find next non-zero
            let nextIndex = i + 1;
            while (nextIndex < 7 && values[nextIndex] === 0) nextIndex++;

            // calculate mean if both found
            if (prevIndex >= 0 && nextIndex < 7) {
                values[i] = (values[prevIndex] + values[nextIndex]) / 2;
            }
        }
    }

    // Step 5: Rebuild final dictionary
    for (let i = 0; i < 7; i++) {
        result[days[i]] = values[i];
    }

    return result;
}

// ---------------------------
// Example 1
const D1 = {
    "2020-01-01": 4,
    "2020-01-02": 4,
    "2020-01-03": 6,
    "2020-01-04": 8,
    "2020-01-05": 2,
    "2020-01-06": 6,
    "2020-01-07": 2,
    "2020-01-08": -2
};

console.log("Example 1 Output:");
console.log(solution(D1));

// ---------------------------
// Example 2 (Missing Thu & Fri)
const D2 = {
    "2020-01-01": 6,
    "2020-01-04": 12,
    "2020-01-05": 14,
    "2020-01-06": 2,
    "2020-01-07": 4
};

console.log("\nExample 2 Output:");
console.log(solution(D2));
