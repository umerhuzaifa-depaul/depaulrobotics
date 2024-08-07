document.addEventListener("DOMContentLoaded", function() {
    // Fetch news
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            console.log("News data:", data);
            const newsList = document.getElementById('news-list');
            data.news.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<p>${item}</p>`;
                newsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching news:', error));

    // Fetch publications
    fetch('publications.json')
        .then(response => response.json())
        .then(data => {
            console.log("Publications data:", data);
            const publicationsList = document.getElementById('publications-list');
            data.publications.forEach(pub => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
          <div class="row">
            <div class="col-2">
              <a href="publication.html?id=${pub.id}">
                <div class="card-image">
                  <img loading="lazy" decoding="async" src="${pub.image}" alt="Post Thumbnail" class="w-100">
                </div>
              </a>
            </div>
            <div class="col-10">
              <h3>${pub.title}</h3>
              <p>${pub.description}</p>
              <div class="content"> <a class="read-more-btn" href="publication.html?id=${pub.id}">Read more</a></div>
            </div>
          </div>
        `;
                publicationsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching publications:', error));
});