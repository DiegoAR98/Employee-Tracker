class Role {
    constructor(connection) {
      this.connection = connection;
    }
  
    viewAllRoles() {
      return this.connection.query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        INNER JOIN department ON role.department_id = department.id
      `);
    }
  
    addRole(title, salary, departmentId) {
      return this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    }
  }
  
  module.exports = Role;
  