
# Taskify

[![Next.js](https://img.shields.io/badge/Next.js-v15.3.3-blue)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-v19.0.0-blue)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-green)](https://vercel.com)

Taskify is a comprehensive task management and collaboration tool designed to help individuals and teams organize projects, manage tasks, and enhance productivity. Built with Next.js, React, Prisma, and other modern technologies, Taskify offers a seamless and efficient user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Project Management:** Create, organize, and manage projects with ease.
- **Task Management:** Add, assign, and track tasks within projects.
- **Drag and Drop Interface:** Intuitive drag-and-drop functionality for task management.
- **Real-time Collaboration:** Collaborate with team members in real-time.
- **File Uploads:** Upload and share project-related files.
- **Comments:** Add comments to tasks and projects for seamless communication.
- **Invitations:** Invite team members to join projects.
- **Invoices:** Generate and manage invoices for your projects.
- **AI Assistant:** Get suggestions and break down project with AI.
- **Prospect Management:** Track potential clients, store contact details, and manage follow-ups.
- **News Feed:** Stay updated with the latest industry news.

## Technologies

- [Next.js](https://nextjs.org) - React framework for building performant web applications
- [React](https://react.dev) - JavaScript library for building user interfaces
- [Prisma](https://www.prisma.io) - Next-generation ORM
- [Clerk](https://clerk.com) - Authentication and user management
- [Uploadthing](https://uploadthing.com) - File uploads
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide React](https://lucide.dev) - Beautifully simple icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React PDF](https://react-pdf.org) - PDF generation
- [Google Gemini AI](https://ai.google.dev/models/gemini) - For Ai Assistant
- [React DND](https://react-dnd.github.io/react-dnd/about) - Drag and drop functionality

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org) (v18 or higher)
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) or [pnpm](https://pnpm.io)
- [Git](https://git-scm.com)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/add-prisma-to-existing-project)

### Installation

1.  Clone the repository:


    > DATABASE_URL="your_database_url"
    > NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    > CLERK_SECRET_KEY="your_clerk_secret_key"
    > NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    > NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    > UPLOADTHING_SECRET="your_uploadthing_secret"
    > UPLOADTHING_APP_ID="your_uploadthing_app_id"
    > GEMINI_API_KEY="your_gemini_api_key"
    > GNEWS_API_KEY="your_gnews_api_key"
    > The project relies on the following key dependencies:

-   `@clerk/nextjs`: Authentication and user management
-   `@prisma/client`: Prisma client for database access
-   `next`: Next.js framework
-   `react`: React library
-   `react-dom`: React DOM
-   `tailwindcss`: CSS framework

For a complete list of dependencies, refer to the `package.json` file.

## Deployment

You can deploy Taskify to any hosting platform that supports Next.js. Here's how to deploy to Vercel, the recommended platform:

bash
    npm install -g vercel
    