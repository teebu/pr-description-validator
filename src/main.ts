import * as core from '@actions/core'
import * as github from '@actions/github'
import {reFound, reMatch} from './validator'

async function run(): Promise<void> {
  try {
    const min_acceptable_changelog_string: string = core.getInput('min_acceptable_changelog_string')
    const add_to_changelog_pattern: string = core.getInput('add_to_changelog_pattern')

    if (!reFound(github.context.payload.pull_request?.body, add_to_changelog_pattern)) {
      throw new Error('Pull request description missing YES or NO option for add to changelog.')
    }

    console.log('PR BODY:')
    console.log(github.context.payload.pull_request?.body)

    const changelog_pattern: string = core.getInput('changelog_pattern')
    const match: string | null = reMatch(github.context.payload.pull_request?.body, changelog_pattern)
    if (match) {
      console.log('found match:', match)
      if (match === `<What would you write for the end user to understand the change>`) {
        throw new Error('Pull request description found default changelog string.')
      } else if (match.length < parseInt(min_acceptable_changelog_string)) {
        // needs to meet minimum acceptable string length
        throw new Error('Pull request changelog string too short.')
      }
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
