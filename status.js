// status.js
function setStatus(newStatus) {
    // newStatus может быть: "online", "offline", "away"

    const headers = document.querySelectorAll('#header2 .status');
    
    headers.forEach(header => {
        // Меняем класс у h2
        header.className = `status ${newStatus}`;
        
        // Меняем текст статуса
        const textSpan = header.querySelector('.status-text');
        if (textSpan) {
            if (newStatus === 'online') textSpan.textContent = 'Online';
            else if (newStatus === 'offline') textSpan.textContent = 'Offline';
            else if (newStatus === 'away') textSpan.textContent = 'Away';
        }
        
        // Меняем цвет точки
        const dot = header.querySelector('.dot');
        if (dot) {
            if (newStatus === 'online') {
                dot.style.background = '#2ecc71';      // зелёный
            } else if (newStatus === 'offline') {
                dot.style.background = '#e74c3c';      // красный
            } else if (newStatus === 'away') {
                dot.style.background = '#f1c40f';      // жёлтый
            }
        }
    });
}

// Глобальная функция, чтобы можно было вызывать из консоли или кнопок
window.setStatus = setStatus;