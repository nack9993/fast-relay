class LuckyDrawPicker {
    constructor() {
        this.names = [];
        this.isPicking = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.nameInput = document.getElementById('nameInput');
        this.addNameBtn = document.getElementById('addNameBtn');
        this.bulkInput = document.getElementById('bulkInput');
        this.addBulkBtn = document.getElementById('addBulkBtn');
        this.namesList = document.getElementById('namesList');
        this.nameCount = document.getElementById('nameCount');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.pickerDisplay = document.getElementById('pickerDisplay');
        this.pickBtn = document.getElementById('pickBtn');
        this.resultSection = document.getElementById('resultSection');
        this.winnerName = document.getElementById('winnerName');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
    }
    
    bindEvents() {
        this.addNameBtn.addEventListener('click', () => this.addName());
        this.addBulkBtn.addEventListener('click', () => this.addBulkNames());
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addName();
        });
        this.clearAllBtn.addEventListener('click', () => this.clearAllNames());
        this.pickBtn.addEventListener('click', () => this.pickRandomWinner());
        this.resultSection.addEventListener('click', () => this.hideResult());
        
        // Tab switching
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        
        // Real-time input validation
        this.nameInput.addEventListener('input', () => {
            this.validateInput();
        });
        
        this.bulkInput.addEventListener('input', () => {
            this.validateBulkInput();
        });
    }
    
    switchTab(tabName) {
        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update tab contents
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });
    }
    
    validateInput() {
        const name = this.nameInput.value.trim();
        const isValid = name.length > 0 && name.length <= 50 && !this.names.includes(name);
        this.addNameBtn.disabled = !isValid || this.names.length >= 100;
    }
    
    validateBulkInput() {
        const bulkText = this.bulkInput.value.trim();
        const names = this.parseBulkInput(bulkText);
        const validNames = names.filter(name => name.length > 0 && name.length <= 50);
        const newNames = validNames.filter(name => !this.names.includes(name));
        const canAdd = newNames.length > 0 && (this.names.length + newNames.length) <= 100;
        this.addBulkBtn.disabled = !canAdd;
    }
    
    parseBulkInput(text) {
        if (!text) return [];
        
        // Split by commas, semicolons, or newlines
        const names = text.split(/[,;\n]/)
            .map(name => name.trim())
            .filter(name => name.length > 0);
        
        return names;
    }
    
    addBulkNames() {
        const bulkText = this.bulkInput.value.trim();
        const names = this.parseBulkInput(bulkText);
        
        if (names.length === 0) {
            this.showNotification('Please enter some names!', 'error');
            return;
        }
        
        const validNames = names.filter(name => name.length > 0 && name.length <= 50);
        const newNames = validNames.filter(name => !this.names.includes(name));
        const duplicates = validNames.filter(name => this.names.includes(name));
        const tooLong = names.filter(name => name.length > 50);
        
        if (this.names.length + newNames.length > 100) {
            this.showNotification(`Cannot add all names. Maximum is 100 total participants.`, 'error');
            return;
        }
        
        if (newNames.length === 0) {
            this.showNotification('All names are already in the list!', 'error');
            return;
        }
        
        // Add valid new names
        this.names.push(...newNames);
        this.bulkInput.value = '';
        this.updateDisplay();
        
        // Show result notification
        let message = `Added ${newNames.length} name${newNames.length > 1 ? 's' : ''}!`;
        if (duplicates.length > 0) {
            message += ` (${duplicates.length} duplicate${duplicates.length > 1 ? 's' : ''} skipped)`;
        }
        if (tooLong.length > 0) {
            message += ` (${tooLong.length} name${tooLong.length > 1 ? 's' : ''} too long)`;
        }
        
        this.showNotification(message, 'success');
    }
    
    addName() {
        const name = this.nameInput.value.trim();
        
        if (!name) {
            this.showNotification('Please enter a name!', 'error');
            return;
        }
        
        if (name.length > 50) {
            this.showNotification('Name too long! (max 50 characters)', 'error');
            return;
        }
        
        if (this.names.includes(name)) {
            this.showNotification('Name already exists!', 'error');
            return;
        }
        
        if (this.names.length >= 100) {
            this.showNotification('Maximum 100 names allowed!', 'error');
            return;
        }
        
        this.names.push(name);
        this.nameInput.value = '';
        this.updateDisplay();
        this.showNotification(`${name} added successfully!`, 'success');
    }
    
    removeName(name) {
        const index = this.names.indexOf(name);
        if (index > -1) {
            this.names.splice(index, 1);
            this.updateDisplay();
            this.showNotification(`${name} removed!`, 'info');
        }
    }
    
    clearAllNames() {
        if (this.names.length === 0) {
            this.showNotification('No names to clear!', 'info');
            return;
        }
        
        this.names = [];
        this.updateDisplay();
        this.showNotification('All names cleared!', 'info');
    }
    
    updateDisplay() {
        this.nameCount.textContent = this.names.length;
        this.namesList.innerHTML = '';
        
        this.names.forEach((name, index) => {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.style.animationDelay = `${index * 0.1}s`;
            nameItem.innerHTML = `
                <span>${name}</span>
                <button class="remove-btn" onclick="luckyDraw.removeName('${name}')">Remove</button>
            `;
            this.namesList.appendChild(nameItem);
        });
        
        this.pickBtn.disabled = this.names.length < 2;
        this.validateInput();
        this.validateBulkInput();
        
        // Update picker display
        this.updatePickerDisplay();
    }
    
    updatePickerDisplay() {
        const pickerIcon = this.pickerDisplay.querySelector('.picker-icon');
        const pickerText = this.pickerDisplay.querySelector('.picker-text');
        
        if (this.names.length === 0) {
            pickerIcon.textContent = '📝';
            pickerText.textContent = 'Add some names to get started!';
        } else if (this.names.length === 1) {
            pickerIcon.textContent = '➕';
            pickerText.textContent = 'Add at least 2 names to pick!';
        } else {
            pickerIcon.textContent = '🎲';
            pickerText.textContent = `Ready to pick from ${this.names.length} participants!`;
        }
    }
    
    async pickRandomWinner() {
        if (this.isPicking || this.names.length < 2) return;
        
        this.isPicking = true;
        this.pickBtn.disabled = true;
        this.pickBtn.classList.add('picking');
        
        const pickerIcon = this.pickerDisplay.querySelector('.picker-icon');
        const pickerText = this.pickerDisplay.querySelector('.picker-text');
        
        // Show picking animation
        pickerIcon.textContent = '🎯';
        pickerText.textContent = 'Picking random winner...';
        
        // Simulate picking process with random name cycling
        const pickingDuration = 2000; // 2 seconds
        const cycleInterval = 100; // Change name every 100ms
        let currentIndex = 0;
        
        const cycleNames = () => {
            if (currentIndex >= this.names.length) currentIndex = 0;
            pickerText.textContent = `Picking... ${this.names[currentIndex]}`;
            currentIndex++;
        };
        
        const cycleTimer = setInterval(cycleNames, cycleInterval);
        
        // After animation, show the winner
        setTimeout(() => {
            clearInterval(cycleTimer);
            
            // Pick random winner
            const randomIndex = Math.floor(Math.random() * this.names.length);
            const winner = this.names[randomIndex];
            
            // Reset picker display
            pickerIcon.textContent = '🎲';
            pickerText.textContent = `Ready to pick from ${this.names.length} participants!`;
            
            // Show winner
            this.showWinner(winner);
            
            this.isPicking = false;
            this.pickBtn.disabled = this.names.length < 2;
            this.pickBtn.classList.remove('picking');
        }, pickingDuration);
    }
    
    showWinner(winner) {
        this.winnerName.textContent = winner;
        this.resultSection.classList.remove('hidden');
        this.createFireworks();
        this.playWinnerSound();
    }
    
    hideResult() {
        this.resultSection.classList.add('hidden');
    }
    
    createFireworks() {
        const fireworks = document.querySelector('.fireworks');
        fireworks.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.animationDelay = Math.random() * 2 + 's';
            
            const colors = ['#ff6b35', '#f7931e', '#ffab40', '#ff7043', '#e91e63', '#9c27b0'];
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            fireworks.appendChild(firework);
        }
    }
    
    playWinnerSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Fallback for browsers that don't support Web Audio API
            console.log('🎉 Winner sound played!');
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize the app
const luckyDraw = new LuckyDrawPicker();

// Notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        font-family: 'Anton', sans-serif;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #4caf50, #45a049);
        border: 1px solid #4caf50;
    }
    
    .notification.error {
        background: linear-gradient(135deg, #f44336, #da190b);
        border: 1px solid #f44336;
    }
    
    .notification.info {
        background: linear-gradient(135deg, #2196f3, #1976d2);
        border: 1px solid #2196f3;
    }
`;

// Add notification styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 