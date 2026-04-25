# MERN Item Manager - Lab Test Practice

This is a simple MERN project made for practicing a lab test where you may need to:

- run a React frontend and Express backend separately
- connect the backend to your own MongoDB Atlas database
- add a new field/fields to the project
- push the project to a public GitHub repository
- deploy the frontend and backend separately
- update the frontend API URL after backend deployment

## Project Structure

```txt
mern-item-manager-lab-practice/
  backend/
    models/Item.js
    routes/itemRoutes.js
    server.js
    .env.example
    package.json
  frontend/
    src/App.jsx
    src/api.js
    src/App.css
    .env.example
    package.json
  lab-test-question.md
```

## Features Already Included

- Add item
- View all items
- Update item
- Delete item
- MongoDB Atlas connection
- Separate frontend and backend
- Deployment-ready environment variables

## 1. Setup MongoDB Atlas

Create a MongoDB Atlas cluster and get your connection string.

Example format:

```txt
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern_item_manager?retryWrites=true&w=majority
```

Important:

- replace `username` and `password`
- include a database name after `.net/`, for example `mern_item_manager`
- allow network access in MongoDB Atlas. For quick lab testing, you can allow `0.0.0.0/0`

## 2. Run Backend Locally

Open a terminal inside the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file by copying `.env.example`:

```txt
MONGODB_URI=your_real_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Expected terminal output:

```txt
MongoDB connected successfully
Server is running on port 5000
```

Test in browser:

```txt
http://localhost:5000/
http://localhost:5000/api/items
```

## 3. Run Frontend Locally

Open another terminal inside the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file by copying `.env.example`:

```txt
VITE_API_URL=http://localhost:5000/api/items
```

Start frontend:

```bash
npm run dev
```

Open the Vite URL, usually:

```txt
http://localhost:5173/
```

## 4. Practice Lab Test Task: Add a New Field

Add this new field to the project:

```txt
supplierName
```

You must update:

1. `backend/models/Item.js`
2. `frontend/src/App.jsx` form state
3. `frontend/src/App.jsx` form input
4. `frontend/src/App.jsx` edit function
5. `frontend/src/App.jsx` table heading and row display

Example backend field:

```js
supplierName: {
  type: String,
  trim: true,
  default: ''
}
```

After adding it, test locally by adding an item and checking MongoDB Atlas.

## 5. Push to GitHub

From the project root folder:

```bash
git init
git add .
git commit -m "Initial MERN item manager lab practice"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_LINK
git push -u origin main
```

## 6. Deploy Backend

You can use Railway or Render.

Backend deploy settings:

```txt
Root directory: backend
Install command: npm install
Start command: npm start
```

Environment variables:

```txt
MONGODB_URI=your_real_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend-url.vercel.app
```

After deployment, test:

```txt
https://your-backend-url/api/items
```

## 7. Deploy Frontend

You can use Vercel or Netlify.

Frontend deploy settings:

```txt
Root directory: frontend
Build command: npm run build
Output directory: dist
```

Environment variable:

```txt
VITE_API_URL=https://your-backend-url/api/items
```

Important: after changing environment variables, redeploy the frontend.

## 8. Common Errors

### Backend says MongoDB connection failed

Check:

- MongoDB Atlas username/password
- network access IP whitelist
- database URL copied correctly
- `.env` file is inside the backend folder

### Frontend shows failed to fetch

Check:

- backend is running
- `VITE_API_URL` is correct
- deployed backend URL includes `/api/items`
- frontend was redeployed after changing `VITE_API_URL`

### Railway shows server running on 8080 instead of 5000

That is normal. Hosting platforms provide their own `PORT`. Your code already uses:

```js
process.env.PORT || 5000
```

So local can use 5000, and deployment can use the platform port.
