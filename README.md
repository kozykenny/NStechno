# NS Techno Website

Professional website for NS Techno company, built with modern web technologies.

## Project Structure

```
NS Techno/
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript functionality
│   └── video/          # Video assets (optional)
└── README.md           # This file
```

## Features

- **Modern Hero Section**: Inspired by Buddynet design with video background, slider, and integrated news section
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Interactive Slider**: Auto-playing carousel with play/pause controls
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Contact Form**: Functional contact form with validation
- **Japanese Language**: Natural, professional Japanese content throughout

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (Vanilla JS)
- jQuery (for Slick Slider)
- Slick Carousel (for hero slider)

## Setup

1. Open `index.html` in a web browser
2. For development, use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## Customization

### Adding a Video Background

1. Place your video file in `assets/video/mainvisual.mp4`
2. Uncomment the video tag in `index.html`:
   ```html
   <video src="assets/video/mainvisual.mp4" muted autoplay loop playsinline></video>
   ```
3. Comment out or remove the placeholder div

### Updating Content

- Edit `index.html` to update text content
- Modify `assets/css/style.css` for styling changes
- Update `assets/js/main.js` for functionality changes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The website uses CDN links for jQuery and Slick Slider
- Placeholder images are used for slider items - replace with actual images
- Video background is optional and uses a gradient placeholder by default

## Future Enhancements

- Additional pages (About, Services detail, etc.)
- Image optimization
- SEO improvements
- Analytics integration
- Backend integration for contact form
