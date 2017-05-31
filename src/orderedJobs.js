"use strict";
var orderedJobs = (function () {
    function orderedJobs() {
    }
    orderedJobs.getOrderedJobs = function (jobs) {
        var createdJobs = jobs.split("\n").map(function (job) {
            return new Job(job);
        });
        if (jobs === "")
            return "";
        if (this.aJobDependsOnItself(createdJobs))
            return "A job cannot depend on itself.";
        return this.canOrderJobs(createdJobs)
            ? this.orderedJobs
            : "Jobs cannot have circular dependency.";
    };
    orderedJobs.aJobDependsOnItself = function (createdJobs) {
        return createdJobs.some(function (job) { return job.dependent === job.dependency; });
    };
    orderedJobs.canOrderJobs = function (createdJobs) {
        this.orderIndependentJobs(createdJobs);
        this.orderDependentJobs(createdJobs);
        return this.orderedJobs.length === createdJobs.length;
    };
    orderedJobs.orderIndependentJobs = function (jobs) {
        this.orderedJobs = jobs.filter(function (job) { return job.dependency === undefined; })
            .reduce(function (acc, job) { return acc + job.dependent; }, "");
    };
    orderedJobs.orderDependentJobs = function (createdJobs) {
        var _this = this;
        var dependentJobs = createdJobs.filter(function (job) { return job.hasDependency(); });
        var countOfJobsOrderedBeforeLastPass;
        var jobsAreBeingAdded = true;
        while (jobsAreBeingAdded) {
            countOfJobsOrderedBeforeLastPass = this.orderedJobs.length;
            dependentJobs.forEach(function (job) {
                _this.addNextJob(job);
            });
            jobsAreBeingAdded = this.jobsWereAdded(countOfJobsOrderedBeforeLastPass);
        }
    };
    orderedJobs.jobsWereAdded = function (jobsAdded) {
        return jobsAdded !== this.orderedJobs.length;
    };
    orderedJobs.addNextJob = function (job) {
        if (this.orderedJobs.indexOf(job.dependent) === -1 && this.orderedJobs.indexOf(job.dependency) >= 0)
            this.orderedJobs += job.dependent;
    };
    return orderedJobs;
}());
exports.orderedJobs = orderedJobs;
var Job = (function () {
    function Job(jobString) {
        this.dependent = jobString[0];
        this.dependency = jobString[5];
    }
    Job.prototype.hasDependency = function () { return this.dependency != undefined; };
    return Job;
}());
//# sourceMappingURL=orderedJobs.js.map