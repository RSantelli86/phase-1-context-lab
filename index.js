// Helper function to extract date and hour from a dateStamp
function extractDateAndHour(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    return [date, parseInt(hour)];
}

// Creates an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Processes an array of arrays into employee records
function createEmployeeRecords(employeeDataArrays) {
    return employeeDataArrays.map(createEmployeeRecord);
}

// Adds a time-in event to an employee's record
function createTimeInEvent(dateStamp) {
    let [date, hour] = extractDateAndHour(dateStamp);
    this.timeInEvents.push({
        type: "TimeIn",
        hour,
        date,
    });
    return this;
}

// Adds a time-out event to an employee's record
function createTimeOutEvent(dateStamp) {
    let [date, hour] = extractDateAndHour(dateStamp);
    this.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date,
    });
    return this;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(date) {
    let inEvent = this.timeInEvents.find(e => e.date === date);
    let outEvent = this.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

// Calculates total wages for all dates
const allWagesFor = function() {
    let totalWages = this.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate.call(this, event.date);
    }, 0);
    return totalWages;
};

// Finds an employee by first name from an array of employee records
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Calculates total payroll for an array of employee records
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor.call(record);
    }, 0);
}

// Binding functions to objects if necessary
// Note: Depending on how your tests are set up, you might need to bind these functions to employee objects.
// This can be done when creating the employee record or by explicitly setting the function's prototype if needed.