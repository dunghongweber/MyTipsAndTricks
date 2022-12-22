
//Filter array of objects by sub array of values
//filter movies base on value of genres
movies = [{
    'title': 'a',
    'genres': ['Romance', 'Comedy']
  },
  {
    'title': 'b',
    'genres': ['Drama', 'Comedy']
  },
  {
    'title': 'c',
    'genres': ['Action', 'Adventure']
  }
]

filters = ['Romance', 'Drama']
console.log(movies.filter(x => x.genres.some(g => filters.includes(g))))
