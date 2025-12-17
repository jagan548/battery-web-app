async function predict() {

    const voltage = document.getElementById("voltage").value;
    const current = document.getElementById("current").value;
    const percentage = document.getElementById("percentage").value;

    if (!voltage || !current || !percentage) {
        alert("Please enter all values");
        return;
    }

    try {
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

        const data = await response.json();

        // 🔁 REVERSE DISPLAY (YOUR REQUIREMENT)
        const efficiency = 100 - data.efficiency;
        const sulfation = data.efficiency;

        document.getElementById("efficiency").innerText =
            "Efficiency: " + efficiency.toFixed(2) + "%";

        document.getElementById("sulfation").innerText =
            "Sulfation: " + sulfation.toFixed(2) + "%";

    } catch (error) {
        alert("API connection failed");
        console.error(error);
    }
}
