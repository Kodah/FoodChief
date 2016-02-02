
var config = {};

config.JWTSECRET = "AA:Frameworks:)";

config.filterRoutes = function(req) 
{
    if (req.method === 'GET' || 
        req.path === '/registration' ||
        req.path === '/authentication') 
    {
        return true;
    }
    return false;
}


module.exports = config;