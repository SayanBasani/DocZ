Frontend: Next.js + React + Tailwind CSS
Backend: Next.js API/Server-side functionality
Database: MySQL + Prisma
Authentication/Security: bcryptjs + jose/JWT
File storage: Cloudinary
Encryption: Node.js crypto
Email: Nodemailer
Icons/UI: Lucide React / React Icons


# Work Flow

### for Upload file

1. User
  ↓
2. Login / Authentication(Store jwt tokens for Authentication)
  ↓
3. Upload Document
  ↓
4. Validate Document
  ↓
5. Generate File Hash
  ↓
6. Encrypt File (AES-256-GCM)
  ↓
7. Store Encrypted File
  ↓
8. Store Metadata in MySQL
  ↓
9. Audit Log

### for Download the files

1. User
  ↓
2. Authentication
  ↓
3. Authorization
  ↓
4. Request Document
  ↓
5. Retrieve Encrypted File
  ↓
6. Decrypt
  ↓
7. Verify Integrity
  ↓
8. Download / View
  ↓
9. Audit Log



# **Project Architecture**

                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Sign Up / Login   │
                  └──────────┬──────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                 Sign Up             Login
                    │                 │
                    ▼                 ▼
             Email Verification    Authenticate
                    │                 │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  JWT Session    │
                    │ Access Token    │Access Token is valid for → 15 minutes
                    │ Refresh Token   │Refresh Token is valid for → 7 days
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Dashboard    │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
       View Files         Upload          Other Tasks
            │                │
            │                ▼
            │          Validate File
            │                │
            │                ▼
            │          SHA-256 Hash(Hash Algorithm)
            │                │
            │                ▼
            │        AES-256 Encryption
            │                │
            │        ┌───────┴────────┐
            │        ▼                ▼
            │     MySQL          File Storage
            │    Metadata       Encrypted File
            │        │                │
            └────────┴────────────────┘
                     │
                     ▼
                 Audit Log
               


# Explaination 
Our system is a secure digital document management platform for legal and investigation documents. Users first authenticate and are authorized according to their role and case permissions. When a document is uploaded, we validate it, generate a SHA-256 fingerprint for integrity, encrypt the file using AES-256-GCM, and store the encrypted file separately from its metadata. MySQL with Prisma manages document metadata, users, cases and audit records, while Cloudinary stores the encrypted files. Whenever a document is accessed, downloaded, modified or transferred, we record the event in an audit log to maintain traceability and chain of custody.