/*
 * Job: Sonarqube-treemap
 *
 * Construct a treemap from a list of sonarqube resources using
 * lines of code as the treemap area and code coverage as the
 * color.
 *
 * Expected configuration:
 * {
 *   // optional sonarqube credentials to use from globalAuth.json
 *   credentials: "mykey"
 *
 *   // send debug information to the console
 *   debug: (true|false),
 *
 *   // list of resource names (not keys or ids) to include in the treemap
 *   resources: ["Resource1", "Resource2"],
 *
 *   // the Sonarqube url to query
 *   url: "http://your-sonarqube.your-domain.com:9000",
 * }
 */
var _ = require("underscore");

module.exports = function(config, dependencies, job_callback) {
	var logger = dependencies.logger;
	var options = {
		headers: {"Content-Type": "application/json"},
		rejectUnauthorized: false,
		url: config.url + "/api/resources?metrics=ncloc,coverage"
	};

	if (config.credentials &&
		config.globalAuth &&
		config.globalAuth[config.credentials] &&
		config.globalAuth[config.credentials].username &&
		config.globalAuth[config.credentials].password) {
		var buffer = new Buffer(
			config.globalAuth[config.credentials].username +
			":" +
			config.globalAuth[config.credentials].password);

		options.headers.Authorization = "Basic " +
			buffer.toString("base64");
	}

	dependencies.easyRequest.JSON(options, function(error, sonarData) {
		if (error) {
			var msg = "ERROR: Unable to access Sonarqube metrics at " +
				options.url + ", reason: " + error;
			logger.error(msg);
			return job_callback(msg);
		}
		
		var children = _.reduce(sonarData, function(memo, resource) {
			if (_.contains(config.resources, resource.name)) {
				memo.push({
					name: resource.name,
					coverage: _.findWhere(resource.msr, {key: "coverage"}).val,
					value: _.findWhere(resource.msr, {key: "ncloc"}).val
				});
			}
			return memo;
		}, []);

		var data = {
			"children": children
		};

		if (config.debug) {
			logger.log(JSON.stringify(data));
		}

		job_callback(null, data);
	});
};
