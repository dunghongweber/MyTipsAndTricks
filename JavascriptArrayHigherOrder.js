
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

//********************************************************************************************************
//Group an array of objects by keys
//https://stackoverflow.com/questions/40774697/how-can-i-group-an-array-of-objects-by-key
const cars = [
    {
        'make': 'audi',
        'model': 'r8',
        'year': '2012'
    }, {
        'make': 'audi',
        'model': 'rs5',
        'year': '2013'
    }, {
        'make': 'ford',
        'model': 'mustang',
        'year': '2012'
    }, {
        'make': 'ford',
        'model': 'fusion',
        'year': '2015'
    }
];

const result = cars.reduce(function (r, a) {
        r[a.make] = r[a.make] || [];
        r[a.make].push(a);
        return r;
    }, {});
//now result will be grouped as below
const cars_result = {
    'audi': [
        {
            'model': 'r8',
            'year': '2012'
        }, {
            'model': 'rs5',
            'year': '2013'
        },
    ],

    'ford': [
        {
            'model': 'mustang',
            'year': '2012'
        }, {
            'model': 'fusion',
            'year': '2015'
        }
    ],
}
