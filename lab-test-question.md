# Sample MERN Lab Test Question - Item Manager

## Duration

2 hours

## Given Project

You are given a starter MERN Item Manager project with separate frontend and backend folders.

The existing project can:

- add items
- view items
- update items
- delete items
- connect to MongoDB Atlas

## Your Tasks

### Task 1 - Setup and Run Locally

1. Install dependencies for frontend and backend.
2. Create `.env` files using the given `.env.example` files.
3. Connect the backend to your own MongoDB Atlas database.
4. Run the backend and frontend locally.
5. Add at least 2 sample items from the frontend.
6. Verify that the data is saved in MongoDB Atlas.

### Task 2 - Add a New Field

Extend the project by adding this new field:

```txt
supplierName
```

Update the full flow:

- backend Mongoose model
- frontend form
- frontend table
- edit/update functionality
- save to MongoDB

### Task 3 - GitHub

1. Create a public GitHub repository.
2. Push the complete source code.
3. Make sure `.env` and `node_modules` are not pushed.
4. Submit the clickable GitHub repository link.

### Task 4 - Deployment

Deploy separately:

1. Backend using Railway, Render, or similar platform.
2. Frontend using Vercel, Netlify, or similar platform.
3. Update frontend `VITE_API_URL` with the deployed backend API URL.
4. Test deployed frontend by adding, updating, and deleting an item.

## Expected API Endpoints

```txt
GET     /api/items
POST    /api/items
GET     /api/items/:id
PUT     /api/items/:id
DELETE  /api/items/:id
```

## Sample POST Body

```json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 150000,
  "quantity": 3,
  "description": "Dell i5 laptop",
  "isAvailable": true,
  "supplierName": "ABC Suppliers"
}
```

## Marking Focus

- project runs locally
- MongoDB Atlas is connected correctly
- new field is added in both backend and frontend
- CRUD operations work
- code is pushed to GitHub
- frontend and backend are deployed separately
- deployed frontend uses the deployed backend API URL
