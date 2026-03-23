// Google Form URL - Your actual form
const GOOGLE_FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdX7QsH7dmvO39Oje_dTNMyxDSSQgu0r1YIpKNuDKQ41_0pyQ/viewform';
const EVENT_NAME_ENTRY_ID = 'entry.984468156';

// Generate pre-filled form URL for specific event
function getEventFormURL(eventName) {
  const encodedEventName = encodeURIComponent(eventName);
  return `${GOOGLE_FORM_BASE_URL}?usp=pp_url&${EVENT_NAME_ENTRY_ID}=${encodedEventName}`;
}

// Event data
const events = [
  {
    id: 1,
    name: 'Tech Innovation Summit',
    date: 'Dec 10, 2025',
    time: '10:00 AM - 12:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Digital Marketing Workshop',
    date: 'Dec 11, 2025',
    time: '2:00 PM - 4:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Leadership & Team Building',
    date: 'Dec 12, 2025',
    time: '9:00 AM - 11:00 AM',
    venue: 'Online (Google Meet)',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'AI & Machine Learning Bootcamp',
    date: 'Dec 14, 2025',
    time: '1:00 PM - 3:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'Entrepreneurship Talk',
    date: 'Dec 15, 2025',
    time: '5:00 PM - 6:30 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'UI/UX Design Conference',
    date: 'Dec 16, 2025',
    time: '7:00 PM - 9:00 PM',
    venue: 'Online (Google Meet)',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=200&fit=crop'
  },
  {
    id: 7,
    name: 'Cloud Computing Workshop',
    date: 'Dec 18, 2025',
    time: '3:00 PM - 5:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
  },
  {
    id: 8,
    name: 'Cybersecurity Awareness',
    date: 'Dec 20, 2025',
    time: '10:00 AM - 12:00 PM',
    venue: 'Online (Microsoft Teams)',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop'
  },
  {
    id: 9,
    name: 'Data Science Bootcamp',
    date: 'Dec 22, 2025',
    time: '1:00 PM - 4:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
  }
];

// Load events
function loadEvents() {
  const eventsGrid = document.getElementById('eventsGrid');

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.name}" class="event-image">
      <div class="event-content">
        <h3 class="event-title">${event.name}</h3>
        <div class="event-details">
          <div class="event-detail">
            <strong>Date:</strong> ${event.date}
          </div>
          <div class="event-detail">
            <strong>Time:</strong> ${event.time}
          </div>
          <div class="event-detail">
            <strong>Venue:</strong> ${event.venue}
          </div>
        </div>
        <button class="check-in-btn" onclick="showQRCode(${event.id})">Check In</button>
      </div>
    `;
    eventsGrid.appendChild(eventCard);
  });
}

// Show QR Code Modal
function showQRCode(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;

  // Update modal content
  document.getElementById('modalEventName').textContent = event.name;
  document.getElementById('modalEventDate').textContent = `${event.date} • ${event.time}`;

  // Clear previous QR code
  const qrCodeContainer = document.getElementById('qrCode');
  qrCodeContainer.innerHTML = '';

  // Generate registration URL
  // Pre-filled Google Form with event name
  const registrationUrl = getEventFormURL(event.name);

  console.log('Event:', event.name);
  console.log('Registration URL:', registrationUrl);

  // Generate QR Code
  new QRCode(qrCodeContainer, {
    text: registrationUrl,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // Show modal
  document.getElementById('qrModal').classList.add('active');
}

// Close Modal
function closeModal() {
  document.getElementById('qrModal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('qrModal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initialize
loadEvents();


// Store current event ID for direct link
let currentEventId = null;

// Update showQRCode to store event ID
const originalShowQRCode = showQRCode;
showQRCode = function(eventId) {
  currentEventId = eventId;
  originalShowQRCode(eventId);
};

// Open registration directly
function openRegistration() {
  if (currentEventId) {
    const event = events.find(e => e.id === currentEventId);
    if (event) {
      // Open pre-filled Google Form
      const formUrl = getEventFormURL(event.name);
      window.open(formUrl, '_blank');
    }
  }
}
