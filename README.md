# Pull Request Description Validator

Want to provide some standards on your project? The pull request validator is here to help!

# Example Usage

Here's an example of where we want our pull request description to have. 

```yaml
name: "PR Validator"
on:
  pull_request:
    types: [opened, reopened, edited]

jobs:
  pr-validator:
    name: Validate Description
    runs-on: ubuntu-latest
    # exclude special actors to skip checks
    if: |
      !contains(fromJson('["dependabot[bot]", "teebu"]'), github.actor)
    steps:
      - name: Validate Issues Description with changelog
        uses: teebu/pr-description-validator@main
        with: 
          # optional defaults
          default_description_text: "What was changed and why was this change made, what does the reviewer need to know"
          add_to_changelog_pattern: "\\|[ ]+add to changelog[ ]+\\|[ ]+(`?yes`?|`?no`?)[ ]+\\|"
          changelog_pattern: "\\|[ ]*Changelog Text[ ]*\\|[ ]*(\\`?[\\w\\s!@#$%:&`\'*+\\/=?^_`(){}<>~,]*\\`?)[ ]*\\|"
          default_changelog_text: "`<What would you write for the end user to understand the change>`"
          min_acceptable_changelog_string: "20"
```
