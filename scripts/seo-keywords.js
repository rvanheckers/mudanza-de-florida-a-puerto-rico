document.addEventListener("DOMContentLoaded", function() {
    const keywords = [
        'mudanza de florida a puerto rico',
        'mudanzas puerto rico',
        'costo de mudanza de puerto rico a florida',
        'mudanzas de florida a puerto rico',
        'mudanzas de puerto rico a florida',
        'companias de mudanza de florida a puerto rico'
    ];

    const keywordCounts = {};

    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = document.body.innerHTML.match(regex);
        keywordCounts[keyword] = matches ? matches.length : 0;
    });

    console.log('SEO Keywords Counting:', keywordCounts);

    // Optioneel: Plaats de resultaten in de HTML als je dat wilt
    const seoResultsDiv = document.createElement('div');
    seoResultsDiv.style.display = 'none';
    seoResultsDiv.innerHTML = `<!-- SEO keywords counting -->
    <!--
    ${Object.keys(keywordCounts).map(keyword => `${keyword}: ${keywordCounts[keyword]}`).join('\n')}
    -->`;
    document.body.appendChild(seoResultsDiv);
});
