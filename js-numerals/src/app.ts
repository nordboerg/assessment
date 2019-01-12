import { Converter } from './ts/converter';
import { DIGITS_LT_21, ROUND_DOUBLES, POSTFIX } from './ts/numerical-constants';

const converter = new Converter(DIGITS_LT_21, ROUND_DOUBLES, POSTFIX);
const submit = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('.result-text');

submit.addEventListener('click', onConvert);

function onConvert(): void {
    result.textContent = converter.convertToString(input.value);
}
