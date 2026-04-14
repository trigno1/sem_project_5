# Contributing to Phygital NFT Platform

First off, thank you for considering contributing to Phygital! It's people like you that make Phygital such a great platform.

## How Can I Contribute?

### Reporting Bugs
This section guides you through submitting a bug report for Phygital. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related bugs.

Before creating bug reports, please check the [existing issues](https://github.com/trigno1/phygital-nft-platform/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible. Fill out the **[Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)** to help us clear the issue faster.

### Suggesting Enhancements
This section guides you through submitting an enhancement suggestion for Phygital, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

When you are creating an enhancement suggestion, please include as many details as possible, including why this feature would be useful to the users. Fill out the **[Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)**.

### Your First Code Contribution
1.  Fork the repo.
2.  Install dependencies: `npm install`.
3.  Create a branch for your feature: `git checkout -b feature/amazing-feature`.
4.  Commit your changes: `git commit -m 'Add some amazing feature'`.
5.  Push to the branch: `git push origin feature/amazing-feature`.
6.  Open a Pull Request.

## Environment Setup
- **Node.js**: 18.x or higher.
- **Database**: We use MongoDB Atlas. Ensure your `DATABASE_URL` is set in `.env`.
- **Web3**: You will need a [Thirdweb](https://thirdweb.com/) Client ID and Secret Key.
- **Network**: All development should be done on the **Base Sepolia Testnet**.
- **Docker** (optional): Run `docker-compose up -d` to spin up PostgreSQL and Redis for local service development.

## Style Guide
- Use TypeScript for all new files.
- Follow the existing project structure in `src/`.
- Use Tailwind CSS for all styling.
- Use Framer Motion for animations.
- Ensure all new components are mobile-responsive.
- Follow the existing error handling pattern via `lib/error-handler.ts`.
- Use signature-based auth via `lib/auth-helper.ts` for sensitive API routes.

## Pull Request Process
1.  Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2.  Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, new useful locations and container parameters.
3.  Follow the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) when submitting.
4.  Maintainers will review your PR and provide feedback. Once approved, it will be merged into `main`.

## Code of Conduct

Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating. We are committed to providing a welcoming and inclusive experience for everyone.

Thank you for contributing! 🎉
