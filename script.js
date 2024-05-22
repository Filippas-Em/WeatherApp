
function updateDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    const dateElement = document.getElementById('date');
    dateElement.innerHTML = `${day}/${month}/${year}  ${time}`;
}
updateDate();
setInterval(updateDate, 1000);