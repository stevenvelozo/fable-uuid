# Contributing Guide

Thank you for your interest in contributing to the Pict and Fable ecosystem! This guide applies to all repositories in the ecosystem, including Pict, Pict-View, Fable, Meadow, Orator, and related packages.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Git

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fable-uuid.git
   cd fable-uuid
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the tests to ensure everything is working:
   ```bash
   npm test
   ```

## Ways to Contribute

### Reporting Bugs

Before submitting a bug report:

1. Search existing issues to avoid duplicates
2. Try to reproduce the issue with the latest version
3. Gather relevant information (Node version, OS, error messages)

When filing an issue, include:

- A clear, descriptive title
- Steps to reproduce the problem
- Expected behavior vs actual behavior
- Code samples or test cases if applicable
- Environment details (Node version, OS, browser if relevant)

### Suggesting Features

Feature requests are welcome! Please:

1. Check if the feature has already been requested
2. Provide a clear use case
3. Explain why existing functionality doesn't meet your needs
4. Consider whether the feature fits the project's scope and philosophy

### Submitting Pull Requests

#### Before You Start

- For significant changes, open an issue first to discuss your approach
- Check that your idea aligns with the project's direction
- Review existing PRs to avoid duplicate effort

#### Development Workflow

1. Create a feature branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following the code style guidelines below

3. Write or update tests as needed

4. Run the full test suite:
   ```bash
   npm test
   ```

5. Commit your changes with a clear message:
   ```bash
   git commit -m "Add feature: brief description of changes"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request against the `master` branch

#### Pull Request Guidelines

- Keep PRs focused on a single concern
- Include a clear description of what the PR does and why
- Reference any related issues
- Update documentation if needed
- Ensure all tests pass
- Be responsive to feedback and questions

## Code Style

### General Principles

- Write clear, readable code
- Prefer explicit over implicit
- Keep functions focused and small
- Use meaningful variable and function names

### JavaScript Style

- Use tabs for indentation
- Use single quotes for strings
- Always use semicolons
- Use `let` and `const` appropriately (prefer `const`)
- Place opening braces on the same line

```javascript
// Good
const myFunction = (pParameter) =>
{
    if (pParameter)
    {
        return doSomething();
    }
    return null;
};

// Parameter naming convention: prefix with 'p'
function processData(pInputData, pOptions)
{
    let tmpResult = transform(pInputData);
    return tmpResult;
}

// Temporary variable naming: prefix with 'tmp'
let tmpCounter = 0;
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Parameters | Prefix with `p` | `pUserData`, `pOptions` |
| Temporary variables | Prefix with `tmp` | `tmpResult`, `tmpIndex` |
| Private properties | Prefix with `_` | `_internalState` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT` |
| Classes | PascalCase | `FableUUID`, `RandomBytes` |
| Functions/methods | camelCase | `getUUID`, `generateRandom` |

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run coverage
```

### Writing Tests

- Place tests in the `test/` directory
- Use descriptive test names
- Test both success and failure cases
- Keep tests focused and independent

```javascript
suite('MyFeature', function()
{
    test('should handle valid input correctly', function()
    {
        // Arrange
        let tmpInput = { value: 42 };

        // Act
        let tmpResult = myFeature.process(tmpInput);

        // Assert
        Expect(tmpResult.success).to.equal(true);
    });
});
```

## Release Process

Releases are managed by maintainers. The general process:

1. Changes accumulate in `master`
2. Version is bumped according to semver
3. Changelog is updated
4. Package is published to npm
5. GitHub release is created

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Assume good intentions
- Help others learn and grow

### Getting Help

- Check existing documentation first
- Search closed issues for solutions
- Ask clear, specific questions
- Provide context and examples

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the Pict and Fable ecosystem! Your contributions help make these tools better for everyone.
