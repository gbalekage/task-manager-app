***📝 Task App — Full-Stack Project***

A simple and clean full-stack Task Management App built with Vite + React (shadcn/ui + TailwindCSS) on the frontend and Node.js + Express + MongoDB on the backend.

***🚀 Features***

- Create, update, delete tasks
      
- User authentication (JWT-based)
      
- Modern, clean UI using shadcn/ui components
      
- API integration with Axios
      
- Secure password hashing with bcrypt
      
- Fully typed and optimized folder structure
    

***🎯 Why I Added Authentication***

Although the original requirements didn’t strictly say to build authentication, I added it because:

- Real task apps require users to manage their own tasks securely

- It prevents mixing tasks between different users
      
- It improves security and makes the project more realistic
      
- It demonstrates backend skills beyond CRUD (validation, hashing, tokens)

Adding authentication improved the logic, quality, and usability of the entire app.

***🎨 Why I Used ShadCN UI***

I chose shadcn/ui because:

- It provides clean, modern, high-quality UI components

- Easy to customize using TailwindCSS
        
- Helps build a professional-looking interface quickly
        
- Offers a consistent design system
        
- Great developer experience when building dashboards and forms

The combination of Vite + React + shadcn/ui made the UI fast, lightweight, and visually appealing.

***🛠️ Technologies Used***

**Frontend**

- Vite
          
- React
          
- shadcn/ui
          
- TailwindCSS
          
- Axios

**Backend**

- Node.js
          
- Express.js
          
- MongoDB + Mongoose
          
- bcryptjs
          
- JSON Web Token (JWT)

**⚠️ Major Problem I Faced & How I Solved It**

***Problem: Cookie Authentication Not Working in Browser***

During development, I used HTTP-only Cookies for authentication, but I ran into issues:

- Browser wasn’t storing cookies

- CORS blocked credentialed requests
          
- Postman worked, but the browser didn’t
          
- Cookie SameSite rules caused blocking on frontend-backend different domains

- Required extra CORS configs: credentials: true + secure flags
          
- Browsers denied cookies in localhost setups unless HTTPS or proper flags were used

***Solution: Switched to JWT Tokens Instead of Cookies***

I removed cookie-based authentication and replaced it with:

✔ Access Token returned directly in JSON

✔ Stored in memory (or localStorage if chosen)

✔ Axios sends token via Authorization header


***This completely fixed:***

- Browser blocking issues

- CORS errors

- SameSite bugs

- Cookie parsing problems

JWT made the API simpler, portable, and easier to consume from frontend apps.

***📁 Project Structure***

**Backend**

            server/
            │── config/
            │   └── database.js
            │── controllers/
            │   └── authController.js
            |   └── taskController.js
            │── middlewares/
            │   ├── auth.js
            │   ├── error.js
            │── models/
            │   └── User.js
            |   └── Task.js
            │── routes/
            │   └── authRoutes.js
            |   └── taskRoutes.js
            │── utils/
            │   └── httpError.js
            │── index.js
            │── .env

**Frontend**

            client/
            │── src/
            │   ├── components/
            │   ├── assets/
            │   ├── contexts/
            │   ├── pages/
            │   ├── lib/
            │   ├── hooks/
            │   ├── services/
            │   └── main.jsx
            │── index.html
            │── tailwind.config.js

***🧰 Requirements***

  ****Before running the app, make sure you have installed:****

- Node.js (v18+)

- npm or yarn

- MongoDB installed locally or MongoDB Atlas account

***🛠️ Installation & Running***

      1️⃣ Clone the Repository
      https://github.com/gbalekage/task-manager-app.git
      cd task-manager-app

**🚀 Backend Setup**
      cd backend
      npm install
      Create a .env file:
      PORT=3000
      MONGO_URI=your_mongo_connection_string
      JWT_SECRET=your_secret_key

**Run the backend:**

      npm run dev

**🎨 Frontend Setup**

      cd client
      npm install

**Run the frontend:**

      npm run dev


**The app will start on http://localhost:5173**


**🏁 Conclusion**

- This Task App allowed me to practice:

- Authentication systems

- Secure backend development

- Frontend UI design with shadcn

- Handling real-world problems like cookie authentication

- Connecting frontend & backend with API logic

- It’s a clean, modern, realistic full-stack project.
