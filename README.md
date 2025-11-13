<<<<<<< HEAD
A landing-page for the DePaul Robotics program with links to the various departments and research groups. 
This project is built using bootstrap and a little bit of html for generating pages dynamically. 
=======
# DePaul Robotics Site

#The data for the publications, news, and contact is generated dynamically from the json.
#When you click a link for a publcation, the link is created with the publication id, which 
#is used to generate the page.

#To edit the data on the site, you only need to edit one of the three json files.


## Editing data
### People (`people.json`)
```
{
  "people": [
    {
      "name": "Dr. Jane Doe",
      "title": "Professor",
      "email": "jane.doe@depaul.edu",
      "photo": "people_images/person1.jpg",
      "size": "big"
    }
  ]
}
```
- if the `size` is set to "big", the card will span 4 columns. Otherwise, itll span 2. Use the big for professors and small for grad students.

### Publications (`publications.json`)
```
{
  "publications": [
    {
      "id": "3",
      "title": "Paper Title",
      "abstract": "Short abstract...",
      "description": "Longer description...",
      "url": "https://example.com/paper.pdf",
      "image": "paper_images/post_umer.png"
    }
  ]
}
```
- Home shows the 6 highest numeric `id`s indicating the most recent
- `publications.html` lists all
- `publication.html?id=<id>` renders the detail page from this JSON and `id`

### News (`news.json`)
```
{
  "news": [
    "Headline text...",
    "Another item..."
  ]
}
```
>>>>>>> 9364f72 (Updated and completed site. Check readme for how it works)
