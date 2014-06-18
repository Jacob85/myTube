/**
 * Created by Jacob on 6/18/14.
 */
var mongoose = require('mongoose');
var restify = require('restify');
var server = restify.createServer({ name : "music"});

var youtubeKey = "AIzaSyDRBeSZkyZjv7AbhXAaGujrDYdPNPmFBEY";


server.listen(1400 ,'localhost', function(){
    console.log('%s listening at %s ', server.name ,
        server.url);
});
mongoose.connect('mongodb://admin:123456@ds039778.mongolab.com:39778/music');


var productSchema = mongoose.Schema(
    {id:Number, name: String});
productSchema.methods.printDetails = function() {
    var str = "id=" + this.id + " name="+this.name;
    console.log(str);
};


var Product = mongoose.model('products',productSchema);
server.use(restify.queryParser());
server.use(restify.bodyParser());



function findStudent(req, res, next)
{
    console.log("inside findVideo(req,res,next) req.params.studid="+req.params.studid);
    var id = req.params.studid;
    //fetching data from db
    //...

    if(id==123123)
    {
        Product.find(function(error,products) {
            if(error) {
                res.send(404, error);
                return next();
            }
            else {
                res.send(200, products);
                return next();
            }
        });
            /*res.send(200, {'id':123123,'name':'danidin','average':98});
            return next();*/
    }
}

function deleteStudent(req,res,next)
{
    console.log("inside deleteVideo(req,res,next) req.params.studid="+req.params.studid);
    var id = req.params.id;
    //deleting data from db
    //...
    res.send(200,{'id':123123,'deleted':true});
    return next();
}

function findStudents(req,res,next)
{
    console.log("inside findVideos(req,res,next)");
    //getting data from db
    //...
    res.send(200,[{'id':123123,'name':'danidin','average':98},
        {'id':234234,'name':'spiderman','average':88},
        {'id':543543,'name':'wonderwoman','average':94}
    ])
    return next();
}

function addStudent(req,res,next)
{
    var student = {};
    student.id = req.params.id;
    student.name = req.params.name;
    student.average = req.params.average;
    //adding data to db
    //...
    res.send(student);
    return next();
}
var PATH = '/students';
server.get(PATH+'/:studid', findStudent);
server.post(PATH, addStudent);
server.get(PATH,findStudents);
server.del(PATH+'/:id', deleteStudent);


mongoose.connect('mongodb://admin:123456@ds039778.mongolab.com:39778/music');
 var db = mongoose.connection;
 db.on('error', function() {console.log("error")});
 db.once('open', function () {
 console.log("connected!");
 var productSchema = mongoose.Schema(
 {id:Number, name: String});
 productSchema.methods.printDetails = function() {
 var str = "id=" + this.id + " name="+this.name;
 console.log(str);
 };
 var Product = mongoose.model('products',productSchema);
 var carpeta = new Product({id:123123,name:'carpetax'});
 var tabola = new Product({id:432343,name:'Tabolala'});

 carpeta.save(function(error,prod) {
 if(error) {
 console.log(error);
 }
 else {
 console.log("carpeta was saved to mongodb");
 carpeta.printDetails();
 }
 });
 tabola.save(function(error,prod) {
 if(error) {
 console.log(error);
 }
 else {
 console.log("tabola was saved to mongodb");
 tabola.printDetails();
 }
 });
 Product.find(function(error,products) {
 if(error) {
 console.log(error);
 }
 else {
 console.log(products);
 }
 });
 });