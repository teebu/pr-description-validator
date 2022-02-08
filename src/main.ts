import * as core from '@actions/core'
import * as github from '@actions/github'
import {reFound, reMatch} from './validator'

async function run(): Promise<void> {
  try {
    const default_description_text: string = core.getInput('default_description_text')
    const add_to_changelog_pattern: string = core.getInput('add_to_changelog_pattern')
    const default_changelog_text: string = core.getInput('default_changelog_text')
    const min_acceptable_changelog_string: string = core.getInput('min_acceptable_changelog_string')
    let check_default_changelog_string = true

    console.log('PR BODY:')
    console.log(github.context.payload.pull_request?.body)

    const found: string | boolean = reFound(github.context.payload.pull_request?.body, default_description_text)
    if (found) {
      console.log('found default description')
      throw new Error('Pull request description using default description text.')
    }

    let match = reMatch(github.context.payload.pull_request?.body, add_to_changelog_pattern)
    if (match) {
      console.log('add_to_changelog_pattern found match:', match)
      // don't check default string if should include in changelog is 'NO'
      if (match.toUpperCase().includes('NO')) check_default_changelog_string = false
    } else {
      throw new Error('Pull request description missing YES or NO option for add to changelog.')
    }

    console.log('find changelog string:', check_default_changelog_string)

    // check default string if the answer to add to changelog is 'YES'
    if (check_default_changelog_string) {
      const changelog_pattern: string = core.getInput('changelog_pattern')
      match = reMatch(github.context.payload.pull_request?.body, changelog_pattern)

      if (match) {
        console.log('changelog_pattern found match:', match)
        if (match === default_changelog_text) {
          throw new Error('Pull request description found default changelog string.')
        } else if (match.length < parseInt(min_acceptable_changelog_string)) {
          // needs to meet minimum acceptable string length
          throw new Error(`Pull request changelog string too short: ${parseInt(min_acceptable_changelog_string)}`)
        }
      } else {
        throw new Error('Pull request description error, changelog string not found.')
      }
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
