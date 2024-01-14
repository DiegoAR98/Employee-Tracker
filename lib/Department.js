class Department {
  // Constructor initializes Department with a database connection
  constructor(connection) {
    this.connection = connection;
  }

  // Retrieves all departments from the database
  viewAllDepartments() {
    return this.connection.query('SELECT * FROM department');
  }

  // Adds a new department to the database
  addDepartment(departmentName) {
    return this.connection.query('INSERT INTO department (name) VALUES (?)', departmentName);
  }
}

// Exports Department class for use in other parts of the application
module.exports = Department;
