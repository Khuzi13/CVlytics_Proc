const uploadArea = document.querySelector(".upload-area");
const fileInput = document.getElementById("fileElem");
const fileNameDisplay = document.getElementById("file-name-display");
const analyzeBtn = document.querySelector(".btn-block");

// Check if we are on the CV Checker page
if (uploadArea && fileInput) {
  // Click to upload
  uploadArea.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) return;

    // ❌ Not PDF
    if (file.type !== "application/pdf") {
    //   alert("You can upload PDF files only.");
    showToast("Only PDF files are allowed.", "error");

      this.value = "";
      return;
    }

    // ❌ Size greater than 5MB
    if (file.size > maxSize) {
    //   alert("File size 5MB se zyada hai");
    showToast("The file size must not exceed 5MB.", "error");
      this.value = "";
      fileNameDisplay.textContent = "";
      return;
    }

    // ✅ File valid
    fileNameDisplay.textContent = `Selected File: ${file.name}`;

    // ✅ BUTTON COLOR + TEXT (YEH WAHI CODE HAI)
    analyzeBtn.style.backgroundColor = "#4f46e5";
    analyzeBtn.textContent = "Analyze CV Now";

    // ✅ SHOW SUCCESS TOAST
    showToast(`Selected file: ${file.name}`, "success");
  });


  // Drag and Drop Effects (Optional Visuals)
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#4f46e5";
    uploadArea.style.backgroundColor = "#eff6ff";
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.borderColor = "#d1d5db";
    uploadArea.style.backgroundColor = "#f9fafb";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#d1d5db";
    uploadArea.style.backgroundColor = "#f9fafb";

    // Handle dropped file logic here if needed
    // alert("File dropped!");
  });
}

// ananana
// function analyzeCV() {
//   const file = fileInput.files[0];
//   const desc = document.querySelector("textarea").value;

//   if (!consentCheckbox.checked) {
//     showToast("Please agree to use your CV for anonymous model training before analyzing.", "warning");
//     return; // Stop further execution
//   }

//   if (!file) {
//     // alert("Please upload a PDF file first.");
//     showToast("Please upload a PDF file first.", "error");
//     return;
//   }

// showToast(
//   `Analyzing ${file.name}... Backend integration required for real AI analysis.`,
//   "info"
// );
// }

// function analyzeCV() {
//     const file = fileInput.files[0];
    
// // django variable 
//     // if (!vanishData) {
//     //     showToast("You cannot analyze CV at this time.", "warning");
//     //     return;
//     // }

//     // 1️⃣ Check if file uploaded
//     if (!file) {
//         showToast("Please upload a PDF file first.", "error");
//         return; // Stop execution
//     }

//     // 2️⃣ Check if user agreement checked
//     if (!consentCheckbox.checked) {
//         showToast(
//             "Please, enable user aggrement",
//             "warning" // warning color
//         );
//         return;
//     }

//     // 3️⃣ Both conditions satisfied → proceed
//     showToast(
//         `Analyzing ${file.name}... Backend integration required for real AI analysis.`,
//         "info"
//     );
// }


// new With Form file uploadation
// function analyzeCV() {
//     const file = fileInput.files[0];
//     const consentCheckbox = document.getElementById("consentCheckbox");
//     const form = document.getElementById("contactForm");

//     // 1️⃣ File check
//     if (!file) {
//         showToast("Please upload a PDF file first.", "error");
//         return;
//     }

//     // 2️⃣ User agreement check
//     if (!consentCheckbox.checked) {
//         showToast("Please agree to the user agreement first.", "warning");
//         return;
//     }

//     // 3️⃣ All OK → Submit form to Django
//     showToast("Uploading CV and analyzing...", "info");

//     // ⏳ Small delay so toast is visible
//     setTimeout(() => {
//         form.submit();
//     }, 800);
// }

