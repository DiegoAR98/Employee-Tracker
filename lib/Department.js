class Department {
    constructor(connection) {
      this.connection = connection;
    }
  
    viewAllDepartments() {
      return this.connection.query('SELECT * FROM department');
    }
  
    addDepartment(departmentName) {
      return this.connection.query('INSERT INTO department (name) VALUES (?)', departmentName);
    }
  }
  
  module.exports = Department;
  