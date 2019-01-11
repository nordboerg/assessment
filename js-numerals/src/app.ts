import { convertToString, addPostfix } from './ts/converter';

const submit = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('.result-text');

submit.addEventListener('click', () => {
  console.log(addPostfix(convertToString(input.value)).join(' '));
});