function analyzeCV(event) {
    event.preventDefault(); // default submit roko

    const file = fileInput.files[0];
    const consentCheckbox = document.getElementById("consentCheckbox");
    const form = document.getElementById("contactForm");

    // 1️⃣ File check
    if (!file) {
        showToast("Please upload a PDF file first.", "error");
        return;
    }

    // 2️⃣ Agreement check
    if (!consentCheckbox.checked) {
        showToast("Please enable user agreement", "warning");
        return;
    }

    // 3️⃣ Success toast
    showToast("Uploading CV & analyzing...", "success");

    // 4️⃣ FORM SUBMIT (THIS WAS MISSING ❗)
    setTimeout(() => {
        form.submit();
    }, 800); // thora delay so toast visible rahe
}












// Hamburger Menu Toggle     1st -> Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Hamburger Menu Toggle with Animation     2st -> Hamburger
// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");

// if (hamburger && navLinks) {
//     hamburger.addEventListener("click", () => {
//         navLinks.classList.toggle("show");
//         hamburger.classList.toggle("active"); // ✅ Add this line for animation
//     });

//     // Close menu when clicking a link (optional)
//     const navItems = navLinks.querySelectorAll('a');
//     navItems.forEach(item => {
//         item.addEventListener('click', () => {
//             navLinks.classList.remove("show");
//             hamburger.classList.remove("active");
//         });
//     });
// }


// drag code

document.addEventListener("DOMContentLoaded", function () {
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("fileElem");
  const fileNameDisplay = document.getElementById("file-name-display");

  if (!dropArea || !fileInput) return;

  // Click se file select
//   dropArea.addEventListener("click", () => fileInput.click());

  // Drag over
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-active");
  });

  // Drag leave
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-active");
  });

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-active");

    const file = e.dataTransfer.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.type !== "application/pdf") {
        // alert("You can upload only a PDF file.");
        showToast("Only PDF files are allowed.", "error");

        return;
    }

    if (file.size > maxSize) {
        // alert("The file size must not exceed 5MB.");
    showToast("The file size must not exceed 5MB.", "error");

        return;
    }

    fileInput.files = e.dataTransfer.files;
    fileNameDisplay.textContent = file.name;
    analyzeBtn.style.backgroundColor = "#4f46e5";
    analyzeBtn.textContent = "Analyze CV Now";
      // ✅ Success toast for drag/drop
    showToast(`Selected file: ${file.name}`, "success");
});

  // Normal select
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = fileInput.files[0].name;
    }
  });
});

// new showToast
function showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    if (!toast || !toastMessage) return;

    // Set icon and background based on type
    let iconClass = "fa-circle-info";
    let bgColor = "#1e3a8a"; // info default

    if (type === "success") {
        iconClass = "fa-circle-check";
        bgColor = "#065f46";
    } else if (type === "error") {
        iconClass = "fa-triangle-exclamation";
        bgColor = "#7f1d1d";
    } else if (type === "warning") {
        iconClass = "fa-triangle-exclamation";
        bgColor = "#d97706"; // yellow/orange
    }

    toast.className = `toast show`;
    toastMessage.textContent = message;
    toast.querySelector("i").className = `fa-solid ${iconClass}`;
    toast.style.background = bgColor;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}

  
  

//   User aggrement





// function showToast(message, type = "info") {
//   const toast = document.getElementById("toast");
//   const toastMessage = document.getElementById("toast-message");

//   if (!toast || !toastMessage) return;

//   // Set icon based on type
//   let iconClass = "fa-circle-info";
//   let bgColor = "#1e3a8a"; // info default

//   if (type === "success") {
//     iconClass = "fa-circle-check";
//     bgColor = "#065f46";
//   } else if (type === "error") {
//     iconClass = "fa-triangle-exclamation";
//     bgColor = "#7f1d1d";
//   } else if (type === "warning") {
//     iconClass = "fa-triangle-exclamation";
//     bgColor = "#d97706"; // yellow/orange
//   }

//   toast.className = `toast show`;
//   toastMessage.textContent = message;
//   toast.querySelector("i").className = `fa-solid ${iconClass}`;
//   toast.style.background = bgColor;

//   setTimeout(() => {
//     toast.className = "toast";
//   }, 3000);
// }


