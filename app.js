// Event listeners for Sign Up and Log In
document.getElementById('signup-btn').addEventListener('click', showSignUpForm);
document.getElementById('login-btn').addEventListener('click', showLoginForm);

let users = [];  // Store user data temporarily in an array (for this example)

function showSignUpForm() {
    const userType = document.getElementById('user').value;
    const content = document.getElementById('content');
    content.innerHTML = '';  // Clear existing content

    let formHtml = '<h2>Sign Up</h2>';

    if (userType === 'learner') {
        formHtml += `
            <label>Name:</label><input type="text" id="name" placeholder="Enter Learner's Name"><br>
            <label>Email:</label><input type="email" id="email" placeholder="Enter Learner's Email"><br>
            <label>Username:</label><input type="text" id="username" placeholder="Choose Username"><br>
            <label>Password:</label><input type="password" id="password" placeholder="Choose Password"><br>
            <button onclick="signup('learner')">Sign Up</button>
        `;
    } else if (userType === 'teacher') {
        formHtml += `
            <label>Name:</label><input type="text" id="name" placeholder="Enter Teacher's Name"><br>
            <label>Email:</label><input type="email" id="email" placeholder="Enter Teacher's Email"><br>
            <label>Username:</label><input type="text" id="username" placeholder="Choose Username"><br>
            <label>Password:</label><input type="password" id="password" placeholder="Choose Password"><br>
            <button onclick="signup('teacher')">Sign Up</button>
        `;
    } else if (userType === 'parent') {
        formHtml += `
            <label>Parent's Name:</label><input type="text" id="name" placeholder="Enter Parent's Name"><br>
            <label>Learner's Name:</label><input type="text" id="learner-name" placeholder="Enter Learner's Name"><br>
            <label>Email:</label><input type="email" id="email" placeholder="Enter Parent's Email"><br>
            <label>Username:</label><input type="text" id="username" placeholder="Choose Username"><br>
            <label>Password:</label><input type="password" id="password" placeholder="Choose Password"><br>
            <button onclick="signup('parent')">Sign Up</button>
        `;
    }

    content.innerHTML = formHtml;
}

function signup(userType) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input
    if (name === '' || email === '' || username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    // Create user object
    let user = {
        userType,
        name,
        email,
        username,
        password,
        learnerName: document.getElementById('learner-name') ? document.getElementById('learner-name').value : null
    };

    // Save user data
    users.push(user);
    alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} signed up successfully!`);

    showLoginForm();  // After signup, show login form
}

function showLoginForm() {
    const content = document.getElementById('content');
    content.innerHTML = '';  // Clear existing content

    content.innerHTML = `
        <h2>Log In</h2>
        <label>Username:</label><input type="text" id="login-username" placeholder="Enter Username"><br>
        <label>Password:</label><input type="password" id="login-password" placeholder="Enter Password"><br>
        <button onclick="login()">Log In</button>
    `;
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)} logged in successfully!`);
        displayDashboard(user);  // Redirect to the respective dashboard
    } else {
        alert('You are not registered yet. Sign up first.');
    }
}

function displayDashboard(user) {
    // Redirect based on user type
    if (user.userType === 'teacher') {
        window.location.href = 'index.html';
    } else if (user.userType === 'learner') {
        window.location.href = 'learnerdashboard.html';
    } else if (user.userType === 'parent') {
        window.location.href = 'parentdashboard.html';
    }
}

function uploadContent() {
    alert("Upload functionality will be added.");
}
