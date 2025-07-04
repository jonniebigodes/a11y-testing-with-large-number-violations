import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

// KeyFrames for tooltip animation
const fadeIn = keyframes`
 from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// Rapid flashing animation - WCAG 2.3.1 violation (seizure risk)
const flashAnimation = keyframes`
  0%, 49% { background-color: white; }
  50%, 100% { background-color: black; }
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
`

// Poor color contrast - WCAG 1.4.3 violation
const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: #cccccc;
  background: #eeeeee;
  @media (force-colors: active) {
    color: WindowText;
  }
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #007bff;
  }
  
  /* Rapid flashing on error state - WCAG 2.3.1 violation */
  &.error {
    animation: ${flashAnimation} 0.2s linear infinite;
  }
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0056b3;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:focus {
    border: 4px solid #ccc;
    border-radius: 5px;
    transition: border 0.2s ease;
    background-color: #004494;
  }
  
  /* Remove focus visibility - WCAG 2.4.7 violation */
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const ToolTip = styled.span`
  position: absolute;
  top: -35px;
  left: 0;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  white-space: nowrap;
  z-index: 10;
  &:before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 10px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`

const InputWithTooltip = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover ${ToolTip} {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.3s ease;
  }
`

// Using color alone to convey information - WCAG 1.4.1 violation
const ErrorMessage = styled.span<{ visible: boolean }>`
  color: red;
  font-size: 16px;
  margin-top: 6px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  &:hover {
    border: 1px solid red;
  }
  
  /* Only color indicates error - no other visual or text indicator */
  &::before {
    content: '⚠️';
    color: red;
    margin-right: 5px;
  }
`

export const LoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  
  // Keyboard trap - WCAG 2.1.1 violation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent tab navigation
    if (e.key === 'Tab') {
      e.preventDefault()
    }
    
    // Prevent arrow key navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

  const validateEmail = (value: string) => {
    console.log('validateEmail', value)
    return value.includes('@')
  }

  const validatePassword = (value: string) => {
    console.log('validateEmail', value)
    return value.length >= 16
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    if (!validateEmail(email) || !validatePassword(password)) {
      console.log('Invalid email or password')
      setError(true)
    }
  }
  
  // Missing semantic structure - WCAG 1.3.1 violation
  const getInputClassName = (field: string) => {
    if (error && field === 'email' && !validateEmail(email)) return 'error'
    if (error && field === 'password' && !validatePassword(password)) return 'error'
    return ''
  }

  return (
    <FormWrapper onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <InputWithTooltip>
        <Label htmlFor="email">Email</Label>
        <ToolTip id="emailtooltip" aria-description="email tooltip">
          Enter a valid email address
        </ToolTip>
        <InputWrapper>
          <Input
            id="email"
            name="email"
            required
            aria-required="true"
            aria-label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => console.log('focus', e.target)}
            className={getInputClassName('email')}
            aria-hidden="true" // Hide from screen readers - WCAG 1.3.1 violation
          />
        </InputWrapper>
      </InputWithTooltip>
      <InputWithTooltip>
        <Label htmlFor="password">Password</Label>
        <ToolTip id="tooltip-password" aria-description="password tooltip">
          Must be at least 16 characters long
        </ToolTip>
        <InputWrapper>
          <Input
            id="password"
            name="password"
            required
            aria-required="true"
            aria-label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => console.log('focus', e.target)}
            className={getInputClassName('password')}
            aria-hidden="true" // Hide from screen readers - WCAG 1.3.1 violation
          />
        </InputWrapper>
      </InputWithTooltip>
      <SubmitButton type="submit">Login</SubmitButton>
      <ErrorMessage
        visible={error}
        aria-description="login status"
        id="login-status"
        aria-label="login-status"
      >
        Invalid email or password. Check the email and password requirements and try again.
      </ErrorMessage>
    </FormWrapper>
  )
}
