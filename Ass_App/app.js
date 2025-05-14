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
  { name: 'Hayden Austin', role: 'Team Lead', bio: 'Just some dude' },
  { name: 'Ken Aspeling', role: 'Editor', bio: 'Refines content into clear, compelling final form.'},
  { name: 'Milienke Field', role: 'Organizer', bio: 'Plans flawlessly, ensuring smooth, unforgettable events.'},
  { name: 'Shivaan Boodhoo', role: 'DJ', bio: 'Energizes crowds with seamless beats and vibrant energy.'},
  { name: 'Ben Dover', role: 'Chair Management', bio: 'Chair'},
  { name: 'Mike Oxlong', role: 'Head Chef', bio: 'Cooks food and looks good'}
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
  },
  {
    title: 'Artificial Intelligence Workshop', 
    date: '2025-06-25', 
    location: 'Tech Hub', 
    image: '/images/ai.jpg',
    description: 'Learn the basics of AI development with a hands-on workshop'
  },
  {
    title: 'Q3 Check-In', 
    date: '2025-07-10', 
    location: 'City Hall', 
    image: '/images/meetup.jpg',
    description: 'Quarterly Check-In from the community to discuss local matters'
  },
  {
    title: 'Winter Festival', 
    date: '2025-12-10', 
    location: 'City Lake', 
    image: '/images/winter.jpg',
    description: 'Annual winter festival with ice cream, music, and water fights for all ages.'
  }
];

const contactSubmissions = [];

// Routes
// Home
app.get('/', (req, res) => {
  let upcomingEvents = [];

  //Adding all events for the current month

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  events.forEach((event) => {
    if ((event.date).slice(5,7) == currentMonth){
      upcomingEvents.push(event);
    }
  });

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