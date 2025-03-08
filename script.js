function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Masukkan tugas dulu!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Buat elemen list item
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Hapus</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
}

function toggleComplete(task) {
    task.parentElement.classList.toggle("completed");
}

function deleteTask(button) {
    button.parentElement.remove();
}
document.addEventListener("DOMContentLoaded", loadTasks); // Load data saat halaman dibuka

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Masukkan tugas dulu!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Hapus</button>
    `;

    taskList.appendChild(li);
    saveTasks(); // Simpan ke Local Storage
    taskInput.value = "";
}

function toggleComplete(task) {
    task.parentElement.classList.toggle("completed");
    saveTasks(); // Update data di Local Storage
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks(); // Update data di Local Storage
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan ke Local Storage
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(this)">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">Hapus</button>
        `;
        if (task.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}