/*
 * A simple utility to help remove messages from a queue.
 */

/*
.iron.json template
{
"token": "your iron.io token",
"project_id": "your iron.io project id",
"host": "mq-aws-us-east-1.iron.io"
}
*/

var iron_mq = require('iron_mq'),
	readline = require('readline'),
	imq = new iron_mq.Client(),
	queue = imq.queue("test"),
	rl = readline.createInterface(process.stdin, process.stdout);

function main() {
	
	rl.on('line', function (line) {
		id = line.trim();
		deleteQueueItem(id);
	}).on('close', function () {
		log(null, 'Have a great day!');
		process.exit(0);
	});

	// Prime the queue if needed.
	//queue.post("Useful information", function (error, body) { log(error, body); })
	
	// Pop an item off the queue and go...
	fetchQueueItem();
}

function fetchQueueItem() {
	queue.get({ n: 1 }, function (error, body) {
		if (error !== null || body !== undefined) {
			log(error, body);
			rl.prompt();
		} else {
			log(null, "No items on the queue.");
			rl.close();
		}
	});
}

function deleteQueueItem(id) {
	if (/\d+/.test(id)) {
		log(null, "Valid ID: " + id);
		queue.del(id, function (error, body) {
			log(error, body);
			fetchQueueItem();
		});
	} else {
		log("INVALID ID", id);
		fetchQueueItem();
	}
}

function log(error, body) {
	if (error) {
		console.log("Error: " + JSON.stringify(error), " | Body: " + JSON.stringify(body));
	} else {
		console.log(JSON.stringify(body));
	}
}

main();