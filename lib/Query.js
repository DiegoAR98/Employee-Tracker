class Query {
    constructor(connection) {
      this.connection = connection;
    }

    // Find employees by department
    findEmployeesByDepartment(departmentId) {
      return this.connection.query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = ?
      `, [departmentId]);
    }

    // Delete a department by ID
    deleteDepartmentById(departmentId) {
      return this.connection.query('DELETE FROM department WHERE id = ?', [departmentId]);
    }

    // View the total utilized budget of a department
    viewDepartmentBudget(departmentId) {
        return this.connection.query(`
            SELECT SUM(r.salary) AS total_budget
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE r.department_id = ?
        `, [departmentId]);
    }

    // Update an employee's manager
    updateEmployeeManager(employeeId, managerId) {
      return this.connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
    }

    // Find employees by manager
    findEmployeesByManager(managerId) {
        return this.connection.query(`
            SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            WHERE e.manager_id = ?
        `, [managerId]);
    }
    // Delete a role by ID
    deleteRoleById(roleId) {
      return this.connection.query('DELETE FROM role WHERE id = ?', [roleId]);
    }

    // Delete an employee by ID
    deleteEmployeeById(employeeId) {
      return this.connection.query('DELETE FROM employee WHERE id = ?', [employeeId]);
    }
}

module.exports = Query;
