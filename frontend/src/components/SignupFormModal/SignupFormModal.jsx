import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(() => {
          closeModal();
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            // Set errors as an object containing all error messages
            setErrors(data.errors);
          }
        });
    }
    
    // If passwords don't match, set confirmPassword error
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const isButtonDisabled = (
    username.length < 4 || 
    password.length < 6
  );

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* Display email errors if present */}
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* Display username errors if present */}
        {errors.username && <p className="error-message">{errors.username}</p>}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {/* Display firstName errors if present */}
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {/* Display lastName errors if present */}
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* Display password errors if present */}
        {errors.password && <p className="error-message">{errors.password}</p>}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* Display confirmPassword errors if present */}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button 
          type="submit" 
          disabled={isButtonDisabled} 
          className={isButtonDisabled ? 'disabled-button' : 'enabled-button'}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
