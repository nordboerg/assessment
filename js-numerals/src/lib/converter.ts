import { Digits } from '../model/digits';

export class Converter {
    constructor(private DIGITS: Digits) { }

    splitToSegments(value: string): string[] {
        return parseInt(value, 10).toLocaleString('en-US').split(',');
    }

    convertToString(value: string): string {
        const segments = this.splitToSegments(value);
        const converted = segments.map(segment => this.convertSegment(segment));

        return this.formatResult(converted);
    }

    convertSegment(segment: string): string {
        const value = parseInt(segment, 10);
        const length = value.toString().length;

        switch (length) {
            case 3:
                return this.getTriple(value);
            case 2:
                return this.getDouble(value);
            case 1:
                return this.getSingle(value);
        }
    }

    getSingle(int: number): string {
        return this.DIGITS.lt_21[int];
    }

    getDouble(int: number): string {
        if (int < 21) {
            return this.DIGITS.lt_21[int];
        } else if (int % 10 === 0) {
            const initial = int.toString().slice(0, 1);
            return this.DIGITS.round_doubles[initial];
        } else {
            const parts = int.toString().split('');
            return this.DIGITS.round_doubles[parts[0]] + '-' + this.DIGITS.lt_21[parts[1]];
        }
    }

    getTriple(int: number): string {
        const hundred = parseInt(int.toString().slice(0, 1), 10);
        const rest = parseInt(int.toString().slice(1), 10);

        return `${this.getSingle(hundred)} hundred` +
            (rest > 0 ? ` and ${this.getDouble(rest)}` : '');
    }

    addPostfix(arr: string[]): string[] {
        return arr.reverse().map((el, i) =>
            i > 0 ? `${el} ${this.DIGITS.postfix[i + 1]}` : el).reverse();
    }

    formatResult(arr: string[]): string {
        if (arr.length > 1 && !arr[arr.length - 1].includes('and')) {
            arr[arr.length - 1] = 'and ' + arr[arr.length - 1];
        }

        return this.addPostfix(arr).join(' ');
    }
}
