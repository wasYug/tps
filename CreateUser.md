# User Creation Guide

When creating a new user in the system, you must create both their authentication record and their corresponding user profile. Follow the workflow below to ensure proper data synchronization between the authentication service and the database.

## Workflow Overview

1. **Create the Authentication User:** Register the new user in `auth.users`.
2. **Retrieve the UUID:** Obtain the newly generated unique identifier (UUID) assigned to the user.
3. **Create the User Profile:** Insert a new record into the `public.profiles` table using the retrieved UUID.

```text
+-------------------------------+
|   Create user in auth.users   |
+---------------+---------------+
                │
                ▼
+---------------+---------------+
|    Get the new user's UUID    |
+---------------+---------------+
                │
                ▼
+---------------+---------------+
|     Insert into profiles      |
+-------------------------------+
```

## SQL Example: Inserting into Profiles

Once the authentication users have been created and their UUIDs retrieved, insert the profile records into the `public.profiles` table as shown below:

```sql
INSERT INTO public.profiles (id, name, email, role)
VALUES
(
    '7b6...UUID...',
    'School Admin',
    'admin@school.com',
    'admin'
),
(
    '1fa...UUID...',
    'Teacher',
    'teacher@school.com',
    'teacher'
);
```