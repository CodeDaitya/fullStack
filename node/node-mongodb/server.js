var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
  assert.equal(err, null);
  console.log('Connected to server successfully');

  dboper.insertDocument(db, {'name': 'vadonut', 'description': 'some description'}, 'dishes', function(result){
    console.log(result.ops);

    dboper.findDocuments(db, 'dishes', function(docs){
      console.log(docs);

      dboper.updateDocument(db, {'name': 'vadonut'}, {'description': 'some description updated'}, 'dishes', function(result){
        console.log(result.result);

        dboper.findDocuments(db, 'dishes', function(docs){
          console.log(docs);

          db.dropCollection('dishes', function(result){
            console.log(result);

            db.close();
          });
        });
      });
    });
  });
});

