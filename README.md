# Pull Request Description Validator

Want to provide some standards on your project? The pull request validator is here to help!

# Example Usage

Here's an example of where we want our pull request description to have the prefix "JIRA-(some_number)" at minimum. (e.g. `JIRA-101 Fix Project Management`)

```yaml
name: `Pull Request Title Validator`
on:
  pull_request:
    types: [opened, reopened, synchronize, edited]

jobs:
  require-valid-pr-title:
    runs-on: ubuntu-latest
    steps:
      - uses: teebu/pr-description-validator@master
        with:
          pattern: 'JIRA-\d+.*'
```
