let is24HourFormat = false; // default to 12-hour format

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = now.getSeconds();
    let secondsStr = String(seconds).padStart(2, '0');
    let ampm = "";

    if (!is24HourFormat) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    } else {
        hours = String(hours).padStart(2, '0');
    }

    document.getElementById("clock").innerText = 
        `${hours}:${minutes}:${secondsStr} ${!is24HourFormat ? ampm : ""}`;

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

    let dayName = days[now.getDay()];
    let day = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    document.getElementById("date").innerText = `${dayName}, ${day} ${month} ${year}`;

    let circleLength = 565.48;
    let offset = circleLength - (seconds / 60) * circleLength;
    document.getElementById("secondsRing").style.strokeDashoffset = offset;
}

document.getElementById("toggleFormat").addEventListener("click", () => {
    let clockEl = document.getElementById("clock");
    clockEl.style.opacity = 0;
    setTimeout(() => {
        is24HourFormat = !is24HourFormat;
        document.getElementById("toggleFormat").innerText = 
            is24HourFormat ? "Switch to 12-Hour" : "Switch to 24-Hour";
        updateClock();
        clockEl.style.opacity = 1;
    }, 400);
});

setInterval(updateClock, 1000);
updateClock();

/* 🛡 Prevent right-click */
document.addEventListener("contextmenu", event => event.preventDefault());

/* 🛡 Block DevTools & View Source shortcuts */
document.addEventListener("keydown", function(event) {
    if (
        event.key === "F12" || // DevTools
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") || // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") || // Ctrl+Shift+J
        (event.ctrlKey && event.key.toLowerCase() === "u") || // Ctrl+U
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") // Ctrl+Shift+C
    ) {
        event.preventDefault();
        alert("🚫 Action disabled!");
    }
});
