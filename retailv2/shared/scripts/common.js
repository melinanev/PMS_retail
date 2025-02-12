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
    
    const dateTimeElement = document.getElementById('current-datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Set page title
function setPageTitle() {
    const pagePath = window.location.pathname;
    const pageTitle = document.getElementById('page-title');
    
    if (pageTitle) {
        // Extract page name from path
        const pageName = pagePath.split('/').pop().split('.')[0];
        let title = '';
        
        switch(pageName.toLowerCase()) {
            case 'home':
                title = 'Home Page';
                break;
            case 'inventory':
                title = 'Inventory Management';
                break;
            case 'customers':
                title = 'Customer Management';
                break;
            case 'payroll':
                title = 'Payroll Management';
                break;
            case 'settings':
                title = 'System Settings';
                break;
            default:
                title = 'Portal';
        }
        
        pageTitle.textContent = title;
    }
}