// EmailJS Initialization
emailjs.init("NgEFKewBpX5LSRg8w"); // Your Public Key

function sendMessage(event) {
    event.preventDefault();

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        title: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_mxvkuya", "template_iva0zij", templateParams)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("contactForm").reset();
            showToast("Message sent successfully!", "success");
        }, function(error) {
            console.log("FAILED...", error);
            showToast("Failed to send message. Check console.", "error");
        });
}


// Dark mode:
// ?????????
/* =========================
   DARK MODE TOGGLE
========================= */

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleButton(savedTheme);

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Update button
        updateToggleButton(newTheme);
        
        //       // 👇👇 YEH NAYA CODE ADD KIYA HAI 👇👇
        // // Agar Charts wala page khula hai, toh charts ke colors update karein
        // if (typeof window.updateChartsTheme === 'function') {
        //     window.updateChartsTheme();
        // }
        // // 👆👆 YAHAN KHATAM 👆👆


        // Show toast notification
        showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'info');
    });
}

// Update toggle button icon and text
function updateToggleButton(theme) {
    if (!themeIcon || !themeText) return;
    
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
        themeText.textContent = 'Light';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeText.textContent = 'Dark';
    }
}

// Optional: Detect system preference
function detectSystemTheme() {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButton(theme);
    }
}

// Run on page load
detectSystemTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButton(theme);
    }
});

// // For Switch Toggle
// const themeSwitch = document.getElementById('theme-toggle');

// if (themeSwitch) {
//     // Set initial state
//     themeSwitch.checked = savedTheme === 'dark';
    
//     themeSwitch.addEventListener('change', () => {
//         const newTheme = themeSwitch.checked ? 'dark' : 'light';
//         document.documentElement.setAttribute('data-theme', newTheme);
//         localStorage.setItem('theme', newTheme);
//         showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'info');
//     });
// }































/* =========================================
   6. RECRUITER BULK UPLOAD LOGIC
   ========================================= */

const recruiterDropArea = document.getElementById('recruiter-drop-area');
const recruiterInput = document.getElementById('recruiterFileElem');
const fileListContainer = document.getElementById('file-list-container');
const fileListUl = document.getElementById('uploaded-files-list');
const fileCountSpan = document.getElementById('file-count');
const bulkAnalyzeBtn = document.getElementById('bulk-analyze-btn');

let selectedFilesArray = []; // Store files here

if (recruiterDropArea && recruiterInput) {

    // 1. Click to Open
    recruiterDropArea.addEventListener('click', () => {
        recruiterInput.click();
    });

    // 2. File Select Handler
    recruiterInput.addEventListener('change', function() {
        handleBulkFiles(this.files);
    });

    // 3. Drag & Drop Handlers
    recruiterDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        recruiterDropArea.style.borderColor = '#4f46e5';
        if (!document.body.classList.contains('dark-mode')) {
            recruiterDropArea.style.backgroundColor = '#eff6ff';
        }
    });

    recruiterDropArea.addEventListener('dragleave', () => {
        recruiterDropArea.style.borderColor = '#d1d5db';
        if (!document.body.classList.contains('dark-mode')) {
            recruiterDropArea.style.backgroundColor = '#f9fafb';
        }
    });

    recruiterDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        recruiterDropArea.style.borderColor = '#d1d5db';
        if (!document.body.classList.contains('dark-mode')) {
            recruiterDropArea.style.backgroundColor = '#f9fafb';
        }
        handleBulkFiles(e.dataTransfer.files);
    });
}

// Helper Function to Process Multiple Files
function handleBulkFiles(files) {
    if (!files || files.length === 0) return;

    // Convert FileList to Array and filter PDFs
    const newFiles = Array.from(files).filter(file => {
        if (file.type !== "application/pdf") {
            showToast(`Skipped ${file.name} (Not PDF)`, "error");
            return false;
        }
        return true;
    });

    // Add new files to existing array
    selectedFilesArray = [...selectedFilesArray, ...newFiles];

    // Update UI
    updateFileListUI();
}

