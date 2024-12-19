document.addEventListener('DOMContentLoaded', function() {
    // Form elementen
    const form = document.getElementById('multiStepForm');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const stepCircles = document.querySelectorAll('.step-circle');
    let currentStep = 0;

    // Stap navigatie functies
    function updateStep() {
        steps.forEach((step, index) => {
            if(index === currentStep) {
                step.classList.add('active');
                stepCircles[index]?.classList.add('active');
            } else {
                step.classList.remove('active');
                stepCircles[index]?.classList.remove('active');
            }
        });
    }

    function goToNextStep() {
        if(currentStep < steps.length - 1) {
            if(validateCurrentStep()) {
                currentStep++;
                updateStep();
            }
        }
    }

    function goToPrevStep() {
        if(currentStep > 0) {
            currentStep--;
            updateStep();
        }
    }

    // Validatie functie
    function validateCurrentStep() {
        const currentStepElement = steps[currentStep];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if(!field.value) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    // Event listeners voor navigatie
    nextButtons.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevStep);
    });

    // Form submission
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if(validateCurrentStep()) {
                const formData = new FormData(form);
                const jsonData = {};

                // Land namen ophalen
                const countryFromSelect = document.getElementById('country_from');
                const countryToSelect = document.getElementById('country_to');
                
                formData.forEach((value, key) => {
                    if(key === 'country_from') {
                        jsonData[key] = countryFromSelect.options[countryFromSelect.selectedIndex]?.text || value;
                    } else if(key === 'country_to') {
                        jsonData[key] = countryToSelect.options[countryToSelect.selectedIndex]?.text || value;
                    } else {
                        jsonData[key] = value;
                    }
                });

                // URL informatie toevoegen
                jsonData.urlSource = window.location.hostname;
                jsonData.pageUrl = window.location.href;
                jsonData.referrerUrl = document.getElementById('referrerUrl')?.value || document.referrer || '';

                fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                .then(response => {
                    if(response.ok) {
                        window.location.href = '/gracias#typ';
                    } else {
                        throw new Error('Formulier verzenden mislukt');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Er is een fout opgetreden bij het verzenden van het formulier. Probeer het opnieuw.');
                });
            }
        });
    }
});
