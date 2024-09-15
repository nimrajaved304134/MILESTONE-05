var form = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
// Form elements
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var educationInput = document.getElementById("education");
var workExperienceInput = document.getElementById("work-experience");
var skillsInput = document.getElementById("skills");
var profilePicInput = document.getElementById("profile-pic");
var usernameInput = document.getElementById("username");
// Display elements
var displayName = document.getElementById("display-name");
var displayEmail = document.getElementById("display-email");
var displayPhone = document.getElementById("display-phone");
var displayEducation = document.getElementById("display-education");
var displayWorkExperience = document.getElementById("display-work-experience");
var displaySkills = document.getElementById("display-skills");
var displayProfilePic = document.getElementById("display-profile-pic");
// Creating container for buttons
var buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
resumeDisplay.appendChild(buttonContainer);
// Download PDF button
var downloadButton = document.createElement("button");
downloadButton.textContent = "Download as PDF";
downloadButton.addEventListener("click", function () {
    window.print(); // Trigger the browser's print functionality
});
buttonContainer.appendChild(downloadButton);
// Shareable Link button
var shareLinkButton = document.createElement("button");
shareLinkButton.textContent = "Copy shareable link";
shareLinkButton.addEventListener("click", function () {
    var userName = usernameInput.value;
    var shareableLink = "https://yourdomain.com/resumes/".concat(userName.replace(/\s+/g, "_"), "_cv.html");
    navigator.clipboard.writeText(shareableLink).then(function () {
        alert("Shareable link copied to clipboard.");
    }).catch(function (err) {
        console.error("Failed to copy link", err);
        alert("Failed to copy link, please try again.");
    });
});
buttonContainer.appendChild(shareLinkButton);
form.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault();
    // Get values from form inputs
    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var education = educationInput.value;
    var workExperience = workExperienceInput.value;
    var skills = skillsInput.value.split(","); // Multiple skills separated by commas
    // Display Profile Picture
    var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            displayProfilePic.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
    // Populate resume display
    displayName.textContent = name;
    displayEmail.textContent = "Email: ".concat(email);
    displayPhone.textContent = "Phone: ".concat(phone);
    displayEducation.textContent = education;
    displayWorkExperience.textContent = workExperience;
    // Display skills
    displaySkills.innerHTML = "";
    skills.forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill.trim();
        displaySkills.appendChild(li);
    });
    // Show resume section
    resumeDisplay.style.display = "block";
});