// Update the HTML List
function updateFileListUI() {
    fileListUl.innerHTML = ""; // Clear current list

    if (selectedFilesArray.length > 0) {
        fileListContainer.style.display = "block";
        
        selectedFilesArray.forEach((file, index) => {
            const li = document.createElement('li');
            li.className = 'file-item';
            li.innerHTML = `
                <span><i class="fa-solid fa-file-pdf"></i> ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)</span>
                <i class="fa-solid fa-xmark file-remove" onclick="removeFile(${index})"></i>
            `;
            fileListUl.appendChild(li);
        });

        // Update count text
        fileCountSpan.textContent = `${selectedFilesArray.length} files selected`;
        
        // Change button style
        if(bulkAnalyzeBtn) {
            bulkAnalyzeBtn.style.backgroundColor = "#4f46e5";
            bulkAnalyzeBtn.innerHTML = `Rank ${selectedFilesArray.length} Candidates <i class="fa-solid fa-arrow-right"></i>`;
        }
        
        showToast(`${selectedFilesArray.length} resumes ready to process`, "success");

    } else {
        fileListContainer.style.display = "none";
        fileCountSpan.textContent = "0 files selected";
        if(bulkAnalyzeBtn) {
            bulkAnalyzeBtn.style.backgroundColor = "#9ca3af"; // Reset color
            bulkAnalyzeBtn.innerHTML = `Rank Candidates <i class="fa-solid fa-arrow-right"></i>`;
        }
    }
}

// Remove individual file from list
function removeFile(index) {
    selectedFilesArray.splice(index, 1); // Remove from array
    updateFileListUI(); // Re-render list
}

