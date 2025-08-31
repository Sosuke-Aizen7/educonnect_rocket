import React, { useState } from 'react';
        import { Link, Navigate } from 'react-router-dom';
        import { useAuth } from '../../contexts/AuthContext';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';

        const Login = () => {
          const { signIn, user, loading } = useAuth()
          const [formData, setFormData] = useState({
            email: '',
            password: ''
          })
          const [error, setError] = useState('')
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
            // Clear error when user starts typing
            if (error) setError('')
          }

          const handleSubmit = async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError('')

            const { error: signInError } = await signIn(formData.email, formData.password)
            
            if (signInError) {
              setError(signInError?.message || 'Failed to sign in')
            }
            
            setIsSubmitting(false)
          }

          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      create a new account
                    </Link>
                  </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
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
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
              </div>
            </div>
          )
        }

        export default Login