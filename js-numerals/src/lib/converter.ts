import { Digits } from '../model/digits';

export class Converter {
    offset: number;

    constructor(private DIGITS: Digits) { }

    convertToWords(value: string): string {
        const segments = this.splitToSegments(value);
        const converted = segments.map(segment => this.convertSegment(segment));

        return converted.length > 1 ? this.formatResult(converted) : converted[0];
    }

    splitToSegments(value: string): string[] {
        const num = Number(value);

        if (num >= 1100 && num < 2000) {
            this.offset = 0;
            return [String(num).slice(0, 2), String(num).slice(2)];
        } else {
            this.offset = 1;
            return num.toLocaleString('en-US').split(',');
        }
    }

    convertSegment(segment: string): string {
        const value = String(Number(segment));

        return value.length < 3 ? this.getDouble(value) : this.getTriple(value);
    }

    getDouble(segment: string): string {
        const num = Number(segment);

        if (num < 21) {
            return this.DIGITS.lt_21[num];
        } else if (num % 10 === 0) {
            return this.DIGITS.round_doubles[num / 10];
        } else {
            const parts = segment.split('');
            return this.DIGITS.round_doubles[parts[0]] + '-' + this.DIGITS.lt_21[parts[1]];
        }
    }

    getTriple(segment: string): string {
        const hundred = segment.slice(0, 1);
        const rest = segment.slice(1);

        return `${this.getDouble(hundred)} hundred` +
            (Number(rest) > 0 ? ` and ${this.getDouble(rest)}` : '');
    }

    addPostfix(arr: string[]): string[] {
        return arr.reverse()
            .map((el, i) => i > 0 ? `${el} ${this.DIGITS.postfix[i + this.offset]}` : el)
            .reverse();
    }

    formatResult(arr: string[]): string {
        const last = arr.length - 1;
        arr[last] = !arr[last].includes('and') ? `and ${arr[last]}` : arr[last];

        return this.addPostfix(arr).filter(el => !el.includes('zero')).join(' ');
    }
}
