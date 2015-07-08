var treemap = require("../sonarqube-treemap")

describe("when the sonar-treemap job can contact the sonar host", function () {
	var config, dependencies, job_callback;

	beforeEach(function() {
		config = {
			resources: ["One","Two","Three","Four"],
			url: "http://sonarqube.treemap.local:9000"
		};

		dependencies = {
			easyRequest: {
				JSON: function(options, callback) {
					callback(null, [
						{"id":1,"key":"one","name":"One","scope":"PRJ","qualifier":"TRK","date":"2015-06-16T13:50:45+0000","creationDate":"2015-06-16T10:43:31+0000","lname":"Dropbox","version":"1.0","description":"","msr":[{"key":"ncloc","val":67536.0,"frmt_val":"67,536"},{"key":"coverage","val":42.4,"frmt_val":"42.4%"}]},
						{"id":2,"key":"two","name":"Two","scope":"PRJ","qualifier":"TRK","date":"2015-06-16T17:11:59+0000","creationDate":"2015-06-16T16:32:48+0000","lname":"Checklist","version":"1.0","description":"","msr":[{"key":"ncloc","val":10105.0,"frmt_val":"10,105"},{"key":"coverage","val":35.1,"frmt_val":"35.1%"}]},
						{"id":3,"key":"three","name":"Three","scope":"PRJ","qualifier":"TRK","date":"2015-06-16T15:04:05+0000","creationDate":"2015-06-16T11:56:55+0000","lname":"Competencies","version":"1.0","description":"","msr":[{"key":"ncloc","val":27592.0,"frmt_val":"27,592"},{"key":"coverage","val":12.5,"frmt_val":"12.5%"}]},
						{"id":4,"key":"four","name":"Four","scope":"PRJ","qualifier":"TRK","date":"2015-06-16T16:11:06+0000","creationDate":"2015-06-16T13:02:55+0000","lname":"SelfAssessments","version":"1.0","description":"","msr":[{"key":"ncloc","val":2922.0,"frmt_val":"2,922"},{"key":"coverage","val":60.2,"frmt_val":"60.2%"}]},
						{"id":5,"key":"five","name":"Five","scope":"PRJ","qualifier":"TRK","date":"2015-06-16T20:44:07+0000","creationDate":"2015-06-16T17:36:38+0000","lname":"Quizzing","version":"1.0","description":"","msr":[{"key":"ncloc","val":32679.0,"frmt_val":"32,679"},{"key":"coverage","val":23.7,"frmt_val":"23.7%"}]}]
					);
				}
			}
		}
	});

	it("only declared resources should be returned", function () {
		treemap(config, dependencies, function(err, data) {
			expect(data).toEqual({children:[
				{ "name":"One", "coverage":42.4, "value":67536 },
				{ "name":"Two", "coverage":35.1, "value":10105 },
				{ "name":"Three", "coverage":12.5, "value":27592 },
				{ "name":"Four", "coverage":60.2, "value":2922 },
		   	]});

			expect(data.children).not.toEqual(
				jasmine.objectContaining({"name":"Five"}));
		});
	});
});
