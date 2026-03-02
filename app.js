const API_URL = "https://user-management-api-4579.onrender.com/api/users";
      const userForm = document.getElementById("userForm");
      const userTable = document.getElementById("userTable");

      let editingId = null;

      async function fetchUsers() {
        const res = await fetch(API_URL);
        const users = await res.json();
        renderUsers(users);
      }

      function renderUsers(users) {
        userTable.innerHTML = "";
        users.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td>${user.userId}</td>
      <td>${user.first_name} ${user.last_name}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.job_title}</td>
      <td class="actions">
        <button class="btn-edit" onclick="editUser(${user.userId})">Edit</button>
        <button class="btn-danger" onclick="deleteUser(${user.userId})">Delete</button>
      </td>
    `;
          userTable.appendChild(row);
        });
      }

      userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
          gender: gender.value,
          job_title: job_title.value,
        };

        if (editingId) {
          await fetch(`${API_URL}/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
          editingId = null;
        } else {
          await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
        }

        userForm.reset();
        fetchUsers();
      });

      async function deleteUser(id) {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        fetchUsers();
      }

      async function editUser(id) {
        const res = await fetch(`${API_URL}/${id}`);
        const user = await res.json();

        first_name.value = user.first_name;
        last_name.value = user.last_name;
        email.value = user.email;
        gender.value = user.gender;
        job_title.value = user.job_title;

        editingId = id;
      }

      fetchUsers();