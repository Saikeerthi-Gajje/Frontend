async function fetchGitHubUser() {
    const username = document.getElementById("username").value;
    const output = document.getElementById("output");

    
    output.innerHTML = "";

    if (!username) {
        output.innerHTML = "<p>Please enter a username!</p>";
        return;
    }

    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("User not found");
        }
        const data = await response.json();

        // Create a card to display the user info
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login}'s avatar">
        <h3>${data.name || "Name not available"}</h3>
        <p><strong>Username:</strong> ${data.login}</p>
        <p><strong>Location:</strong> ${data.location || "Not available"}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Following:</strong> ${data.following}</p>
      `;

        output.appendChild(card);
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}