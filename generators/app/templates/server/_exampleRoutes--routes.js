
var exampleRoutes = {
    '/api/example/': {
        get: function(req, res){
            return res.json([
                {
                    name: 'Frodo Baggins',
                    race: 'Hobbit',
                    age: 50
                },
                {
                    name: 'Samwise Gamgee',
                    race: 'Hobbit',
                    age: 38
                },
                {
                    name: 'Gandalf the Grey',
                    race: 'Istari',
                    age: 'primeval'
                },
                {
                    name: 'Legolas',
                    age: '500+',
                    race: 'Elf'
                },
                {
                    name: 'Gimli ',
                    age: 139,
                    race: 'Dwarf '
                },
                {
                    name: 'Aragorn',
                    race: 'Human',
                    age: 87
                },
                {
                    name: 'Boromir',
                    race: 'Human',
                    age: 40
                },
                {
                    name: 'Meriadoc Brandybuck',
                    race: 'Hobbit ',
                    age: 36
                },
                {
                    name: 'Peregrin Took',
                    race: 'Hobbit ',
                    age: 28
                }
            ])
        }
    }
};

module.exports = exampleRoutes
