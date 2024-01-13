class Employee {
    constructor(connection) {
      this.connection = connection;
    }
  
    viewAllEmployees() {
      return this.connection.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id
      `);
    }
  
    addEmployee(firstName, lastName, roleId, managerId) {
      return this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    }
  
    updateEmployeeRole(employeeId, newRoleId) {
      return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    }
  }
  
  module.exports = Employee;
  