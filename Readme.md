# REST API Documentation ✨

This REST API supports JSON data.

## Routes

1. **GET /users**

    - Lists all users in an HTML file.

2. **GET /api/users**

    - Lists all users.

3. **GET /api/users/1**

    - Retrieves the user with ID: 1.

4. **GET /api/users/2**

    - Retrieves the user with ID: 2.

5. **POST /api/users**

    - Creates a new user.

6. **PATCH /api/users/:id**

    - Edits the user with the specified ID.

7. **DELETE /api/users/1**
    - Deletes the user with ID: 1.

## Usage

### Listing All Users in HTML

```http
GET /users
```

### Listing All Users in JSON

```http
GET /api/users
```

### Retrieving a Specific User

```http
GET /api/users/:id
```

### Creating a New User

```http
POST /api/users
```

### Editing a User

```http
PATCH /api/users/:id
```

### Deleting a User

```http
DELETE /api/users/:id
```

#### Replace :id with the actual ID of the user when making requests.
