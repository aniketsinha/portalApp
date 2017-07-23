function Application(id, JobPost, User, appliedDate, isViewedByHR, isShortlisted) {
	this.id = id;
	this.JobPost = JobPost;
	this.User = User;
	this.appliedDate = appliedDate;
	this.isViewedByHR = isViewedByHR;
	this.isShortlisted = isShortlisted;
}


module.exports = Application;