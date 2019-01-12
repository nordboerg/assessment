import { Converter } from './lib/converter';
import { DIGITS } from './model/numerical-constants';

const converter = new Converter(DIGITS);
const submit = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('.result-text');

submit.addEventListener('click', onConvert);

function onConvert(): void {
    result.textContent = converter.convertToString(input.value);
}
