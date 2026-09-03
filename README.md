### DocZ
A secure digital document management system for organizing, storing, searching, and managing legal and investigation-related documents with access control, document integrity, audit trails, and investigation-focused metadata.
# Secure Digital Document Management System

A secure digital document management system designed for managing
legal and investigation-related documents.

## SIH Problem Statement

**SIH26190 – Secure Digital Document Management System for Legal and
Investigation Documents**

## Overview

The system provides a centralized and secure platform for authorized
users to upload, organize, store, search, retrieve, and manage
investigation and legal documents.

The platform is designed to maintain document confidentiality,
integrity, controlled access, version history, and audit trails while
helping investigators efficiently manage documents associated with
different cases.

## Core Features

- Secure document upload and storage
- Case-based document organization
- Document metadata management
- Role-based access control
- Document search and filtering
- Document version management
- SHA-256 integrity verification
- Audit logs for document activities
- Evidence and investigation document management
- Secure document download
- Document classification and analysis
- Investigation timeline and document relationships
 
 # 📄 DocZ

> A secure document management platform built with Next.js, Prisma, MySQL, JWT authentication, Nodemailer, and Cloudinary.

---

## 🚀 Getting Started

Follow the steps below to set up **DocZ** on your local system.

### 1. Clone the Repository

First, clone the project from GitHub and enter the project directory.

```bash
git clone https://github.com/SayanBasani/DocZ.git
cd DocZ
```

**Why?**
`git clone` downloads the project, while `cd DocZ` moves you into the project folder.

---

### 2. Install Dependencies

Install all packages required by the project.

```bash
npm install
```

**Why?**
This reads `package.json` and installs Next.js, React, Prisma, MySQL, JWT, Nodemailer, Cloudinary, and the other required packages into `node_modules`.

> `npm install` should be run before using any project-specific Node/Prisma commands.

---

### 3. Configure Environment Variables

Create a `.env` file in the root of the project.

```env
NEXT_PUBLIC_APP_NAME="DocZ"
APP_URL="http://localhost:3000"

DATABASE_URL="mysql://root@localhost:3306/docz"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

ACCESS_TOKEN_EXPIRES_IN="15"
REFRESH_TOKEN_EXPIRES_IN="7"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-google-app-password"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Why?**
The `.env` file stores database credentials, authentication secrets, email configuration, and Cloudinary credentials without putting them directly into the source code.

> ⚠️ Never upload your real `.env` file or secrets to GitHub.

---

### 4. Setup MySQL Database

Start **MySQL** using XAMPP or your local MySQL installation.

Create a database named:

```text
docz
```

The default connection used by DocZ is:

```text
Host: localhost
Port: 3306
User: root
Database: docz
```

**Why?**
DocZ uses MySQL as its database, and Prisma connects to it through `DATABASE_URL`.

---

### 5. Setup Prisma

After installing the dependencies and configuring the database, run:

```bash
npx prisma generate
```

**Why?**
This generates the Prisma Client used by the application to communicate with the MySQL database.

Then run:

```bash
npx prisma migrate dev
```

**Why?**
This applies the Prisma schema/migrations and creates or updates the required database tables.

> Run these commands after `npm install` and after MySQL is running.

---

### 6. Start DocZ

Everything is now ready. Start the development server:

```bash
npm run dev
```

**Why?**
This starts the Next.js development server.

Open:

**http://localhost:3000**

---

## 🔄 Quick Setup

For a fresh setup, the normal command order is:

```bash
git clone https://github.com/SayanBasani/DocZ.git
cd DocZ
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

> Make sure your `.env` is configured and MySQL is running before the Prisma commands.

---

## 🛠️ Useful Commands

| Command                  | Purpose                      |
| ------------------------ | ---------------------------- |
| `npm install`            | Install project dependencies |
| `npm run dev`            | Start the development server |
| `npm run build`          | Create a production build    |
| `npm start`              | Start the production server  |
| `npx prisma generate`    | Generate Prisma Client       |
| `npx prisma migrate dev` | Apply database migrations    |
| `npx prisma studio`      | Open Prisma database GUI     |
| `npx prisma validate`    | Check Prisma schema          |

---

## 🧰 Tech Stack

**Frontend:** Next.js · React · TypeScript · Tailwind CSS
**Database:** MySQL · Prisma
**Authentication:** JWT · HTTP-only Cookies · bcrypt
**Email:** Nodemailer · Gmail SMTP
**Storage:** Cloudinary
