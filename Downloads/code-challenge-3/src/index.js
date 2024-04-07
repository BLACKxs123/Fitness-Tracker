// Fetch the JSON file and parse the response
fetch('db.json')
 .then(response => response.json())
 .then(data => {
    // Select the movie with the title "The Giant Gila Monster"
    const giantGilaMonster = data.films.find(movie => movie.title === 'The Giant Gila Monster');

    // Set the movie title, image, description, and ticket information
    document.getElementById('title').textContent = giantGilaMonster.title;
    document.getElementById('poster').src = giantGilaMonster.poster;
    document.getElementById('film-info').textContent = giantGilaMonster.description;
    document.getElementById('showtime').textContent = giantGilaMonster.showtime;
    document.getElementById('runtime').textContent = giantGilaMonster.runtime + ' minutes';
    document.getElementById('ticket-num').textContent = giantGilaMonster.capacity - giantGilaMonster.tickets_sold + ' remaining tickets';

    // Add the default movie to the list of movies
    const li = document.createElement('li');
    li.classList.add('film', 'item');
    li.textContent = giantGilaMonster.title;
    li.addEventListener('click', () => {
      // Set the movie title, image, description, and ticket information
      document.getElementById('title').textContent = giantGilaMonster.title;
      document.getElementById('poster').src = giantGilaMonster.poster;
      document.getElementById('film-info').textContent = giantGilaMonster.description;
      document.getElementById('showtime').textContent = giantGilaMonster.showtime;
      document.getElementById('runtime').textContent = giantGilaMonster.runtime + ' minutes';
      document.getElementById('ticket-num').textContent = giantGilaMonster.capacity - giantGilaMonster.tickets_sold + ' remaining tickets';

      // Add an event listener to the buy ticket button
      document.getElementById('buy-ticket').addEventListener('click', () => {
        if (giantGilaMonster.tickets_sold < giantGilaMonster.capacity) {
          giantGilaMonster.tickets_sold++;
          document.getElementById('ticket-num').textContent = giantGilaMonster.capacity - giantGilaMonster.tickets_sold + ' remaining tickets';
          document.getElementById('buy-ticket').textContent = 'Buy Ticket (' + (giantGilaMonster.capacity - giantGilaMonster.tickets_sold) + ')';
        } else {
          document.getElementById('buy-ticket').textContent = 'Sold Out';
          document.getElementById('buy-ticket').disabled = true;
        }
      });
    });
    document.getElementById('films').appendChild(li);

    // Loop through the movie data and create a new li element for each movie
    data.films.forEach((movie, index) => {
      if (movie!== giantGilaMonster) {
        const li = document.createElement('li');
        li.classList.add('film', 'item');
        li.textContent = movie.title;
        li.addEventListener('click', () => {
          // Set the movie title, image, description, and ticket information
          document.getElementById('title').textContent = movie.title;
          document.getElementById('poster').src = movie.poster;
          document.getElementById('film-info').textContent = movie.description;
          document.getElementById('showtime').textContent = movie.showtime;
          document.getElementById('runtime').textContent = movie.runtime + ' minutes';
          document.getElementById('ticket-num').textContent = movie.capacity - movie.tickets_sold + ' remaining tickets';

          // Add an event listener to the buy ticket button
          document.getElementById('buy-ticket').addEventListener('click', () => {
            if (movie.tickets_sold < movie.capacity) {
              movie.tickets_sold++;
              document.getElementById('ticket-num').textContent = movie.capacity - movie.tickets_sold + ' remaining tickets';
              document.getElementById('buy-ticket').textContent = 'Buy Ticket (' + (movie.capacity - movie.tickets_sold) + ')';
            } else {
              document.getElementById('buy-ticket').textContent = 'Sold Out';
              document.getElementById('buy-ticket').disabled = true;
            }
          });
        });
        document.getElementById('films').appendChild(li);
      }
    });

    // Remove the first list of movies from the HTML code
    document.getElementById('films').removeChild(document.querySelector('#films li:first-child'));
  })
 .catch(error => console.error('Error fetching JSON file:', error));