# Theories

A saner way to Interact with Theories.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone theories
   ```

2. Navigate to the project directory:

   ```bash
   cd theories
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your `.env` file based on the `.env.sample` provided.

5. Run database migrations:

   ```bash
   npm run migrate:latest
   ```

6. Seed the database (optional):

   ```bash
   npm run seed:run
   ```

7. Start the server:
   ```bash
   npm start
   ```

## Usage

Brief instructions on how to use the application, any available scripts, etc.

# Data Model Documentation

## Tables

1. **Users**
2. **Theories**
3. **Roles**
4. **Groups**
5. **UserRoles**
6. **UserGroups**
7. **GroupRoles**
8. **TheoryDiscipline**
9. **Disciplines**
10. **Attachments**
11. **VersionHistory**
12. **Tags**
13. **TheoryTags**
14. **Evidence**
15. **Critics**
16. **Critiques**
17. **AccessControl**
18. **UserActivityLog**

---

## Users

Stores individual user information.

| Field           | Type      | Description |
|-----------------|-----------|-------------|
| id              | Integer   | Primary key. |
| username        | String    | Unique username. |
| email           | String    | Unique email address. |
| password        | String    | Hashed password for authentication. |
| first_name      | String    | Optional first name. |
| last_name       | String    | Optional last name. |
| profile_picture | String    | Optional URL or path to profile image. |
| created_at      | Timestamp | Creation timestamp. |
| updated_at      | Timestamp | Last update timestamp. |
| deleted_at      | Timestamp | Soft delete timestamp. |

### Relationships

- **Roles**: Many-to-many relationship through `UserRoles` table.
- **Groups**: Many-to-many relationship through `UserGroups` table.
- **Theories**: One-to-many relationship. A user can author multiple theories.

---

## Theories

Stores theories and their details.

| Field       | Type      | Description |
|-------------|-----------|-------------|
| id          | Integer   | Primary key. |
| title       | String    | Theory title. |
| description | Text      | Detailed description of the theory. |
| userId      | Integer   | Foreign key to the authoring user. |

### Relationships

- **Users**: Many-to-one relationship. Each theory has one author.
- **Disciplines**: Many-to-many relationship through `TheoryDiscipline` table.
- **Attachments**: One-to-many relationship. A theory can have multiple attachments.
- **Tags**: Many-to-many relationship through `TheoryTags` table.

---

## Roles

Stores available roles in the system.

| Field       | Type      | Description |
|-------------|-----------|-------------|
| id          | Integer   | Primary key. |
| name        | String    | Unique role name. |
| description | Text      | Role description. |

### Relationships

- **Users**: Many-to-many relationship through `UserRoles` table.
- **Groups**: Many-to-many relationship through `GroupRoles` table.

---

## Groups

Stores available groups in the system.

| Field       | Type      | Description |
|-------------|-----------|-------------|
| id          | Integer   | Primary key. |
| name        | String    | Unique group name. |
| description | Text      | Group description. |

### Relationships

- **Users**: Many-to-many relationship through `UserGroups` table.
- **Roles**: Many-to-many relationship through `GroupRoles` table.

---

## UserRoles

Junction table for users and roles.

| Field   | Type    | Description |
|---------|---------|-------------|
| userId  | Integer | Foreign key to `Users`. |
| roleId  | Integer | Foreign key to `Roles`. |

---

## UserGroups

Junction table for users and groups.

| Field   | Type    | Description |
|---------|---------|-------------|
| userId  | Integer | Foreign key to `Users`. |
| groupId | Integer | Foreign key to `Groups`. |

---

## GroupRoles

Junction table for groups and roles.

| Field   | Type    | Description |
|---------|---------|-------------|
| groupId | Integer | Foreign key to `Groups`. |
| roleId  | Integer | Foreign key to `Roles`. |

---

## TheoryDiscipline

Junction table for theories and disciplines.

| Field      | Type    | Description |
|------------|---------|-------------|
| theoryId   | Integer | Foreign key to `Theories`. |
| disciplineId | Integer | Foreign key to `Disciplines`. |

---

## Disciplines

Stores various disciplines related to theories.

| Field       | Type      | Description |
|-------------|-----------|-------------|
| id          | Integer   | Primary key. |
| name        | String    | Unique discipline name. |

### Relationships

- **Theories**: Many-to-many relationship through `TheoryDiscipline` table.

---

## Attachments

Stores files or links attached to theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| theoryId   | Integer   | Foreign key to `Theories`. |
| fileLink   | String    | URL or path to the attachment. |

---

## VersionHistory

Stores version history for theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| theoryId   | Integer   | Foreign key to `Theories`. |
| version    | String    | Version identifier. |
| changes    | Text      | Description of changes in this version. |

---

## Tags

Stores tags that can be associated with theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| name       | String    | Unique tag name. |

### Relationships

- **Theories**: Many-to-many relationship through `TheoryTags` table.

---

## TheoryTags

Junction table for theories and tags.

| Field   | Type    | Description |
|---------|---------|-------------|
| theoryId| Integer | Foreign key to `Theories`. |
| tagId   | Integer | Foreign key to `Tags`. |

---

## Evidence

Stores evidence supporting or refuting theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| theoryId   | Integer   | Foreign key to `Theories`. |
| description| Text      | Description of the evidence. |
| type       | String    | Type of evidence (supporting/refuting). |

---

## Critics

Stores critics who critique theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| name       | String    | Critic's name. |

---

## Critiques

Stores critiques made by critics on theories.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| criticId   | Integer   | Foreign key to `Critics`. |
| theoryId   | Integer   | Foreign key to `Theories`. |
| critique   | Text      | The critique content. |

---

## AccessControl

Stores access control rules for users.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| userId     | Integer   | Foreign key to `Users`. |
| permission | String    | Type of permission (e.g., read, write, delete). |
| entity     | String    | Entity to which the permission applies (e.g., theory, critique). |
| entityId   | Integer   | Specific ID of the entity, if applicable. |

### Relationships

- **Users**: Many-to-one relationship. Each access control rule is associated with one user.

---

## UserActivityLog

Logs user activities in the system.

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | Integer   | Primary key. |
| userId     | Integer   | Foreign key to `Users`. |
| activity   | Text      | Description of the activity. |
| timestamp  | Timestamp | When the activity occurred. |

### Relationships

- **Users**: Many-to-one relationship. Each activity log entry is associated with one user.


## API Endpoints

- ... (list other endpoints)

## Contributing

Instructions for how others can contribute to your project.

## License

Information about the project's license (e.g., MIT, GPL, etc.)
