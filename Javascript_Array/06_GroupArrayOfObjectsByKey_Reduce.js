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


/***********************
    mututate to a new Array
    [
        {make: 'audi', total: 2},
        {make: 'ford', total: 3}
    ]
*/
cars.reduce((acc, curr) => {
    acc = acc || [] //reinitiate acc as empty array
    if(acc.find(item => item.make === curr.make)){
        acc = acc.map(item => {
            if(item.make === current.make){
                item.total += 1
            }
            return item
        })
    }else{
        acc = acc.push({make: curr.make, total: 1})
    }
    
    return acc
},[])
