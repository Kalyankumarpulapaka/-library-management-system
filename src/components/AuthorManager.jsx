import React, { useState } from 'react';
import { useFormik } from 'formik';

const AuthorManager = () => {
  const [authors, setAuthors] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track index of author being edited

  const formik = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      biography: '',
      address: '', // New field for author address
    },
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.birthDate) {
        errors.birthDate = 'Birth Date is required';
      }
      if (!values.biography) {
        errors.biography = 'Biography is required';
      }
      if (!values.address) {
        errors.address = 'Address is required';
      }
      return errors;
    },
    onSubmit: values => {
      if (editIndex === -1) {
        // Add new author
        setAuthors([...authors, values]);
      } else {
        // Update existing author
        const updatedAuthors = [...authors];
        updatedAuthors[editIndex] = values;
        setAuthors(updatedAuthors);
        setEditIndex(-1); // Exit edit mode
      }
      formik.resetForm();
    }
  });

  const handleEdit = (index) => {
    const authorToEdit = authors[index];
    formik.setValues(authorToEdit);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    formik.resetForm();
  };

  return (
    <div>
      <h2 className="mt-4 mb-3">Manage Authors</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.birthDate ? <div className="error">{formik.errors.birthDate}</div> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="biography" className="form-label">Biography</label>
          <textarea
            id="biography"
            name="biography"
            value={formik.values.biography}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.biography ? <div className="error">{formik.errors.biography}</div> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.address ? <div className="error">{formik.errors.address}</div> : null}
        </div>
        {editIndex === -1 ? (
          <button type="submit" className="btn btn-primary">Add Author</button>
        ) : (
          <div>
            <button type="submit" className="btn btn-primary me-2">Update Author</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </form>
      <h3 className="mt-4 mb-3">Authors List</h3>
      {authors.map((author, index) => (
        <div key={index} className="list-item">
          {author.name}
          <button onClick={() => handleEdit(index)} className="btn btn-info ms-3">Edit</button>
          <button onClick={() => setAuthors(authors.filter((_, i) => i !== index))} className="btn btn-danger ms-1">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AuthorManager;
