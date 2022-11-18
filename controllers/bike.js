
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
 



// VIEWS 
// Handle a show all view 
exports.bike_view_all_Page = async function(req, res) { 
    try{ 
        thebikes = await bike.find(); 
        console.log("result is :"+ thebikes)
        res.render('bikes', { title: 'bike Search Results', results: thebikes }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
// for a specific bike. 
exports.bike_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await bike.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 

// Handle bike update form on PUT. 
// Handle Application update form on PUT.

exports.bike_update_put = async function(req, res) {

    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)

    try {

        let toUpdate = await bike.findById( req.params.id)

        // Do updates of properties

        if(req.body.bike_type) toUpdate.bike_type = req.body.bike_type;

        if(req.body.model) toUpdate.model = req.body.model;

        if(req.body.cost) toUpdate.cost = req.body.cost;

        let result = await toUpdate.save();

        console.log("Sucess " + result)

        res.send(result)

    } catch (err) {

        res.status(500)

        res.send(`{"error": ${err}: Update for id ${req.params.id}

failed`);

    }

};

// Handle bike delete on DELETE. 
exports.bike_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await bike.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 

// Handle a show one view with id specified by query 
exports.bike_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await bike.findById( req.query.id) 
        res.render('bikedetail',  
{ title: 'bike Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for creating a bike. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.bike_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('bikecreate', { title: 'bike Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a bike. 
// query provides the id 
exports.bike_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await bike.findById(req.query.id) 
        res.render('bikeupdate', { title: 'bike Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.bike_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await bike.findById(req.query.id) 
        res.render('bikedelete', { title: 'bike Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 