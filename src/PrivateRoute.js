import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserProvider'; // Asegúrate de que la ruta sea correcta


/**
 * A PrivateRoute component that redirects to the homepage if the user is not authenticated.
 * @name PrivateRoute
 * @function
 * @param {object} props The props object.
 * @param {node} props.children The children elements.
 * @returns {node} The component.
 * @example
 * <PrivateRoute>
 *   <div>Hello world!</div>
 * </PrivateRoute>
 */
const PrivateRoute = ({ children }) => {
  const { contextUser } = useUserContext();

  return contextUser ? children : <Navigate to="/" />; 
};

export default PrivateRoute;