import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function CyberSecurityProject() {
  const [activeTab, setActiveTab] = useState('password');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [encryptText, setEncryptText] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');
  const [decryptText, setDecryptText] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');
  const [xssInput, setXssInput] = useState('');
  const [sanitizedOutput, setSanitizedOutput] = useState('');

  // Password strength checker
  const checkPasswordStrength = (pwd) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    return { checks, score };
  };

  const getStrengthLabel = (score) => {
    if (score <= 2) return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-100' };
    if (score <= 3) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score <= 4) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const { checks, score } = checkPasswordStrength(password);
  const strength = getStrengthLabel(score);

  // Caesar Cipher encryption/decryption
  const caesarCipher = (text, shift, decrypt = false) => {
    if (decrypt) shift = -shift;
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift + 26) % 26) + base);
      }
      return char;
    }).join('');
  };

  const handleEncrypt = () => {
    setEncryptedResult(caesarCipher(encryptText, 3));
  };

  const handleDecrypt = () => {
    setDecryptedResult(caesarCipher(decryptText, 3, true));
  };

  // XSS sanitization
  const sanitizeInput = (input) => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const handleSanitize = () => {
    setSanitizedOutput(sanitizeInput(xssInput));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Cybersecurity Fundamentals</h1>
          </div>
          <p className="text-gray-300">Interactive Security Concepts</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-800 p-2 rounded-lg">
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'password'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Password Strength
          </button>
          <button
            onClick={() => setActiveTab('encryption')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'encryption'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Encryption
          </button>
          <button
            onClick={() => setActiveTab('xss')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'xss'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            XSS Protection
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6">
          {/* Password Strength Checker */}
          {activeTab === 'password' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Password Strength Checker
              </h2>
              <p className="text-gray-300 mb-6">
                Test password strength based on security best practices
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password to test..."
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {password && (
                  <div className="space-y-4">
                    <div className={`px-4 py-3 rounded-lg ${strength.bg}`}>
                      <p className={`font-bold ${strength.color}`}>
                        Strength: {strength.label}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-white font-medium">Requirements:</p>
                      {[
                        { key: 'length', label: 'At least 8 characters' },
                        { key: 'uppercase', label: 'Contains uppercase letter' },
                        { key: 'lowercase', label: 'Contains lowercase letter' },
                        { key: 'number', label: 'Contains number' },
                        { key: 'special', label: 'Contains special character' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-2">
                          {checks[key] ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                          <span className={checks[key] ? 'text-green-300' : 'text-gray-400'}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Caesar Cipher Encryption */}
          {activeTab === 'encryption' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Caesar Cipher Encryption
              </h2>
              <p className="text-gray-300 mb-6">
                Encrypt and decrypt messages using a simple substitution cipher (shift of 3)
              </p>

              <div className="space-y-6">
                {/* Encryption */}
                <div className="space-y-3">
                  <label className="text-white font-medium">Encrypt Message:</label>
                  <input
                    type="text"
                    value={encryptText}
                    onChange={(e) => setEncryptText(e.target.value)}
                    placeholder="Enter text to encrypt..."
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleEncrypt}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
                  >
                    Encrypt
                  </button>
                  {encryptedResult && (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Encrypted:</p>
                      <p className="text-green-400 font-mono break-all">{encryptedResult}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-600"></div>

                {/* Decryption */}
                <div className="space-y-3">
                  <label className="text-white font-medium">Decrypt Message:</label>
                  <input
                    type="text"
                    value={decryptText}
                    onChange={(e) => setDecryptText(e.target.value)}
                    placeholder="Enter text to decrypt..."
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleDecrypt}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
                  >
                    Decrypt
                  </button>
                  {decryptedResult && (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Decrypted:</p>
                      <p className="text-blue-400 font-mono break-all">{decryptedResult}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* XSS Protection */}
          {activeTab === 'xss' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                XSS Attack Prevention
              </h2>
              <p className="text-gray-300 mb-6">
                Demonstrate how input sanitization protects against Cross-Site Scripting attacks
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Enter potentially malicious input:
                  </label>
                  <input
                    type="text"
                    value={xssInput}
                    onChange={(e) => setXssInput(e.target.value)}
                    placeholder="Try: <script>alert('XSS')</script>"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleSanitize}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition"
                >
                  Sanitize Input
                </button>

                {sanitizedOutput && (
                  <div className="space-y-3">
                    <div className="bg-red-900 bg-opacity-30 border border-red-600 p-4 rounded-lg">
                      <p className="text-red-400 text-sm mb-2 font-medium">Unsafe Input:</p>
                      <p className="text-white font-mono text-sm break-all">{xssInput}</p>
                    </div>

                    <div className="bg-green-900 bg-opacity-30 border border-green-600 p-4 rounded-lg">
                      <p className="text-green-400 text-sm mb-2 font-medium">Sanitized Output:</p>
                      <p className="text-white font-mono text-sm break-all">{sanitizedOutput}</p>
                    </div>

                    <div className="bg-blue-900 bg-opacity-30 border border-blue-600 p-4 rounded-lg">
                      <p className="text-blue-400 text-sm mb-2 font-medium">Protection Applied:</p>
                      <p className="text-gray-300 text-sm">
                        Special characters like &lt;, &gt;, ", ', and / have been encoded to prevent 
                        script injection attacks.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Cybersecurity Fundamentals Project</p>
          <p className="mt-1">Demonstrates: Password Security, Encryption, and Input Validation</p>
        </div>
      </div>
    </div>
  );
}