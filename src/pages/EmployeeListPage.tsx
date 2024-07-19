import React, { useState } from "react";
import { useEmployees } from "../useEmployees";
import EmployeeList from "../components/EmployeeList";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import { FaPlus, FaSync, FaEye, FaEyeSlash } from "react-icons/fa";
import { toastError, toastSuccess } from "../components/toastUtils";

interface EmployeeListPageProps {
  userRole: "admin" | "user";
}

const EmployeeListPage: React.FC<EmployeeListPageProps> = ({ userRole }) => {
  const { isLoading, error, data: employees, refetch } = useEmployees();
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeeIsAdmin, setNewEmployeeIsAdmin] = useState(false);
  const [newEmployeeIsUser, setNewEmployeeIsUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);

  const validateName = (name: string) => {
    const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ'’-]+( [a-zA-ZÀ-ÖØ-öø-ÿ'’-]+)+$/;
    if (!namePattern.test(name)) {
      setNameError("Name must contain at least two names, using only letters, hyphens, and apostrophes.");
      return false;
    }
    setNameError("");
    return true;
  };
  

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email: must include '@' and a domain (e.g., example@domain.com).");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleAddEmployee = async () => {
    if (
      !validateName(newEmployeeName) ||
      !validateEmail(newEmployeeEmail) ||
      (!newEmployeeIsAdmin && !newEmployeeIsUser)
    ) {
      return;
    }

    const newEmployee = {
      name: newEmployeeName,
      email: newEmployeeEmail,
      isAdmin: newEmployeeIsAdmin,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/employees`, newEmployee);
      refetch();
      setNewEmployeeName("");
      setNewEmployeeEmail("");
      setNewEmployeeIsAdmin(false);
      setNewEmployeeIsUser(false);
      toastSuccess("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      toastError("Failed to add employee.");
    }
  };

  const handleRemoveEmployee = (employeeId: number) => {
    setDeleteEmployeeId(employeeId);
    setDeleteConfirmOpen(true);
  };

  const confirmRemoveEmployee = async () => {
    if (deleteEmployeeId !== null) {
      try {
        await axios.delete(`${API_BASE_URL}/api/employees/${deleteEmployeeId}`);
        refetch();
        setDeleteConfirmOpen(false);
        setDeleteEmployeeId(null);
        toastSuccess("Employee deleted successfully!");
      } catch (error) {
        console.error("Error removing employee:", error);
        toastError("Failed to delete employee.");
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = () => {
    refetch();
  };

  const toggleAddEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error.message}</div>;

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminEmployees = filteredEmployees?.filter(
    (employee) => employee.isAdmin
  );
  const nonAdminEmployees = filteredEmployees?.filter(
    (employee) => !employee.isAdmin
  );

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Employee List</h1>
        {userRole === "admin" && (
          <Button
            onClick={toggleAddEmployee}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            variant="contained"
            startIcon={showAddEmployee ? <FaEyeSlash /> : <FaEye />}
          >
            {showAddEmployee ? "Hide Add Employee" : "Show Add Employee"}
          </Button>
        )}
      </header>
      {showAddEmployee && userRole === "admin" && (
        <div className="mb-4">
          <TextField
            label="Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            onBlur={(e) => validateName(e.target.value)}
            fullWidth
            error={!!nameError}
            helperText={nameError}
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Email"
            value={newEmployeeEmail}
            onChange={(e) => setNewEmployeeEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
            fullWidth
            error={!!emailError}
            helperText={emailError}
            style={{ marginBottom: "16px" }}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={
                newEmployeeIsAdmin ? "admin" : newEmployeeIsUser ? "user" : ""
              }
              onChange={(e) => {
                const role = e.target.value;
                setNewEmployeeIsAdmin(role === "admin");
                setNewEmployeeIsUser(role === "user");
              }}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
          </FormControl>
          <div className="flex space-x-2 mt-2">
            <Button
              onClick={handleAddEmployee}
              disabled={
                !newEmployeeName ||
                !newEmployeeEmail ||
                (!newEmployeeIsAdmin && !newEmployeeIsUser)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              variant="contained"
              startIcon={<FaPlus />}
              title={
                !newEmployeeIsAdmin && !newEmployeeIsUser
                  ? "Please choose a role (Admin or User)"
                  : ""
              }
            >
              Add Employee
            </Button>
            <Button
              onClick={handleRefresh}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              variant="contained"
              startIcon={<FaSync />}
            >
              Refresh List
            </Button>
          </div>
        </div>
      )}
      <TextField
        label="Search Employees"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
        fullWidth
      />
      <h2 className="text-2xl font-bold mb-2">Admin Employees</h2>
      {adminEmployees && (
        <EmployeeList
          employees={adminEmployees}
          onRemoveEmployee={handleRemoveEmployee}
          userRole={userRole}
        />
      )}
      <h2 className="text-2xl font-bold mb-2">Employees</h2>
      {nonAdminEmployees && (
        <EmployeeList
          employees={nonAdminEmployees}
          onRemoveEmployee={handleRemoveEmployee}
          userRole={userRole}
        />
      )}

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveEmployee} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeListPage;
