# UIKit Contributor Policy

---

1. [Development Process](#development-process)
1. [Bug Reporting](#bug-reporting)
    1. [What is considered a bug?](#what-is-considered-a-bug)
    1. [How do I report a bug?](#how-do-i-report-a-bug)
    1. [How quickly will my bug be fixed?](#how-quickly-will-my-bug-be-fixed)
1. [Feature Requests](#feature-requests)
1. [Pull Requests](#pull-requests)
    1. [Commit Message Format](#commit-message-format)
    1. [Code Syntax and Guidelines](#code-syntax-and-guidelines)

---

### Development Process

UIKit is developed within the `enigma-platform` organization and releases are forwarded to the public mirror: [`bibliotech/uikit`](https://github.com/bibliotech/uikit). The CHANGELOG will be updated with each release and a new git tag will be created.

[back to top](#uikit-contributor-policy)

---

### Bug Reporting
#### What is considered a bug?

If a component deviates from the spec outlined in its documentation (README.md), then that errant behavior is a bug.

#### How do I report a bug?

Create a new entry in the repository [issue tracker](https://github.com/bibliotech/uikit/issues).

#### How quickly will my bug be fixed?

The UIKit team is committed to fixing verified bugs as soon as possible. Depending on the complexity of the issue, a release to address it could be cut the same day, but time must be allowed to add regression testing and verify the fix in all supported browsers.

[back to top](#uikit-contributor-policy)

---

### Feature Requests

UIKit addresses a specific need: to normalize behavior in common UI patterns and provide easily-composable components that do not require significant rewriting or tweaking for every new project.

If you have an idea for functionality or a new component to be added to the kit, we welcome such requests in our [issue tracker](https://github.com/bibliotech/uikit/issues). If the request is too specific to your project's implementation, it will likely be rejected.

[back to top](#uikit-contributor-policy)

---

### Pull Requests

Community pull requests (PRs) will only be considered for bug fixes and performance-related improvements.

At this time, we are not accepting PRs for new components or functionality. Instead, follow the feature request procedure and, if it makes sense, we will include it in our roadmap.

#### Commit Message Format

Commit messages should be written in present tense. For example, "Replace Foo with Bar" instead of "Replaced Foo with Bar".

Adhere to the 70/120 rule when writing commit messages:

1. The title line should be no more than 70 characters
1. Separate the title and body with an empty newline
1. The commit message body can be as long as you want, hard-wrapped at 120 characters per line

Example:

```text
Site / README updates

Adding User Interface Guideline suggestions (thanks Eris!) and tweaking
some of the styles and demos.
```

#### Code Syntax and Guidelines

UIKit follows the EEP [Javascript Style Guide](https://github.com/bibliotech/enigma-engineering-practices/blob/master/standards/development/javascript.md). Lint your code via `npm run lint` to ensure that you are in compliance before sending a PR.

[back to top](#uikit-contributor-policy)
