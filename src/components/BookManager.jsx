import React, { useState } from 'react';
import { useFormik } from 'formik';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track index of book being edited

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    },
    validate: values => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Title is required';
      }
      if (!values.author) {
        errors.author = 'Author is required';
      }
      if (!values.isbn) {
        errors.isbn = 'ISBN is required';
      }
      if (!values.publicationDate) {
        errors.publicationDate = 'Publication Date is required';
      }
      return errors;
    },
    onSubmit: values => {
      if (editIndex === -1) {
        // Add new book
        setBooks([...books, values]);
      } else {
        // Update existing book
        const updatedBooks = [...books];
        updatedBooks[editIndex] = values;
        setBooks(updatedBooks);
        setEditIndex(-1); // Exit edit mode
      }
      formik.resetForm();
    }
  });

  const handleEdit = (index) => {
    const bookToEdit = books[index];
    formik.setValues(bookToEdit);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    formik.resetForm();
  };

  return (
    <div>
      <h2 className="mt-4 mb-3">Manage Books</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.author ? <div className="error">{formik.errors.author}</div> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN</label>
          <textarea
            type="text"
            id="isbn"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.isbn ? <div className="error">{formik.errors.isbn}</div> : null}
        </div>
        
        <div className="mb-3">
          <label htmlFor="publicationDate" className="form-label">Publication Date</label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={formik.values.publicationDate}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.errors.publicationDate ? <div className="error">{formik.errors.publicationDate}</div> : null}
        </div>
        {editIndex === -1 ? (
          <button type="submit" className="btn btn-primary">Add Book</button>
        ) : (
          <div>
            <button type="submit" className="btn btn-primary me-2">Update Book</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </form>
      <div className='own'>
      <h3 className="mt-4 mb-3 ">Books List</h3>
      {books.map((book, index) => (
        <div key={index} className="list-item">
          {book.title} by {book.author}
          <button onClick={() => handleEdit(index)} className="btn btn-info ms-3">Edit</button>
          <button onClick={() => setBooks(books.filter((_, i) => i !== index))} className="btn btn-danger ms-1">Delete</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BookManager;
