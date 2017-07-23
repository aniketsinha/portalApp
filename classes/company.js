function Company(id,name, industry = '-', ceo = '-', headquarter = '-', founded = '-', description = '-', employeesCount = '-', revenue = '-') {
	this.id = id;
	this.name = name;
	this.industry = industry;
	this.ceo = ceo;
	this.headquarter = headquarter;
	this.founded = founded;
	this.description = description;
	this.employeesCount = employeesCount;
	this.revenue = revenue;
}

module.exports = Company;