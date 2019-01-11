const submit = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('.result-text');

submit.addEventListener('click', () => {
  console.log(typeof input.value);
  console.log(addPostfix(convertToString(input.value)).join(' '));
});

const DIGITS_LT_21 = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const ROUND_DOUBLES = [null, null, 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const POSTFIX = [null, 'hundred', 'thousand', 'million', 'billion', 'trillion'];

function splitToTriples(num: number): string[] {
  return num.toLocaleString('en-US').split(',');
}

function convertToString(value: string): string[] {
  const segments = splitToTriples(parseInt(value, 10));

  return segments.map(segment => convertSegment(segment));
}

function convertSegment(segment: string): string {
  const value = parseInt(segment, 10);
  const length = value.toString().length;

  switch (length) {
    case 3:
      return getTriple(value);
    case 2:
      return getDouble(value);
    case 1:
      return getSingle(value);
  }
}

function getSingle(int: number): string {
  return DIGITS_LT_21[int];
}

function getDouble(int: number): string {
  if (int < 21) {
    return DIGITS_LT_21[int];
  } else if (int % 10 === 0) {
    const initial = int.toString().slice(0, 1);
    return ROUND_DOUBLES[initial];
  } else {
    const parts = int.toString().split('');
    return ROUND_DOUBLES[parts[0]] + '-' + DIGITS_LT_21[parts[1]];
  }
}

function getTriple(int: number): string {
  const hundred = parseInt(int.toString().slice(0, 1), 10);
  const rest = parseInt(int.toString().slice(1, 3), 10);

  return `${getSingle(hundred)} hundred` + (rest > 0 ? ` and ${getDouble(rest)}` : '');
}

function addPostfix(arr: string[]): string[] {
  return arr.reverse().map((el, i) => i > 0 ? `${el} ${POSTFIX[i + 1]}` : el).reverse();
}

/*
  1. split to triples
  2. convert triples
  3. add postfixes
  4. join result
*/
