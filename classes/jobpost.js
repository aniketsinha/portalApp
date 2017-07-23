function JobPost(id, title, createdDate, createdBy, domain, education, description, location, status, keywords, Company) {
	this.id = id;
	this.title = title;
	this.createdDate = createdDate;
	this.createdBy = createdBy;
	this.domain = domain;
	this.education = education;
	this.description = description;
	this.location = location;
	this.status = status;
	this.keywords = keywords;
	this.Company = Company;
}

module.exports = JobPost;
