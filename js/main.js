/**
 * DePaul Robotics
 * 
 * People (Contact page)
 * News (Home)
 * Publications
 * Publication Detail (publication.html)
 */

// People section (Contact page)
// Renders person cards from people.json
// Data: { people: [ { name, title, email, photo, size } ] }
// size: "big" => col-12 col-md-6; default small => col-6 col-md-3
document.addEventListener('DOMContentLoaded', function () {
	var peopleRow = document.querySelector('#people-list .row');
	if (!peopleRow) return;
	fetch('people.json')
		.then(function (res) { return res.json(); })
		.then(function (data) {
			var people = (data && Array.isArray(data.people)) ? data.people : [];
			if (people.length === 0) {
				peopleRow.innerHTML = '<div class="col-12 text-muted">No people found.</div>';
				return;
			}
			people.forEach(function (person) {
				var size = (person.size || 'small').toLowerCase();
				var colClass = size === 'big' ? 'col-12 col-md-6 mb-3' : 'col-6 col-md-3 mb-3';
				var titleLine = person.title ? '<p class="mb-1 small text-muted">' + person.title + '</p>' : '';
				var col = document.createElement('div');
				col.className = colClass;
				col.innerHTML = `
<article class="article-card article-card-sm h-100">
  <div class="d-flex align-items-center p-2">
    <div class="mr-3" style="flex:0 0 64px;">
      <img loading="lazy" decoding="async" src="${person.photo}" alt="${person.name}" style="width:64px;height:64px;object-fit:cover;border-radius:4px;">
    </div>
    <div class="flex-grow-1">
      <h3 class="h5 mb-1">${person.name}</h3>
      ${titleLine}
      <p class="mb-0 small"><a href="mailto:${person.email}">${person.email}</a></p>
    </div>
  </div>
</article>`;
				peopleRow.appendChild(col);
			});
		})
		.catch(function (err) {
			console.error('Error fetching people:', err);
			peopleRow.innerHTML = '<div class="col-12 text-danger">Failed to load people.</div>';
		});
});

// News and Publications
// Loads sidebar news on home; renders compact publications on home (6 most recent)
// and a two-column grid on publications.html
document.addEventListener('DOMContentLoaded', function () {
	// Sidebar news
	var newsList = document.getElementById('news-list');
	if (newsList) {
		fetch('news.json')
			.then(function (r) { return r.json(); })
			.then(function (data) {
				(data.news || []).forEach(function (item) {
					var li = document.createElement('li');
					li.className = 'list-group-item';
					li.innerHTML = '<p>' + item + '</p>';
					newsList.appendChild(li);
				});
			})
			.catch(function (e) { console.error('Error fetching news:', e); });
	}

	// Publications: home list + publications page grid
	var publicationsList = document.getElementById('publications-list');
	var publicationsGrid = document.getElementById('publications-grid');
	if (publicationsList || publicationsGrid) {
		fetch('publications.json')
			.then(function (r) { return r.json(); })
			.then(function (data) {
				var pubs = (data && Array.isArray(data.publications)) ? data.publications.slice() : [];
				pubs.sort(function (a, b) { return (Number(b.id) || 0) - (Number(a.id) || 0); });

				// Home: top 6 papers 
				if (publicationsList) {
					publicationsList.innerHTML = '';
					var top = pubs.slice(0, 6);
					if (top.length === 0) {
						var empty = document.createElement('div');
						empty.className = 'col-12 text-muted';
						empty.textContent = 'No publications found.';
						publicationsList.appendChild(empty);
					} else {
						top.forEach(function (pub) {
							var col = document.createElement('div');
							col.className = 'col-12 col-md-6 mb-3';
							col.innerHTML = `
<article class="article-card article-card-sm h-100">
  <div class="d-flex align-items-center">
    <a href="publication.html?id=${pub.id}" class="mr-3" style="flex:0 0 72px;">
      <img loading="lazy" decoding="async" src="${pub.image}" alt="Post Thumbnail" style="width:72px;height:48px;object-fit:cover;">
    </a>
    <h3 class="h3 mb-0"><a class="post-title" href="publication.html?id=${pub.id}">${pub.title}</a></h3>
  </div>
</article>`;
							publicationsList.appendChild(col);
						});
					}
				}

				// Publications page grid
				if (publicationsGrid) {
					publicationsGrid.innerHTML = '';
					if (pubs.length === 0) {
						var empty2 = document.createElement('div');
						empty2.className = 'col-12 text-muted';
						empty2.textContent = 'No publications found.';
						publicationsGrid.appendChild(empty2);
					} else {
						pubs.forEach(function (pub) {
							var abs = pub.abstract || pub.description || '';
							var shortAbs = abs.length > 200 ? (abs.slice(0, 200) + '…') : abs;
							var col = document.createElement('div');
							col.className = 'col-12 col-md-6 mb-4';
							col.innerHTML = `
<article class="article-card article-card-sm h-100">
  <a href="publication.html?id=${pub.id}">
    <div class="card-image">
      <img loading="lazy" decoding="async" src="${pub.image}" alt="Post Thumbnail" class="w-100" style="aspect-ratio:1/1;object-fit:cover;max-width:260px;margin:0 auto;display:block;">
    </div>
  </a>
  <div class="card-body px-0 pb-0">
    <h3 class="h3 mb-2"><a class="post-title" href="publication.html?id=${pub.id}">${pub.title}</a></h3>
    <p class="card-text mb-2">${shortAbs}</p>
    <div class="content"><a class="read-more-btn" href="publication.html?id=${pub.id}">Read more</a></div>
  </div>
</article>`;
							publicationsGrid.appendChild(col);
						});
					}
				}
			})
			.catch(function (e) { console.error('Error fetching publications:', e); });
	}
});

// Publication detail (publication.html)
// Renders a single publication into #publication-details from publications.json by ?id=...
document.addEventListener('DOMContentLoaded', function () {
	var detailsRoot = document.getElementById('publication-details');
	if (!detailsRoot) return;
	var params = new URLSearchParams(window.location.search);
	var pubId = params.get('id');
	if (!pubId) {
		detailsRoot.innerHTML = '<p>Publication not found.</p>';
		return;
	}
	fetch('publications.json')
		.then(function (r) { return r.json(); })
		.then(function (data) {
			var pub = (data.publications || []).find(function (p) { return p.id === pubId; });
			if (!pub) {
				detailsRoot.innerHTML = '<p>Publication not found.</p>';
				return;
			}
			document.title = pub.title + ' - DePaul Robotics';
			var abstract = pub.abstract || pub.description || '';
			var description = pub.description || '';
			var paperUrl = pub.url || '';
			detailsRoot.innerHTML = `
<div class="text-center">
  <h1 class="mb-2">${pub.title}</h1>
  ${paperUrl ? `<div class="content mb-3"><a class="read-more-btn" href="${paperUrl}" target="_blank" rel="noopener">See the paper</a></div>` : ''}
  <img src="${pub.image}" alt="${pub.title}" style="width:240px;height:auto;object-fit:cover;margin:0 auto 12px auto;display:block;" />
</div>
${abstract ? `<p class="small text-muted mb-4 text-center"><strong>${abstract}</strong></p>` : ''}
${description ? `<div class="content"><p>${description}</p></div>` : ''}
`;
		})
		.catch(function (err) {
			console.error('Error fetching publication:', err);
			detailsRoot.innerHTML = '<p>Publication not found.</p>';
		});
});
