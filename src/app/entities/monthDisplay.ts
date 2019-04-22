class MonthDisplay {
    month: number;
    displayValue: String;

    constructor(month: number, displayValue: String) {
      this.month = month;
      this.displayValue = displayValue;
    }

    getDisplayValue() : String {
      return this.displayValue;
    }

    getMonth() : number {
      return this.month;
    }
  }

export default MonthDisplay;