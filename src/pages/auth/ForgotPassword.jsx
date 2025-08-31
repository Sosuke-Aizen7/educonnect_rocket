import React, { useState } from 'react';
        import { Link } from 'react-router-dom';
        import { useAuth } from '../../contexts/AuthContext';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';

        const ForgotPassword = () => {
          const { resetPassword } = useAuth()
          const [email, setEmail] = useState('')
          const [message, setMessage] = useState('')
          const [error, setError] = useState('')
          const [isSubmitting, setIsSubmitting] = useState(false)

          const handleSubmit = async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError('')
            setMessage('')

            const { error: resetError } = await resetPassword(email)
            
            if (resetError) {
              setError(resetError?.message || 'Failed to send reset email')
            } else {
              setMessage('Password reset email sent! Please check your inbox.')
            }
            
            setIsSubmitting(false)
          }

          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Forgot your password?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email address and we will send you a link to reset your password.
                  </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send reset email'}
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Back to sign in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        export default ForgotPassword