// Bulk Analyze Function
function analyzeBulkCV() {
    const jobDesc = document.getElementById('recruiter-job-desc').value;

    if (selectedFilesArray.length === 0) {
        showToast("Please upload at least one CV.", "error");
        return;
    }

    if (!jobDesc) {
        showToast("Please enter a Job Description.", "warning");
        return;   
    }

    if(bulkAnalyzeBtn) {
        bulkAnalyzeBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing ${selectedFilesArray.length} files...`;
    }

    // Simulate Processing
    setTimeout(() => {
        showToast("Analysis Complete! Redirecting...", "success");
        // Redirect to a dashboard or result page
        window.location.href = "/recruiter_result/"; // Or a recruiter result ke page per jaega recruiter_result.html after analyze bulk mail
    }, 2000);
}




// Recruiter_result.html
// app.js mein analyzeBulkCV function ke andar niche wala part update karein:
// setTimeout(() => {
//     showToast("Analysis Complete! Redirecting...", "success");
    
//     // Yahan spelling bilkul same likhein jo aapki file ka naam hai
//     window.location.href = "recruiter_result.html";  
    
// }, 2000);



// Function to get colors based on theme
// function getThemeColors() {
//     const isDark = document.body.getAttribute('data-theme') === 'dark';
//     return {
//         text: isDark ? '#94a3b8' : '#64748b', // Slate-400 vs Slate-500
//         grid: isDark ? '#334155' : '#e2e8f0'  // Slate-700 vs Slate-200
//     };
// }

// // Chart Options mein scales update karo:
// const theme = getThemeColors();

// // Example for Bar Chart Options
// options: {
//     scales: {
//         y: {
//             grid: { color: theme.grid },
//             ticks: { color: theme.text }
//         },
//         x: {
//             ticks: { color: theme.text },
//             grid: { display: false }
//         }
//     }
// }
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Global Instances ---
    let atsChart = null;
    let scatterChart = null;
    let statusChart = null;
    let skillsChart = null;

    // --- 2. THEME COLORS ---
    function getThemeColors() {
        // Check HTML tag for data-theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' 
                    || document.body.getAttribute('data-theme') === 'dark';
        
        return {
            // ✅ Text Color: Dark Mode me Bright White, Light me Dark Slate
            textColor: isDark ? '#ffffff' : '#334155', 
            
            // ✅ Grid Lines: Dark Mode me visible White (15% opacity)
            gridColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
            
            // Status Colors (Pie Chart)
            pieColors: [
                'rgba(34, 197, 94, 0.8)',  // Green
                'rgba(249, 115, 22, 0.8)', // Orange
                'rgba(239, 68, 68, 0.8)'   // Red
            ],

            scatterPoint: '#6366f1'
        };
    }

    const theme = getThemeColors();
    
    // Common Chart Options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                labels: { 
                    color: theme.textColor, 
                    font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
                    usePointStyle: true,
                    boxWidth: 8
                } 
            },
            title: { 
                display: true, 
                color: theme.textColor, 
                font: { size: 15, weight: '600', family: "'Inter', sans-serif" },
                padding: { bottom: 20 }
            }
        },
        scales: {
            // Default Scales to prevent crashes
            x: { ticks: { color: theme.textColor }, grid: { color: theme.gridColor } },
            y: { ticks: { color: theme.textColor }, grid: { color: theme.gridColor } }
        }
    };

    // ============================================================
    // 1️⃣ ATS SCORE DISTRIBUTION (Gradient)
    // ============================================================
    const ctxATS = document.getElementById('atsDistChart').getContext('2d');
    let gradientATS = ctxATS.createLinearGradient(0, 400, 0, 0);
    gradientATS.addColorStop(0, '#6366f1'); 
    gradientATS.addColorStop(1, '#a855f7'); 

    atsChart = new Chart(ctxATS, {
        type: 'bar',
        data: {
            labels: ['Reject (0-40%)', 'Review (40-70%)', 'Shortlist (70%+)'],
            datasets: [{
                label: 'Candidates',
                data: [25, 61, 34], 
                backgroundColor: gradientATS,
                borderRadius: 4,
                barPercentage: 0.5,
                borderWidth: 0
            }]
        },
        options: {
            ...commonOptions,
            plugins: { ...commonOptions.plugins, legend: { display: false }, title: { display: true, text: 'ATS Score Distribution' } }
        }
    });

    // ============================================================
    // 2️⃣ JD MATCH vs ATS SCORE (Scatter)
    // ============================================================
    const ctxScatter = document.getElementById('scatterChart').getContext('2d');
    const scatterData = Array.from({ length: 40 }, () => ({
        x: Math.floor(Math.random() * 40) + 60,
        y: Math.floor(Math.random() * 50) + 50
    }));

    scatterChart = new Chart(ctxScatter, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Candidate Profile',
                data: scatterData,
                backgroundColor: 'rgba(99, 102, 241, 0.6)', 
                borderColor: 'transparent',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            ...commonOptions,
            plugins: { ...commonOptions.plugins, legend: { display: false }, title: { display: true, text: 'ATS vs JD Match Correlation' } },
            scales: {
                x: { 
                    title: { display: true, text: 'ATS Score', color: theme.textColor },
                    grid: { color: theme.gridColor }, ticks: { color: theme.textColor }
                },
                y: { 
                    title: { display: true, text: 'JD Match %', color: theme.textColor },
                    grid: { color: theme.gridColor }, ticks: { color: theme.textColor }
                }
            }
        }
    });

    // ============================================================
    // 3️⃣ STATUS BREAKDOWN (Donut - Hide Scales)
    // ============================================================
    const ctxStatus = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(ctxStatus, {
        type: 'doughnut',
        data: {
            labels: ['Shortlisted', 'In Review', 'Rejected'],
            datasets: [{
                data: [12, 45, 63],
                backgroundColor: theme.pieColors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            ...commonOptions,
            cutout: '70%', 
            // Donut me X/Y scales nahi hote, isliye inhe disable karein
            scales: {
                x: { display: false },
                y: { display: false }
            },
            plugins: { 
                ...commonOptions.plugins, 
                title: { display: true, text: 'Pipeline Status' },
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, color: theme.textColor } }
            }
        }
    });

    // ============================================================
    // 4️⃣ TOP SKILLS DEMAND (Gradient)
    // ============================================================
    const ctxSkills = document.getElementById('skillsBarChart').getContext('2d');
    let gradientSkills = ctxSkills.createLinearGradient(0, 0, 400, 0);
    gradientSkills.addColorStop(0, '#6366f1'); 
    gradientSkills.addColorStop(1, '#a855f7'); 

    skillsChart = new Chart(ctxSkills, {
        type: 'bar',
        data: {
            labels: ['Python', 'SQL', 'React.js', 'AWS', 'Docker'],
            datasets: [{
                label: 'Candidates',
                data: [85, 72, 40, 55, 30],
                backgroundColor: gradientSkills,
                borderRadius: 4,
                barPercentage: 0.6,
                indexAxis: 'y'
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y', 
            plugins: { ...commonOptions.plugins, legend: { display: false }, title: { display: true, text: 'Top Skills Found' } }
        }
    });

    // ============================================================
    // 🔄 AUTO-DETECT THEME CHANGE (Observer Logic)
    // ============================================================
    const updateAllCharts = () => {
        const newColors = getThemeColors();

        [atsChart, scatterChart, statusChart, skillsChart].forEach(chart => {
            if (!chart) return;

            // 1. Update Title & Legend
            if (chart.options.plugins.title) chart.options.plugins.title.color = newColors.textColor;
            if (chart.options.plugins.legend) chart.options.plugins.legend.labels.color = newColors.textColor;

            // 2. Update Scales (Grid & Text) - Sirf agar chart me scales hain
            if (chart.options.scales.x && chart.options.scales.x.display !== false) {
                chart.options.scales.x.ticks.color = newColors.textColor;
                chart.options.scales.x.grid.color = newColors.gridColor;
                if(chart.options.scales.x.title) chart.options.scales.x.title.color = newColors.textColor;
            }
            if (chart.options.scales.y && chart.options.scales.y.display !== false) {
                chart.options.scales.y.ticks.color = newColors.textColor;
                chart.options.scales.y.grid.color = newColors.gridColor;
                if(chart.options.scales.y.title) chart.options.scales.y.title.color = newColors.textColor;
            }

            chart.update(); // Redraw chart
        });
    };

    // 🚀 MUTATION OBSERVER: Yeh HTML tag par nazar rakhega
    // Jaise hi 'data-theme' change hoga, charts apne aap update honge
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateAllCharts();
            }
        });
    });

    // Start Observing <html> tag
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Also Start Observing <body> tag (Security ke liye, agar aapka code body pe class lagata hai)
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });


    // --- SLIDER LOGIC ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.chart-slide');

    window.slideChart = function(direction) {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };
});

        // --- 2. SLIDER LOGIC ---
        // let currentSlide = 0;
        // const slides = document.querySelectorAll('.chart-slide');

        // function slideChart(direction) {
        //     slides[currentSlide].classList.remove('active');
        //     currentSlide = (currentSlide + direction + slides.length) % slides.length;
        //     slides[currentSlide].classList.add('active');
        // }

        // --- 3. EXPAND TABLE ROW ---
        function toggleDetails(rowId) {
            const detailRow = document.getElementById(rowId);
            detailRow.classList.toggle('hidden');
        }

        // --- 4. SIMPLE FILTER LOGIC ---
        function filterTable() {
            const statusFilter = document.getElementById('statusFilter').value;
            const fieldFilter = document.getElementById('fieldFilter').value;
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('.main-row');

            rows.forEach(row => {
                const status = row.querySelector('.status-pill').innerText;
                const field = row.children[4].innerText;
                const name = row.children[0].innerText.toLowerCase();

                let show = true;

                if (statusFilter !== 'all' && !status.includes(statusFilter)) show = false;
                if (fieldFilter !== 'all' && field !== fieldFilter) show = false;
                if (searchInput && !name.includes(searchInput)) show = false;

                row.style.display = show ? '' : 'none';
                
                // Hide details if main row is hidden
                const detailRowId = row.getAttribute('onclick').match(/'([^']+)'/)[1];
                const detailRow = document.getElementById(detailRowId);
                if(!show) detailRow.classList.add('hidden');
            });
        }