//Filter array of objects by sub array of values
//filter movies base on value of genres
//https://stackoverflow.com/questions/48997590/filter-array-of-objects-by-sub-array-of-values
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
