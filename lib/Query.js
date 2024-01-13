class Query {
    constructor(connection) {
      this.connection = connection;
    }
  
    // Example method to find employees by department
    findEmployeesByDepartment(departmentId) {
      return this.connection.query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = ?
      `, [departmentId]);
    }
  
    // Example method to delete a department by ID
    deleteDepartmentById(departmentId) {
      return this.connection.query('DELETE FROM department WHERE id = ?', [departmentId]);
    }
  
    // Example method to view the total utilized budget of a department
    viewDepartmentBudget(departmentId) {
      return this.connection.query(`
        SELECT d.name AS department, SUM(r.salary) AS total_budget
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = ?
        GROUP BY d.name
      `, [departmentId]);
    }
  
    // Add more methods for other queries as needed
  }
  
  module.exports = Query;
  