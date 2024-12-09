// Initialize and load saved subjects on page load
document.addEventListener('DOMContentLoaded', loadSavedSubjects);

document.getElementById('create-subject-btn').addEventListener('click', () => {
    document.getElementById('create-grade-form').style.display = 'block';
});

function addGradeSection() {
    const subject = document.getElementById('subject').value;
    const gradeAndSection = document.getElementById('grade-section').value;
    const schoolYear = document.getElementById('school-year').value;

    if (subject && gradeAndSection && schoolYear) {
        const classInfo = {
            subject,
            gradeAndSection,
            schoolYear
        };

        // Save to localStorage
        saveSubject(classInfo);

        // Display the new subject immediately
        displayClass(classInfo);
        clearGradeSectionForm();
    } else {
        alert('Please fill in all fields');
    }
}

function displayClass(classInfo) {
    const classesContainer = document.getElementById('classes-container');

    // Create a div for each subject
    const classDiv = document.createElement('div');
    classDiv.classList.add('class-item');
    classDiv.textContent = `${classInfo.subject} - ${classInfo.gradeAndSection} (${classInfo.schoolYear})`;

    // Add button to view dashboard
    const viewDashboardBtn = document.createElement('button');
    viewDashboardBtn.textContent = 'View';
    viewDashboardBtn.addEventListener('click', () => {
        showDashboard(classInfo);
    });

    // Add button to delete subject
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteSubject(classInfo);
        classDiv.remove();
    });

    // Append buttons to the class div
    classDiv.appendChild(viewDashboardBtn);
    classDiv.appendChild(deleteBtn);

    // Insert the class div below the "Add Subject" button
    classesContainer.insertAdjacentElement('afterbegin', classDiv);
}

function showDashboard(classInfo) {
    // Hide the list of classes and the "Add Subject" form
    document.getElementById('class-list').style.display = 'none';
    document.getElementById('create-grade-form').style.display = 'none';

    // Display the dashboard content and the welcome message
    document.getElementById('dashboard-content').style.display = 'block';
    document.getElementById('dashboard-title').textContent = `Welcome to ${classInfo.subject} - ${classInfo.gradeAndSection}`;
    document.getElementById('upload-btn').style.display = 'block';
}

function displayFormFields() {
    const contentType = document.getElementById('content-type').value;
    const formFields = document.getElementById('form-fields');
    formFields.innerHTML = '';

    if (contentType === 'assignment') {
        formFields.innerHTML = `
            <label>Assignment Title:</label><input type="text" placeholder="Enter title"><br>
            <label>Description:</label><textarea placeholder="Enter description"></textarea><br>
        `;
    } else if (contentType === 'quiz') {
        formFields.innerHTML = `
            <label>Quiz Title:</label><input type="text" placeholder="Enter title"><br>
            <label>Description:</label><textarea placeholder="Enter description"></textarea><br>
        `;
    } else if (contentType === 'activity') {
        formFields.innerHTML = `
            <label>Activity Title:</label><input type="text" placeholder="Enter title"><br>
            <label>Description:</label><textarea placeholder="Enter description"></textarea><br>
        `;
    } else if (contentType === 'resource') {
        formFields.innerHTML = `
            <label>Resource Title:</label><input type="text" placeholder="Enter title"><br>
            <label>File Link:</label><input type="url" placeholder="Enter file URL"><br>
        `;
    }
}

function addContent() {
    const contentType = document.getElementById('content-type').value;
    if (contentType) {
        const contentList = document.getElementById('content-list');
        contentList.insertAdjacentHTML(
            'beforeend',
            `<p>${contentType} added successfully!</p>`
        );
    } else {
        alert('Please select a content type');
    }
}

function saveSubject(classInfo) {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.push(classInfo);
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

function loadSavedSubjects() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.forEach(subject => displayClass(subject));
}

function deleteSubject(classInfo) {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const updatedSubjects = subjects.filter(
        subject => !(subject.subject === classInfo.subject && subject.gradeAndSection === classInfo.gradeAndSection)
    );
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
}

function clearGradeSectionForm() {
    document.getElementById('subject').value = '';
    document.getElementById('grade-section').value = '';
    document.getElementById('school-year').value = '';
}
function goBackToDashboard() {
    // Hide the dashboard content
    document.getElementById('dashboard-content').style.display = 'none';

    // Show the class list and the form to add a new subject
    document.getElementById('class-list').style.display = 'block';
    document.getElementById('create-grade-form').style.display = 'none';
}
