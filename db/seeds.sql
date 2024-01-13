-- Select the database
USE company_db;

-- Insert initial data into the department table
INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Marketing');

-- Insert initial data into the role table
-- Note: Make sure department IDs match those created by the department inserts
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000.00, 1), ('Software Engineer', 120000.00, 2);

-- Insert initial data into the employee table
-- Note: Make sure role IDs match those created by the role inserts
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1);
