import { Digits } from '../model/digits';

export class Converter {
    offset: number;

    constructor(private DIGITS: Digits) { }

    convertToWords(value: string): string {
        const segments = this.splitToSegments(value);
        const converted = segments.map(segment => this.convertSegment(segment));

        return this.formatResult(converted);
    }

    splitToSegments(value: string): string[] {
        const num = parseInt(value, 10);

        if (num >= 1100 && num < 2000) {
            this.offset = 0;
            return [num.toString().slice(0, 2), num.toString().slice(2)];
        } else {
            this.offset = 1;
            return num.toLocaleString('en-US').split(',');
        }
    }

    convertSegment(segment: string): string {
        const value = parseInt(segment, 10);
        const length = value.toString().length;

        return length < 3 ? this.getDouble(value) : this.getTriple(value);
    }

    getDouble(int: number): string {
        if (int < 21) {
            return this.DIGITS.lt_21[int];
        } else if (int % 10 === 0) {
            return this.DIGITS.round_doubles[int / 10];
        } else {
            const parts = int.toString().split('');
            return this.DIGITS.round_doubles[parts[0]] + '-' + this.DIGITS.lt_21[parts[1]];
        }
    }

    getTriple(int: number): string {
        const str = int.toString();
        const hundred = parseInt(str.slice(0, 1), 10);
        const rest = parseInt(str.slice(1), 10);

        return `${this.getDouble(hundred)} hundred` +
            (rest > 0 ? ` and ${this.getDouble(rest)}` : '');
    }

    addPostfix(arr: string[]): string[] {
        return arr.reverse().map((el, i) =>
            i > 0 ? `${el} ${this.DIGITS.postfix[i + this.offset]}` : el).reverse();
    }

    formatResult(arr: string[]): string {
        const last = arr.length - 1;

        if (arr.length > 1 && !arr[last].includes('and')) {
            arr[last] = `and ${arr[last]}`;
        }

        return this.addPostfix(arr)
            .filter((el, i, arr) => arr[0] === 'zero' || !el.includes('zero'))
            .join(' ');
    }
}
