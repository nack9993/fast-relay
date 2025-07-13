# 🎊 Lucky Draw Website

A beautiful and interactive lucky draw website with a spinning wheel to randomly select winners from a list of participants.

## Features

- 🎯 **Interactive Spinning Wheel**: Smooth animation with realistic physics
- 👥 **Flexible Name Input**: Add names individually or in bulk (comma/semicolon/newline separated)
- 📋 **Smart Validation**: Real-time validation with duplicate detection and length limits
- 🎨 **Beautiful Orange Theme**: Modern gradient design with smooth animations
- 🎉 **Winner Celebration**: Fireworks, confetti, and sound effects
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⌨️ **Keyboard Shortcuts**: Space to spin, Enter to add names, Escape to close results
- 🔊 **Audio Feedback**: Celebration sound when a winner is selected

## How to Use

### Adding Names
- **Single Name**: Use the "Single Name" tab to add names one by one
- **Bulk Input**: Use the "Bulk Input" tab to add multiple names at once:
  - Separate names with commas, semicolons, or new lines
  - Example: "John Doe, Jane Smith; Bob Johnson"
  - Copy and paste from spreadsheets or text files

### Managing Participants
1. **View List**: All added names appear in the participants section
2. **Remove Names**: Click the "Remove" button next to any name to delete it
3. **Clear All**: Use the "Clear All" button to remove all participants at once

### Running the Draw
1. **Spin the Wheel**: Click "SPIN THE WHEEL" when you have at least 2 participants
2. **View Winner**: The winner will be displayed with beautiful animations and effects

## Technical Details

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern styling with animations, gradients, and responsive design
- **JavaScript**: Object-oriented programming with smooth wheel mechanics
- **Web Audio API**: Dynamic sound generation for celebration effects
- **Touch Support**: Optimized for mobile devices

## File Structure

```
lucky_draw/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Usage Tips

- Names can be up to 50 characters long
- Duplicate names are automatically prevented and skipped
- The wheel automatically adjusts segment sizes based on the number of participants
- Click anywhere outside the winner popup to close it
- Use the spacebar as a quick shortcut to spin the wheel
- **Bulk Input**: Perfect for copying names from spreadsheets, email lists, or text files
- **Flexible Separators**: Use commas, semicolons, or new lines to separate names
- **Smart Processing**: Invalid names (too long or duplicates) are automatically filtered out

## Customization

The orange color theme can be easily customized by modifying the CSS variables in `styles.css`. The wheel colors are defined in the `wheelColors` array in `script.js`.

Enjoy your lucky draw events! 🎉 