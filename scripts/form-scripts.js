document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(form.querySelectorAll('.form-step'));
    const nextBtns = form.querySelectorAll('.next-step');
    const prevBtns = form.querySelectorAll('.prev-step');
    const indicators = Array.from(document.querySelectorAll('.wizard-circle'));
    let currentStep = 0;

    function updateStep() {
        steps.forEach(step => step.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        steps[currentStep].classList.add('active');
        indicators[currentStep].classList.add('active');

        // Update progress bar
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            if (index < currentStep) {
                bar.classList.add('progress-bar-active');
            } else {
                bar.classList.remove('progress-bar-active');
            }
        });
    }

    function goToNextStep() {
        const inputs = steps[currentStep].querySelectorAll('input, textarea, select');
        let valid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });

        if (valid) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStep();
            }
        }
    }

    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    }

    nextBtns.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });

    prevBtns.forEach(button => {
        button.addEventListener('click', goToPrevStep);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted successfully!');
    });

    updateStep(); // Initial update to set the first step as active
});
