const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const teamMembers = [
  { name: 'John Doe', role: 'Developer', bio: 'Experienced web developer with focus on Node.js and Express.' },
  { name: 'Jane Smith', role: 'Designer', bio: 'Creative designer with a passion for user experience.' },
  { name: 'Hayden Austin', role: 'Roll 5', bio: 'Just some dude' }
];

const events = [
  { 
    title: 'Community Meetup', 
    date: '2025-05-15', 
    location: 'City Hall', 
    image: '/images/meetup.jpg',
    description: 'Join us for our monthly community meetup to discuss local initiatives.'
  },
  { 
    title: 'Web Development Workshop', 
    date: '2025-05-22', 
    location: 'Tech Hub', 
    image: '/images/workshop.jpg',
    description: 'Learn the basics of web development in this hands-on workshop.'
  },
  { 
    title: 'Summer Festival', 
    date: '2025-06-10', 
    location: 'Central Park', 
    image: '/images/festival.jpg',
    description: 'Annual summer festival with food, music, and activities for all ages.'
  }
];

const contactSubmissions = [];

// Routes
// Home
app.get('/', (req, res) => {
  const upcomingEvents = events.slice(0, 2);
  res.render('pages/index', { upcomingEvents });
});

// About page
app.get('/about', (req, res) => {
  res.render('pages/about', { teamMembers });
});

// Events page
app.get('/events', (req, res) => {
  res.render('pages/events', { events });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  contactSubmissions.push({ name, email, message, date: new Date() });
  res.redirect('/thankyou');
});

// Thank you page
app.get('/thankyou', (req, res) => {
  res.render('pages/thankyou');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});