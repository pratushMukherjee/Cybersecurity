# Cybersecurity Fundamentals

An interactive web application demonstrating fundamental cybersecurity concepts including password security, encryption, and input validation.

## Features

### 1. Password Strength Checker
- Real-time password strength analysis
- Visual feedback on password requirements
- Checks for:
  - Minimum 8 characters
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters
- Color-coded strength indicators (Weak, Fair, Good, Strong)

### 2. Caesar Cipher Encryption
- Interactive encryption and decryption tool
- Uses a Caesar Cipher with a shift of 3
- Demonstrates basic cryptographic concepts
- Supports both encryption and decryption operations
- Real-time results display

### 3. XSS Protection Demo
- Input sanitization demonstration
- Shows how dangerous input is neutralized
- Prevents Cross-Site Scripting (XSS) attacks
- Visual comparison of unsafe vs. sanitized input
- Educational explanation of protection methods

## Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **JavaScript** - Core functionality

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-security-project
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS and related packages:
```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind by updating `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Install Lucide React for icons:
```bash
npm install lucide-react
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Usage

### Password Strength Checker
1. Click on the "Password Strength" tab
2. Type a password in the input field
3. View real-time strength analysis and requirements checklist
4. Toggle password visibility using the eye icon

### Encryption Tool
1. Click on the "Encryption" tab
2. Enter text in the encryption field and click "Encrypt"
3. Copy the encrypted result to the decryption field
4. Click "Decrypt" to recover the original message

### XSS Protection
1. Click on the "XSS Protection" tab
2. Enter potentially malicious input (e.g., `<script>alert('XSS')</script>`)
3. Click "Sanitize Input"
4. Compare the unsafe input with the sanitized output

## Project Structure

```
my-security-project/
├── public/
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # React entry point
│   └── index.css       # Tailwind CSS imports
├── package.json
├── tailwind.config.js
└── README.md
```

## Security Concepts Demonstrated

### Password Security
- Explains the importance of strong passwords
- Shows how different password characteristics affect security
- Demonstrates password strength evaluation algorithms

### Encryption
- Introduction to Caesar Cipher substitution encryption
- Demonstrates symmetric encryption concepts
- Shows how encryption protects data confidentiality

### Input Validation
- Demonstrates XSS attack prevention
- Shows HTML entity encoding
- Explains the importance of sanitizing user input

## Learning Outcomes

By using this application, users will understand:
- How to create strong, secure passwords
- Basic encryption and decryption principles
- Common web security vulnerabilities (XSS)
- The importance of input validation and sanitization

## Future Enhancements

Potential features to add:
- Additional encryption algorithms (AES, RSA)
- SQL injection prevention demo
- CSRF token demonstration
- Password hashing visualization
- Two-factor authentication simulator

## Contributing

Feel free to fork this project and submit pull requests for improvements or additional security demonstrations.


## Acknowledgments

- Built with React and Tailwind CSS
- Icons provided by Lucide React
- Created for educational purposes to demonstrate cybersecurity fundamentals
