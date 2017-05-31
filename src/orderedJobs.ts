export class orderedJobs {
    private static orderedJobs: string;

    static getOrderedJobs(jobs: string): string {
        let createdJobs = jobs.split("\n").map((job: string): any => {
            return new Job(job);
        });

        if (jobs === "") return "";
        if (this.aJobDependsOnItself(createdJobs)) return "A job cannot depend on itself.";


        return this.canOrderJobs(createdJobs)
             ? this.orderedJobs
             : "Jobs cannot have circular dependency.";
    }

    private static aJobDependsOnItself(createdJobs: Job[]) {
        return createdJobs.some((job: any): boolean => job.dependent === job.dependency);
    }

    private static canOrderJobs(createdJobs: Job[]) {
        this.orderIndependentJobs(createdJobs);
        this.orderDependentJobs(createdJobs);
        return this.orderedJobs.length === createdJobs.length;
    }

    private static orderIndependentJobs(jobs: any) {
        this.orderedJobs = jobs.filter((job: any): boolean => job.dependency === undefined)
            .reduce((acc: string, job: any): string => acc + job.dependent, "");
    }

    private static orderDependentJobs(createdJobs: Job[]) {
        let dependentJobs: any = createdJobs.filter((job: Job): boolean => job.hasDependency());
        let countOfJobsOrderedBeforeLastPass: number;
        let jobsAreBeingAdded: boolean = true;

        while (jobsAreBeingAdded) {
           countOfJobsOrderedBeforeLastPass = this.orderedJobs.length;
           dependentJobs.forEach((job) => {
                this.addNextJob(job);
            });
            jobsAreBeingAdded = this.jobsWereAdded(countOfJobsOrderedBeforeLastPass);
        }
    }

    private static jobsWereAdded(jobsAdded: number) {
        return jobsAdded !== this.orderedJobs.length;
    }

    private static addNextJob(job: any) {
        if (this.orderedJobs.indexOf(job.dependent) === -1 && this.orderedJobs.indexOf(job.dependency) >= 0)
            this.orderedJobs += job.dependent;
    }
}

class Job {
    private dependent: string;
    private dependency: string;

    constructor(jobString: string) {
        this.dependent = jobString[0];
        this.dependency = jobString[5];
    }
    hasDependency() { return this.dependency != undefined; }
}