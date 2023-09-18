// app.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("queryForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const birthYear = document.getElementById("birthYear").value;
        const birthMonth = document.getElementById("birthMonth").value;
        const birthday = document.getElementById("birthday").value;

        // Make an AJAX request to the server
        try {
            const response = await fetch(`/query?name=${name}&birthYear=${birthYear}&birthMonth=${birthMonth}&birthday=${birthday}`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Display the query results
            queryResult.innerHTML = "<h2>Query Results</h2>";
            queryResult.innerHTML += `<p>Name: ${data.name}</p>`;
            queryResult.innerHTML += `<p>Birth Year: ${data.birthYear}</p>`;
            queryResult.innerHTML += `<p>Birth Month: ${data.birthMonth}</p>`;
            queryResult.innerHTML += `<p>Birthday: ${data.birthday}</p>`;

        } catch (error) {
            console.error(error);
            queryResult.innerHTML = "<p>An error occurred. Please try again.</p>";
        }
    });

    generatePdfButton.addEventListener("click", () => {
        // Add code for PDF generation here (using jsPDF or another library)
        // You'll need to generate the PDF on the client-side or make a request to a server for PDF generation.
    });
});
