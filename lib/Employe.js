class Employee {
  // Constructor to initialize Employee with a database connection
  constructor(connection) {
    this.connection = connection;
  }

  // Method to retrieve all employees with their role, department, and manager
  viewAllEmployees() {
    return this.connection.query(`
      SELECT employee.id, employee.first_name, employee.last_name, 
             role.title, department.name AS department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON manager.id = employee.manager_id
    `);
  }

  // Method to add a new employee to the database
  addEmployee(firstName, lastName, roleId, managerId) {
    return this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }

  // Method to update an employee's role
  updateEmployeeRole(employeeId, newRoleId) {
    return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
  }
}

// Export the Employee class for use in other parts of the application
module.exports = Employee;
