import {reFound, reMatch} from '../src/validator'
import {expect, test, describe} from '@jest/globals'

const add_to_changelog_pattern = "\\|[ ]+add to changelog[ ]+\\|[ ]+(`?yes`?|`?no`?)[ ]+\\|"
const changelog_pattern = "\\|[ ]*Changelog Text[ ]*\\|[ ]*(`?[^\\|]*`?)[ ]*\\|"
const default_description_test = "What was changed and why was this change made, what does the reviewer need to know"

describe("Test regex", () => {
  test("it should fail to find valid changelog inclusion (default)", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`YES\`/\`NO\`             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(false)
  });

  test("it should to find valid changelog inclusion `yes`", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`YES\`             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(true)
  });

  test("it should to find valid changelog inclusion YES", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       YES             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(true)
  });

  test("it should find valid changelog inclusion `no`", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(true)
  });

  test("it should find valid default changelog string", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(true)
  });

  test("it should not find and invalidate default add to change log yes/no option", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`YES\`/\`NO\`             |
|  Changelog Text   |   \`<What would you write for the end user to understand the change>\`        |
`
    expect(reFound(inputStr, add_to_changelog_pattern)).toBe(false)
  });

  test("it should find short changelog string with ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   \`Short\`        |
`
    expect(reMatch(inputStr, changelog_pattern)).toBe('`Short`')
  });

  test("it should find Some description string without ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   Some description        |
`
    expect(reMatch(inputStr, changelog_pattern)).toBe('Some description')
  });

  test("it should find description with emojis string without ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   Some 😊 description        |
`
    expect(reMatch(inputStr, changelog_pattern)).toBe('Some 😊 description')
  });

  test("it should find 'no' for add to changelog with ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       \`no\`             |
|  Changelog Text   |   Some description        |
`
    expect(reMatch(inputStr, add_to_changelog_pattern)).toBe('`no`')
  });

  test("it should find and match 'no' for add to changelog without ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       yes             |
|  Changelog Text   |   Some description        |
`
    expect(reMatch(inputStr, add_to_changelog_pattern)).toBe('yes')
  });

  test("it should find 'no' for add to changelog without ticks", () => {
    const inputStr = `
|                |                          |
|----------------|------------------|
|  Add To Changelog  |       yes             |
|  Changelog Text   |   Some description        |
`
    expect(reMatch(inputStr, add_to_changelog_pattern)).toBe('yes')
  });

  test("it should find default description text", () => {
    const inputStr = `

## Description:

\`What was changed and why was this change made, what does the reviewer need to know?\`
`
    expect(reFound(inputStr, default_description_test)).toBe(true)
  });

  test("it should not find default description text", () => {
    const inputStr = `
## Description:

\`Lots was changed \`
`
    expect(reFound(inputStr, default_description_test)).toBe(false)
  });
});
