# 🌸 Bloom Beauty Studio — Luxury Salon & Spa Sanctuary

A website built with **HTML5, CSS3, and Vanilla JavaScript** for **Bloom Beauty Studio**, a fictional luxury beauty salon and wellness atelier.

---

## 🎨 Design Philosophy & Aesthetic

- **Color Palette**: Warm beige (`#FAF7F2`), delicate cream (`#F3ECE2`), crisp white (`#FFFFFF`), rich espresso brown (`#2C221E`), and champagne gold accents (`#C5A475`).
- **Typography**: 
  - Headings: `Cormorant Garamond` (editorial luxury serif).
  - Body & UI: `Plus Jakarta Sans` (clean, contemporary sans-serif).
- **Visuals**: Curated royalty-free photography featuring salon interiors, holistic skincare, balayage, and nail couture.
- **Responsiveness**: Fully responsive across mobile smartphones, tablets, laptops, and ultra-wide desktops.

---

## 📁 Project Structure

```text
Bloom-Beauty-Studio/
├── assets/
│   └── images/       # High-resolution local gallery & studio photography
├── index.html        # Semantic HTML5 markup with accessible structures
├── style.css         # Custom responsive CSS with CSS tokens and animations
├── script.js         # Pure Vanilla JavaScript controller
└── README.md         # Documentation & preview guide
```

---

## ✨ Features Included

1. **Top Announcement Bar**: Highlights studio news with a clear sample demo badge.
2. **Sticky Header & Scroll Spy**:
   - Frosted glass backdrop blur upon scrolling.
   - Automatically highlights active navigation links as you scroll past sections.
3. **Mobile Drawer Navigation**:
   - Animated hamburger toggle transforming into an 'X'.
   - Touch-friendly slide-down drawer with studio hours and quick booking button.
   - Closes automatically on navigation, overlay click, or `Escape` key press.
4. **Hero Section**:
   - High-impact editorial headline, descriptive lead, and dual CTA buttons.
   - Floating luxury recognition badge and studio stats counter.
5. **About Atelier**:
   - Asymmetric layered photography stack with an 8+ years experience badge.
   - 3 core value pillars: *Clean Formulations*, *Custom Consultations*, and *Private Sanctuary*.
   - Founder quote and attribution.
6. **Signature Services Menu**:
   - 6 service cards (*Artisan Balayage*, *Cellular Facial*, *Cashmere Nail Couture*, *Lash & Brow*, *Aromatherapy Ritual*, and *Bridal Artistry*).
   - Dynamic **"Select & Book"** buttons that smoothly scroll to the contact form and automatically preselect the chosen service in the dropdown!
7. **Visual Gallery with Category Filtering & Lightbox**:
   - Filter tabs: *All Works*, *Hair Couture*, *Skin & Spa*, *Nail Art*, *Studio Ambience*.
   - Interactive high-resolution **Lightbox Modal** with image preview, category badge, and description.
8. **Customer Testimonials**:
   - Prominent sample notice clarifying all quotes are fictional examples for layout demonstration.
   - Star ratings, client portraits, and service tags.
9. **Contact & Booking Section**:
   - Fictional studio address, direct phone line, concierge email, and opening hours.
   - **Front-End Form Validation**: Validates full name, email format, telephone number, service selection, and date (preventing past dates).
   - **Preview Confirmation Modal**: Displays a formatted summary of user input upon valid submission.
   - **Front-End Notice**: Clearly indicates that no server request was made.
10. **Site Footer**:
    - Fictional business notice, quick links, service anchors, social media links, and interactive newsletter subscription demo.
11. **Back-to-Top Button**: Smooth floating button that appears after scrolling down.

---

## 🚀 How to Preview the Website Locally

You can preview this website locally using any of the following simple methods:

### Method 1: Direct Double-Click (Easiest — No Server Required)
Because this project uses standard HTML5, CSS3, Vanilla JS, and CDN-hosted fonts/icons/images:
1. Open your Windows File Explorer.
2. Navigate to: `c:\Users\Acer\Documents\Bloom-Beauty-Studio`
3. Double-click **`index.html`** (or right-click → **Open with** → your preferred browser such as Google Chrome, Edge, or Firefox).

