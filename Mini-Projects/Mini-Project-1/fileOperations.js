const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) =>{
    // Reads the file example.txt
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log('File content:', data);
    });

    //Writes in the file example1.txt
    fs.writeFile('example1.txt', 'This example has been created', (err, data) =>{
        if(err){
            console.error('Error writing file: ', err);
            return;
        }
    })

    //Reads example.txt and displays the contents in the console
    fs.readFile('example1.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log('File content:', data);
    });
    
    //Creates and writes a txt file that will belater deleted
    fs.writeFile('example3.txt', 'This example will be deleted', (err) =>{
        if(err){
            console.error('Error writing file: ', err);
            return;
        }
    })

    //Deletes example3.txt
    fs.unlink('example3.txt', (err) =>{
        if(err){
            console.error('Error deleting file', err);
            return;
        }
        console.log("This example was deleted");
    })
})

const PORT = 3000;

server.listen(PORT)