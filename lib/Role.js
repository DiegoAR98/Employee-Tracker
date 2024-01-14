class Role {
  // Constructor initializes Role with a database connection
  constructor(connection) {
    this.connection = connection;
  }

  // Retrieves all roles from the database with department details
  viewAllRoles() {
    return this.connection.query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `);
  }

  // Adds a new role to the database
  addRole(title, salary, departmentId) {
    return this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }
}

// Makes Role class available for import
module.exports = Role;
