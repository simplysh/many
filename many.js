const pluralise = (string, count) => {
  let index = 0;
  let result = '';
  let capture = false;
  let group = '';
  let left = '';

  while (index++ < string.length) {
    if (index === 0) { continue; }

    let prev = string[index - 1];
    const char = string[index];

    if (prev === '\\') {
      index++;

      result += char;

      continue;
    }

    if (prev === '(') {
      capture = true;

      continue;
    }

    if (prev === ')') {
      capture = false;

      prev = group;
      group = '';
    }

    if (capture) {
      group += prev;

      continue;
    }

    if (left) {
      if (count === 1) {
        prev = left;
      }

      left = '';
    }

    if (char === '?') {
      index++;

      if (count === 1) {
        continue;
      }
    }

    if (char == '|') {
      index++;

      left = prev;

      continue;
    }

    result += prev;
  }

  return result;
}

const many = (strings, ...expressions) => {
  let count = 0;
  let result = '';

  for (let i = 0, len = strings.length; i < len; i++) {
    let string = strings[i];
    let expression = expressions[i] || '';

    if (string.endsWith('#') && !string.endsWith('\\#')) {
      if (typeof expression === 'number') {
        count = expression;

        string = string.slice(0, -1);
        expression = '';
      }
    }

    result = result + pluralise(string, count) + expression;

    if (typeof expression === 'number') {
      count = expression;
    }
  }

  return result;
}

window.many = many;
export default many;