---

### Method 2: Python Built-In Local Server
Since Python is installed on your computer, you can run a local development server:
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd c:\Users\Acer\Documents\Bloom-Beauty-Studio
   ```
2. Start the Python HTTP server:
   ```powershell
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   [http://localhost:8000](http://localhost:8000)
4. Press `Ctrl + C` in the terminal when you wish to stop the server.

---

### Method 3: VS Code Live Server (If using VS Code)
1. Open the `Bloom-Beauty-Studio` folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and choose **"Open with Live Server"** (or click **Go Live** at the bottom right).

---

## ✉️ Connecting the Contact Form to a Real Email Service

Currently, the contact form validates all fields strictly in the browser (**front end only**) and presents a simulated confirmation modal.

To transmit submitted inquiries to a real inbox in production, choose one of the proven approaches below:

### Option A: Formspree or Web3Forms (No Backend Required, Easiest)
Services like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) provide a submission endpoint.

1. Create a free account at Formspree and create a new form to obtain your Form ID (e.g., `xpznkydb`).
2. Update the `<form>` opening tag in `index.html`:
   ```html
   <form id="bookingForm" class="booking-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. In `script.js`, after the validation passes, submit the form via `fetch`:
   ```javascript
   const formData = new FormData(bookingForm);
   fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     body: formData,
     headers: { 'Accept': 'application/json' }
   }).then(response => {
     if (response.ok) {
       openSuccessModal(submissionDetails);
       bookingForm.reset();
     } else {
       alert("Something went wrong. Please try again.");
     }
   });
   ```

---

### Option B: EmailJS (Direct Email Dispatch from JavaScript)
[EmailJS](https://www.emailjs.com/) lets you dispatch emails via client-side JavaScript through SendGrid, Gmail, Mailgun, etc.

1. Add the EmailJS SDK to `index.html` inside `<head>`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script type="text/javascript">
      emailjs.init("YOUR_PUBLIC_KEY");
   </script>
   ```
2. In `script.js`, once form validation succeeds:
   ```javascript
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
     from_name: nameVal,
     reply_to: emailVal,
     phone_number: phoneVal,
     service_name: serviceVal,
     booking_date: dateVal,
     booking_time: preferredTime.value,
     special_notes: notes.value
   }).then(() => {
     openSuccessModal(submissionDetails);
     bookingForm.reset();
   });
   ```

---

### Option C: Custom Backend (Node.js / Express, Python Flask/FastAPI, or PHP)
For maximum control, privacy, and CRM database integration:
1. Create a server endpoint (e.g. `POST /api/bookings`).
2. Verify incoming request data and sanitise inputs on the server.
3. Use a transactional email API such as **Resend**, **SendGrid**, or **NodeMailer (SMTP)**:
   ```javascript
   // Sample Node.js / Resend route
   import { Resend } from 'resend';
   const resend = new Resend('re_123456789');

   app.post('/api/bookings', async (req, res) => {
     const { name, email, phone, service, date, time, notes } = req.body;
     await resend.emails.send({
       from: 'concierge@yourdomain.com',
       to: 'salon-owner@yourdomain.com',
       subject: `New Booking Request: ${service} for ${name}`,
       html: `<p><strong>Client:</strong> ${name} (${email}, ${phone})</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Date & Time:</strong> ${date} at ${time}</p>
              <p><strong>Notes:</strong> ${notes}</p>`
     });
     res.status(200).json({ status: 'success' });
   });
   ```

---

## 🔒 Sample Data & Attribution Notice

- **Business Entity**: Bloom Beauty Studio is a **fictional concept** created solely for design demonstration and portfolio presentation.
- **Client Testimonials**: All client reviews and portraits are fictional demo placeholders.
- **Photography**: All images are high-resolution, royalty-free photography sourced via [Unsplash](https://unsplash.com) with standard permissible licenses.
- **Icons**: [Font Awesome](https://fontawesome.com) free icon library.
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Cormorant Garamond` and `Plus Jakarta Sans`).
