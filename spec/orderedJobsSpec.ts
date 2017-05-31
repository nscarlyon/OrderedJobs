import {orderedJobs} from '../src/orderedJobs'

describe("orderedJobs", () => {
    it("returns empty string for no jobs", () => {
       expect(orderedJobs.getOrderedJobs("")).toEqual("");
    });

    it("returns sequence for one independent job", () => {
       expect(orderedJobs.getOrderedJobs("a =>")).toEqual("a");
    });

    it("returns sequence for multiple independent jobs", () => {
       expect(orderedJobs.getOrderedJobs("a =>\n" +
                                         "b =>\n" +
                                         "c =>")).toEqual("abc");
    });

    it("returns sequence for multiple independent jobs with one dependent job", () => {
       expect(orderedJobs.getOrderedJobs("a =>\n" +
                                         "b => c\n" +
                                         "c =>")).toEqual("acb");
    });

    it("returns sequence for multiple independent jobs and multiple dependent jobs", () => {
       expect(orderedJobs.getOrderedJobs("a =>\n" +
                                         "b => c\n" +
                                         "c => f\n" +
                                         "d => a\n" +
                                         "e => b\n" +
                                         "f =>")).toEqual("afcdbe");
    });

    it("returns error if a job depends on itself", () => {
       expect(orderedJobs.getOrderedJobs("a =>\n" +
                                         "b => b\n" +
                                         "c => f\n" +
                                         "d => a\n" +
                                         "e => b\n" +
                                         "f =>")).toEqual("A job cannot depend on itself.");
    });

    it("returns error when jobs have circular dependency", () => {
       expect(orderedJobs.getOrderedJobs("a =>\n" +
                                         "b => c\n" +
                                         "c => f\n" +
                                         "d => a\n" +
                                         "e =>\n" +
                                         "f => b")).toEqual("Jobs cannot have circular dependency.");
    });
});