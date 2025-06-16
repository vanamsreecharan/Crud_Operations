// Handle user registration
document.getElementById("userForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    employeeid: document.getElementById("employeeid").value,
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email_id: document.getElementById("email_id").value,
    Address: document.getElementById("Address").value,
    DOB: document.getElementById("DOB").value,
    PhoneNumber: document.getElementById("PhoneNumber").value
  };

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
      alert("User created successfully!");
      document.getElementById("userForm").reset();
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    alert("Request failed: " + error.message);
  }
});

// Show view form
document.getElementById("viewBtn").addEventListener("click", () => {
  document.getElementById("viewForm").style.display = "block";
});

// Handle user view
document.getElementById("viewForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const employeeid = document.getElementById("view_employeeid").value;
  const email = document.getElementById("view_email_id").value;

  try {
    const response = await fetch(`http://localhost:3000/users?employeeid=${employeeid}&email_id=${email_id}`);
    const user = await response.json();

    if (!response.ok) {
      throw new Error(user.error || "User not found");
    }

    const userDetails = `
      <h3>User Details</h3>
      <p><strong>Employee ID:</strong> ${user.employeeid}</p>
      <p><strong>First Name:</strong> ${user.firstname}</p>
      <p><strong>Last Name:</strong> ${user.lastname}</p>
      <p><strong>Email:</strong> ${user.email_id}</p>
      <p><strong>Address:</strong> ${user.Address}</p>
      <p><strong>DOB:</strong> ${user.DOB}</p>
      <p><strong>Phone Number:</strong> ${user.PhoneNumber}</p>
    `;
    document.getElementById("userDetails").innerHTML = userDetails;
  } catch (error) {
    alert("Error: " + error.message);
  }
});
