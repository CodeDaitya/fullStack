var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
    assert.equal(err, null);
    console.log('Connected to the server correctly');

    var collection = db.collection('dishes');
    collection.insertOne({'name': 'Uthapizza', 'description': 'something'}, function(err, result){
        assert.equal(err, null);
        console.log('After Insert');
        console.log(result.ops);
        collection.find({}).toArray(function(err, docs){
            assert.equal(err, null);
            console.log('Found');
            console.log(docs);
            db.dropCollection('dishes', function(err, result){
                assert.equal(err, null);
                db.close();
            });
        });
    });
});