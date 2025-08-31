import React, { useState } from 'react';
        import { Link, Navigate } from 'react-router-dom';
        import { useAuth } from '../../contexts/AuthContext';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';

        const Register = () => {
          const { signUp, user, loading } = useAuth()
          const [formData, setFormData] = useState({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: ''
          })
          const [error, setError] = useState('')
          const [success, setSuccess] = useState('')
          const [isSubmitting, setIsSubmitting] = useState(false)

          // Redirect if already authenticated
          if (user && !loading) {
            return <Navigate to="/user-dashboard" replace />
          }

          const handleChange = (e) => {
            const { name, value } = e.target
            setFormData(prev => ({
              ...prev,
              [name]: value
            }))
            // Clear messages when user starts typing
            if (error) setError('')
            if (success) setSuccess('')
          }

          const validateForm = () => {
            if (formData.password !== formData.confirmPassword) {
              setError('Passwords do not match')
              return false
            }
            if (formData.password.length < 6) {
              setError('Password must be at least 6 characters')
              return false
            }
            return true
          }

          const handleSubmit = async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError('')
            setSuccess('')

            if (!validateForm()) {
              setIsSubmitting(false)
              return
            }

            const { data, error: signUpError } = await signUp(
              formData.email,
              formData.password,
              {
                full_name: formData.fullName
              }
            )
            
            if (signUpError) {
              setError(signUpError?.message || 'Failed to create account')
            } else {
              setSuccess('Account created successfully! Please check your email to verify your account.')
            }
            
            setIsSubmitting(false)
          }

          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      sign in to your existing account
                    </Link>
                  </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Create a password (min 6 characters)"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                      {success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>
              </div>
            </div>
          )
        }

        export default Register