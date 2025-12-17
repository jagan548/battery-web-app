async function predict() {
    const voltage = document.getElementById("voltage").value;
    const current = document.getElementById("current").value;
    const percentage = document.getElementById("percentage").value;

    if (!voltage || !current || !percentage) {
        alert("Please fill all input fields!");
        return;
    }

    try {
        // Make the API call
        const response = await fetch(
            "https://battery-sulfation-api.onrender.com/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    voltage: Number(voltage),
                    current: Number(current),
                    percentage: Number(percentage)
                })
            }
        );

        // Check if the API response is okay
        if (!response.ok) throw new Error("API response error");

        const data = await response.json();

        // Display the results
        document.getElementById("efficiency").innerText =
            "Efficiency: " + data.efficiency.toFixed(2) + "%";

        document.getElementById("sulfation").innerText =
            "Sulfation: " + data.sulfation.toFixed(2) + "%";

    } catch (error) {
        console.error(error);
        alert("Failed to fetch API. Check console for details.");
    }
}

