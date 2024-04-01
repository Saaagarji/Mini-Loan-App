Loan Creation:

Authenticated customers can submit a loan request specifying the amount required and loan term.
Loans have a default weekly repayment frequency.
Upon loan approval, scheduled repayments are generated automatically.
Admin Approval:

Admins can change the status of pending loans to approved.
Loan Viewing:

Customers can view their own loans.
A policy check ensures that customers can only view their own loans.
Repayments:

Customers can add repayments equal to or greater than the scheduled repayment amount.
Repayments mark the scheduled repayment as paid.
If all scheduled repayments are paid, the loan status changes to paid.
Technologies Used
Backend: Node.js, Express.js, MongoDB
Frontend: HTML5, CSS, JavaScript
Frontend Framework: React.js
CSS Framework: Tailwind
RESTful API architecture
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/Saaagarji/Mini-Loan-App.git
cd loan-application
Install Dependencies:

bash
Copy code
cd backend
npm install
cd ../frontend
npm install
Environment Variables:

Create a .env file in the backend directory and add your MongoDB connection URI and other necessary environment variables.
Example .env file:
plaintext
Copy code
MONGODB_URI=your_mongodb_uri
PORT=5000
Start the Backend Server:

bash
Copy code
cd backend
npm start
Start the Frontend Development Server:

bash
Copy code
cd frontend
npm start
Access the Application:

Open your browser and go to http://localhost:3000 to access the frontend of the loan application.

Testing
Unit and feature tests are available in the tests directory for both frontend and backend.
Run tests using npm test in the respective directories (backend or frontend).
GitHub Actions are set up for continuous integration and deployment.
For more information on how to use the application and its functionalities, refer to the video showcasing the app's functionalities or the deployed version of the codebase.

For any questions or issues, please contact Sagar Gupta at Saaagarjii@gmail.com.

Enjoy using the Loan Application System!
