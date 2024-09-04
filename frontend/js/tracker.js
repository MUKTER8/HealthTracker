function filterDiseases() {
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
        .map(checkbox => checkbox.value);

    document.querySelectorAll('.disease-item').forEach(item => {
        const diseaseSymptoms = item.dataset.symptoms.split(',');

        item.style.display = selectedSymptoms.every(symptom => diseaseSymptoms.includes(symptom))
            ? 'block'
            : 'none';
    });
}
