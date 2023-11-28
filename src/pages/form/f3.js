import { useState } from 'react';
import { useRouter } from 'next/router';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    resume: null,
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for form submission (e.g., sending data to a server)
    setIsFormSubmitted(true);
  };

  return (
    <div>

<h1 style={{textAlign:'center'}}>Please Fill the Below Form to Apply</h1>

      {isFormSubmitted ? (
        <SuccessPage formData={formData} />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Cover Letter:
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Resume:
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      )}

      {/* Styling using style jsx */}
      {/* <style jsx>{`
        div {
          max-width: 600px;
          margin: auto;
        }

        form {
          display: grid;
          grid-gap: 16px;
        }

        label {
          display: block;
          margin-bottom: 8px;
        }

        input,
        textarea,
        button {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }

        button {
          background-color: #4caf50;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style> */}

       <style jsx>{`
      .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
      }

      h2 {
        color: #4caf50;
      }

      strong {
        font-weight: bold;
        color: #333;
      }

      /* ... (additional styling) */
    `}</style>

<style jsx>{`
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        form {
          display: grid;
          grid-gap: 16px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
        }

        input,
        textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

const SuccessPage = ({ formData }) => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.push('/');
  };

  return (
    <div>
      <h2>Application Submitted Successfully!</h2>
      <p>Preview of your application:</p>

      <div>
        <strong>Name:</strong> {formData.name}
        <p></p>
      </div>
      <div>
        <strong>Email:</strong> {formData.email}
        <p></p>
      </div>
      <div>
        <strong>Cover Letter:</strong> {formData.coverLetter}
        <p></p>
      </div>
      <div>
        <strong>Resume:</strong> {formData.resume ? formData.resume.name : 'No file'}
        <p></p>
      </div>

      <button onClick={handleGoHomeClick}>Go to Home Page</button>

      {/* Styling using style jsx */}
      <style jsx>{`
        div {
          max-width: 600px;
          margin: auto;
        }

        h2 {
          color: #4caf50;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 8px;
          margin-top: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default ApplicationForm;
