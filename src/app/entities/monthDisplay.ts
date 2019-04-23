class MonthDisplay {
    month: number;
    displayValue: string;

    constructor(month: number, displayValue: string) {
      this.month = month;
      this.displayValue = displayValue;
    }

    getDisplayValue(): string {
      return this.displayValue;
    }

    getMonth(): number {
      return this.month;
    }
  }

export default MonthDisplay;
