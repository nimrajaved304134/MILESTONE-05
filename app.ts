const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display")!;

// Form elements
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const educationInput = document.getElementById("education") as HTMLInputElement;
const workExperienceInput = document.getElementById("work-experience") as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;
const profilePicInput = document.getElementById("profile-pic") as HTMLInputElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;

// Display elements
const displayName = document.getElementById("display-name")!;
const displayEmail = document.getElementById("display-email")!;
const displayPhone = document.getElementById("display-phone")!;
const displayEducation = document.getElementById("display-education")!;
const displayWorkExperience = document.getElementById("display-work-experience")!;
const displaySkills = document.getElementById("display-skills")!;
const displayProfilePic = document.getElementById("display-profile-pic") as HTMLImageElement;

// Creating container for buttons
const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
resumeDisplay.appendChild(buttonContainer);

// Download PDF button
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download as PDF";
downloadButton.addEventListener("click", function () {
    window.print(); // Trigger the browser's print functionality
});
buttonContainer.appendChild(downloadButton);

// Shareable Link button
const shareLinkButton = document.createElement("button");
shareLinkButton.textContent = "Copy shareable link";
shareLinkButton.addEventListener("click", function () {
    const userName = usernameInput.value;
    const shareableLink = `https://yourdomain.com/resumes/${userName.replace(/\s+/g, "_")}_cv.html`;
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert("Shareable link copied to clipboard.");
    }).catch((err) => {
        console.error("Failed to copy link", err);
        alert("Failed to copy link, please try again.");
    });
});
buttonContainer.appendChild(shareLinkButton);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values from form inputs
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const education = educationInput.value;
    const workExperience = workExperienceInput.value;
    const skills = skillsInput.value.split(","); // Multiple skills separated by commas

    // Display Profile Picture
    const file = profilePicInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayProfilePic.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }

    // Populate resume display
    displayName.textContent = name;
    displayEmail.textContent = `Email: ${email}`;
    displayPhone.textContent = `Phone: ${phone}`;
    displayEducation.textContent = education;
    displayWorkExperience.textContent = workExperience;

    // Display skills
    displaySkills.innerHTML = "";
    skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill.trim();
        displaySkills.appendChild(li);
    });

    // Show resume section
    resumeDisplay.style.display = "block";
});
