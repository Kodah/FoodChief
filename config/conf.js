
var config = {};

config.JWTSECRET = "AA:Frameworks:)";

config.filterRoutes = function(req) 
{
    if (req.method === 'GET' || 
        req.path === '/register' ||
        req.path === '/authentication') 
    {
    	console.log("Allowed");
        return true;
    }
    return false;
}


module.exports = config;