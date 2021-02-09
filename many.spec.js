const many = require('./many.js');
const { suite, test } = require('mocha');
const { expect } = require('chai');

suite('many', function() {
  test('is a template literal', function () {
    expect(many`foo`).to.equal('foo');
  });
});

suite('maybe operator', function() {
  test('single count', function () {
    expect(many`${1} things?`).to.equal('1 thing');
    expect(many`${2} things?`).to.equal('2 things');
  });

  test('multiple counts', function () {
    expect(many`${1} lands? and ${100} flowers?`).to.equal('1 land and 100 flowers');
    expect(many`${2} lands? and ${1} flowers?`).to.equal('2 lands and 1 flower');
  });

  test('works with groups', function () {
    expect(many`${1} potato(es)?`).to.equal('1 potato');
    expect(many`${5} potato(es)?`).to.equal('5 potatoes');
  });
});

suite('either operator', function() {
  test('single count', function () {
    expect(many`${1} sky|i(es)?`).to.equal('1 sky');
    expect(many`${7} sky|i(es)?`).to.equal('7 skies');
  });

  test('works with right-groups', function () {
    expect(many`${1} sky|(ies)`).to.equal('1 sky');
    expect(many`${7} sky|(ies)`).to.equal('7 skies');
  });

  test('works with two-sided groups', function () {
    expect(many`${1} (sky)|(skies)`).to.equal('1 sky');
    expect(many`${7} (sky)|(skies)`).to.equal('7 skies');
  });
});

suite('hint operator', function() {
  test('single count', function () {
    expect(many`We are #${1}(one)|(many)`).to.equal('We are one');
    expect(many`We are #${5}(one)|(many)`).to.equal('We are many');
  });
});

suite('group operator', function() {
  test('does nothing on its own', function () {
    expect(many`${1} point(less) groups?`).to.equal('1 pointless group');
    expect(many`${2} point(less) groups?`).to.equal('2 pointless groups');
  });
});

suite('escape operator', function() {
  test('will escape maybe', function () {
    expect(many`${1} question\\?`).to.equal('1 question?');
  });

  test('will escape group', function () {
    expect(many`${3} green \\(spring\\) onions?`).to.equal('3 green (spring) onions');
  });

  test('will escape either', function () {
    expect(many`${1} users? (was)|(were) subject to a\\|b testing`).to.equal('1 user was subject to a|b testing');
  });

  test('will escape number hint', function () {
    expect(many`We are \\#${1}`).to.equal('We are #1');
  });
});
