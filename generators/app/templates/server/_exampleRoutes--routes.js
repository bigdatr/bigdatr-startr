
var exampleRoutes = {
    '/api/example/': {
        get: function(req, res){
            return res.json({hello: ', world!'})
        }
    }
};

module.exports = exampleRoutes
