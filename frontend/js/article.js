const healthArticlesData = {
    articles: [
        {
            title: "Cancer",
            content: "Cancer viruses, or oncoviruses, are viruses that can cause cancer. They integrate their genetic material into host cells, potentially leading to uncontrolled cell growth. Examples: Notable oncoviruses include Human Papillomavirus (HPV), linked to cervical cancer; Hepatitis B and C viruses, associated with liver cancer; and Epstein-Barr virus (EBV), which can cause various lymphomas. Mechanism: These viruses alter host cell behavior by introducing oncogenes or disrupting tumor suppressor genes, leading to malignant transformations. Preventive vaccines and antiviral treatments can reduce the risk of virus-induced cancers.",
            disease: "cancer",
            link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7311565/, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5980651/, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6980677/"
        },
        {
            title: "Heart Attack",
            content: "A heart attack, or myocardial infarction, occurs when blood flow to a part of the heart muscle is blocked for a prolonged period. This interruption damages or destroys part of the heart muscle. Common causes include coronary artery disease, blood clots, or plaque buildup in the arteries. Risk factors involve high blood pressure, smoking, high cholesterol, and diabetes. Symptoms may include chest pain, shortness of breath, and nausea. Immediate treatment often involves medications, lifestyle changes, and possibly procedures like angioplasty to restore blood flow and prevent further damage.",
            disease: "heart attack",
            link: "https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20363105, https://www.heart.org/en/health-topics/heart-attack, https://www.webmd.com/heart-disease/heart-attack"
        },
        {
            title: "Managing Diabetes",
            content: "Diabetes is a chronic condition where the body either cannot produce insulin (Type 1) or cannot use it effectively (Type 2). It leads to high blood sugar levels, causing symptoms like excessive thirst and frequent urination. Type 1 requires insulin therapy, while Type 2 can often be managed with lifestyle changes. Gestational diabetes occurs during pregnancy but usually resolves afterward. Proper management is essential to prevent complications such as heart disease and nerve damage.",
            disease: "diabetes",
            link: "https://www.niddk.nih.gov/health-information/diabetes, https://www.mayoclinic.org/diseases-conditions/diabetes/symptoms-causes/syc-20320675"
        },
        {
            title: "Coronavirus Overview",
            content: "Coronavirus, also known as SARS-CoV-2, is a novel virus that emerged in late 2019, causing the global COVID-19 pandemic. It primarily affects the respiratory system and is highly contagious. The virus has led to widespread illness, hospitalizations, and significant fatalities worldwide. Governments implemented measures like lockdowns, mask mandates, and vaccination campaigns to control its spread. Though vaccines have reduced severe cases, variants continue to pose challenges. Ongoing research and public health efforts are crucial in managing and eventually overcoming the pandemic.",
            disease: "coronavirus",
            link: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019, https://www.bbc.com/news/coronavirus, https://www.nytimes.com/news-event/coronavirus"
        },
        {
            title: "Monkeypox",
            content: "Mpox, formerly known as monkeypox, is a zoonotic virus primarily found in Central and West Africa. It's similar to smallpox but generally less severe. The virus spreads through direct contact with infected animals, people, or contaminated materials. Initial symptoms include fever, headache, muscle aches, and swollen lymph nodes, followed by a rash that progresses to pustules. The illness typically lasts 2-4 weeks. Prevention and Treatment: Preventive measures include avoiding contact with infected animals and practicing good hygiene. Vaccines like Jynneos are available, and treatment focuses on managing symptoms, with antiviral drugs used in severe cases.",
            disease: "monkeypox",
            link: "https://www.who.int/news-room/fact-sheets/detail/monkeypox, https://www.hopkinsmedicine.org/health/conditions-and-diseases/monkeypox"
        },
        {
            title: "Flue",
            content: "The flu virus, or influenza virus, causes seasonal flu outbreaks. It has three main types: A, B, and C. Type A and B cause the majority of seasonal flu cases, while Type C is less common and usually causes mild illness. The flu spreads through respiratory droplets when an infected person coughs or sneezes. It can also spread by touching surfaces contaminated with the virus and then touching the face. Common symptoms include fever, cough, sore throat, and body aches. Annual vaccination and good hygiene practices, like handwashing, are key to preventing flu infections.",
            disease: "flue",
            link: "https://www.who.int/health-topics/influenza, https://www.mayoclinic.org/diseases-conditions/flu/symptoms-causes/syc-20351755"
        }
    ],

    searchArticles: function() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const resultsBox = document.getElementById('resultsBox');
        resultsBox.innerHTML = ''; // Clear previous results

        if (!searchTerm) {
            resultsBox.innerHTML = '<p><b>Information Not Found</b></p>';
            return;
        }

        const filteredArticles = this.articles.filter(article => 
            article.disease && article.disease.toLowerCase().includes(searchTerm)
        );

        if (filteredArticles.length > 0) {
            filteredArticles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                const title = document.createElement('h3');
                title.textContent = article.title;

                const content = document.createElement('p');
                content.textContent = article.content;

                // Append title and content first
                articleDiv.appendChild(title);
                articleDiv.appendChild(content);

                // Handling multiple links and appending them last
                const links = article.link.split(', ');
                links.forEach(url => {
                    const linkElement = document.createElement('a');
                    linkElement.href = url.trim();
                    linkElement.textContent = url.trim();
                    linkElement.target = "_blank"; // Opens link in a new tab
                    articleDiv.appendChild(linkElement);
                    articleDiv.appendChild(document.createElement('br')); // Adds a line break
                });

                resultsBox.appendChild(articleDiv);
            });
        } else {
            resultsBox.innerHTML = '<p>No articles found for the given disease.</p>';
        }
    },

    handleKeyPress: function(event) {
        if (event.key === 'Enter') {
            this.searchArticles();
        }
    }
};

// Event listeners for searching articles
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    healthArticlesData.handleKeyPress(event);
});

document.querySelector('.find_bt').addEventListener('click', function() {
    healthArticlesData.searchArticles();
});
