
var bike = require('../models/bike'); 
// List of all bikes 
exports.bike_list = async function(req, res) { 
    try{ 
        thebikes = await bike.find(); 
        res.send(thebikes); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// for a specific bike. 
exports.bike_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: bike detail: ' + req.params.id); 
}; 
 
// Handle bike create on POST. 
// Handle bike create on POST. 
exports.bike_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new bike(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"bike_type":"goat", "cost":12, "size":"large"} 
    document.bike_type = req.body.bike_type; 
    document.model = req.body.model; 
    document.cost = req.body.cost; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// Handle bike delete form on DELETE. 
exports.bike_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: bike delete DELETE ' + req.params.id); 
}; 
 
// Handle bike update form on PUT. 
exports.bike_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: bike update PUT' + req.params.id); 
}; 
// VIEWS 
// Handle a show all view 
exports.bike_view_all_Page = async function(req, res) { 
    try{ 
        thebikes = await bike.find(); 
        res.render('bikes', { title: 'bike Search Results', results: thebikes }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 