# FEATURE REQUEST

Implement the following feature according to the project's permanent architecture.

Before generating any code, you MUST load and follow the project constitutions.

===========================================================
MANDATORY PROJECT CONSTITUTIONS
===========================================================

The following documents define the permanent architecture and engineering standards of the project.

These documents have higher priority than this prompt.

You MUST read and follow them before generating any code.

Required Documents:

- BACKEND.md
- FRONTEND.md
- SQL.md
- DESIGN.md
- NAME.md
- GIT.md

Never violate these documents.

If this prompt conflicts with any of these documents,
the Markdown documents always take precedence.

Never redesign the architecture.

Never rename existing folders.

Never rename existing projects.

Never replace technologies.

Only extend the existing solution.

Follow all Git workflow, branching strategy, commit conventions, and repository safety rules defined in GIT.md.

===========================================================
PROJECT
===========================================================

Project Type

Enterprise Full Stack Web Application

Architecture

Decoupled

Backend

Admin Panel (Backoffice)

Frontend

Public Client

All frontend content MUST come from the backend API.

No hardcoded content is allowed.

===========================================================
GOAL
===========================================================

Develop Phase 1 (MVP).

Only implement the requested scope.

Do not add extra features.

Do not over-engineer.

Keep the implementation modular.

===========================================================
TECH STACK
===========================================================

Follow BACKEND.md

Follow FRONTEND.md

Follow SQL.md

Follow DESIGN.md

Follow NAME.md

Follow GIT.md

===========================================================
DATABASE
===========================================================

Database

SQLite

Every entity must support:

CreatedAt

UpdatedAt

CreatedBy

UpdatedBy

IsEnabled

SortOrder

Soft Delete when appropriate

===========================================================
AUDIT LOGGING
===========================================================

Every critical action must be logged.

Include:

Create

Update

Delete

Publish

Unpublish

Enable

Disable

Every log entry should contain:

Entity

EntityId

Action

Timestamp

User

Previous Value (if applicable)

Current Value (if applicable)

===========================================================
PHASE 1
===========================================================

BACKOFFICE

Implement CRUD modules for:

1.

Header / Menu

Manage

Logo

Navigation

Menu Items

Active State

Enable / Disable

Sort Order

-----------------------------------------------------------

2.

Sidebar

Manage Widgets

Enable / Disable

Sort Order

-----------------------------------------------------------

3.

Slider

Upload Image

Title

Subtitle

Description

Sort Order

Enable / Disable

-----------------------------------------------------------

4.

News

CRUD

Title

Summary

Image

Publish

Unpublish

Enable

Disable

Sort Order

===========================================================
CLIENT
===========================================================

Implement:

Responsive Layout

RTL First

Header

Sidebar

Slider

News

All content MUST come from REST API.

Never hardcode any data.

===========================================================
API
===========================================================

REST API

Client communicates ONLY through API.

No direct database access.

No shared business logic.

===========================================================
DELIVERABLES
===========================================================

Always generate the following:

1. Architecture Impact
2. Affected Projects
3. Folder Structure
4. Database Schema
5. Relationships
6. SQLite Tables
7. Migration Plan
8. API Endpoints
9. Request DTOs
10. Response DTOs
11. Application Services
12. Repositories
13. Entities
14. Commands
15. Queries
16. Validators
17. Handlers
18. Controllers
19. Frontend Structure
20. React Components
21. Custom Hooks
22. Zustand Stores
23. React Query Hooks
24. Theme Integration
25. RTL Considerations
26. Audit Logging
27. Authorization
28. Testing Strategy
29. Git Impact (affected files, branch recommendation, commit message suggestion following GIT.md)

===========================================================
IMPLEMENTATION RULES
===========================================================

Keep the code:

Modular

Maintainable

Scalable

Strongly Typed

Reusable

Readable

Generate production-ready scaffolding.

Do not redesign existing modules.

Do not generate unnecessary placeholder code.

Follow all coding, naming, design, SQL, backend, frontend, and Git standards defined in the project constitutions.

===========================================================
IMPORTANT
===========================================================

Always follow:

- BACKEND.md
- FRONTEND.md
- SQL.md
- DESIGN.md
- NAME.md
- GIT.md

These documents are the permanent constitutions of the project.

If any conflict exists, the constitution documents always win.

This feature is only Phase 1.

Do not implement future phases.

Do not introduce unrelated functionality.

Do not redesign the project.

Only extend the existing architecture.