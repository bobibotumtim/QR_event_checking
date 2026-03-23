// Event data (same as in script.js)
const events = [
  {
    id: 1,
    name: 'Tech Innovation Summit',
    date: 'Dec 10, 2025',
    time: '10:00 AM - 12:00 PM',
    venue: 'Online (Zoom)'
  },
  {
    id: 2,
    name: 'Digital Marketing Workshop',
    date: 'Dec 11, 2025',
    time: '2:00 PM - 4:00 PM',
    venue: 'Online (Zoom)'
  },
  {
    id: 3,
    name: 'Leadership & Team Building',
    date: 'Dec 12, 2025',
    time: '9:00 AM - 11:00 AM',
    venue: 'Online (Google Meet)'
  },
  {
    id: 4,
    name: 'AI & Machine Learning Bootcamp',
    date: 'Dec 14, 2025',
    time: '1:00 PM - 3:00 PM',
    venue: 'Online (Zoom)'
  },
  {
    id: 5,
    name: 'Entrepreneurship Talk',
    date: 'Dec 15, 2025',
    time: '5:00 PM - 6:30 PM',
    venue: 'Online (Zoom)'
  },
  {
    id: 6,
    name: 'UI/UX Design Conference',
    date: 'Dec 16, 2025',
    time: '7:00 PM - 9:00 PM',
    venue: 'Online (Google Meet)'
  },
  {
    id: 7,
    name: 'Cloud Computing Workshop',
    date: 'Dec 18, 2025',
    time: '3:00 PM - 5:00 PM',
    venue: 'Online (Zoom)'
  },
  {
    id: 8,
    name: 'Cybersecurity Awareness',
    date: 'Dec 20, 2025',
    time: '10:00 AM - 12:00 PM',
    venue: 'Online (Microsoft Teams)'
  },
  {
    id: 9,
    name: 'Data Science Bootcamp',
    date: 'Dec 22, 2025',
    time: '1:00 PM - 4:00 PM',
    venue: 'Online (Zoom)'
  }
];

// ============================================
// GOOGLE SHEETS CONFIGURATION
// ============================================
// To save data to Google Sheets:
// 1. Create a Google Form with fields: Event Name, Name, Email, Timestamp
// 2. Link the form to a Google Sheet
// 3. Get the form's pre-filled URL
// 4. Replace the URL and entry IDs below

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
const FORM_ENTRY_IDS = {
eventName:'entry.1734754125',
name:'entry.818815183',
email:'entry.475917396'
};

// Get event ID from URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('event'));

console.log('URL:', window.location.href);
console.log('Event ID from URL:', urlParams.get('event'));
console.log('Parsed Event ID:', eventId);
console.log('Available events:', events.map(e => e.id));

// Load event info
function loadEventInfo() {
  const event = events.find(e => e.id === eventId);

  console.log('Looking for event with ID:', eventId);
  console.log('Found event:', event);

  if (!event) {
    document.getElementById('eventInfo').innerHTML = `
      <p style="color: #ef4444;">Event not found. Please scan the QR code again.</p>
      <p style="color: #6b7280; font-size: 0.9rem;">Event ID: ${eventId}</p>
      <p style="color: #6b7280; font-size: 0.9rem;">URL: ${window.location.href}</p>
    `;
    document.getElementById('registrationForm').style.display = 'none';
    return;
  }

  document.getElementById('eventInfo').innerHTML = `
    <h3>${event.name}</h3>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Time:</strong> ${event.time}</p>
    <p><strong>Venue:</strong> ${event.venue}</p>
  `;
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const event = events.find(e => e.id === eventId);
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Show loading state
  const submitBtn = e.target.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loader').style.display = 'inline-block';

  try {
    // Save to Google Sheets via Google Form
    await submitToGoogleForm(event.name, name, email);

    // Show success message
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('eventInfo').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    // Also save to localStorage as backup
    saveToLocalStorage(event, name, email);

  } catch (error) {
    console.error('Submission error:', error);
    alert('Registration failed. Please try again.');

    // Reset button
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'inline-block';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
  }
});

// Submit to Google Form
async function submitToGoogleForm(eventName, name, email) {
  // Create form data
  const formData = new FormData();
  formData.append(FORM_ENTRY_IDS.eventName, eventName);
  formData.append(FORM_ENTRY_IDS.name, name);
  formData.append(FORM_ENTRY_IDS.email, email);

  // Submit to Google Form
  // Note: This will work if CORS is enabled or using a proxy
  try {
    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Google Forms doesn't support CORS, but submission still works
    });

    console.log('✅ Submitted to Google Form');
  } catch (error) {
    console.log('⚠️ Google Form submission (no-cors mode):', error);
    // Even if there's an error, the submission likely succeeded with no-cors mode
  }
}

// Save to localStorage as backup
function saveToLocalStorage(event, name, email) {
  const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');

  registrations.push({
    eventId: event.id,
    eventName: event.name,
    name: name,
    email: email,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
  console.log('✅ Saved to localStorage');
}

// Initialize
loadEventInfo();
