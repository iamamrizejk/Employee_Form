import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaUser,
  FaBirthdayCake,
} from "react-icons/fa";

const Frontend = () => {
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
    Department: "",
    DateOfJoining: "",
    Role: "",
    DOB: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [age, setAge] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.EmployeeID || formData.EmployeeID.length > 10)
      newErrors.EmployeeID = "Employee ID must be <= 10 characters";
    if (!formData.Email.includes("@"))
      newErrors.Email = "Valid Email is required";
    if (formData.PhoneNumber.length !== 10)
      newErrors.PhoneNumber = "Phone number must be 10 digits";
    if (!formData.Department) newErrors.Department = "Department is required";
    if (
      !formData.DateOfJoining ||
      new Date(formData.DateOfJoining) > new Date()
    )
      newErrors.DateOfJoining = "Date cannot be in the future";
    if (!formData.Role) newErrors.Role = "Role is required";
    return newErrors;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (
      month < birthDate.getMonth() ||
      (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (formData.DOB) {
      setAge(calculateAge(formData.DOB)); // Calculate age when DOB changes
    }
  }, [formData.DOB]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/employees",
          formData
        );
        setMessage(res.data.message);
        setErrors({});
        setFormData({
          EmployeeID: "",
          Name: "",
          Email: "",
          PhoneNumber: "",
          Department: "",
          DateOfJoining: "",
          Role: "",
          DOB: "",
        });
      } catch (err) {
        setMessage(err.response?.data?.message || "Submission failed");
      }
    }
  };

  const inputFields = [
    { id: "EmployeeID", label: "Employee ID", icon: <FaIdCard /> },
    { id: "Name", label: "Name", icon: <FaUser /> },
    { id: "Email", label: "Email", icon: <FaEnvelope /> },
    { id: "PhoneNumber", label: "Phone Number", icon: <FaPhone /> },
    {id: "Department", label: "Department", icon: <FaBuilding />,
      type: "select", options: ["HR", "Engineering", "Marketing", "Finance"], // Department options
    },
    {
      id: "DateOfJoining",
      label: "Date of Joining",
      icon: <FaCalendarAlt />,
      type: "date",
    },
    {
      id: "Role",
      label: "Role",
      icon: <FaBriefcase />,
      type: "select",
      options: ["Manager", "Developer"], // Role options
    },
    {
      id: "DOB",
      label: "Date of Birth",
      icon: <FaBirthdayCake />,
      type: "date",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full max-w-lg bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Add Employee
        </h1>
        {message && (
          <div
            className={`p-4 mb-6 text-center text-sm rounded-lg shadow-md ${
              message.includes("failed")
                ? "bg-red-100 text-red-600 border border-red-300"
                : "bg-green-100 text-green-600 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map(({ id, label, type = "text", icon, options }) => (
            <div key={id} className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-400">{icon}</span>
              </div>
              {type === "select" ? (
                <select
                  id={id}
                  value={formData[id]}
                  onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                  }
                  className={`peer w-full px-10 py-3 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                    errors[id]
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                >
                  <option value="" disabled>
                    Select {label}
                  </option>
                  {options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={type}
                  placeholder=" "
                  value={formData[id]}
                  onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                  }
                  className={`peer w-full px-10 py-3 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                    errors[id]
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              )}
              <label
                htmlFor={id}
                className="absolute text-gray-500 text-sm transition-all transform -translate-y-4 scale-90 top-2 left-10 bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90"
              >
                {label}
              </label>
              {errors[id] && (
                <p className="mt-1 text-xs text-red-500">{errors[id]}</p>
              )}
            </div>
          ))}

          <div className="relative">
            <label
              htmlFor="Age"
              className="absolute text-gray-500 text-sm transition-all transform -translate-y-4 scale-90 top-2 left-10 bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90"
            >
              Age
            </label>
            <input
              id="Age"
              type="text"
              value={age !== null ? age : ""}
              readOnly
              className="peer w-full px-10 py-3 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg transform transition-transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Frontend;
