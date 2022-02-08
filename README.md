# Pull Request Description Validator

Want to provide some standards on your project? The pull request validator is here to help!

# Example Usage

Here's an example of where we want our pull request description to have 

```yaml
name: 'Pull Request Description Validator'
on:
  pull_request:
    types: [opened, reopened, edited]

jobs:
  require-valid-pr-description:
    runs-on: ubuntu-latest
    steps:
      - name: Validate Issues Description with changelog
        uses: teebu/pr-description-validator@main
        with: 
          add_to_changelog_pattern: "\|[ ]+add to changelog[ ]+\|[ ]+(`?yes`?)[ ]+\||\|[ ]+add to changelog[ ]+\|[ ]+(`?no`?)[ ]+\|"
          changelog_pattern: "\|[ ]*Changelog Text[ ]*\|[ ]*(\`?[\w\s<>]*\`?)[ ]*\|"
          min_acceptable_changelog_string: "20"
```
