# 🎉 Event Check-In System

A modern event check-in system with QR code integration and Google Forms.

## ✨ Features

- **Event Listing** - Display upcoming events with images
- **QR Code Check-In** - Generate QR codes for each event
- **Google Forms Integration** - Direct link to registration form
- **Responsive Design** - Works on all devices
- **Easy Setup** - No backend required

## 🚀 Quick Start

### 1. Run the Application

```bash
cd event-checkin
npx serve .
```

Open browser at: `http://localhost:3000`


### 2. How It Works

1. **View Events** - Homepage shows 6 events
2. **Click "Check In"** - QR code modal appears
3. **Scan QR Code** - Opens Google Form
4. **Fill Form** - Enter Name, Email, Event
5. **Submit** - Data saved to Google Sheets

## 📁 File Structure

```
event-checkin/
├── index.html              # Main page - Event listing
├── styles.css              # Styles for main page
├── script.js               # Logic + QR code generator
├── register.html           # Registration form (optional)
├── register-styles.css     # Form styles
├── register.js             # Form logic
└── README.md               # This file
```

## 🎨 Customize Events

Edit the `events` array in `script.js`:

```javascript
const events = [
  {
    id: 1,
    name: 'Your Event Name',
    date: 'Dec 10, 2025',
    time: '10:00 AM - 12:00 PM',
    venue: 'Online (Zoom)',
    image: 'https://your-image-url.com/image.jpg'
  },
  // Add more events...
];
```

## 📊 Google Forms Setup

### Create Google Form

1. Go to [Google Forms](https://forms.google.com/)
2. Create form with fields:
   - Event Name (Short answer)
   - Name (Short answer) - Required
   - Email (Email) - Required

### Link to Google Sheets

1. In Google Form, click "Responses" tab
2. Click Google Sheets icon
3. Create new spreadsheet
4. Responses auto-save to Sheet

### Get Form Link

1. Click "Send" in Google Form
2. Click Link icon
3. Copy the short URL (e.g., `https://forms.gle/xxxxx`)
4. Update `GOOGLE_FORM_URL` in `script.js`


## 📱 Testing QR Code

### On Desktop:
- Use phone camera to scan QR code
- Or use Chrome extension "QR Code Reader"

### On Mobile:
- Open camera app
- Point at QR code
- Tap notification to open form

## 🎯 Features Breakdown

### QR Code Modal
- Large QR code display
- Event information
- Direct link button
- Close button

### Event Cards
- Event image
- Event details (date, time, venue)
- Check-in button
- Hover effects

### Responsive Design
- Desktop: Grid layout
- Tablet: Adjusted spacing
- Mobile: Single column

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- QRCode.js library
- Google Forms & Sheets

## 📝 License

Open source - Free to use and modify

**Made with ❤️ for easy event management**

⭐ Star this project if you find it useful!
