function Candidate(id, name, totalExperience, currentCompany, pastJobs = '-', skills, currentSalary = '-', expectedSalary = '-', education, availableAfterDays) {
	this.id = id;
	this.name = name;
	this.totalExperience = totalExperience;
	this.currentCompany = currentCompany;
	this.pastJobs= pastJobs;
	this.skills = skills;
	this.currentSalary = currentSalary;
	this.expectedSalary = expectedSalary;
	this.education = education;
	this.availableAfterDays = availableAfterDays;
}

module.exports = Candidate;