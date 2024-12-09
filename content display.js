document.getElementById('user').addEventListener('change', updateContent);

function updateContent() {
    const userType = document.getElementById('user').value;
    const content = document.getElementById('content');
    content.innerHTML = '';  // Clear existing content

    if (userType === 'teacher') {
        content.innerHTML = `
            <h2>Teacher's Dashboard</h2>
            <button onclick="uploadContent()">Upload Activity/Assignment</button>
            <div id="teacher-chat"></div>
        `;
    } else if (userType === 'learner') {
        content.innerHTML = `
            <h2>Learner's Dashboard</h2>
            <div id="assignments">
                <ul>
                    <li>Assignment 1: <button onclick="submitAssignment('1')">Submit Answer</button></li>
                    <li>Assignment 2: <button onclick="submitAssignment('2')">Submit Answer</button></li>
                </ul>
            </div>
            <div id="learner-chat"></div>
        `;
    } else if (userType === 'parent') {
        content.innerHTML = `
            <h2>Parent's Dashboard</h2>
            <p>Child's Status:</p>
            <ul>
                <li>Assignment 1: <span>Accomplished</span></li>
                <li>Assignment 2: <span>No Submission</span></li>
            </ul>
            <div id="parent-chat"></div>
        `;
    }
}

function uploadContent() {
    alert("Upload functionality will be added.");
}

function submitAssignment(assignmentId) {
    alert(`Submitting answer for Assignment ${assignmentId}`);
}

updateContent();  // Initialize based on default selection
