Iron.io Message Queue Utility
========================

A utility to help clear out messages from a queue.  I had an issue where a message would get stuck on the queue.  So I whipped up this commandline utility to dequeue and delete enqueued items.  

## Setup
In the directory with the `app.js` file:
1. Create a file `.iron.json` file w/ your Iron.io information:
```JSON
{
    "token": "your iron.io token",
    "project_id": "your iron.io project id",
    "host": "mq-aws-us-east-1.iron.io"
}
```
2. Install the npm depenecies:
```
npm install
```

## Run
Just run the script.
```
node app.js
```

## To Do
Perhaps if I am so motivated, I will add the following things.  
1. Add parameter allowing for more than 1 item to be dequeued.
2. Add functionality to dequeue the first item and peek at the next "x" items.
3. Refactor some of the readline functionality if possible.
4. Dependency Inject the queue and the readline objects.
