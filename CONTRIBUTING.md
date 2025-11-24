# Contributing to Kulhad Chai

First off, thank you for considering contributing to Kulhad Chai! 🍵

It's people like you that make Kulhad Chai such a great tool for restaurant management.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this code.

**Expected Behavior:**
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community

**Unacceptable Behavior:**
- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** (see below)
4. **Create a branch** for your changes
5. **Make your changes** and test them
6. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account (for database)
- Git

### Installation Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/kulhad-chai-booking.git
cd kulhad-chai-booking

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the application running.

For detailed setup instructions, see [docs/setup/installation.md](./docs/setup/installation.md).

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

- 🐛 **Bug fixes** - Fix issues in the codebase
- ✨ **New features** - Add new functionality
- 📝 **Documentation** - Improve or add documentation
- 🎨 **UI/UX improvements** - Enhance the user interface
- ♻️ **Code refactoring** - Improve code quality
- ✅ **Tests** - Add or improve tests
- 🔧 **Configuration** - Improve build/deployment configs

### Finding Issues to Work On

- Check the [Issues](https://github.com/YOUR_ORG/kulhad-chai-booking/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it

## Branch Naming Convention

Use descriptive branch names that follow this pattern:

```
<type>/<short-description>
```

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

**Examples:**
```
feature/add-table-reservation
fix/order-total-calculation
docs/update-api-documentation
refactor/menu-service-cleanup
test/add-billing-tests
chore/update-dependencies
```

## Commit Message Guidelines

Write clear, concise commit messages that explain **what** and **why**, not how.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```
feat(menu): add combo meal support

- Add combo_items field to menu_items table
- Implement combo selection UI
- Add pricing logic for combo meals

Closes #123
```

```
fix(billing): correct tax calculation for discounted items

Tax was being calculated on original price instead of
discounted price, causing incorrect totals.

Fixes #456
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant
- Explain **why** the change was made in the body

## Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Run linting**: `pnpm lint`
3. **Update documentation** if needed
4. **Add tests** for new features
5. **Ensure build passes**: `pnpm build`

### Submitting a Pull Request

1. **Push your changes** to your fork
2. **Create a pull request** from your branch to `main`
3. **Fill out the PR template** completely
4. **Link related issues** using keywords (Fixes #123, Closes #456)
5. **Request review** from maintainers
6. **Respond to feedback** and make requested changes

### PR Title Format

Use the same format as commit messages:

```
<type>(<scope>): <description>
```

**Examples:**
- `feat(admin): add bulk order export`
- `fix(auth): resolve session timeout issue`
- `docs(readme): update installation steps`

### Review Process

- At least one maintainer approval is required
- All CI checks must pass
- No merge conflicts
- Code follows project style guidelines
- Tests are included and passing

## Code Style Guidelines

### General Principles

- **Keep it simple** - Prefer clarity over cleverness
- **Be consistent** - Follow existing patterns
- **Write readable code** - Code is read more than written
- **Comment when necessary** - Explain complex logic

### JavaScript/TypeScript

- Use **TypeScript** for type safety
- Follow **ESLint** configuration
- Use **functional components** with hooks
- Prefer **const** over let, avoid var
- Use **async/await** over promises when possible
- Use **meaningful variable names**

### React Components

```jsx
// ✅ Good
export function MenuItemCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  
  const handleAdd = () => {
    onAddToCart(item, quantity);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
}
```

### CSS/Styling

- Use **TailwindCSS** utility classes
- Follow **mobile-first** approach
- Use **CSS variables** for theme colors
- Keep styles **co-located** with components

### File Organization

```
components/
  ├── ui/              # Reusable UI components
  ├── admin/           # Admin-specific components
  ├── customer/        # Customer-facing components
  └── shared/          # Shared business components

lib/
  ├── supabase.js      # Supabase client
  ├── utils.js         # Utility functions
  └── constants.js     # App constants

app/
  ├── (admin)/         # Admin routes
  ├── (customer)/      # Customer routes
  └── api/             # API routes
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write tests for **new features**
- Write tests for **bug fixes**
- Aim for **meaningful coverage**, not 100%
- Test **behavior**, not implementation

### Test Structure

```javascript
describe('OrderService', () => {
  describe('calculateTotal', () => {
    it('should calculate total with tax', () => {
      const items = [{ price: 100, quantity: 2 }];
      const total = calculateTotal(items, 0.18);
      expect(total).toBe(236); // 200 + 18% tax
    });
    
    it('should handle empty cart', () => {
      const total = calculateTotal([], 0.18);
      expect(total).toBe(0);
    });
  });
});
```

## Reporting Bugs

Found a bug? Please help us fix it!

### Before Reporting

1. **Check existing issues** - Your bug might already be reported
2. **Try the latest version** - The bug might be fixed
3. **Reproduce the bug** - Make sure it's consistent

### Creating a Bug Report

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml) and include:

- **Clear title** - Describe the issue concisely
- **Steps to reproduce** - Exact steps to trigger the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, OS, version
- **Screenshots** - If applicable
- **Error logs** - Console errors or stack traces

## Suggesting Features

Have an idea for a new feature?

### Before Suggesting

1. **Check existing issues** - Your idea might already be suggested
2. **Consider the scope** - Does it fit the project goals?
3. **Think about users** - Who benefits from this feature?

### Creating a Feature Request

Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml) and include:

- **Clear description** - What is the feature?
- **Problem it solves** - Why is it needed?
- **Proposed solution** - How should it work?
- **Alternatives** - Other approaches you considered
- **Additional context** - Mockups, examples, references

## Questions?

- 📧 **Email**: [your-email@example.com]
- 💬 **Discussions**: Use GitHub Discussions for questions
- 📝 **Documentation**: Check the [docs](./docs) folder

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to Kulhad Chai! 🍵**
