import { Digits } from '../model/digits';

export class Converter {
  isSimplified: boolean;

  constructor(private DIGITS: Digits) { }

  convertToWords(value: string): string {
    const segments = this.splitToSegments(value);
    const converted = segments.map(segment => this.convertSegment(Number(segment)));

    return converted.length > 1 ? this.formatResult(converted) : converted[0];
  }

  splitToSegments(value: string): string[] {
    const num = Number(value);

    if (num >= 1100 && num < 2000) {
      this.isSimplified = true;
      return [String(num).slice(0, 2), String(num).slice(2)];
    } else {
      this.isSimplified = false;
      return num.toLocaleString('en-US').split(',');
    }
  }

  convertSegment(segment: number): string {
    return String(segment).length < 3 ? this.getDouble(segment) : this.getTriple(segment);
  }

  getDouble(num: number): string {
    if (num < 21) {
      return this.DIGITS.lt_21[num];
    } else if (num % 10 === 0) {
      return this.DIGITS.round_doubles[num / 10];
    } else {
      const parts = String(num).split('');
      return this.DIGITS.round_doubles[parts[0]] + '-' + this.DIGITS.lt_21[parts[1]];
    }
  }

  getTriple(num: number): string {
    const hundred = Number(String(num).slice(0, 1));
    const rest = Number(String(num).slice(1));

    return `${this.getDouble(hundred)} hundred` +
      (Number(rest) > 0 ? ` and ${this.getDouble(rest)}` : '');
  }

  formatResult(converted: string[]): string {
    const offset = this.isSimplified ? 0 : 1;

    return converted.reverse()
      .map((el, i) => i > 0 ? `${el} ${this.DIGITS.postfix[i + offset]}` : el)
      .reverse()
      .filter(el => !el.includes('zero'))
      .reduce((result, curr, i, arr) =>
        result += i === arr.length - 1 && !curr.includes('and') ? ` and ${curr}` : ` ${curr}`, '')
      .trim();
  }
}
