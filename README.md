# many
Small tagged template for writing plurals

## Introduction

many is a small utility template to help you quickly write messages while accounting for quantity. Its core aim is to provide a simpler alternative to inline checking.

```js
// original
`You have ${count} item${count !== 1 ? 's' : ''}`

// many
many`You have ${count} items?`
```

Unlike more advanced libraries, which attempt to infer the plural form given the singular, many expects you to describe the changes from singular to the plural yourself, with the help of a collection of operators.

**Advantages**
- Tiny size, with no dependencies
- Referentially transparent
- Human language agnostic

**Disadvantages**
- Each plural form must be described manually
- Operators are _on_ by default and may need to be escaped
- Operators are not self-descriptive

## Operators

Operators help you describe changes in your string. They may capture characters (or groups) in either direction and will always use the last set quantity.

### Maybe `*?`

The _maybe_ operator will print the preceeding character or group only if the count is not 1.

```js
many`${1} things?`
// 1 thing

many`${2} things?`
// 2 things
```
```js
many`${1} potato(es)?`
// 1 potato

many`${1} potato(es)?`
// 5 potatoes
```

### Either `*|*`
### Group `(*)`
### Hint `#*`
### Escape `\\*`
