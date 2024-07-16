document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patientForm');
    const barcodeContainer = document.getElementById('barcodeContainer');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const bloodType = document.getElementById('bloodType').value;
            const bloodNumber = document.getElementById('bloodNumber').value;
            const patientId = document.getElementById('patientId').value;

            const patientData = {
                name: name,
                age: age,
                bloodType: bloodType,
                bloodNumber: bloodNumber,
                patientId: patientId
            };

            const barcodeData = JSON.stringify(patientData);
            console.log("Barcode data:", barcodeData);

            // Create the img element
            const barcodeElement = document.createElement('img');
            barcodeElement.id = 'barcode';

            // Clear previous barcode (if any) and add the new one
            barcodeContainer.innerHTML = '';
            barcodeContainer.appendChild(barcodeElement);

            // Generate barcode
            JsBarcode("#barcode", barcodeData, {
                format: "CODE128",
                width: 2,
                height: 100,
                displayValue: true
            });

            // Store the barcode data in localStorage
            localStorage.setItem('barcodeData', barcodeData);
        });
    }

    const patientDataContainer = document.getElementById('patientData');
    if (patientDataContainer) {
        // Retrieve the barcode data from localStorage
        const barcodeData = localStorage.getItem('barcodeData');

        if (barcodeData) {
            const patientData = JSON.parse(barcodeData);
            patientDataContainer.innerHTML = `
                <p><strong>Name:</strong> ${patientData.name}</p>
                <p><strong>Age:</strong> ${patientData.age}</p>
                <p><strong>Blood Type:</strong> ${patientData.bloodType}</p>
                <p><strong>Blood Number:</strong> ${patientData.bloodNumber}</p>
                <p><strong>Patient ID:</strong> ${patientData.patientId}</p>
            `;
        } else {
            patientDataContainer.innerHTML = '<p>No patient data found.</p>';
        }
    }
});