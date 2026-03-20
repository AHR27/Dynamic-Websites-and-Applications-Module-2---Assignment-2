console.log("Script is running");

let allEmployees = [];

async function fetchEmployees() {
    try {
        const response = await fetch("employees.json");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        allEmployees = data.employees;

        allEmployees.sort((a, b) => a.age - b.age);

        displayEmployees(allEmployees);

        const totalSalary = allEmployees.reduce((total, emp) => total + emp.salary, 0);
        document.getElementById("totalSalary").textContent = `$${totalSalary}`;

        const highEarners = allEmployees.filter(emp => emp.salary > 55000);
        const list = document.getElementById("highEarners");

        list.innerHTML = "";

        highEarners.forEach(emp => {
            let li = document.createElement("li");
            li.textContent = `${emp.firstName} ${emp.lastName}`;
            list.appendChild(li);
        });

        localStorage.setItem("employees", JSON.stringify(allEmployees));

    } catch (error) {
        console.error(error);
        document.getElementById("demo").textContent = "Error loading data.";
    }
}

function displayEmployees(employees) {
    const demoDiv = document.getElementById("demo");
    demoDiv.innerHTML = "";

    let ul = document.createElement("ul");

    employees.forEach(emp => {
        let li = document.createElement("li");
        li.textContent = `${emp.firstName} ${emp.lastName} - Age: ${emp.age} - $${emp.salary}`;
        ul.appendChild(li);
    });

    demoDiv.appendChild(ul);
}

function testLocalStorage() {
    const output = document.getElementById("storageData");

    const data = localStorage.getItem("employees");

    if (data) {
        output.textContent = data;
    } else {
        output.textContent = "No data in localStorage.";
    }

    setTimeout(() => {
        localStorage.removeItem("employees");
        console.log("employees removed");

        output.textContent += "\n\nData removed from localStorage.";
    }, 3000);

    setTimeout(() => {
        localStorage.clear();
        console.log("localStorage cleared");
    }, 5000);
}



document.getElementById("searchBar").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();

    const filteredEmployees = allEmployees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        return fullName.includes(searchValue);
    });

    displayEmployees(filteredEmployees);
});

fetchEmployees();