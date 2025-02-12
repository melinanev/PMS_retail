// Default settings
const defaultSettings = {
    companyName: 'Critters Pet Shop of South Elgin',
    companyAddress: '',
    companyPhone: '',
    hours: {
        weekday: { open: '09:00', close: '18:00' },
        saturday: { open: '10:00', close: '16:00' },
        sunday: { open: '11:00', close: '15:00' }
    },
    lowStockThreshold: 10,
    emailNotifications: true,
    autoBackup: true,
    taxRate: 8.25
};

// Load settings from localStorage or use defaults
function loadSettings() {
    const savedSettings = localStorage.getItem('storeSettings');
    const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    
    // Populate form fields
    document.getElementById('company-name').value = settings.companyName;
    document.getElementById('company-address').value = settings.companyAddress;
    document.getElementById('company-phone').value = settings.companyPhone;
    
    document.getElementById('weekday-open').value = settings.hours.weekday.open;
    document.getElementById('weekday-close').value = settings.hours.weekday.close;
    document.getElementById('saturday-open').value = settings.hours.saturday.open;
    document.getElementById('saturday-close').value = settings.hours.saturday.close;
    document.getElementById('sunday-open').value = settings.hours.sunday.open;
    document.getElementById('sunday-close').value = settings.hours.sunday.close;
    
    document.getElementById('low-stock-threshold').value = settings.lowStockThreshold;
    document.getElementById('email-notifications').checked = settings.emailNotifications;
    document.getElementById('auto-backup').checked = settings.autoBackup;
    document.getElementById('tax-rate').value = settings.taxRate;
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        companyName: document.getElementById('company-name').value,
        companyAddress: document.getElementById('company-address').value,
        companyPhone: document.getElementById('company-phone').value,
        hours: {
            weekday: {
                open: document.getElementById('weekday-open').value,
                close: document.getElementById('weekday-close').value
            },
            saturday: {
                open: document.getElementById('saturday-open').value,
                close: document.getElementById('saturday-close').value
            },
            sunday: {
                open: document.getElementById('sunday-open').value,
                close: document.getElementById('sunday-close').value
            }
        },
        lowStockThreshold: document.getElementById('low-stock-threshold').value,
        emailNotifications: document.getElementById('email-notifications').checked,
        autoBackup: document.getElementById('auto-backup').checked,
        taxRate: document.getElementById('tax-rate').value
    };
    
    localStorage.setItem('storeSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!');
}

// Reset settings to defaults
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        localStorage.removeItem('storeSettings');
        loadSettings();
        showNotification('Settings reset to defaults!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.getElementById('current-datetime').textContent = dateTimeString;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    document.getElementById('reset-settings').addEventListener('click', resetSettings);
    
    // Add validation for numeric inputs
    document.getElementById('low-stock-threshold').addEventListener('input', (e) => {
        if (e.target.value < 0) e.target.value = 0;
    });
    
    document.getElementById('tax-rate').addEventListener('input', (e) => {
        if (e.target.value < 0) e.target.value = 0;
        if (e.target.value > 100) e.target.value = 100;
    });
});
